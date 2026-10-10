import { NextRequest } from "next/server";
import { jsonError, jsonOk, bacaBodyUtf8 } from "../../lib/helpers";
import { buatKelasSchema } from "@/lib/validations";
import { getKelasList } from "@/lib/queries";
import { prisma } from "@/lib/prisma";
import { getGuruSession } from "@/lib/authorization";
import { DatabaseUnavailableError } from "@/lib/runtime";
import { revalidatePath } from "next/cache";

/** GET /api/guru/kelas — daftar kelas milik guru yang sedang masuk. */
export async function GET() {
  const guru = await getGuruSession();
  if (!guru) return jsonError("Silakan masuk sebagai guru terlebih dahulu.", 401);
  try {
    return jsonOk({ kelas: await getKelasList(guru.guruId) });
  } catch (error) {
    if (error instanceof DatabaseUnavailableError) return jsonError(error.message, 503);
    return jsonError("Gagal mengambil daftar kelas.", 500);
  }
}

const ABJAD_KODE = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function kodeAcak(): string {
  return Array.from({ length: 6 }, () =>
    ABJAD_KODE.charAt(Math.floor(Math.random() * ABJAD_KODE.length))
  ).join("");
}

async function kodeUnik(): Promise<string> {
  for (let i = 0; i < 8; i++) {
    const kode = kodeAcak();
    const dipakai = await prisma!.kelas.findUnique({
      where: { kode_akses: kode },
      select: { id: true },
    });
    if (!dipakai) return kode;
  }
  throw new Error("Tidak dapat membuat kode kelas unik.");
}

/** POST /api/guru/kelas — buat kelas baru dengan kode akses otomatis. */
export async function POST(request: NextRequest) {
  const parsed = buatKelasSchema.safeParse(await bacaBodyUtf8(request));
  if (!parsed.success) return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid");
  if (!prisma) return jsonError("Database belum dikonfigurasi (atur DATABASE_URL).", 503);

  const guru = await getGuruSession();
  if (!guru) return jsonError("Silakan masuk sebagai guru terlebih dahulu.", 401);

  try {
    const kode_akses = await kodeUnik();
    const kelas = await prisma.kelas.create({
      data: {
        nama_kelas: parsed.data.namaKelas,
        jenjang: parsed.data.jenjang,
        kode_akses,
        guru_id: guru.guruId,
      },
    });
    revalidatePath("/guru/dashboard");
    revalidatePath("/guru/materi/baru");
    revalidatePath("/guru/soal/baru");
    return jsonOk({ kelas, kode_akses }, { status: 201 });
  } catch {
    return jsonError("Gagal membuat kelas. Coba lagi.", 500);
  }
}
