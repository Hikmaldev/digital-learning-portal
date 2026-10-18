import type { Metadata } from "next";
import Link from "next/link";
import { FooterSimple } from "@/components/footer-simple";
import { TopBar } from "@/components/top-bar";
import { StatusBadge } from "@/components/ui";
import { QuizPage, type QuizSoal } from "@/components/siswa/quiz-page";
import {
  getBabList,
  getKelasAktifDb,
  getKelasByKode,
  getSoalBab,
} from "@/lib/queries";
import { soalLatihan } from "@/lib/data";
import { demoMode } from "@/lib/runtime";
import type { Bab } from "@/lib/types";

export const metadata: Metadata = { title: "Latihan Soal" };

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ kode?: string; babId?: string; nama?: string }>;
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

function BelumAdaLatihan({
  namaKelas,
  judulBab,
  kodeKelas,
  namaParam = "",
}: {
  namaKelas?: string;
  judulBab?: string;
  kodeKelas?: string;
  namaParam?: string;
}) {
  const urlMateri = kodeKelas
    ? `/siswa/materi?kode=${encodeURIComponent(kodeKelas)}${namaParam}`
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
              Latihan untuk bab <b>“{judulBab}”</b> belum disiapkan guru.
            </>
          ) : (
            <>
              Guru di kelas {namaKelas} belum menambahkan latihan soal. Cek lagi
              nanti ya.
            </>
          )}
        </p>
        {judulBab && kodeKelas && (
          <Link href={urlLatihan} className="btn btn-outline mt-5">
            Pilih latihan bab lain
          </Link>
        )}
      </main>
      <FooterSimple />
    </>
  );
}

/** Menu "Latihan": daftar bab yang punya soal, siswa memilih mau mengerjakan yang mana. */
function PilihLatihan({
  kelasNama,
  kodeKelas,
  namaParam,
  bab,
}: {
  kelasNama: string;
  kodeKelas: string;
  namaParam: string;
  bab: Bab[];
}) {
  return (
    <>
      <TopBar
        nav={[
          { href: "/siswa/kelas", label: "Kelas saya" },
          {
            href: `/siswa/materi?kode=${encodeURIComponent(kodeKelas)}${namaParam}`,
            label: "Materi",
          },
          {
            href: `/siswa/latihan?kode=${encodeURIComponent(kodeKelas)}`,
            label: "Latihan",
            aktif: true,
          },
        ]}
        aksi={{ href: "/siswa/kelas", label: "Kembali ke kelas" }}
      />
      <main className="mx-auto w-full max-w-[820px] px-5 py-12 md:px-10">
        <div className="mb-8">
          <p className="eyebrow eyebrow-muted mb-2.5">
            Latihan soal · {kelasNama}
          </p>
          <h1 className="text-[38px] leading-none tracking-[-2px]">
            Pilih <em className="font-display text-coral">latihan.</em>
          </h1>
          <p className="mt-2.5 text-[13px] text-muted">
            Kerjakan latihan per bab — jawaban dinilai otomatis begitu dikirim.
          </p>
        </div>

        <div className="panel">
          {bab.map((b) => (
            <Link
              key={b.id}
              href={`/siswa/latihan?kode=${encodeURIComponent(kodeKelas)}&babId=${encodeURIComponent(b.id)}${namaParam}`}
              className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 last:border-b-0 hover:bg-[#fff8ee]"
            >
              <div className="min-w-0">
                <p className="mb-1 text-[10px] font-bold tracking-[1px] text-coral">
                  {b.mata_pelajaran} · Bab{" "}
                  {String(b.urutan ?? 0).padStart(2, "0")}
                </p>
                <h2 className="text-sm font-bold leading-snug tracking-tight">
                  {b.judul}
                </h2>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted">
                  {b.jumlah_latihan} soal
                  {b.status !== "BELUM_MULAI" && <StatusBadge status={b.status} />}
                </p>
              </div>
              <span className="shrink-0 text-xs font-bold text-coral">
                {b.status === "SELESAI" ? "Kerjakan lagi →" : "Kerjakan →"}
              </span>
            </Link>
          ))}
        </div>
      </main>
      <FooterSimple />
    </>
  );
}

/** Halaman latihan: tanpa babId = pilih bab; dengan babId = kerjakan soal bab itu. */
export default async function LatihanSoalPage({ searchParams }: Props) {
  const params = await searchParams;
  const kelasSiswa = params.kode
    ? await getKelasByKode(params.kode)
    : demoMode
      ? await getKelasAktifDb()
      : null;
  if (!kelasSiswa) return <BelumMasukKelas />;

  const namaSiswa = params.nama?.trim() || undefined;
  const namaParam = namaSiswa ? `&nama=${encodeURIComponent(namaSiswa)}` : "";
  const babKelas = await getBabList(kelasSiswa.id, namaSiswa);
  if (babKelas.length === 0) {
    return (
      <BelumAdaLatihan
        namaKelas={kelasSiswa.nama_kelas}
        kodeKelas={kelasSiswa.kode_akses}
        namaParam={namaParam}
      />
    );
  }

  // Bab dari URL (dikirim halaman materi / daftar latihan) → kerjakan bab itu.
  const babDipilih = params.babId
    ? babKelas.find((b) => b.id === params.babId)
    : undefined;

  // Tanpa babId (klik menu "Latihan") → tampilkan pilihan bab yang punya soal,
  // supaya menunya tidak selalu membuka satu latihan yang sama.
  if (!babDipilih) {
    const babBerlatih = babKelas.filter((b) => b.jumlah_latihan > 0);
    if (babBerlatih.length === 0) {
      return (
        <BelumAdaLatihan
          namaKelas={kelasSiswa.nama_kelas}
          kodeKelas={kelasSiswa.kode_akses}
          namaParam={namaParam}
        />
      );
    }
    return (
      <PilihLatihan
        kelasNama={kelasSiswa.nama_kelas}
        kodeKelas={kelasSiswa.kode_akses}
        namaParam={namaParam}
        bab={babBerlatih}
      />
    );
  }

  const dariDb = await getSoalBab(babDipilih.id);
  if (!dariDb) {
    return (
      <BelumAdaLatihan
        namaKelas={kelasSiswa.nama_kelas}
        judulBab={babDipilih.judul}
        kodeKelas={kelasSiswa.kode_akses}
        namaParam={namaParam}
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
          .filter((s) => s.bab_id === babDipilih.id)
          .map((s) => [s.id, s.opsi.find((o) => o.is_benar)?.id])
          .filter((pair): pair is [string, string] => Boolean(pair[1]))
      )
    : null;

  return (
    <QuizPage
      soal={soal}
      kunciLokal={kunciLokal}
      babId={babDipilih.id}
      mapel={babDipilih.mata_pelajaran}
      labelBab={`Bab ${String(babDipilih.urutan ?? 0).padStart(2, "0")}`}
      kelasNama={kelasSiswa.nama_kelas}
      kodeKelas={kelasSiswa.kode_akses}
      namaSiswa={namaSiswa}
    />
  );
}
