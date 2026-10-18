import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FooterSimple } from "@/components/footer-simple";
import { TopBar } from "@/components/top-bar";
import { TandaiDibaca } from "@/components/guru/tandai-dibaca";
import { getFeedbackList } from "@/lib/queries";
import { getGuruSession } from "@/lib/authorization";

export const metadata: Metadata = { title: "Masukan Siswa" };

export const dynamic = "force-dynamic";

const LABEL_KATEGORI: Record<string, string> = {
  SARAN: "Saran perbaikan",
  BUG: "Masalah / bug",
  PUJIAN: "Pujian",
  LAINNYA: "Lainnya",
};

const WARNA_KATEGORI: Record<string, string> = {
  SARAN: "bg-[#e2ead8] text-[#536b55]",
  BUG: "bg-[#fbe7de] text-[#8a3a24]",
  PUJIAN: "bg-[#f9efc9] text-[#73633a]",
  LAINNYA: "bg-soft text-muted",
};

export default async function FeedbackGuruPage() {
  const guru = await getGuruSession();
  if (!guru) redirect("/guru/masuk");

  const daftar = await getFeedbackList(guru.guruId);
  const belumDibaca = daftar.filter((f) => !f.dibaca).length;

  return (
    <>
      <TopBar
        nav={[
          { href: "/guru/dashboard", label: "Dashboard" },
          { href: "/guru/progress", label: "Progress siswa" },
          { href: "/guru/feedback", label: "Masukan siswa", aktif: true },
        ]}
        aksi={{ href: "/", label: "Keluar", keluar: true }}
      />
      <main className="mx-auto max-w-[900px] px-5 py-12 md:px-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="eyebrow eyebrow-muted mb-2.5">Ruang kerja guru</p>
            <h1 className="text-[38px] leading-none tracking-[-2px]">
              Masukan <em className="font-display text-coral">siswa.</em>
            </h1>
            <p className="mt-2.5 text-[13px] text-muted">
              {daftar.length} masukan · {belumDibaca} belum dibaca. Masukan
              dikirim siswa dari halaman kelas mereka.
            </p>
          </div>
          <TandaiDibaca jumlahBelum={belumDibaca} />
        </div>

        {daftar.length === 0 && (
          <div className="panel p-10 text-center">
            <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-soft text-2xl">
              💬
            </div>
            <h2 className="text-xl tracking-tight">Belum ada masukan.</h2>
            <p className="mx-auto mt-2 max-w-[420px] text-[12px] leading-relaxed text-muted">
              Siswa bisa mengirim saran, laporan masalah, atau pujian dari
              tombol “Ada kendala atau saran?” di halaman kelas mereka.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {daftar.map((f) => (
            <article
              key={f.id}
              className={`panel p-5 md:p-6 ${!f.dibaca ? "border-l-4 border-l-coral" : ""}`}
            >
              <div className="mb-3 flex flex-wrap items-center gap-2.5">
                <span
                  className={`inline-flex px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${WARNA_KATEGORI[f.kategori] ?? WARNA_KATEGORI.LAINNYA}`}
                >
                  {LABEL_KATEGORI[f.kategori] ?? f.kategori}
                </span>
                {!f.dibaca && (
                  <span className="text-[10px] font-bold text-coral">
                    ● Baru
                  </span>
                )}
                <span className="ml-auto text-[10px] text-muted">
                  {f.waktu}
                </span>
              </div>
              <p className="m-0 whitespace-pre-wrap text-[13px] leading-relaxed">
                {f.pesan}
              </p>
              <p className="m-0 mt-4 border-t border-line pt-3 text-[11px] text-muted">
                <strong className="text-ink">
                  {f.nama_siswa ?? "Siswa tanpa nama"}
                </strong>
                {f.kelas_nama && (
                  <>
                    {" · "}
                    {f.kelas_nama} (kode {f.kelas_kode})
                  </>
                )}
                {f.kontak && (
                  <>
                    {" · kontak: "}
                    {f.kontak}
                  </>
                )}
              </p>
            </article>
          ))}
        </div>

        {daftar.length > 0 && (
          <Link
            href="/guru/dashboard"
            className="mt-6 inline-block text-[11px] text-muted hover:underline"
          >
            ← Kembali ke dashboard
          </Link>
        )}
      </main>
      <FooterSimple />
    </>
  );
}
