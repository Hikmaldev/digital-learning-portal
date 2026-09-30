import { NextRequest } from "next/server";
import { jsonError, jsonOk, bacaBodyUtf8 } from "../../lib/helpers";
import { buatKelasSchema } from "@/lib/validations";
import { getKelasList } from "@/lib/queries";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { kelassRingkasan } from "@/lib/data";

/** GET /api/guru/kelas — daftar kelas milik guru yang sedang masuk. */
export async function GET() {
  const session = await auth();
  const guruId = session?.user?.id;
  if (!guruId) {
    // Tanpa sesi: DB aktif → kosong; tanpa DB → data contoh untuk mode demo.
    return jsonOk({ kelas: prisma ? [] : kelassRingkasan });
  }
  const kelas = await getKelasList(guruId);
  return jsonOk({ kelas });
}

const ABJAD_KODE = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** Kode acak 6 karakter tanpa huruf/angka yang mudah tertukar (O/0, I/1). */
function kodeAcak(): string {
  return Array.from({ length: 6 }, () =>
    ABJAD_KODE.charAt(Math.floor(Math.random() * ABJAD_KODE.length))
  ).join("");
}

/** Kode akses unik (jika bentrok, coba ulang beberapa kali). */
async function kodeUnik(): Promise<string> {
  for (let i = 0; i < 4; i++) {
    const kode = kodeAcak();
    const dipakai = await prisma!.kelas.findUnique({
      where: { kode_akses: kode },
      select: { id: true },
    });
    if (!dipakai) return kode;
  }
  return kodeAcak();
}

/** POST /api/guru/kelas — buat kelas baru dengan kode akses otomatis. */
export async function POST(request: NextRequest) {
  const body = await bacaBodyUtf8(request);
  const parsed = buatKelasSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid");
  }
  if (!prisma) {
    return jsonError("Database belum dikonfigurasi (atur DATABASE_URL).", 503);
  }

  const session = await auth();
  const guruId = session?.user?.id;
  if (!guruId) {
    return jsonError("Silakan masuk sebagai guru terlebih dahulu.", 401);
  }

  try {
    const kode_akses = await kodeUnik();
    const kelas = await prisma.kelas.create({
      data: {
        nama_kelas: parsed.data.namaKelas,
        jenjang: parsed.data.jenjang,
        kode_akses,
        guru_id: guruId,
      },
    });
    return jsonOk({ kelas, kode_akses }, { status: 201 });
  } catch {
    return jsonError("Gagal membuat kelas. Coba lagi.", 500);
  }
}