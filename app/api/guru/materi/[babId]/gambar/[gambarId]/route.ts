import { NextRequest } from "next/server";
import { del } from "@vercel/blob";
import { jsonError, jsonOk } from "../../../../../lib/helpers";
import { prisma } from "@/lib/prisma";
import { getGuruSession, guruMemilikiBab } from "@/lib/authorization";

interface Params {
  params: Promise<{ babId: string; gambarId: string }>;
}

/** DELETE /api/guru/materi/:babId/gambar/:gambarId — hapus gambar (wajib milik guru). */
export async function DELETE(_request: NextRequest, { params }: Params) {
  const { babId, gambarId } = await params;
  const guru = await getGuruSession();
  if (!guru) return jsonError("Silakan masuk sebagai guru terlebih dahulu.", 401);
  if (!prisma) return jsonError("Database belum dikonfigurasi (atur DATABASE_URL).", 503);
  if (!(await guruMemilikiBab(babId, guru.guruId))) {
    return jsonError("Bab tidak ditemukan atau bukan milik Anda.", 403);
  }

  try {
    const gambar = await prisma.gambar.findFirst({
      where: { id: gambarId, bab_id: babId },
      select: { id: true, url: true },
    });
    if (!gambar) return jsonError("Gambar tidak ditemukan.", 404);

    // Hapus berkas di Blob (bila penyimpanan aktif); meta tetap dihapus.
    try {
      await del(gambar.url);
    } catch {
      // Penyimpanan belum dikonfigurasi atau berkas sudah hilang — abaikan.
    }

    await prisma.gambar.delete({ where: { id: gambar.id } });
    return jsonOk({ dihapus: true });
  } catch {
    return jsonError("Gagal menghapus gambar. Coba lagi.", 500);
  }
}
