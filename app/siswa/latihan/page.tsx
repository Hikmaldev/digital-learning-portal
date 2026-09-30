import type { Metadata } from "next";
import { QuizPage, type QuizSoal } from "@/components/siswa/quiz-page";
import { getBabLatihan, getSoalBab } from "@/lib/queries";
import { soalLatihan } from "@/lib/data";

export const metadata: Metadata = { title: "Latihan Soal" };

export const dynamic = "force-dynamic";

/** Halaman latihan: bab + soal diambil dari database (fallback ke data contoh). */
export default async function LatihanSoalPage() {
  const infoBab = await getBabLatihan();
  const dariDb = await getSoalBab(infoBab.babId);

  const soal: QuizSoal[] = (dariDb ?? soalLatihan).map(
    ({ id, pertanyaan, opsi }) => ({
      id,
      pertanyaan,
      opsi: opsi.map(({ id: oid, teks }) => ({ id: oid, teks })),
    })
  );

  // Kunci hanya tersedia saat memakai data contoh (tanpa DB) supaya fallback
  // penilaian tetap bisa jalan; jawaban dari database tidak bocor ke klien.
  const kunciLokal: Record<string, string> | null = dariDb
    ? null
    : Object.fromEntries(
        soalLatihan
          .map((s) => [s.id, s.opsi.find((o) => o.is_benar)?.id])
          .filter((pair): pair is [string, string] => Boolean(pair[1]))
      );

  return (
    <QuizPage
      soal={soal}
      kunciLokal={kunciLokal}
      babId={infoBab.babId}
      mapel={infoBab.mataPelajaran}
      labelBab={`Bab ${String(infoBab.urutan ?? 0).padStart(2, "0")}`}
    />
  );
}