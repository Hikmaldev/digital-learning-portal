import type { Metadata } from "next";
import Link from "next/link";
import { FooterSimple } from "@/components/footer-simple";
import { TopBar } from "@/components/top-bar";
import { StatusBadge } from "@/components/ui";
import { peringatanBahasaUmum, peringatanKunci } from "@/lib/data";
import { getBabList, getGambarBab, getKelasAktifDb, getKelasByKode } from "@/lib/queries";
import type { Bab } from "@/lib/types";
import { demoMode } from "@/lib/runtime";

export const metadata: Metadata = { title: "Materi Bab" };

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ id?: string; kode?: string; nama?: string }>;
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

function labelGambar(url: string): string {
  if (url.includes("Miki_Sakurai")) return "Ilustrasi kegiatan bercerita kepada anak-anak";
  if (url.includes("Hand_washing_with_soap")) return "Foto langkah mencuci tangan dengan sabun";
  if (url.includes("Icelandic_volcano_eruption")) return "Foto letusan gunung berapi untuk menjelaskan fenomena alam";
  if (url.includes("Writing_a_letter")) return "Foto kegiatan menulis surat dengan pena";
  if (url.includes("Balance_scale")) return "Ilustrasi timbangan untuk memahami persamaan yang setara";
  if (url.includes("Basic_triangle")) return "Ilustrasi segitiga dasar";
  if (url.includes("Boy_playing_with_ball")) return "Foto anak bermain bola sebagai contoh kegiatan waktu luang";
  if (url.includes("Two_directions_sign")) return "Foto papan petunjuk arah";
  if (url.includes("Matrix_%28maths%29")) return "Contoh susunan matriks dalam matematika";
  if (url.includes("Two_red_dice")) return "Ilustrasi dua dadu untuk mempelajari peluang";
  if (url.includes("Sri_Harjanto_Sahid")) return "Foto pembacaan puisi oleh penyair Indonesia";
  if (url.includes("Man_writing_on_paper")) return "Foto kegiatan menulis untuk karya ilmiah";
  if (url.includes("Cooking_Delicious_Food")) return "Foto kegiatan memasak sebagai konteks procedure text";
  if (url.includes("Dylan_Marron")) return "Foto seseorang sedang menyampaikan presentasi";
  if (url.includes("Cybersecurity")) return "Ilustrasi gembok dan keamanan digital";
  if (url.includes("Analytics_2016")) return "Foto layar laptop dengan visualisasi data";
  if (url.includes("Geometry_Shapes")) return "Ilustrasi berbagai bangun datar dan bangun ruang";
  if (url.includes("Metric_clock")) return "Contoh jam untuk mempelajari satuan waktu";
  if (url.includes("Ruler_and_coin")) return "Contoh alat ukur panjang dan uang";
  if (url.includes("FourMetricInstruments")) return "Contoh alat ukur dan satuan metrik";
  return "Gambar materi pembelajaran";
}

