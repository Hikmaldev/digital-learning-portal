import { NextRequest } from "next/server";
import { jsonError, jsonOk, bacaBodyUtf8 } from "../../lib/helpers";
import { buatKelasSchema } from "@/lib/validations";
import { getKelasList } from "@/lib/queries";
import { prisma } from "@/lib/prisma";

/** GET /api/guru/kelas — daftar kelas milik guru. */
export async function GET() {
  const kelas = await getKelasList();
  return jsonOk({ kelas });
}

/** POST /api/guru/kelas — buat kelas baru (Fase 1 MVP). */
export async function POST(request: NextRequest) {
  const body = await bacaBodyUtf8(request);
  const parsed = buatKelasSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid");
  }
  if (!prisma) {
    return jsonError("Database belum dikonfigurasi (atur DATABASE_URL).", 503);
  }

  // Kode akses acak 6 karakter, mudah dibagikan.
  const kode_akses = Array.from({ length: 6 }, () =>
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789".charAt(
      Math.floor(Math.random() * 32)
    )
  ).join("");

  const kelas = await prisma.kelas.create({
    data: {
      nama_kelas: parsed.data.namaKelas,
      jenjang: parsed.data.jenjang,
      kode_akses,
      guru_id: "guru-demo", // ganti dengan session user id saat Auth aktif
    },
  });

  return jsonOk({ kelas, kode_akses }, { status: 201 });
}

