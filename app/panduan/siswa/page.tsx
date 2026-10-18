/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { FooterSimple } from "@/components/footer-simple";
import { TopBar } from "@/components/top-bar";

export const metadata: Metadata = { title: "Panduan Siswa" };

function Langkah({
  nomor,
  judul,
  gambar,
  alt,
  children,
}: {
  nomor: number;
  judul: string;
  gambar: string;
  alt: string;
  children: React.ReactNode;
}) {
  return (
    <section className="panel p-6 md:p-7">
      <div className="mb-3 flex items-center gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-paper">
          {nomor}
        </span>
        <h2 className="text-lg leading-tight tracking-tight">{judul}</h2>
      </div>
      <div className="mb-4 flex flex-col gap-2.5 text-[13px] leading-relaxed text-muted [&_b]:text-ink">
        {children}
      </div>
      <img
        src={gambar}
        alt={alt}
        className="w-full border border-line"
        loading="lazy"
      />
    </section>
  );
}

export default function PanduanSiswaPage() {
  return (
    <>
      <TopBar
        nav={[
          { href: "/panduan", label: "Panduan" },
          { href: "/panduan/siswa", label: "Panduan siswa", aktif: true },
          { href: "/panduan/guru", label: "Panduan guru" },
        ]}
        aksi={{ href: "/siswa/masuk", label: "Masuk siswa" }}
      />
      <main className="mx-auto flex max-w-[900px] flex-col gap-6 px-5 py-12 md:px-10">
        <header>
          <p className="eyebrow eyebrow-muted mb-2.5">Panduan siswa</p>
          <h1 className="text-[38px] leading-none tracking-[-2px]">
            Belajar dari HP,{" "}
            <em className="font-display text-coral">tanpa akun.</em>
          </h1>
          <p className="mt-3 max-w-[620px] text-[13px] leading-relaxed text-muted">
            Ikuti 7 langkah berikut dari awal sampai akhir. Semua bisa
            dikerjakan dari HP — cukup kode kelas dari gurumu.
          </p>
        </header>

        <Langkah
          nomor={1}
          judul="Buka situs dan pilih “Masuk sebagai siswa”"
          gambar="/panduan/siswa-1-masuk.jpg"
          alt="Halaman masuk siswa dengan kolom kode kelas dan nama"
        >
          <p>
            Buka alamat portal di HP atau komputer, lalu tekan tombol{" "}
            <b>Masuk sebagai siswa</b> di kanan atas.
          </p>
          <p>
            Kamu tidak perlu membuat akun — cukup kode kelas yang dibagikan
            gurumu.
          </p>
        </Langkah>

        <Langkah
          nomor={2}
          judul="Tulis kode kelas dan namamu"
          gambar="/panduan/siswa-2-kelas.jpg"
          alt="Halaman Kelas Saya dengan progres belajar dan kartu bab"
        >
          <p>
            Ketik <b>kode kelas</b> (6 karakter, misalnya{" "}
            <b>PAKETC</b>) dan <b>namamu</b>, lalu tekan{" "}
            <b>Masuk ke kelas</b>.
          </p>
          <p>
            Setelah masuk, kamu melihat halaman <b>Kelas saya</b>: persentase{" "}
            <b>progres keseluruhan</b> dan kartu semua bab pelajaran.
          </p>
        </Langkah>

        <Langkah
          nomor={3}
          judul="Pilih bab dan baca materinya"
          gambar="/panduan/siswa-4-materi.jpg"
          alt="Halaman materi bab dengan teks materi dan tautan buku resmi"
        >
          <p>
            Klik salah satu kartu bab untuk membuka materi. Di dalamnya ada
            ringkasan, isi materi bertahap, video (kalau ada), dan tautan{" "}
            <b>buku resmi</b> untuk bacaan tambahan.
          </p>
          <p>
            Kalau sudah paham, tekan tombol <b>Mulai latihan</b> di panel
            kanan.
          </p>
        </Langkah>

        <Langkah
          nomor={4}
          judul="Kerjakan latihan soal"
          gambar="/panduan/siswa-5-latihan.jpg"
          alt="Halaman latihan soal dengan pilihan jawaban"
        >
          <p>
            Pilih <b>satu jawaban</b> untuk setiap soal. Tombol{" "}
            <b>Kirim jawaban</b> aktif setelah semua soal dijawab — selama
            belum lengkap, tombolnya menunjukkan berapa soal lagi yang perlu
            dijawab.
          </p>
          <p>
            Jawabanmu <b>tersimpan otomatis di HP untuk setiap bab</b> — kalau
            halaman ter-refresh, HP terkunci, atau kamu membuka materi dulu,
            pilihanmu tidak hilang. Ada juga tombol <b>Ulangi dari awal</b>
            bila ingin mengosongkan dan mengerjakan ulang.
          </p>
        </Langkah>

        <Langkah
          nomor={5}
          judul="Lihat hasil penilaian"
          gambar="/panduan/siswa-6-hasil.jpg"
          alt="Halaman hasil latihan dengan skor dan rincian jawaban"
        >
          <p>
            Skor dan rincian benar/salah tiap soal langsung muncul setelah
            dikirim — latihan pilihan ganda dinilai otomatis.
          </p>
          <p>
            Kembali ke <b>Kelas saya</b> untuk melihat progres bab bertambah
            (bab yang selesai ditandai <b>Selesai 100%</b>) dan{" "}
            <b>progres keseluruhan</b> naik.
          </p>
        </Langkah>

        <Langkah
          nomor={6}
          judul="Kirim masukan untuk pengembang"
          gambar="/panduan/siswa-3-masukan.jpg"
          alt="Formulir masukan siswa di bagian bawah halaman kelas"
        >
          <p>
            Di bagian bawah halaman <b>Kelas saya</b> ada formulir{" "}
            <b>“Ada kendala atau saran?”</b>. Pilih jenis masukan, tulis
            pesanmu (boleh kosongkan kontak), lalu kirim — masukanmu dibaca
            guru dan pengembang.
          </p>
        </Langkah>

        <Langkah
          nomor={7}
          judul="Ulangi sampai semua bab selesai"
          gambar="/panduan/siswa-2-kelas.jpg"
          alt="Halaman kelas menampilkan seluruh bab dan progresnya"
        >
          <p>
            Setiap bab yang kamu selesaikan menambah progres. Selesaikan semua
            bab satu per satu — kartunya berubah menjadi <b>Selesai</b> dan
            progres keseluruhan mencapai <b>100%</b>.
          </p>
        </Langkah>

        <div className="border-l-4 border-leafgreen bg-[#e3ead8] px-5 py-4">
          <strong className="block text-xs">Tips</strong>
          <p className="m-0 mt-1 text-xs leading-relaxed text-[#58695a]">
            Gunakan Wi-Fi kelas saat menonton video, hemat kuota. Kalau lupa
            kode kelas, minta gurumu mengirim ulang dari banner{" "}
            <b>“Bagikan kode kelasmu”</b> di dashboard guru.
          </p>
        </div>

        <Link href="/siswa/masuk" className="btn btn-coral self-start">
          Mulai masuk ke kelas →
        </Link>
      </main>
      <FooterSimple />
    </>
  );
}
