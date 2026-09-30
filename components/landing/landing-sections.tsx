import Link from "next/link";
import { Brand, BrandMark } from "../brand";
import { ClassEntryForm } from "./class-entry-form";

/** Header halaman utama: navigasi anchor + masuk guru. */
export function LandingHeader() {
  return (
    <header className="flex h-[82px] items-center justify-between border-b border-ink/10 bg-cream px-[5vw] lg:px-[6.5vw]">
      <Brand />
      <nav className="ml-24 hidden items-center gap-8 text-[13px] text-[#68736c] md:flex">
        <Link href="#masuk" className="font-bold text-ink">
          Untuk siswa
        </Link>
        <Link href="#fitur" className="hover:text-ink">
          Cara belajar
        </Link>
        <Link href="/guru/masuk" className="hover:text-ink">
          Untuk guru
        </Link>
      </nav>
      <Link href="/guru/masuk" className="text-[13px] font-bold hover:text-coral">
        Masuk sebagai guru <span className="pl-1.5 text-base text-coral">↗</span>
      </Link>
    </header>
  );
}

/** Bagian hero: ajakan masuk kelas + kartu progres contoh. */
export function Hero() {
  return (
    <section
      id="masuk"
      className="grid min-h-[605px] grid-cols-1 gap-16 overflow-hidden px-[7vw] py-[68px] md:grid-cols-[0.91fr_1.09fr] md:px-[10vw]"
    >
      <div className="max-w-[490px] pt-6">
        <p className="eyebrow mb-5 flex items-center gap-2.5">
          <span className="inline-block size-1.5 rounded-full bg-coral" />
          Belajar tanpa buku tebal
        </p>
        <h1 className="mb-6 text-5xl leading-[0.99] tracking-[-2.5px] md:text-[71px]">
          Pelajaranmu,
          <br />
          <em className="font-display text-coral">lebih dekat.</em>
        </h1>
        <p className="mb-9 max-w-[385px] leading-[1.65] text-muted">
          Materi ringkas, latihan soal, dan progres belajar dalam satu ruang
          yang ringan untuk HP-mu.
        </p>
        <ClassEntryForm />
      </div>

      <div className="relative hidden min-h-[410px] md:block" aria-label="Ringkasan aktivitas belajar">
        <div className="absolute right-[7%] top-1 size-[352px] rounded-full bg-yellow opacity-90" />
        <p className="absolute left-[11%] top-0 text-[10px] uppercase tracking-[1.2px] text-[#7e857c]">
          ruang belajar / hari ini
        </p>
        <div className="absolute left-[14%] top-14 w-[375px] border border-ink/10 bg-paper p-6 shadow-[10px_13px_0_rgba(37,55,51,0.11)]">
          <div className="flex items-start justify-between border-b border-line pb-4">
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.7px] text-muted">
                Sedang dipelajari
              </p>
              <h2 className="m-0 text-[21px] tracking-tight">
                Bahasa Indonesia
              </h2>
            </div>
            <span className="grid size-10 place-items-center rounded-full bg-blue text-xs font-bold">
              BI
            </span>
          </div>
          <div className="flex items-end justify-between py-4">
            <span className="text-[10px] font-bold tracking-[1px] text-coral">
              BAB 03
            </span>
            <strong className="text-[15px] leading-snug">
              Menemukan gagasan
              <br />
              utama dalam teks
            </strong>
          </div>
          <div className="mb-1.5 flex justify-between text-[10px] text-muted">
            <span>Progres bab</span>
            <b className="text-ink">68%</b>
          </div>
          <div className="h-[5px] w-full overflow-hidden bg-[#e6e4da]">
            <div className="h-full w-[68%] bg-coral" />
          </div>
          <div className="mt-5 flex items-center justify-between text-[10px] text-muted">
            <span>12 menit tersisa</span>
            <Link href="/siswa" className="font-bold text-coral">
              Lanjutkan <span className="pl-1 text-[15px]">→</span>
            </Link>
          </div>
        </div>
        <div className="absolute -left-1 bottom-11 min-w-[145px] -rotate-3 border border-ink/10 bg-[#fbf4d6] px-3.5 pb-3 pl-9 pt-3 shadow-[5px_6px_0_rgba(37,55,51,0.08)]">
          <span className="absolute left-3.5 top-4 text-sm text-coral">●</span>
          <b className="text-[11px]">Latihan selesai!</b>
          <small className="mt-0.5 block text-[9px] text-muted">
            Matematika · Bab 02
          </small>
        </div>
        <div className="absolute right-0 top-[279px] min-w-[145px] rotate-4 border border-ink/10 bg-[#e3e9d7] px-3.5 pb-3 pl-9 pt-3 shadow-[5px_6px_0_rgba(37,55,51,0.08)]">
          <span className="absolute left-3.5 top-4 grid size-[17px] place-items-center rounded-full bg-ink text-[11px] text-paper">
            ✓
          </span>
          <b className="text-[11px]">2 materi baru</b>
          <small className="mt-0.5 block text-[9px] text-muted">
            tersedia di kelasmu
          </small>
        </div>
        <p className="absolute bottom-0 right-[3%] whitespace-nowrap text-[10px] uppercase tracking-[1.2px] text-[#a3a69b]">
          belajar sedikit, konsisten
        </p>
      </div>
    </section>
  );
}

