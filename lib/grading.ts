import { prisma } from "@/lib/prisma";
import { soalLatihan } from "@/lib/data";
import { demoMode, DatabaseUnavailableError } from "@/lib/runtime";
import type { SubmitLatihanInput } from "@/lib/validations";

/** Nilai jawaban lalu simpan progress secara atomik. */
export async function nilaiDanSimpanLatihan(input: SubmitLatihanInput) {
  const db = prisma;
  if (!db && !demoMode) throw new DatabaseUnavailableError();

  const soalSumber = db
    ? await getSoalDb(db, input.kodeKelas, input.babId)
    : soalLatihan
        .filter((s) => s.bab_id === input.babId)
        .map((s) => ({ id: s.id, pertanyaan: s.pertanyaan, opsi: s.opsi }));

  if (soalSumber.length === 0) throw new Error("Bab atau soal tidak ditemukan.");

  let benar = 0;
  const rincian = soalSumber.map((soal, i) => {
    const dipilih = input.jawaban[soal.id];
    const opsi = soal.opsi.find((o) => o.id === dipilih);
    const isBenar = opsi?.is_benar ?? false;
    if (isBenar) benar += 1;
    return { nomor: i + 1, label: soal.pertanyaan, benar: isBenar };
  });
  const skor = Math.round((benar / soalSumber.length) * 100);

  const hasil = {
    nama: input.namaSiswa,
    mataPelajaran: "Bahasa Indonesia",
    bab: "Bab latihan",
    skor,
    benar,
    jumlahSoal: soalSumber.length,
    rincian,
    waktuSubmit: new Date().toISOString(),
  };

  if (db) await simpanProgress(db, input, soalSumber, skor);
  return hasil;
}

async function getSoalDb(db: NonNullable<typeof prisma>, kodeKelas: string, babId: string) {
  const kelas = await db.kelas.findUnique({
    where: { kode_akses: kodeKelas },
    select: { id: true },
  });
  if (!kelas) throw new Error("Kode kelas tidak ditemukan.");

  const soal = await db.soal.findMany({
    where: { bab_id: babId, bab: { kelas_id: kelas.id } },
    include: { opsi: true },
    orderBy: { urutan: "asc" },
  });
  return soal.map((s) => ({
    id: s.id,
    pertanyaan: s.pertanyaan,
    opsi: s.opsi.map((o) => ({ id: o.id, teks: o.teks, is_benar: o.is_benar })),
  }));
}

async function simpanProgress(
  db: NonNullable<typeof prisma>,
  input: SubmitLatihanInput,
  soal: { id: string; opsi: { id: string; is_benar: boolean }[] }[],
  skor: number
) {
  const kelas = await db.kelas.findUnique({
    where: { kode_akses: input.kodeKelas },
    select: { id: true },
  });
  if (!kelas) throw new Error("Kode kelas tidak ditemukan.");

  const bab = await db.bab.findFirst({
    where: { id: input.babId, kelas_id: kelas.id },
    select: { id: true },
  });
  if (!bab) throw new Error("Bab tidak termasuk dalam kelas ini.");

  const data = soal.map((s) => {
    const dipilih = input.jawaban[s.id];
    const opsi = s.opsi.find((o) => o.id === dipilih);
    return {
      kelas_id: kelas.id,
      nama_siswa: input.namaSiswa,
      bab_id: input.babId,
      soal_id: s.id,
      jawaban: dipilih ?? "",
      benar: opsi?.is_benar ?? false,
      skor,
    };
  });

  await db.$transaction(async (tx) => {
    await tx.progressSiswa.deleteMany({
      where: {
        kelas_id: kelas.id,
        bab_id: input.babId,
        nama_siswa: input.namaSiswa,
      },
    });
    await tx.progressSiswa.createMany({ data });
  });
}
