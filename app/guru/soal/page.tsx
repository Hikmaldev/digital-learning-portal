import type { Metadata } from "next";
import Link from "next/link";
import { FooterSimple } from "@/components/footer-simple";
import { TopBar } from "@/components/top-bar";
import { PilihKelas } from "@/components/guru/pilih-kelas";
import { TombolHapusSoal } from "@/components/guru/hapus-soal-button";
import { getGuruSession } from "@/lib/authorization";
import { getKelasList, getSoalKelola } from "@/lib/queries";

export const metadata: Metadata = { title: "Kelola Latihan Soal" };

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ kelasId?: string; babId?: string }>;
}

export default async function KelolaSoalPage({ searchParams }: Props) {
  const params = await searchParams;
  const guru = await getGuruSession();
  const daftarKelas = guru ? await getKelasList(guru.guruId) : [];

  // Kelas dari ?kelasId= (wajib milik guru), jika tidak pakai kelas pertama.
  const kelas =
    daftarKelas.find((k) => k.id === params.kelasId) ?? daftarKelas[0] ?? null;
  const semuaBab = kelas ? await getSoalKelola(kelas.id) : [];
  // ?babId= memfilter tampilan ke satu bab (dari tombol "+ Soal" halaman materi).
  const difilter = Boolean(
    params.babId && semuaBab.some((b) => b.id === params.babId)
  );
  const tampil = difilter
    ? semuaBab.filter((b) => b.id === params.babId)
    : semuaBab;
  const totalSoal = semuaBab.reduce((n, b) => n + b.soal.length, 0);

  const hrefDashboard = kelas
    ? `/guru/dashboard?kode=${encodeURIComponent(kelas.kode)}`
    : "/guru/dashboard";
  const hrefMateri = kelas
    ? `/guru/materi?kelasId=${encodeURIComponent(kelas.id)}`
    : "/guru/materi";
  const hrefSoal = kelas
    ? `/guru/soal?kelasId=${encodeURIComponent(kelas.id)}`
    : "/guru/soal";
  const hrefSoalBaru = kelas
    ? `/guru/soal/baru?kelasId=${encodeURIComponent(kelas.id)}${difilter ? `&babId=${encodeURIComponent(params.babId!)}` : ""}`
    : "/guru/soal/baru";

  return (
    <>
      <TopBar
        nav={[
          { href: hrefDashboard, label: "Dashboard" },
          { href: hrefMateri, label: "Materi" },
          { href: hrefSoal, label: "Latihan soal", aktif: true },
          { href: "/guru/akun", label: "Akun" },
        ]}
        aksi={{ href: hrefDashboard, label: "Dashboard" }}
      />
      <main className="mx-auto w-full max-w-[1180px] px-5 py-12 md:px-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow eyebrow-muted mb-2.5">
              Kelola latihan ·{" "}
              {kelas ? `${kelas.nama} · ${kelas.jenjang}` : "Belum ada kelas"}
            </p>
            <h1 className="text-[38px] leading-none tracking-[-2px]">
              Bank <em className="font-display text-coral">soal.</em>
            </h1>
            <p className="mt-2.5 text-[13px] text-muted">
              Lihat, ubah, atau hapus soal latihan tiap bab — dan tambah soal
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
                basis="/guru/soal"
                param="kelasId"
              />
            )}
            <Link href={hrefSoalBaru} className="btn btn-coral">
              + Tambah soal
            </Link>
          </div>
        </div>

        {!kelas && (
          <div className="panel p-8 text-center">
            <p className="eyebrow eyebrow-muted mb-2">Belum ada kelas</p>
            <p className="text-[13px] text-muted">
              Buat kelas dulu di dashboard, lalu kembali ke halaman ini untuk
              mengelola latihan soalnya.
            </p>
            <Link href="/guru/dashboard" className="btn btn-outline mt-4">
              Ke dashboard
            </Link>
          </div>
        )}

        {kelas && semuaBab.length === 0 && (
          <div className="panel p-8 text-center">
            <div className="mx-auto mb-4 grid size-[54px] place-items-center rounded-full bg-soft text-2xl">
              📝
            </div>
            <p className="eyebrow eyebrow-muted mb-2">Belum ada bab</p>
            <h2 className="text-xl tracking-tight">
              Kelas ini belum punya materi.
            </h2>
            <p className="mt-2 text-[12px] text-muted">
              Latihan soal menempel pada bab. Tambahkan materi dulu untuk kelas{" "}
              <b className="text-ink">{kelas.nama}</b>.
            </p>
            <Link href={hrefMateri} className="btn btn-coral mt-4">
              Ke kelola materi
            </Link>
          </div>
        )}

        {kelas && semuaBab.length > 0 && (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <p className="text-[11px] text-muted">
                {semuaBab.length} bab · {totalSoal} soal tersimpan
              </p>
              {difilter && (
                <Link
                  href={hrefSoal}
                  className="text-[11px] font-bold text-coral hover:underline"
                >
                  Tampilkan semua bab →
                </Link>
              )}
            </div>

            {tampil.map((b) => (
              <div key={b.id} className="panel mb-5">
                <div className="flex flex-col gap-3 border-b border-line px-5 py-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="eyebrow eyebrow-muted mb-1">
                      {b.mata_pelajaran} · Bab{" "}
                      {String(b.urutan ?? 0).padStart(2, "0")}
                    </p>
                    <h2 className="text-lg tracking-tight">{b.judul}</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-muted">
                      {b.soal.length} soal
                    </span>
                    <Link
                      href={`/guru/soal/baru?kelasId=${encodeURIComponent(kelas.id)}&babId=${encodeURIComponent(b.id)}`}
                      className="btn btn-outline px-3 py-2 text-[11px]"
                    >
                      + Soal
                    </Link>
                  </div>
                </div>

                {b.soal.length === 0 ? (
                  <p className="px-5 py-4 text-[11px] text-muted">
                    Belum ada soal untuk bab ini. Klik “+ Soal” untuk membuat.
                  </p>
                ) : (
                  b.soal.map((s, idx) => (
                    <div
                      key={s.id}
                      className="flex flex-col gap-3 border-b border-line px-5 py-4 last:border-b-0 md:flex-row md:items-start md:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-bold leading-snug">
                          {String(idx + 1).padStart(2, "0")}. {s.pertanyaan}
                        </p>
                        <p className="mt-1 text-[11px] text-muted">
                          Jawaban benar:{" "}
                          <b className="text-leafgreen">
                            {s.opsi.find((o) => o.is_benar)?.teks ??
                              "belum ditandai"}
                          </b>
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <Link
                          href={`/guru/soal/${encodeURIComponent(s.id)}/edit`}
                          className="btn btn-outline px-3 py-2 text-[11px]"
                        >
                          Ubah
                        </Link>
                        <TombolHapusSoal soalId={s.id} nomor={idx + 1} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            ))}
          </>
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
