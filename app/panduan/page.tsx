import type { Metadata } from "next";
import Link from "next/link";
import { FooterSimple } from "@/components/footer-simple";
import { TopBar } from "@/components/top-bar";

export const metadata: Metadata = { title: "Panduan Pengguna" };

export default function PanduanPage() {
  return (
    <>
      <TopBar
        nav={[
          { href: "/panduan/siswa", label: "Panduan siswa" },
          { href: "/panduan/guru", label: "Panduan guru" },
        ]}
        aksi={{ href: "/", label: "Beranda" }}
      />
      <main className="mx-auto max-w-[900px] px-5 py-12 md:px-10">
        <p className="eyebrow eyebrow-muted mb-2.5">Panduan pengguna</p>
        <h1 className="text-[38px] leading-none tracking-[-2px]">
          Cara pakai <em className="font-display text-coral">Ruang Belajar.</em>
        </h1>
        <p className="mt-3 max-w-[620px] text-[13px] leading-relaxed text-muted">
          Panduan lengkap langkah demi langkah — untuk siswa dan guru, dari
          masuk pertama kali sampai memantau progres belajar. Setiap langkah
          dilengkapi gambar tampilan aplikasinya.
        </p>

        <div className="mt-9 grid gap-5 md:grid-cols-2">
          <Link
            href="/panduan/siswa"
            className="panel flex flex-col p-7 hover:border-coral"
          >
            <span className="text-2xl">🎒</span>
            <h2 className="mb-2 mt-3 text-xl tracking-tight">Panduan Siswa</h2>
            <p className="text-[12px] leading-relaxed text-muted">
              Masuk dengan kode kelas tanpa akun, membaca materi, mengerjakan
              latihan yang dinilai otomatis, melihat hasil & progres, sampai
              mengirim masukan.
            </p>
            <span className="mt-5 text-xs font-bold text-coral">
              Baca panduan siswa →
            </span>
          </Link>
          <Link
            href="/panduan/guru"
            className="panel flex flex-col p-7 hover:border-coral"
          >
            <span className="text-2xl">🧑‍🏫</span>
            <h2 className="mb-2 mt-3 text-xl tracking-tight">Panduan Guru</h2>
            <p className="text-[12px] leading-relaxed text-muted">
              Masuk dengan akun guru, membuat kelas (Paket A/B/C/CAMPURAN),
              menambah materi & latihan, memantau progres siswa, dan membaca
              masukan mereka.
            </p>
            <span className="mt-5 text-xs font-bold text-coral">
              Baca panduan guru →
            </span>
          </Link>
        </div>
      </main>
      <FooterSimple />
    </>
  );
}
