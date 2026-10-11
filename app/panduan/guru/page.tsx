/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { FooterSimple } from "@/components/footer-simple";
import { TopBar } from "@/components/top-bar";

export const metadata: Metadata = { title: "Panduan Guru" };

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

export default function PanduanGuruPage() {
  return (
    <>
      <TopBar
        nav={[
          { href: "/panduan", label: "Panduan" },
          { href: "/panduan/siswa", label: "Panduan siswa" },
          { href: "/panduan/guru", label: "Panduan guru", aktif: true },
        ]}
        aksi={{ href: "/guru/masuk", label: "Masuk guru" }}
      />
      <main className="mx-auto flex max-w-[900px] flex-col gap-6 px-5 py-12 md:px-10">
        <header>
          <p className="eyebrow eyebrow-muted mb-2.5">Panduan guru</p>
          <h1 className="text-[38px] leading-none tracking-[-2px]">
            Kelola kelas,{" "}
            <em className="font-display text-coral">pantau progres.</em>
          </h1>
          <p className="mt-3 max-w-[620px] text-[13px] leading-relaxed text-muted">
            Ikuti 8 langkah berikut: dari login, membuat kelas, menyiapkan
            materi & latihan, sampai membaca masukan siswa.
          </p>
        </header>

        <Langkah
          nomor={1}
          judul="Masuk dengan akun guru"
          gambar="/panduan/guru-1-login.jpg"
          alt="Halaman login guru dengan kolom email dan password"
        >
          <p>
            Buka halaman <b>Masuk guru</b> (tombol di kanan atas beranda),
            lalu isi <b>email</b> dan <b>password</b> akunmu.
          </p>
          <p>
            Tidak punya akun? Akun guru dibuatkan oleh pengelola portal — minta
            dibuatkan, jangan mendaftar sendiri.
          </p>
        </Langkah>

        <Langkah
          nomor={2}
          judul="Kenali dashboard"
          gambar="/panduan/guru-2-dashboard.jpg"
          alt="Dashboard guru dengan metrik, banner kode kelas, dan daftar kelas"
        >
          <p>
            Di dashboard ada tiga metrik (siswa aktif, latihan terkumpul,
            rata-rata progres), banner <b>“Bagikan kode kelasmu”</b> untuk
            menyalin kode kelas, dan tabel semua kelasmu.
          </p>
          <p>
            Tab <b>Progress siswa</b> membuka rekap per kelas, dan{" "}
            <b>Masukan siswa</b> membuka kotak masuk masukan.
          </p>
        </Langkah>

        <Langkah
          nomor={3}
          judul="Buat kelas baru & bagikan kodenya"
          gambar="/panduan/guru-3-buat-kelas.jpg"
          alt="Dialog buat kelas baru dengan pilihan jenjang dan nama kelas"
        >
          <p>
            Tekan <b>+ Buat kelas baru</b>, isi nama kelas, lalu pilih{" "}
            <b>jenjang</b>: <b>Paket A</b> (setara SD), <b>Paket B</b> (setara
            SMP), <b>Paket C</b> (setara SMA), atau <b>CAMPURAN</b> untuk
            siswa lintas jenjang.
          </p>
          <p>
            Kode akses 6 karakter dibuat otomatis — salin dan bagikan ke siswa
            (misalnya lewat WhatsApp). Siswa masuk tanpa akun, cukup dengan
            kode itu.
          </p>
        </Langkah>

        <Langkah
          nomor={4}
          judul="Tambah materi bab"
          gambar="/panduan/guru-4-materi-baru.jpg"
          alt="Halaman buat materi baru dengan pilihan kelas dan editor konten"
        >
          <p>
            Buka <b>Kelola materi → Buat materi baru</b>. Pilih kelas dan mata
            pelajaran, isi nomor & judul bab, ringkasan singkat, konten materi
            (pisahkan per paragraf), plus tautan video/buku resmi bila ada.
          </p>
          <p>
            Atur <b>Pengaturan terbit</b> di panel kanan, lalu tekan{" "}
            <b>Simpan & terbitkan</b> agar materi langsung tampil untuk siswa.
          </p>
        </Langkah>

        <Langkah
          nomor={5}
          judul="Buat latihan soal per bab"
          gambar="/panduan/guru-5-soal-baru.jpg"
          alt="Halaman buat latihan soal dengan pilihan kelas, bab, dan opsi jawaban"
        >
          <p>
            Buka <b>Latihan soal → Buat latihan</b>. Pilih <b>kelas</b> dulu,
            lalu pilih <b>bab</b> yang sesuai. Tulis pertanyaan, isi 4 opsi
            jawaban, dan tandai <b>satu jawaban benar</b>.
          </p>
          <p>
            Tambahkan soal lain lewat <b>+ Tambah soal</b> (disarankan minimal
            5 soal per bab), pilih waktu pengerjaan, lalu{" "}
            <b>Simpan latihan</b>.
          </p>
        </Langkah>

        <Langkah
          nomor={6}
          judul="Pantau progres & aktivitas siswa"
          gambar="/panduan/guru-6-progress.jpg"
          alt="Halaman progress siswa dengan kartu ringkasan dan log aktivitas"
        >
          <p>
            Di <b>Progress siswa</b>, pilih kelas dari daftar. Kamu melihat
            kartu ringkasan (sudah mengerjakan semua / masih berjalan / belum
            mulai) dan log <b>Aktivitas latihan terbaru</b>.
          </p>
          <p>
            Log menampilkan <b>setiap</b> pengerjaan — nama siswa, bab, nilai,
            status, dan waktunya (WIB) — jadi kamu tahu siapa mengerjakan apa
            dan kapan.
          </p>
        </Langkah>

        <Langkah
          nomor={7}
          judul="Baca masukan siswa"
          gambar="/panduan/guru-7-feedback.jpg"
          alt="Halaman masukan siswa dengan kartu-kartu masukan"
        >
          <p>
            Siswa bisa mengirim saran, laporan masalah, atau pujian dari
            halaman kelas mereka. Semuanya masuk ke tab{" "}
            <b>Masukan siswa</b> — lengkap dengan nama, kelas, dan waktunya.
          </p>
          <p>
            Masukan baru ditandai <b>● Baru</b>. Tekan{" "}
            <b>Tandai sudah dibaca</b> setelah selesai menindaklanjuti.
          </p>
        </Langkah>

        <Langkah
          nomor={8}
          judul="Rutinitas mingguan yang disarankan"
          gambar="/panduan/guru-2-dashboard.jpg"
          alt="Dashboard guru sebagai titik awal rutinitas mingguan"
        >
          <p>
            Setiap minggu: cek <b>Progress siswa</b> untuk melihat siapa yang
            perlu diingatkan, tambah materi/latihan bab berikutnya, dan baca{" "}
            <b>Masukan siswa</b>.
          </p>
          <p>
            Simpan kode kelas di tempat aman — siswa baru bisa masuk kapan saja
            dengan kode itu.
          </p>
        </Langkah>

        <Link href="/guru/masuk" className="btn btn-coral self-start">
          Masuk sebagai guru →
        </Link>
      </main>
      <FooterSimple />
    </>
  );
}
