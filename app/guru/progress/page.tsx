import type { Metadata } from "next";
import Link from "next/link";
import { FooterSimple } from "@/components/footer-simple";
import { TopBar } from "@/components/top-bar";
import { StatusBadge } from "@/components/ui";
import { getKelasAktifDb, getRingkasanKelas } from "@/lib/queries";

export const metadata: Metadata = { title: "Progress Siswa" };

export const dynamic = "force-dynamic";

export default async function DashboardProgressPage() {
  const kelas = await getKelasAktifDb();
  const daftarSiswa = await getRingkasanKelas(kelas.id);
  const selesai = daftarSiswa.filter(
    (s) => s.status === "SUDAH_MENGERJAKAN"
  ).length;
  const berjalan = daftarSiswa.filter(
    (s) => s.status === "SEDANG_BERJALAN"
  ).length;
  const belum = daftarSiswa.filter((s) => s.status === "BELUM_MULAI").length;

  return (
    <>
      <TopBar
        nav={[
          { href: "/guru/dashboard", label: "Dashboard" },
          {
            href: "/guru/progress",
            label: "Progress siswa",
            aktif: true,
          },
          { href: "/guru/materi/baru", label: "Kelola materi" },
        ]}
        aksi={{ href: "/", label: "Keluar" }}
      />
      <main className="mx-auto max-w-[1180px] px-5 py-12 md:px-10">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="eyebrow eyebrow-muted mb-2.5">
              Kelas Harapan Bersama · Paket B
            </p>
            <h1 className="text-[38px] leading-none tracking-[-2px]">
              Progress <em className="font-display text-coral">siswa.</em>
            </h1>
            <p className="mt-2.5 text-[13px] text-muted">
              Periksa siapa yang sudah mengerjakan latihan dan siapa yang masih
              perlu diingatkan.
            </p>
          </div>
          <button type="button" className="btn btn-outline self-start">
            Unduh rekap ↓
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { label: "Sudah mengerjakan semua", nilai: selesai, tag: "75% dari 24 siswa", naik: true },
            { label: "Masih berjalan", nilai: berjalan, tag: "sedang mengerjakan", naik: false },
            { label: "Belum mulai", nilai: belum, tag: "perlu diingatkan", naik: false },
          ].map((m) => (
            <div key={m.label} className="panel p-5">
              <span className="block text-[10px] text-muted">{m.label}</span>
              <strong className="my-1.5 block text-3xl tracking-tight">
                {m.nilai}
              </strong>
              <small className="text-[10px] text-muted">{m.tag}</small>
            </div>
          ))}
        </div>

        <div className="panel p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="eyebrow eyebrow-muted mb-2">Daftar siswa</p>
              <h2 className="text-xl tracking-tight">
                Aktivitas latihan terbaru.
              </h2>
            </div>
            <select
              className="select-field w-36 border border-[#bfc3b7] bg-paper px-3 py-2 text-[11px]"
              defaultValue="Semua status"
            >
              <option>Semua status</option>
              <option>Sudah selesai</option>
              <option>Belum selesai</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left text-[11px]">
              <thead>
                <tr className="text-[10px] text-muted">
                  <th className="px-4 py-3 font-medium">Nama siswa</th>
                  <th className="px-4 py-3 font-medium">Bab terakhir</th>
                  <th className="px-4 py-3 font-medium">Nilai</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Terakhir aktif</th>
                </tr>
              </thead>
              <tbody>
                {daftarSiswa.map((siswa) => (
                  <tr key={siswa.id} className="border-t border-line">
                    <td className="px-4 py-3.5">
                      <strong className="text-xs">{siswa.nama}</strong>
                    </td>
                    <td className="px-4 py-3.5">{siswa.bab_terakhir}</td>
                    <td className="px-4 py-3.5">
                      {siswa.nilai === null ? "—" : siswa.nilai}
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={siswa.status} />
                    </td>
                    <td className="px-4 py-3.5 text-muted">
                      {siswa.terakhir_aktif}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Link href="/guru/dashboard" className="mt-6 inline-block text-[11px] text-muted hover:underline">
          ← Kembali ke dashboard
        </Link>
      </main>
      <FooterSimple />
    </>
  );
}