/** Tiga alasan utama portal. */
export function QuickBenefits() {
  const items = [
    {
      icon: "▤",
      bg: "bg-yellow",
      judul: "Materi ringkas",
      teks: "Fokus pada hal penting, mudah dibaca dari HP.",
    },
    {
      icon: "✎",
      bg: "bg-blue",
      judul: "Latihan langsung",
      teks: "Kerjakan dan lihat hasilnya tanpa menunggu.",
    },
    {
      icon: "↗",
      bg: "bg-sage",
      judul: "Progres terlihat",
      teks: "Tahu langkah belajarmu berikutnya.",
    },
  ];
  return (
    <section
      id="fitur"
      aria-label="Keunggulan portal"
      className="grid grid-cols-1 gap-6 border-y border-[#d8d6c9] bg-[#e8e6da] px-[7vw] py-7 md:grid-cols-3 md:gap-9 md:px-[10vw]"
    >
      {items.map((item) => (
        <div key={item.judul} className="flex items-center gap-4">
          <span
            className={`grid size-10 flex-shrink-0 place-items-center text-[22px] font-bold ${item.bg}`}
          >
            {item.icon}
          </span>
          <div>
            <strong className="text-xs">{item.judul}</strong>
            <p className="m-0 text-[11px] text-muted">{item.teks}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

/** Ringkasan kelas contoh beserta daftar mata pelajaran. */
export function ActiveClassSection() {
  const pelajaran = [
    { singkatan: "MTK", nama: "Matematika", info: "4 bab · 18 latihan", progres: 86, warna: "bg-[#f4d985]" },
    { singkatan: "BIN", nama: "Bahasa Indonesia", info: "3 bab · 12 latihan", progres: 68, warna: "bg-[#edb6a7]" },
    { singkatan: "IPA", nama: "Ilmu Pengetahuan Alam", info: "5 bab · 20 latihan", progres: 45, warna: "bg-blue" },
    { singkatan: "IPS", nama: "Ilmu Pengetahuan Sosial", info: "3 bab · 10 latihan", progres: 22, warna: "bg-sage" },
  ];
  return (
    <section id="kelas-aktif" className="px-[7vw] py-24 md:px-[10vw]">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="eyebrow eyebrow-muted mb-5">Contoh ruang kelas</p>
          <h2 className="max-w-[430px] text-[43px] leading-none tracking-[-2px]">
            Satu kelas, banyak
            <br />
            <em className="font-display text-coral">kemungkinan.</em>
          </h2>
        </div>
        <p className="mb-1 ml-5 hidden max-w-[282px] text-[13px] leading-[1.7] text-muted md:block">
          Setelah masuk dengan kode kelas dari gurumu, semua materi dan latihan
          ada di sini.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.74fr_1.26fr] lg:gap-14">
        <article className="flex min-h-[284px] flex-col bg-ink p-6 text-paper md:p-7">
          <div className="flex items-center justify-between">
            <span className="bg-coral px-2 py-1 text-[9px] font-bold tracking-[1px]">
              PAKET B
            </span>
            <span className="text-sm tracking-[2px] text-[#9eaaa2]">•••</span>
          </div>
          <h3 className="mb-1 mt-7 text-[23px] leading-[1.18] tracking-tight">
            Kelas Kesetaraan
            <br />
            Harapan Bersama
          </h3>
          <p className="mb-5 text-[11px] text-[#b0bbb3]">
            Hikmal Ananta Putra · Wali kelas
          </p>
          <div className="h-px bg-[#4e5d55]" />
          <div className="flex justify-between py-5">
            <div className="flex flex-col gap-0.5">
              <strong className="text-lg">6</strong>
              <span className="text-[9px] text-[#aeb9b0]">Mata pelajaran</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <strong className="text-lg">24</strong>
              <span className="text-[9px] text-[#aeb9b0]">Teman sekelas</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <strong className="text-lg">72%</strong>
              <span className="text-[9px] text-[#aeb9b0]">Progresmu</span>
            </div>
          </div>
          <Link href="/siswa" className="mt-auto text-[11px] font-bold text-yellow">
            Lihat semua materi <span className="pl-1.5 text-yellow">→</span>
          </Link>
        </article>

        <div className="pt-2">
          <div className="grid grid-cols-[1fr_136px] border-b border-line pb-3 pr-10 text-[10px] text-muted">
            <span>Mata pelajaran</span>
            <span>Progres</span>
          </div>
          {pelajaran.map((p) => (
            <div
              key={p.singkatan}
              className="grid min-h-[57px] grid-cols-[42px_minmax(145px,1fr)_100px_30px_20px] items-center gap-3 border-b border-line"
            >
              <span
                className={`grid size-8 place-items-center text-[9px] font-bold ${p.warna}`}
              >
                {p.singkatan}
              </span>
              <span className="flex flex-col">
                <strong className="text-xs">{p.nama}</strong>
                <small className="text-[10px] text-muted">{p.info}</small>
              </span>
              <div className="h-1 w-full bg-[#e6e4da]">
                <div
                  className="h-full bg-ink"
                  style={{ width: `${p.progres}%` }}
                />
              </div>
              <b className="text-[10px]">{p.progres}%</b>
              <span className="text-base text-coral">→</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Bagian ajakan untuk guru. */
export function TeacherSection() {
  return (
    <section
      id="guru"
      className="flex flex-col justify-between gap-16 bg-[#d6dfd0] px-[9vw] py-20 md:flex-row md:px-[15vw]"
    >
      <div className="max-w-[390px]">
        <p className="eyebrow text-[#53685b]">Untuk para pengajar</p>
        <h2 className="mb-5 mt-3 text-[43px] leading-none tracking-[-2px]">
          Lebih banyak waktu
          <br />
          untuk <em className="font-display text-coral">mengajar.</em>
        </h2>
        <p className="mb-7 text-[13px] leading-[1.7] text-[#58695f]">
          Siapkan materi per bab, bagikan satu kode kelas, lalu pantau siapa
          yang sudah siap melangkah.
        </p>
        <Link
          href="/guru/masuk"
          className="inline-block border border-ink px-4 py-3 text-[11px] font-bold hover:border-coral hover:bg-coral hover:text-paper"
        >
          Masuk ke dashboard guru <span className="pl-1.5 text-base">↗</span>
        </Link>
      </div>
      <div className="w-full self-center bg-paper p-6 shadow-[8px_8px_0_rgba(37,55,51,0.1)] md:w-[380px]">
        <div className="flex justify-between text-[9px] uppercase tracking-[0.8px] text-muted">
          <span>Progres kelas · Paket B</span>
          <span>minggu ini</span>
        </div>
        <div className="flex items-center justify-between border-b border-line py-4">
          <strong className="text-lg">Harapan Bersama</strong>
          <span className="text-[10px] text-muted">24 siswa aktif</span>
        </div>
        <div className="py-5">
          <div className="mb-2 flex justify-between text-[11px] text-muted">
            <span>Sudah mengerjakan</span>
            <strong className="text-ink">18 siswa</strong>
          </div>
          <div className="h-2.5 w-full bg-[#e1e1d8]">
            <div className="h-full w-[75%] bg-yellow" />
          </div>
          <small className="mt-1.5 block text-[9px] text-muted">
            75% dari seluruh siswa
          </small>
        </div>
        <div className="flex items-center justify-between border-t border-line pt-3.5">
          <span className="flex">
            {["AR", "DN", "+16"].map((t, i) => (
              <i
                key={t}
                className={`grid size-7 -mr-1 place-items-center rounded-full border-2 border-paper text-[8px] not-italic ${
                  i === 0 ? "bg-blue" : i === 1 ? "bg-coral" : "bg-ink text-paper"
                }`}
              >
                {t}
              </i>
            ))}
          </span>
          <span className="text-[9px] text-muted">
            <b className="mr-1.5 inline-block size-1.5 rounded-full bg-[#83a77d]" />
            diperbarui hari ini
          </span>
        </div>
      </div>
    </section>
  );
}

/** Footer halaman utama. */
export function LandingFooter() {
  return (
    <footer className="flex min-h-[88px] flex-col items-start justify-between gap-4 bg-ink px-[5vw] py-6 text-paper md:flex-row md:items-center lg:px-[6.5vw]">
      <Link
        href="#top"
        className="flex items-center gap-2.5 text-base font-bold"
      >
        <BrandMark inverse />
        <span>
          ruang<span className="text-yellow">belajar</span>
        </span>
      </Link>
      <p className="m-0 text-[11px] text-[#9faea5]">
        Belajar jadi lebih mungkin, satu bab setiap kali.
      </p>
      <span className="text-[10px] text-[#9faea5]">
        Portal Belajar Digital · 2026
      </span>
    </footer>
  );
}