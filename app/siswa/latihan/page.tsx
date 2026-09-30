import type { Metadata } from "next";
import { QuizPage, type QuizSoal } from "@/components/siswa/quiz-page";
import { getSoalBab } from "@/lib/queries";
import { soalLatihan } from "@/lib/data";

export const metadata: Metadata = { title: "Latihan Soal" };

export const dynamic = "force-dynamic";

/** Halaman latihan: soal diambil dari database (fallback ke data contoh). */
export default async function LatihanSoalPage() {
  const dariDb = await getSoalBab("bab-bindo-3");

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

  return <QuizPage soal={soal} kunciLokal={kunciLokal} />;
}