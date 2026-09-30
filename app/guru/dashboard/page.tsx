import type { Metadata } from "next";
import Link from "next/link";
import { FooterSimple } from "@/components/footer-simple";
import { TopBar } from "@/components/top-bar";
import { ProgressBar } from "@/components/ui";
import { BuatKelasDialog } from "@/components/guru/buat-kelas-dialog";
import { BagikanKode } from "@/components/guru/bagikan-kode";
import { kelassRingkasan } from "@/lib/data";
import { auth } from "@/auth";
import {
  getKelasAktifDb,
  getKelasList,
  getMetrics,
  getProgressRataKelas,
  getRingkasanPelajaranDb,
} from "@/lib/queries";

export const metadata: Metadata = { title: "Dashboard Guru" };

export const dynamic = "force-dynamic";

export default async function DashboardGuruPage() {
  const [session, kelas] = await Promise.all([auth(), getKelasAktifDb()]);
  const guruId = session?.user?.id;
  // Tanpa sesi (mode demo) tampilkan data contoh; dengan sesi ambil kelas milik guru.
  const daftarKelas = guruId ? await getKelasList(guruId) : kelassRingkasan;
  const progressKelas = await Promise.all(
    daftarKelas.map((k) => getProgressRataKelas(k.id))
  );
  const [metrics, ringkasanMapel] = await Promise.all([
    getMetrics(kelas.id),
    getRingkasanPelajaranDb(),
  ]);
  return (
    <>
      <TopBar
        nav={[
          { href: "/guru/dashboard", label: "Dashboard", aktif: true },
          { href: "/guru/materi/baru", label: "Materi" },
          { href: "/guru/soal/baru", label: "Latihan soal" },
        ]}
        aksi={{ href: "/", label: "Keluar" }}
      />
      <header className="border-b border-line bg-soft px-5 py-9 md:px-10">
        <div className="mx-auto flex max-w-[1104px] flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow eyebrow-muted mb-2.5">Ruang kerja guru</p>
            <h1 className="text-[38px] leading-none tracking-[-2px]">
              Selamat datang,{" "}
              <em className="font-display text-coral">Hikmal.</em>
            </h1>
            <p className="mt-2.5 text-xs text-muted">
              Kelola kelas dan lihat perkembangan siswa dari satu tempat.
            </p>
          </div>
          <Link href="/guru/materi/baru" className="btn btn-coral">
            + Buat materi baru
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1180px] px-5 py-9 md:px-10">
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {metrics.map((m) => (
            <div key={m.label} className="panel p-5">
              <span className="block text-[10px] text-muted">{m.label}</span>
              <strong className="my-1.5 block text-3xl tracking-tight">
                {m.nilai}
              </strong>
              <small className="text-[10px] text-leafgreen">↑ {m.delta}</small>
            </div>
          ))}
        </div>

        <div className="mb-6 flex gap-6 border-b border-line">
          <Link
            href="/guru/dashboard"
            className="border-b-2 border-coral pb-3 text-[11px] font-bold"
          >
            Ringkasan kelas
          </Link>
          <Link
            href="/guru/progress"
            className="pb-3 text-[11px] text-muted hover:text-ink"
          >
            Progress siswa
          </Link>
          <Link
            href="/guru/materi/baru"
            className="pb-3 text-[11px] text-muted hover:text-ink"
          >
            Kelola materi
          </Link>
        </div>

        <div className="mb-6 flex flex-col gap-4 border-l-4 border-yellow bg-[#f9efc9] p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <strong className="text-sm">Bagikan kode kelasmu</strong>
            <p className="m-0 mt-1 text-[11px] text-[#73633a]">
              Pilih kelas, lalu beri tahu kode ini ke siswanya.
            </p>
          </div>
          <BagikanKode kelas={daftarKelas} />
          <span className="block text-[11px] md:hidden">Bagikan ↗</span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="eyebrow eyebrow-muted mb-2">Kelas yang kamu ajar</p>
                <h2 className="text-xl tracking-tight">Pilih ruang kelas.</h2>
              </div>
              <p className="mb-1 text-[11px] text-muted">
                {daftarKelas.length} {daftarKelas.length === 1 ? "kelas aktif" : "kelas aktif"}
              </p>
            </div>
            <div className="overflow-x-auto border border-line bg-paper">
              <table className="w-full min-w-[420px] border-collapse text-left text-[11px]">
                <thead>
                  <tr className="text-[10px] text-muted">
                    <th className="px-4 py-3.5 font-medium">Kelas</th>
                    <th className="px-4 py-3.5 font-medium">Bab</th>
                    <th className="px-4 py-3.5 font-medium">Progress</th>
                    <th className="px-4 py-3.5" />
                  </tr>
                </thead>
                <tbody>
                  {daftarKelas.map((k, i) => (
                    <tr key={k.id} className="border-t border-line">
                      <td className="px-4 py-3.5">
                        <strong className="block text-xs">{k.nama}</strong>
                        <small className="text-[10px] text-muted">
                          {k.jenjang} · kode {k.kode}
                        </small>
                      </td>
                      <td className="px-4 py-3.5">{k.jumlahBab} bab</td>
                      <td className="px-4 py-3.5">
                        {progressKelas[i] !== null ? (
                          <b>{progressKelas[i]}%</b>
                        ) : (
                          <span className="text-muted">belum ada</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <Link
                          href={`/guru/progress?kode=${k.kode}`}
                          className="text-xs font-bold text-coral"
                        >
                          Lihat →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="bg-ink p-6 text-paper">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.13em] text-yellow">
              Mulai ruang baru
            </p>
            <h3 className="mb-3 text-lg tracking-tight">
              Buat kelas untuk semester berikutnya.
            </h3>
            <p className="text-xs leading-relaxed text-[#bdc8bf]">
              Atur kode akses baru, lalu undang siswa masuk tanpa akun.
            </p>
            <BuatKelasDialog />
          </aside>
        </div>

        <div className="panel mt-6 p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="eyebrow eyebrow-muted mb-2">Ringkasan aktivitas</p>
              <h2 className="text-xl tracking-tight">Progress kelas minggu ini.</h2>
            </div>
            <Link href="/guru/progress" className="text-xs font-bold text-coral">
              Lihat detail <span className="pl-1 text-base">→</span>
            </Link>
          </div>
          {ringkasanMapel.map((p) => (
            <div
              key={p.mata_pelajaran}
              className="grid grid-cols-[190px_1fr_42px] items-center gap-4 border-t border-line py-4 text-[11px] first:mt-3"
            >
              <span>
                <strong>{p.mata_pelajaran}</strong>
                <small className="block text-[9px] text-muted">
                  {p.jumlah_bab} bab · 24 siswa
                </small>
              </span>
              <ProgressBar progres={p.progres} />
              <b className="text-[11px]">{p.progres}%</b>
            </div>
          ))}
        </div>
      </main>
      <FooterSimple />
    </>
  );
}