import { NextRequest } from "next/server";
import { jsonError, jsonOk } from "../../../../lib/helpers";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { getGuruSession, guruMemilikiBab } from "@/lib/authorization";

interface Params {
  params: Promise<{ babId: string }>;
}

const UKURAN_MAKS = 4 * 1024 * 1024; // 4 MB
const TIPE_OK = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

/** POST /api/guru/materi/:babId/gambar — unggah gambar materi (wajib milik guru). */
export async function POST(request: NextRequest, { params }: Params) {
  const { babId } = await params;
  const guru = await getGuruSession();
  if (!guru) return jsonError("Silakan masuk sebagai guru terlebih dahulu.", 401);
  if (!prisma) return jsonError("Database belum dikonfigurasi (atur DATABASE_URL).", 503);
  if (!(await guruMemilikiBab(babId, guru.guruId))) {
    return jsonError("Bab tidak ditemukan atau bukan milik Anda.", 403);
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return jsonError("File gambar wajib dipilih.");
    if (!TIPE_OK.has(file.type)) return jsonError("Format harus JPG, PNG, WEBP, atau GIF.");
    if (file.size > UKURAN_MAKS) {
      return jsonError("Ukuran gambar maksimal 4 MB. Kompres dulu ya.");
    }

    let url: string;
    try {
      const blob = await put(
        `materi/${babId}/${Date.now()}-${file.name.replace(/[^\w.\-]+/g, "_")}`,
        file,
        { access: "public", addRandomSuffix: true },
      );
      url = blob.url;
    } catch {
      return jsonError(
        "Penyimpanan gambar belum aktif (BLOB_READ_WRITE_TOKEN belum diset di project).",
        503,
      );
    }

    const gambar = await prisma.gambar.create({
      data: { bab_id: babId, url, ukuran_file: file.size },
    });
    return jsonOk({ gambar });
  } catch {
    return jsonError("Gagal mengunggah gambar. Coba lagi.", 500);
  }
}
