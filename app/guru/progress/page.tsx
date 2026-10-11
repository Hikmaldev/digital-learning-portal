import type { Metadata } from "next";
import Link from "next/link";
import { FooterSimple } from "@/components/footer-simple";
import { TopBar } from "@/components/top-bar";
import { StatusBadge } from "@/components/ui";
import {
  getAktivitasKelas,
  getKelasAktifDb,
  getKelasByKode,
  getKelasList,
  getRingkasanKelas,
} from "@/lib/queries";
import { demoMode } from "@/lib/runtime";
import { getGuruSession } from "@/lib/authorization";

export const metadata: Metadata = { title: "Progress Siswa" };

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ kode?: string }>;
}

export default async function DashboardProgressPage({ searchParams }: Props) {
  const params = await searchParams;
  const guru = await getGuruSession();
  let kelas = params.kode
    ? await getKelasByKode(params.kode, guru?.guruId)
    : null;
  if (!kelas && guru) {
    const daftarKelas = await getKelasList(guru.guruId);
    if (daftarKelas.length > 0) {
      kelas = await getKelasByKode(daftarKelas[0].kode, guru.guruId);
    }
  }
  if (!kelas && demoMode) kelas = await getKelasAktifDb();
  if (!kelas) {
    return (
      <>
        <TopBar nav={[{ href: "/guru/dashboard", label: "Dashboard" }]} aksi={{ href: "/guru/dashboard", label: "Kembali" }} />
        <main className="mx-auto max-w-[780px] px-5 py-20 text-center">
          <h1 className="text-[38px] leading-none tracking-[-2px]">Belum ada <em className="font-display text-coral">kelas.</em></h1>
          <p className="mt-3 text-[13px] text-muted">Buat kelas terlebih dahulu untuk melihat progress siswa.</p>
        </main>
        <FooterSimple />
      </>
    );
  }
  const daftarSiswa = await getRingkasanKelas(kelas.id);
  const aktivitas = await getAktivitasKelas(kelas.id);
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
          { href: "/guru/feedback", label: "Masukan siswa" },
          { href: "/guru/akun", label: "Akun" },
        ]}
        aksi={{ href: "/", label: "Keluar" }}
      />
      <main className="mx-auto max-w-[1180px] px-5 py-12 md:px-10">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="eyebrow eyebrow-muted mb-2.5">
              {kelas.nama_kelas} · {kelas.jenjang}
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
            { label: "Sudah mengerjakan semua", nilai: selesai, tag: `${selesai} dari ${daftarSiswa.length} siswa`, naik: true },
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
              <p className="eyebrow eyebrow-muted mb-2">Daftar aktivitas</p>
              <h2 className="text-xl tracking-tight">
                Aktivitas latihan terbaru.
              </h2>
            </div>
            <p className="mb-1 text-[11px] text-muted">
              {aktivitas.length} aktivitas terbaru
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left text-[11px]">
              <thead>
                <tr className="text-[10px] text-muted">
                  <th className="px-4 py-3 font-medium">Nama siswa</th>
                  <th className="px-4 py-3 font-medium">Bab</th>
                  <th className="px-4 py-3 font-medium">Nilai</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Waktu</th>
                </tr>
              </thead>
              <tbody>
                {aktivitas.map((a) => (
                  <tr key={a.id} className="border-t border-line">
                    <td className="px-4 py-3.5">
                      <strong className="text-xs">{a.nama_siswa}</strong>
                    </td>
                    <td className="px-4 py-3.5">
                      {a.mata_pelajaran} · {a.judul}
                    </td>
                    <td className="px-4 py-3.5">{a.nilai}</td>
                    <td className="px-4 py-3.5">
                      <StatusBadge
                        status={a.selesai ? "SUDAH_MENGERJAKAN" : "SEDANG_BERJALAN"}
                      />
                    </td>
                    <td className="px-4 py-3.5 text-muted">{a.waktu}</td>
                  </tr>
                ))}
                {aktivitas.length === 0 && (
                  <tr className="border-t border-line">
                    <td colSpan={5} className="px-4 py-6 text-center text-muted">
                      Belum ada aktivitas latihan. Aktivitas muncul setelah
                      siswa mengirim jawaban latihan.
                    </td>
                  </tr>
                )}
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