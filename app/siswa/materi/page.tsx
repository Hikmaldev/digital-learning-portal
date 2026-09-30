import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FooterSimple } from "@/components/footer-simple";
import { TopBar } from "@/components/top-bar";
import { StatusBadge } from "@/components/ui";
import { peringatanKunci } from "@/lib/data";
import { getBabLatihan, getBabList, getKelasAktifDb } from "@/lib/queries";
import type { Bab } from "@/lib/types";

export const metadata: Metadata = { title: "Materi Bab" };

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ id?: string; kode?: string }>;
}

const BAB_DEMO = "bab-bindo-3";

/** Ubah berbagai format link YouTube menjadi ID untuk embed. */
function idVideo(url: string): string | null {
  const bersih = url.trim();
  const match =
    bersih.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/) ??
    bersih.match(/^[\w-]{11}$/);
  return match ? match[1] : null;
}

function VideoMateri({ url }: { url?: string }) {
  const id = url ? idVideo(url) : null;
  if (id) {
    return (
      <div className="mt-6 overflow-hidden border border-line bg-ink">
        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube.com/embed/${id}`}
          title="Video pembelajaran"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <div className="mt-6 grid aspect-video place-items-center bg-[#334b45] text-center text-paper">
      <div>
        <div className="mx-auto mb-2.5 grid size-12 place-items-center rounded-full bg-coral text-lg">
          ▶
        </div>
        <small className="block text-[10px] text-[#ced9d1]">
          Video pembelajaran · Disarankan ditonton saat di kelas
        </small>
      </div>
    </div>
  );
}

export default async function BabMateriPage({ searchParams }: Props) {
  const params = await searchParams;
  const [kelas, infoBab] = await Promise.all([getKelasAktifDb(), getBabLatihan()]);
  const babList = await getBabList(kelas.id);
  if (babList.length === 0) notFound();

  const target: Bab =
    babList.find((b) => b.id === params.id) ??
    babList.find((b) => b.id === infoBab.babId) ??
    babList[0];

  const paragraf = target.konten_materi
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const showCallout =
    target.id === BAB_DEMO ||
    target.mata_pelajaran?.toUpperCase().includes("BAHASA INDONESIA");
  const labelBab = `Bab ${String(target.urutan ?? 0).padStart(2, "0")}`;

  return (
    <>
      <TopBar
        nav={[
          { href: "/siswa/kelas", label: "Kelas saya" },
          { href: "/siswa/materi", label: "Materi", aktif: true },
          { href: "/siswa/latihan", label: "Latihan" },
        ]}
        aksi={{ href: "/siswa/kelas", label: "Kembali ke kelas" }}
      />
      <main className="mx-auto max-w-[1180px] px-5 py-12 md:px-10">
        <nav
          aria-label="Jejak rute"
          className="mb-7 flex items-center gap-2.5 text-[11px] text-muted"
        >
          <Link className="hover:underline" href="/siswa/kelas">
            Kelas Harapan Bersama
          </Link>
          <span className="text-[#a3aaa1]">/</span>
          <span>{target.mata_pelajaran}</span>
          <span className="text-[#a3aaa1]">/</span>
          <span>{labelBab}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="border border-line bg-paper px-6 py-9 md:px-10">
            <div className="mb-5 flex flex-wrap items-center gap-2.5 text-[10px] text-muted">
              <span>{target.mata_pelajaran}</span>
              <span>•</span>
              <span>{labelBab}</span>
              <StatusBadge status={target.status} />
            </div>
            <h1 className="mb-4 text-[42px] leading-tight tracking-[-2px]">
              {target.judul}
            </h1>
            {target.ringkasan && (
              <p className="border-b border-line pb-6 text-[15px] leading-[1.7] text-muted">
                {target.ringkasan}
              </p>
            )}

            <div className="text-sm leading-[1.85]">
              {paragraf.length > 0 ? (
                <>
                  <p className="mb-4">{paragraf[0]}</p>
                  {paragraf.slice(1).map((p, i) => (
                    <p key={i} className="mb-4">
                      {p}
                    </p>
                  ))}
                </>
              ) : (
                <p className="mb-4">
                  Materi lengkap bab ini akan segera tersedia. Guru sedang
                  menyusun kontennya.
                </p>
              )}
              {showCallout && (
                <div className="my-6 ml-0 border-l-4 border-leafgreen bg-[#e3ead8] px-5 py-4">
                  <strong className="block text-xs">Ingat baik-baik</strong>
                  <p className="m-0 text-xs text-[#58695a]">{peringatanKunci}</p>
                </div>
              )}
            </div>

            <VideoMateri url={target.url_video} />

            {target.link_sumber && (
              <a
                href={target.link_sumber}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-5 text-[11px] hover:text-coral"
              >
                <span>Bacaan tambahan dari buku resmi</span>
                <span className="text-base text-coral">↗</span>
              </a>
            )}
          </article>

          <aside className="flex flex-col gap-4">
            <div className="panel p-5">
              <h3 className="mb-4 text-base tracking-tight">
                Bab di kelas ini
              </h3>
              <nav>
                {babList.map((bab) => (
                  <Link
                    key={bab.id}
                    href={`/siswa/materi?id=${bab.id}`}
                    className={`flex items-start gap-2.5 border-t border-line py-3 text-[11px] ${
                      bab.id === target.id ? "font-bold text-coral" : "text-ink"
                    }`}
                  >
                    <span className="font-normal text-muted">
                      {String(bab.urutan ?? 0).padStart(2, "0")}
                    </span>
                    {bab.judul}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="panel p-5">
              <h3 className="mb-2 text-base tracking-tight">
                Sudah selesai membaca?
              </h3>
              <p className="mb-4 text-[11px] text-muted">
                Uji pemahamanmu lewat latihan soal bab ini.
              </p>
              <Link href="/siswa/latihan" className="btn btn-coral w-full">
                Mulai latihan <span className="pl-1 text-base">→</span>
              </Link>
            </div>
          </aside>
        </div>
      </main>
      <FooterSimple />
    </>
  );
}