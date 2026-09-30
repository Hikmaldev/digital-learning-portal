import { prisma } from "@/lib/prisma";
import { soalLatihan } from "@/lib/data";
import type { SubmitLatihanInput } from "@/lib/validations";

/**
 * Nilai jawaban lalu simpan progress (PRD: auto-grading + progress siswa).
 * Berjalan meski tanpa database — tanpa DB hanya mengembalikan hasil hitung.
 */
export async function nilaiDanSimpanLatihan(input: SubmitLatihanInput) {
  const soalSumber =
    (await getSoalDb(input.babId)) ??
    soalLatihan.map((s) => ({
      id: s.id,
      pertanyaan: s.pertanyaan,
      opsi: s.opsi,
    }));

  let benar = 0;
  const rincian = soalSumber.map((soal, i) => {
    const dipilih = input.jawaban[soal.id];
    const opsi = soal.opsi.find((o) => o.id === dipilih);
    const isBenar = opsi?.is_benar ?? false;
    if (isBenar) benar += 1;
    return {
      nomor: i + 1,
      label: soal.pertanyaan ?? `Soal ${i + 1}`,
      benar: isBenar,
    };
  });

  const skor = Math.round((benar / Math.max(soalSumber.length, 1)) * 100);

  const hasil = {
    nama: input.namaSiswa,
    mataPelajaran: "Bahasa Indonesia",
    bab: "Bab 03",
    skor,
    benar,
    jumlahSoal: soalSumber.length,
    rincian,
    waktuSubmit: new Date().toISOString(),
  };

  await simpanProgress(input, soalSumber, benar, skor);

  return hasil;
}

async function getSoalDb(babId: string) {
  if (!prisma) return null;
  try {
    const soal = await prisma.soal.findMany({
      where: { bab_id: babId },
      include: { opsi: true },
    });
    return soal.length > 0
      ? soal.map((s) => ({
          id: s.id,
          pertanyaan: s.pertanyaan,
          opsi: s.opsi.map((o) => ({ id: o.id, teks: o.teks, is_benar: o.is_benar })),
        }))
      : null;
  } catch {
    return null;
  }
}

async function simpanProgress(
  input: SubmitLatihanInput,
  soal: { id: string; opsi: { id: string; is_benar: boolean }[] }[],
  benar: number,
  skor: number
) {
  if (!prisma) return;
  try {
    const kelas = await prisma.kelas.findUnique({
      where: { kode_akses: input.kodeKelas },
    });
    if (!kelas) return;

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

    // Hapus submit lama siswa untuk bab ini, lalu simpan yang terbaru.
    await prisma.progressSiswa.deleteMany({
      where: {
        kelas_id: kelas.id,
        bab_id: input.babId,
        nama_siswa: input.namaSiswa,
      },
    });
    await prisma.progressSiswa.createMany({ data });
  } catch {
    // Simpan gagal (DB belum siap) — hasil tetap dikembalikan ke siswa.
  }
}