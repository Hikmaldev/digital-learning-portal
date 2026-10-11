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
  type InfoBabLatihan,
} from "@/lib/queries";
import { soalLatihan } from "@/lib/data";
import { demoMode } from "@/lib/runtime";

export const metadata: Metadata = { title: "Latihan Soal" };

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ kode?: string; babId?: string }>;
}

function BelumAdaLatihan({
  namaKelas,
  judulBab,
  kodeKelas,
}: {
  namaKelas?: string;
  judulBab?: string;
  kodeKelas?: string;
}) {
  const urlMateri = kodeKelas
    ? `/siswa/materi?kode=${encodeURIComponent(kodeKelas)}`
    : "/siswa/materi";
  const urlLatihan = kodeKelas
    ? `/siswa/latihan?kode=${encodeURIComponent(kodeKelas)}`
    : "/siswa/latihan";
  return (
    <>
      <TopBar
        nav={[
          { href: "/siswa/kelas", label: "Kelas saya" },
          { href: urlMateri, label: "Materi" },
          { href: urlLatihan, label: "Latihan", aktif: true },
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
          {judulBab ? (
            <>
              Latihan untuk bab <b>“{judulBab}”</b> belum disiapkan guru. Cek
              bab lain yang sudah punya latihan di halaman materi.
            </>
          ) : (
            <>
              Guru di kelas {namaKelas} belum menambahkan latihan soal. Cek lagi
              nanti ya.
            </>
          )}
        </p>
      </main>
      <FooterSimple />
    </>
  );
}

function BelumMasukKelas() {
  return (
    <>
      <TopBar nav={[]} aksi={{ href: "/siswa/masuk", label: "Masuk ke kelas" }} />
      <main className="mx-auto max-w-[780px] px-5 py-20 text-center">
        <div className="mx-auto mb-5 grid size-[66px] place-items-center rounded-full bg-soft text-3xl">
          🔑
        </div>
        <p className="eyebrow eyebrow-muted mb-2">Latihan soal</p>
        <h1 className="text-[38px] leading-none tracking-[-2px]">
          Masuk ke <em className="font-display text-coral">kelas dulu.</em>
        </h1>
        <p className="mt-3 text-[13px] text-muted">
          Masukkan kode kelas dari gurumu untuk membuka latihan.
        </p>
      </main>
      <FooterSimple />
    </>
  );
}

/** Halaman latihan: soal selalu mengikuti bab yang dipilih, bukan bab pertama. */
export default async function LatihanSoalPage({ searchParams }: Props) {
  const params = await searchParams;
  const kelasSiswa = params.kode
    ? await getKelasByKode(params.kode)
    : demoMode
      ? await getKelasAktifDb()
      : null;
  if (!kelasSiswa) return <BelumMasukKelas />;

  const babKelas = await getBabList(kelasSiswa.id);
  // Kelas asli tanpa bab (baru dibuat) → jangan tampilkan soal demo.
  if (babKelas.length === 0) {
    return (
      <BelumAdaLatihan
        namaKelas={kelasSiswa.nama_kelas}
        kodeKelas={kelasSiswa.kode_akses}
      />
    );
  }

  // Bab dari URL (dikirim halaman materi) diprioritaskan dan wajib bagian
  // dari kelas ini; tanpa itu, pakai bab pertama yang punya soal (tautan umum).
  const babDiminta = params.babId
    ? babKelas.find((b) => b.id === params.babId)
    : undefined;
  const infoBab: InfoBabLatihan | null = babDiminta
    ? {
        babId: babDiminta.id,
        mataPelajaran: babDiminta.mata_pelajaran,
        urutan: babDiminta.urutan,
        judul: babDiminta.judul,
      }
    : await getBabLatihan(kelasSiswa.kode_akses);
  if (!infoBab) {
    return (
      <BelumAdaLatihan
        namaKelas={kelasSiswa.nama_kelas}
        kodeKelas={kelasSiswa.kode_akses}
      />
    );
  }

  const dariDb = await getSoalBab(infoBab.babId);
  // Bab terpilih belum punya soal → tampilkan keadaan kosong untuk bab itu,
  // jangan tampilkan soal dari bab lain.
  if (!dariDb) {
    return (
      <BelumAdaLatihan
        namaKelas={kelasSiswa.nama_kelas}
        judulBab={infoBab.judul}
        kodeKelas={kelasSiswa.kode_akses}
      />
    );
  }

  const soal: QuizSoal[] = dariDb.map(({ id, pertanyaan, opsi }) => ({
    id,
    pertanyaan,
    opsi: opsi.map(({ id: oid, teks }) => ({ id: oid, teks })),
  }));

  // Kunci lokal hanya untuk mode demo (penilaian cadangan saat server tak
  // terjangkau); data dari database tidak pernah membocorkan kunci ke klien.
  const kunciLokal: Record<string, string> | null = demoMode
    ? Object.fromEntries(
        soalLatihan
          .filter((s) => s.bab_id === infoBab.babId)
          .map((s) => [s.id, s.opsi.find((o) => o.is_benar)?.id])
          .filter((pair): pair is [string, string] => Boolean(pair[1]))
      )
    : null;

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
