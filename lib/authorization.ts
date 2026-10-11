import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getGuruSession() {
  const session = await auth();
  const guruId = session?.user?.id;
  return guruId ? { session, guruId } : null;
}

export async function guruMemilikiKelas(kelasId: string, guruId: string) {
  if (!prisma) return false;
  const kelas = await prisma.kelas.findFirst({
    where: { id: kelasId, guru_id: guruId },
    select: { id: true },
  });
  return Boolean(kelas);
}

export async function guruMemilikiBab(babId: string, guruId: string) {
  if (!prisma) return false;
  const bab = await prisma.bab.findFirst({
    where: { id: babId, kelas: { guru_id: guruId } },
    select: { id: true },
  });
  return Boolean(bab);
}

export async function guruMemilikiSoal(soalId: string, guruId: string) {
  if (!prisma) return false;
  const soal = await prisma.soal.findFirst({
    where: { id: soalId, bab: { kelas: { guru_id: guruId } } },
    select: { id: true },
  });
  return Boolean(soal);
}