function kreditGambar(url: string): { nama: string; lisensi: string; href: string } | null {
  if (url.includes("Miki_Sakurai")) {
    return {
      nama: "Miki Sakurai",
      lisensi: "CC0",
      href: "https://commons.wikimedia.org/wiki/File:Miki_Sakurai_telling_story_for_children.jpg",
    };
  }
  if (url.includes("Hand_washing_with_soap")) {
    return {
      nama: "Justmee3001",
      lisensi: "CC BY-SA 4.0",
      href: "https://commons.wikimedia.org/wiki/File:Hand_washing_with_soap.jpg",
    };
  }
  if (url.includes("Icelandic_volcano_eruption")) {
    return {
      nama: "Yuo7si",
      lisensi: "CC BY 4.0",
      href: "https://commons.wikimedia.org/wiki/File:Icelandic_volcano_eruption.jpg",
    };
  }
  if (url.includes("Writing_a_letter")) {
    return {
      nama: "Petar Milošević",
      lisensi: "CC BY-SA 3.0",
      href: "https://commons.wikimedia.org/wiki/File:Writing_a_letter.jpg",
    };
  }
  if (url.includes("Balance_scale")) {
    return {
      nama: "Phlsph7",
      lisensi: "CC0",
      href: "https://commons.wikimedia.org/wiki/File:Balance_scale.svg",
    };
  }
  if (url.includes("Basic_triangle")) {
    return {
      nama: "Douglas Paul Perkins",
      lisensi: "CC0",
      href: "https://commons.wikimedia.org/wiki/File:Basic_triangle.svg",
    };
  }
  if (url.includes("Boy_playing_with_ball")) {
    return {
      nama: "Shixart1985",
      lisensi: "CC BY 2.0",
      href: "https://commons.wikimedia.org/wiki/File:Boy_playing_with_ball_in_the_backyard.jpg",
    };
  }
  if (url.includes("Two_directions_sign")) {
    return {
      nama: "Pablo Garcia Saldaña",
      lisensi: "CC0",
      href: "https://commons.wikimedia.org/wiki/File:Two_directions_sign_(Unsplash).jpg",
    };
  }
  if (url.includes("Matrix_%28maths%29")) {
    return {
      nama: "User:Genesis",
      lisensi: "CC BY-SA 3.0",
      href: "https://commons.wikimedia.org/wiki/File:Matrix_(maths),_revised.png",
    };
  }
  if (url.includes("Two_red_dice")) {
    return {
      nama: "Stephen Silver",
      lisensi: "CC0",
      href: "https://commons.wikimedia.org/wiki/File:Two_red_dice_01.svg",
    };
  }
  if (url.includes("Sri_Harjanto_Sahid")) {
    return {
      nama: "Crisco 1492",
      lisensi: "CC BY-SA 4.0",
      href: "https://commons.wikimedia.org/wiki/File:Sri_Harjanto_Sahid_reading_a_poem,_2015-08-22_02.jpg",
    };
  }
  if (url.includes("Man_writing_on_paper")) {
    return {
      nama: "Olu Eletu",
      lisensi: "CC0",
      href: "https://commons.wikimedia.org/wiki/File:Man_writing_on_paper_(Unsplash).jpg",
    };
  }
  if (url.includes("Cooking_Delicious_Food")) {
    return {
      nama: "Mona Hassan Abo-Abda",
      lisensi: "CC BY-SA 4.0",
      href: "https://commons.wikimedia.org/wiki/File:Cooking_Delicious_Food.jpg",
    };
  }
  if (url.includes("Dylan_Marron")) {
    return {
      nama: "Indy beetle",
      lisensi: "CC0",
      href: "https://commons.wikimedia.org/wiki/File:Dylan_Marron_delivering_presentation_at_NC_State_University.jpg",
    };
  }
  if (url.includes("Cybersecurity")) {
    return {
      nama: "jaydeep_",
      lisensi: "CC0",
      href: "https://commons.wikimedia.org/wiki/File:Cybersecurity.png",
    };
  }
  if (url.includes("Analytics_2016")) {
    return {
      nama: "Lalmch dari Pixabay",
      lisensi: "CC0",
      href: "https://commons.wikimedia.org/wiki/File:Analytics_2016-02-26_at_10.19.24_AM.jpg",
    };
  }
  if (url.includes("Geometry_Shapes")) {
    return {
      nama: "C b grenouille",
      lisensi: "CC0",
      href: "https://commons.wikimedia.org/wiki/File:Geometry_Shapes_and_Solids.svg",
    };
  }
  if (url.includes("Metric_clock")) {
    return {
      nama: "Jpeterson101",
      lisensi: "CC0",
      href: "https://commons.wikimedia.org/wiki/File:Metric_clock.JPG",
    };
  }
  if (url.includes("Ruler_and_coin")) {
    return {
      nama: "Tomchen1989",
      lisensi: "CC BY-SA 4.0",
      href: "https://commons.wikimedia.org/wiki/File:Ruler_and_coin.svg",
    };
  }
  if (url.includes("FourMetricInstruments")) {
    return {
      nama: "Martinvl",
      lisensi: "CC BY-SA 3.0",
      href: "https://commons.wikimedia.org/wiki/File:FourMetricInstruments.JPG",
    };
  }
  return null;
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
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[11px] underline hover:text-coral"
          >
            Buka pilihan video pembelajaran di YouTube ↗
          </a>
        ) : (
          <small className="block text-[10px] text-[#ced9d1]">
            Video pembelajaran · Disarankan ditonton saat di kelas
          </small>
        )}
      </div>
    </div>
  );
}

