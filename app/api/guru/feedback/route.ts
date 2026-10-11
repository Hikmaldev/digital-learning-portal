import { jsonError, jsonOk } from "../../lib/helpers";
import { getFeedbackList, tandaiFeedbackDibaca } from "@/lib/queries";
import { getGuruSession } from "@/lib/authorization";
import { DatabaseUnavailableError } from "@/lib/runtime";
import { revalidatePath } from "next/cache";

/** GET /api/guru/feedback — daftar masukan siswa untuk kelas milik guru. */
export async function GET() {
  const guru = await getGuruSession();
  if (!guru) return jsonError("Silakan masuk sebagai guru terlebih dahulu.", 401);
  try {
    return jsonOk({ feedback: await getFeedbackList(guru.guruId) });
  } catch (error) {
    if (error instanceof DatabaseUnavailableError) return jsonError(error.message, 503);
    return jsonError("Gagal mengambil masukan.", 500);
  }
}

/** PATCH /api/guru/feedback — tandai semua masukan sebagai sudah dibaca. */
export async function PATCH() {
  const guru = await getGuruSession();
  if (!guru) return jsonError("Silakan masuk sebagai guru terlebih dahulu.", 401);
  try {
    const jumlah = await tandaiFeedbackDibaca(guru.guruId);
    revalidatePath("/guru/feedback");
    return jsonOk({ jumlah });
  } catch (error) {
    if (error instanceof DatabaseUnavailableError) return jsonError(error.message, 503);
    return jsonError("Gagal memperbarui masukan.", 500);
  }
}
