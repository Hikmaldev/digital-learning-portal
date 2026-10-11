import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { jsonError, jsonOk, bacaBodyUtf8 } from "../../lib/helpers";
import { gantiPasswordSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { getGuruSession } from "@/lib/authorization";

/** POST /api/guru/password — ganti password guru yang sedang masuk. */
export async function POST(request: NextRequest) {
  const parsed = gantiPasswordSchema.safeParse(await bacaBodyUtf8(request));
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid");
  }
  if (!prisma) {
    return jsonError("Database belum dikonfigurasi (atur DATABASE_URL).", 503);
  }

  const guru = await getGuruSession();
  if (!guru) return jsonError("Silakan masuk sebagai guru terlebih dahulu.", 401);

  try {
    const user = await prisma.user.findUnique({
      where: { id: guru.guruId },
      select: { password_hash: true },
    });
    if (!user) return jsonError("Akun tidak ditemukan.", 404);

    const cocok = await bcrypt.compare(
      parsed.data.passwordLama,
      user.password_hash
    );
    if (!cocok) return jsonError("Password lama salah.", 403);

    const password_hash = await bcrypt.hash(parsed.data.passwordBaru, 10);
    await prisma.user.update({
      where: { id: guru.guruId },
      data: { password_hash },
    });
    return jsonOk({ diubah: true });
  } catch {
    return jsonError("Gagal mengganti password. Coba lagi.", 500);
  }
}