function BelumMasukKelas() {
  return (
    <>
      <TopBar
        nav={[]}
        aksi={{ href: "/siswa/masuk", label: "Masuk ke kelas" }}
      />
      <main className="mx-auto max-w-[780px] px-5 py-20 text-center">
        <div className="mx-auto mb-5 grid size-[66px] place-items-center rounded-full bg-soft text-3xl">
          🔑
        </div>
        <p className="eyebrow eyebrow-muted mb-2">Materi bab</p>
        <h1 className="text-[38px] leading-none tracking-[-2px]">
          Masuk ke <em className="font-display text-coral">kelas dulu.</em>
        </h1>
        <p className="mt-3 text-[13px] text-muted">
          Masukkan kode kelas dari gurumu untuk membuka materi.
        </p>
      </main>
      <FooterSimple />
    </>
  );
}

export default async function BabMateriPage({ searchParams }: Props) {
  const params = await searchParams;
  const kelas = params.kode
    ? await getKelasByKode(params.kode)
    : demoMode
      ? await getKelasAktifDb()
      : null;
  if (!kelas) return <BelumMasukKelas />;
  const kodeKelas = kelas.kode_akses;
  const namaSiswa = params.nama?.trim() || undefined;
  const namaParam = namaSiswa ? `&nama=${encodeURIComponent(namaSiswa)}` : "";
  const babList = await getBabList(kelas.id, namaSiswa);
  if (babList.length === 0) {
    return (
      <>
        <TopBar
          nav={[
            { href: "/siswa/kelas", label: "Kelas saya" },
            { href: `/siswa/materi?kode=${kodeKelas}${namaParam}`, label: "Materi", aktif: true },
            { href: `/siswa/latihan?kode=${kodeKelas}`, label: "Latihan" },
          ]}
          aksi={{ href: "/siswa/kelas", label: "Kembali ke kelas" }}
        />
        <main className="mx-auto max-w-[780px] px-5 py-20 text-center">
          <div className="mx-auto mb-5 grid size-[66px] place-items-center rounded-full bg-soft text-3xl">
            📚
          </div>
          <p className="eyebrow eyebrow-muted mb-2">Materi bab</p>
          <h1 className="text-[38px] leading-none tracking-[-2px]">
            Materi belum{" "}
            <em className="font-display text-coral">tersedia.</em>
          </h1>
          <p className="mt-3 text-[13px] text-muted">
            Guru di kelas {kelas.nama_kelas} belum menambahkan materi. Cek lagi
            nanti ya.
          </p>
        </main>
        <FooterSimple />
      </>
    );
  }

  // Tanpa ?id= tampilkan bab pertama (sesuai urutan daftar di sidebar).
  const target: Bab = babList.find((b) => b.id === params.id) ?? babList[0];
  const gambarBab = await getGambarBab(target.id);

  const paragraf = target.konten_materi
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const showCallout =
    target.id === BAB_DEMO ||
    target.mata_pelajaran?.toUpperCase().includes("BAHASA INDONESIA");
  const peringatanMateri =
    target.id === BAB_DEMO || /gagasan/i.test(target.judul)
      ? peringatanKunci
      : peringatanBahasaUmum;
  // Nomor bab dihitung di dalam mapelnya (bukan nomor global kelas).
  const kelompokMapel: Array<{ mapel: string; daftar: Array<{ bab: Bab; no: number }> }> = [];
  for (const bab of babList) {
    const terakhir = kelompokMapel[kelompokMapel.length - 1];
    if (terakhir?.mapel === bab.mata_pelajaran) {
      terakhir.daftar.push({ bab, no: terakhir.daftar.length + 1 });
    } else {
      kelompokMapel.push({ mapel: bab.mata_pelajaran, daftar: [{ bab, no: 1 }] });
    }
  }
  const noTarget =
    kelompokMapel
      .find((k) => k.mapel === target.mata_pelajaran)
      ?.daftar.find((x) => x.bab.id === target.id)?.no ?? target.urutan ?? 0;
  const labelBab = `Bab ${String(noTarget).padStart(2, "0")}`;

  return (
    <>
      <TopBar
        nav={[
          { href: "/siswa/kelas", label: "Kelas saya" },
          { href: `/siswa/materi?id=${encodeURIComponent(target.id)}&kode=${kodeKelas}${namaParam}`, label: "Materi", aktif: true },
          { href: `/siswa/latihan?kode=${kodeKelas}`, label: "Latihan" },
        ]}
        aksi={{ href: "/siswa/kelas", label: "Kembali ke kelas" }}
      />
      <main className="mx-auto max-w-[1180px] px-5 py-12 md:px-10">
        <nav
          aria-label="Jejak rute"
          className="mb-7 flex items-center gap-2.5 text-[11px] text-muted"
        >
          <Link className="hover:underline" href="/siswa/kelas">
            {kelas.nama_kelas}
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
                  <p className="m-0 text-xs text-[#58695a]">{peringatanMateri}</p>
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

            {gambarBab.length > 0 && (
              <section className="mt-7 flex flex-col gap-5">
                {gambarBab.map((g) => {
                  const kredit = kreditGambar(g.url);
                  return (
                    <figure key={g.id} className="border border-line">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={g.url}
                        alt={labelGambar(g.url)}
                        className="w-full"
                        loading="lazy"
                      />
                      {kredit && (
                        <figcaption className="border-t border-line px-3 py-2 text-[10px] text-muted">
                          Sumber ilustrasi: {" "}
                          <a
                            href={kredit.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-coral"
                          >
                            {kredit.nama}
                          </a>{" "}
                          ({kredit.lisensi}) · Wikimedia Commons
                        </figcaption>
                      )}
                    </figure>
                  );
                })}
              </section>
            )}
          </article>

          <aside className="flex flex-col gap-4">
            <div className="panel p-5">
              <h3 className="mb-4 text-base tracking-tight">
                Materi per mapel
              </h3>
              <nav>
                {kelompokMapel.map((kel) => (
                  <div key={kel.mapel} className="mt-5 first:mt-0">
                    <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.13em] text-muted">
                      {kel.mapel}
                    </p>
                    {kel.daftar.map(({ bab, no }) => (
                      <Link
                        key={bab.id}
                        href={`/siswa/materi?id=${bab.id}&kode=${kodeKelas}${namaParam}`}
                        className={`flex items-start gap-2.5 border-t border-line py-3 text-[11px] ${
                          bab.id === target.id ? "font-bold text-coral" : "text-ink"
                        }`}
                      >
                        <span className="font-normal text-muted">
                          {String(no).padStart(2, "0")}
                        </span>
                        {bab.judul}
                      </Link>
                    ))}
                  </div>
                ))}
              </nav>
            </div>
            <div className="panel p-5">
              <h3 className="mb-2 text-base tracking-tight">
                Sudah selesai membaca?
              </h3>
              {target.jumlah_latihan > 0 ? (
                <>
                  <p className="mb-4 text-[11px] text-muted">
                    Uji pemahamanmu lewat {target.jumlah_latihan} latihan soal
                    bab ini.
                  </p>
                  <Link
                    href={`/siswa/latihan?kode=${encodeURIComponent(kodeKelas)}&babId=${encodeURIComponent(target.id)}${namaParam}`}
                    className="btn btn-coral w-full"
                  >
                    Mulai latihan <span className="pl-1 text-base">→</span>
                  </Link>
                </>
              ) : (
                <p className="text-[11px] leading-relaxed text-muted">
                  Latihan untuk bab ini belum disiapkan guru. Cek bab lain yang
                  sudah punya latihan.
                </p>
              )}
            </div>
          </aside>
        </div>
      </main>
      <FooterSimple />
    </>
  );
}