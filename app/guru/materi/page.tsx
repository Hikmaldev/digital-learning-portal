import type { Metadata } from "next";
import Link from "next/link";
import { FooterSimple } from "@/components/footer-simple";
import { TopBar } from "@/components/top-bar";
import { PilihKelas } from "@/components/guru/pilih-kelas";
import { TombolHapusBab } from "@/components/guru/hapus-bab-button";
import { getGuruSession } from "@/lib/authorization";
import { getBabList, getKelasList } from "@/lib/queries";

export const metadata: Metadata = { title: "Kelola Materi" };

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ kelasId?: string }>;
}

export default async function KelolaMateriPage({ searchParams }: Props) {
  const params = await searchParams;
  const guru = await getGuruSession();
  const daftarKelas = guru ? await getKelasList(guru.guruId) : [];

  // Kelas dari ?kelasId= (wajib milik guru), jika tidak pakai kelas pertama.
  const kelas =
    daftarKelas.find((k) => k.id === params.kelasId) ?? daftarKelas[0] ?? null;
  const bab = kelas ? await getBabList(kelas.id) : [];

  const hrefDashboard = kelas
    ? `/guru/dashboard?kode=${encodeURIComponent(kelas.kode)}`
    : "/guru/dashboard";
  const hrefMateri = kelas
    ? `/guru/materi?kelasId=${encodeURIComponent(kelas.id)}`
    : "/guru/materi";
  const hrefMateriBaru = kelas
    ? `/guru/materi/baru?kelasId=${encodeURIComponent(kelas.id)}`
    : "/guru/materi/baru";
  const hrefSoal = kelas
    ? `/guru/soal/baru?kelasId=${encodeURIComponent(kelas.id)}`
    : "/guru/soal/baru";

  return (
    <>
      <TopBar
        nav={[
          { href: hrefDashboard, label: "Dashboard" },
          { href: hrefMateri, label: "Materi", aktif: true },
          { href: hrefSoal, label: "Latihan soal" },
          { href: "/guru/akun", label: "Akun" },
        ]}
        aksi={{ href: hrefDashboard, label: "Dashboard" }}
      />
      <main className="mx-auto w-full max-w-[1180px] px-5 py-12 md:px-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow eyebrow-muted mb-2.5">
              Kelola materi ·{" "}
              {kelas ? `${kelas.nama} · ${kelas.jenjang}` : "Belum ada kelas"}
            </p>
            <h1 className="text-[38px] leading-none tracking-[-2px]">
              Daftar <em className="font-display text-coral">materi.</em>
            </h1>
            <p className="mt-2.5 text-[13px] text-muted">
              Lihat, ubah, atau hapus materi yang sudah dibuat — dan tambah bab
              baru bila perlu.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2.5 self-start md:max-w-[300px]">
            {daftarKelas.length > 1 && kelas && (
              <PilihKelas
                daftar={daftarKelas.map((k) => ({
                  id: k.id,
                  kode: k.kode,
                  nama: k.nama,
                  jenjang: k.jenjang,
                }))}
                aktif={kelas.id}
                basis="/guru/materi"
                param="kelasId"
              />
            )}
            <Link href={hrefMateriBaru} className="btn btn-coral">
              + Tambah materi
            </Link>
          </div>
        </div>

        {!kelas && (
          <div className="panel p-8 text-center">
            <p className="eyebrow eyebrow-muted mb-2">Belum ada kelas</p>
            <p className="text-[13px] text-muted">
              Buat kelas dulu di dashboard, lalu kembali ke halaman ini untuk
              mengelola materinya.
            </p>
            <Link href="/guru/dashboard" className="btn btn-outline mt-4">
              Ke dashboard
            </Link>
          </div>
        )}

        {kelas && bab.length === 0 && (
          <div className="panel p-8 text-center">
            <div className="mx-auto mb-4 grid size-[54px] place-items-center rounded-full bg-soft text-2xl">
              📚
            </div>
            <p className="eyebrow eyebrow-muted mb-2">Materi kosong</p>
            <h2 className="text-xl tracking-tight">
              Kelas ini belum punya materi.
            </h2>
            <p className="mt-2 text-[12px] text-muted">
              Mulai dengan menambahkan bab pertama untuk kelas{" "}
              <b className="text-ink">{kelas.nama}</b>.
            </p>
            <Link href={hrefMateriBaru} className="btn btn-coral mt-4">
              + Tambah materi pertama
            </Link>
          </div>
        )}

        {kelas && bab.length > 0 && (
          <div className="panel">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <p className="eyebrow eyebrow-muted">Materi kelas ini</p>
              <span className="text-[11px] text-muted">{bab.length} bab</span>
            </div>
            {bab.map((b) => (
              <div
                key={b.id}
                className="flex flex-col gap-4 border-b border-line px-5 py-5 last:border-b-0 md:flex-row md:items-center md:justify-between"
              >
                <div className="min-w-0">
                  <p className="mb-1 text-[10px] font-bold tracking-[1px] text-coral">
                    {b.mata_pelajaran} · Bab{" "}
                    {String(b.urutan ?? 0).padStart(2, "0")}
                  </p>
                  <h2 className="text-lg leading-tight tracking-tight">
                    {b.judul}
                  </h2>
                  <p className="mt-1 text-[11px] text-muted">
                    {b.jumlah_latihan} soal latihan
                    {b.url_video ? " · ada video" : ""}
                    {b.link_sumber ? " · ada sumber buku" : ""}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 md:justify-end">
                  <Link
                    href={`/guru/materi/${b.id}/edit`}
                    className="btn btn-outline px-3 py-2 text-[11px]"
                  >
                    Ubah
                  </Link>
                  <Link
                    href={`/guru/soal/baru?kelasId=${encodeURIComponent(kelas.id)}&babId=${encodeURIComponent(b.id)}`}
                    className="btn btn-outline px-3 py-2 text-[11px]"
                  >
                    + Soal
                  </Link>
                  <Link
                    href={`/siswa/materi?id=${encodeURIComponent(b.id)}&kode=${encodeURIComponent(kelas.kode)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline px-3 py-2 text-[11px]"
                  >
                    Lihat
                  </Link>
                  <TombolHapusBab babId={b.id} judul={b.judul} />
                </div>
              </div>
            ))}
          </div>
        )}

        <Link
          href={hrefDashboard}
          className="mt-6 inline-block text-[11px] text-muted hover:underline"
        >
          ← Kembali ke dashboard
        </Link>
      </main>
      <FooterSimple />
    </>
  );
}
