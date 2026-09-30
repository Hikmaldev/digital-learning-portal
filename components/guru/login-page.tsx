"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { FooterSimple } from "../footer-simple";
import { TopBar } from "../top-bar";

export function GuruLoginPage() {
  const router = useRouter();
  const [lihatPassword, setLihatPassword] = useState(false);
  const [dbAktif, setDbAktif] = useState<boolean | null>(null);
  const [memuat, setMemuat] = useState(false);
  const [pesan, setPesan] = useState("");

  useEffect(() => {
    fetch("/api/guru/status")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => setDbAktif(Boolean(j?.data?.dbAktif)))
      .catch(() => setDbAktif(false));
  }, []);

  async function masuk(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMemuat(true);
    setPesan("");
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    try {
      // Auth.js Credentials — memverifikasi ke database (akun hasil seed).
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.ok) {
        router.push("/guru/dashboard");
        router.refresh();
        return;
      }
      setPesan(
        dbAktif === false
          ? "Database belum tersambung, jadi akun belum bisa diverifikasi. Gunakan 'Lanjut sebagai demo' di bawah."
          : "Email atau password salah. Coba lagi."
      );
    } catch {
      setPesan("Terjadi kesalahan saat masuk. Coba lagi.");
    } finally {
      setMemuat(false);
    }
  }

  return (
    <>
      <TopBar
        nav={[]}
        aksi={{ href: "/siswa/masuk", label: "Masuk sebagai siswa" }}
      />
      <main className="grid min-h-[calc(100vh-74px)] place-items-center px-5 py-12">
        <div className="w-full max-w-[430px]">
          <div className="panel px-7 py-9">
            <p className="eyebrow mb-3.5">Ruang kerja guru</p>
            <h1 className="mb-3 text-[37px] leading-[1.05] tracking-[-2px]">
              Selamat datang
              <br />
              <em className="font-display text-coral">kembali.</em>
            </h1>
            <p className="mb-6 text-sm leading-relaxed text-muted">
              Masuk untuk mengatur materi, membuat latihan, dan melihat progres
              kelasmu.
            </p>

            {dbAktif === false && (
              <div className="mb-4 border-l-[3px] border-yellow bg-[#f9efc9] px-3 py-2.5 text-[11px] leading-relaxed text-[#73633a]">
                <b>Mode demo.</b> Database belum tersambung — akun login baru
                aktif setelah mengisi <code className="font-mono">DATABASE_URL</code>{" "}
                dan menjalankan seed (lihat README).{" "}
                <button
                  type="button"
                  onClick={() => router.push("/guru/dashboard")}
                  className="font-bold underline"
                >
                  Lanjut sebagai demo →
                </button>
              </div>
            )}

            <form onSubmit={masuk}>
              <div className="mb-4 flex flex-col gap-2">
                <label htmlFor="email" className="text-[11px] font-bold">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="field"
                  placeholder="nama@email.com"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="mb-5 flex flex-col gap-2">
                <label htmlFor="password" className="text-[11px] font-bold">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={lihatPassword ? "text" : "password"}
                    className="field pr-16"
                    placeholder="Masukkan password"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setLihatPassword((v) => !v)}
                    className="absolute right-3 top-3 cursor-pointer border-0 bg-transparent text-[10px] font-bold text-coral"
                  >
                    {lihatPassword ? "Sembunyikan" : "Lihat"}
                  </button>
                </div>
              </div>
              {pesan && (
                <p
                  role="alert"
                  className="mb-4 border-l-[3px] border-coral bg-[#fbe9e2] px-3 py-2 text-[11px] text-[#8a4534]"
                >
                  {pesan}
                </p>
              )}
              <button
                type="submit"
                disabled={memuat}
                className="btn btn-coral w-full disabled:opacity-50"
              >
                {memuat ? "Memeriksa... " : "Masuk ke dashboard "}
                {!memuat && <span className="pl-1 text-base">→</span>}
              </button>
            </form>

            <div className="mt-5 flex items-center justify-between text-[10px] text-muted">
              <Link className="hover:underline" href="#">
                Lupa password?
              </Link>
              <span>
                Belum punya akun?{" "}
                <Link href="#" className="font-bold text-coral">
                  Daftar
                </Link>
              </span>
            </div>
          </div>
        </div>
      </main>
      <FooterSimple />
    </>
  );
}