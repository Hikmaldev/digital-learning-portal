"use client";

import Link from "next/link";
import { useState } from "react";
import { FooterSimple } from "../footer-simple";
import { TopBar } from "../top-bar";

interface Props {
  nama: string;
  email: string;
}

/**
 * Halaman "Akun guru": info akun + form ganti password sendiri.
 * POST /api/guru/password — verifikasi password lama di server.
 */
export function AkunPage({ nama, email }: Props) {
  const [lama, setLama] = useState("");
  const [baru, setBaru] = useState("");
  const [ulangi, setUlangi] = useState("");
  const [memuat, setMemuat] = useState(false);
  const [pesan, setPesan] = useState<{ jenis: "ok" | "eror"; teks: string } | null>(null);

  async function simpan(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (baru.length < 8) {
      setPesan({ jenis: "eror", teks: "Password baru minimal 8 karakter." });
      return;
    }
    if (baru !== ulangi) {
      setPesan({ jenis: "eror", teks: "Ulangi password baru tidak sama." });
      return;
    }
    if (baru === lama) {
      setPesan({ jenis: "eror", teks: "Password baru harus berbeda dari password lama." });
      return;
    }

    setMemuat(true);
    setPesan(null);
    try {
      const res = await fetch("/api/guru/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passwordLama: lama, passwordBaru: baru }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (res.ok && json.ok) {
        setPesan({ jenis: "ok", teks: "✓ Password berhasil diganti. Gunakan password baru saat masuk berikutnya." });
        setLama("");
        setBaru("");
        setUlangi("");
        return;
      }
      setPesan({
        jenis: "eror",
        teks:
          json.error ??
          (res.status === 401
            ? "Sesi berakhir — silakan masuk ulang."
            : "Gagal mengganti password. Coba lagi."),
      });
    } catch {
      setPesan({ jenis: "eror", teks: "Tidak dapat terhubung ke server. Coba lagi." });
    } finally {
      setMemuat(false);
    }
  }

  return (
    <>
      <TopBar
        nav={[
          { href: "/guru/dashboard", label: "Dashboard" },
          { href: "/guru/materi", label: "Materi" },
          { href: "/guru/soal", label: "Latihan soal" },
          { href: "/guru/akun", label: "Akun", aktif: true },
        ]}
        aksi={{ href: "/guru/dashboard", label: "Dashboard" }}
      />
      <main className="mx-auto w-full max-w-[780px] px-5 py-12 md:px-10">
        <div className="mb-8">
          <p className="eyebrow eyebrow-muted mb-2.5">Pengaturan akun</p>
          <h1 className="text-[38px] leading-none tracking-[-2px]">
            Akun <em className="font-display text-coral">guru.</em>
          </h1>
          <p className="mt-2.5 text-[13px] text-muted">
            Kelola informasi akun dan ganti passwordmu sendiri.
          </p>
        </div>

        <section className="panel mb-6 p-6">
          <h2 className="mb-4 text-xl tracking-tight">Informasi akun</h2>
          <dl className="flex flex-col gap-3 text-[12px]">
            <div className="flex flex-col gap-0.5 border-t border-line pt-3 first:border-t-0 first:pt-0">
              <dt className="text-[10px] font-bold uppercase tracking-[0.13em] text-muted">
                Nama
              </dt>
              <dd className="font-bold text-ink">{nama}</dd>
            </div>
            <div className="flex flex-col gap-0.5 border-t border-line pt-3">
              <dt className="text-[10px] font-bold uppercase tracking-[0.13em] text-muted">
                Email
              </dt>
              <dd className="font-bold text-ink">{email}</dd>
            </div>
          </dl>
        </section>

        <section className="panel p-6">
          <h2 className="mb-2 text-xl tracking-tight">Ganti password</h2>
          <p className="mb-5 text-[11px] leading-relaxed text-muted">
            Masukkan password lama, lalu password baru (minimal 8 karakter).
            Bagikan password hanya kepada dirimu sendiri.
          </p>

          <form onSubmit={simpan}>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="password-lama" className="text-[11px] font-bold">
                Password lama
              </label>
              <input
                id="password-lama"
                type="password"
                className="field"
                value={lama}
                onChange={(e) => setLama(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="password-baru" className="text-[11px] font-bold">
                Password baru
              </label>
              <input
                id="password-baru"
                type="password"
                className="field"
                value={baru}
                onChange={(e) => setBaru(e.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
              />
              <small className="text-[10px] text-muted">Minimal 8 karakter.</small>
            </div>
            <div className="mb-5 flex flex-col gap-2">
              <label htmlFor="password-ulangi" className="text-[11px] font-bold">
                Ulangi password baru
              </label>
              <input
                id="password-ulangi"
                type="password"
                className="field"
                value={ulangi}
                onChange={(e) => setUlangi(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            {pesan && (
              <p
                role="status"
                className={`mb-4 border-l-[3px] px-3 py-2.5 text-[11px] font-bold ${
                  pesan.jenis === "ok"
                    ? "border-leafgreen bg-[#e2ead8] text-[#536b55]"
                    : "border-coral bg-[#fbe9e2] text-[#8a4534]"
                }`}
              >
                {pesan.teks}
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              <button type="submit" className="btn btn-coral" disabled={memuat}>
                {memuat ? "Menyimpan..." : "Simpan password baru"}
              </button>
              <Link href="/guru/dashboard" className="btn btn-outline">
                Kembali ke dashboard
              </Link>
            </div>
          </form>
        </section>
      </main>
      <FooterSimple />
    </>
  );
}
