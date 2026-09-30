import type { Metadata } from "next";
import { FooterSimple } from "@/components/footer-simple";
import { TopBar } from "@/components/top-bar";
import { QuizPage, type QuizSoal } from "@/components/siswa/quiz-page";
import {
  getBabLatihan,
  getBabList,
  getKelasAktifDb,
  getKelasByKode,
  getSoalBab,
} from "@/lib/queries";
import { prisma } from "@/lib/prisma";
import { soalLatihan } from "@/lib/data";

export const metadata: Metadata = { title: "Latihan Soal" };

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ kode?: string }>;
}

function BelumAdaLatihan({ namaKelas }: { namaKelas: string }) {
  return (
    <>
      <TopBar
        nav={[
          { href: "/siswa/kelas", label: "Kelas saya" },
          { href: "/siswa/materi", label: "Materi" },
          { href: "/siswa/latihan", label: "Latihan", aktif: true },
        ]}
        aksi={{ href: "/siswa/kelas", label: "Kembali ke kelas" }}
      />
      <main className="mx-auto max-w-[780px] px-5 py-20 text-center">
        <div className="mx-auto mb-5 grid size-[66px] place-items-center rounded-full bg-soft text-3xl">
          📭
        </div>
        <p className="eyebrow eyebrow-muted mb-2">Latihan soal</p>
        <h1 className="text-[38px] leading-none tracking-[-2px]">
          Belum ada{" "}
          <em className="font-display text-coral">latihan.</em>
        </h1>
        <p className="mt-3 text-[13px] text-muted">
          Guru di kelas {namaKelas} belum menambahkan latihan soal. Cek lagi
          nanti ya.
        </p>
      </main>
      <FooterSimple />
    </>
  );
}

/** Halaman latihan: bab + soal diambil dari database (fallback ke data contoh). */
export default async function LatihanSoalPage({ searchParams }: Props) {
  const params = await searchParams;
  const kelasSiswa = params.kode
    ? (await getKelasByKode(params.kode)) ?? (await getKelasAktifDb())
    : await getKelasAktifDb();

  const babKelas = await getBabList(kelasSiswa.id);
  // Kelas asli tanpa bab (baru dibuat) → jangan tampilkan soal demo.
  if (babKelas.length === 0) {
    return <BelumAdaLatihan namaKelas={kelasSiswa.nama_kelas} />;
  }

  const infoBab = await getBabLatihan(kelasSiswa.kode_akses);
  const dariDb = await getSoalBab(infoBab.babId);

  // DB aktif tetapi bab ini belum punya soal → tampilkan keadaan kosong,
  // jangan bocorkan soal demo/latihan dari kelas lain.
  if (dariDb === null && prisma !== null) {
    return <BelumAdaLatihan namaKelas={kelasSiswa.nama_kelas} />;
  }

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
      kelasNama={kelasSiswa.nama_kelas}
      kodeKelas={kelasSiswa.kode_akses}
    />
  );
}