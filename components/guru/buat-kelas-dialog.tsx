"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const JENJANG = ["Paket A", "Paket B", "Paket C"] as const;

interface KelasBaru {
  id: string;
  nama_kelas: string;
  jenjang: string;
  kode_akses: string;
}

/**
 * Dialog "Buat kelas baru" (dashboard guru).
 * POST /api/guru/kelas → kelas tersimpan dengan kode akses otomatis 6 karakter,
 * lalu kode ditampilkan agar bisa dibagikan ke siswa.
 */
export function BuatKelasDialog() {
  const router = useRouter();
  const [terbuka, setTerbuka] = useState(false);
  const [nama, setNama] = useState("");
  const [jenjang, setJenjang] = useState<string>("Paket B");
  const [memuat, setMemuat] = useState(false);
  const [pesan, setPesan] = useState<string | null>(null);
  const [hasil, setHasil] = useState<KelasBaru | null>(null);
  const [tersalin, setTersalin] = useState(false);

  function tutup() {
    setTerbuka(false);
    setNama("");
    setJenjang("Paket B");
    setPesan(null);
    setHasil(null);
    setTersalin(false);
  }

  async function buat(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (nama.trim().length < 3) {
      setPesan("Nama kelas minimal 3 huruf.");
      return;
    }
    setMemuat(true);
    setPesan(null);
    try {
      const res = await fetch("/api/guru/kelas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ namaKelas: nama.trim(), jenjang }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setPesan(
          data?.error ??
            (res.status === 401
              ? "Sesi guru berakhir — masuk ulang lewat halaman login guru."
              : res.status === 503
                ? "Database belum dikonfigurasi. Atur DATABASE_URL lalu migrasi & seed (lihat README)."
                : "Gagal membuat kelas. Coba lagi.")
        );
        return;
      }
      setHasil(data.data.kelas);
      setTersalin(false);
      router.refresh();
    } catch {
      setPesan("Tidak dapat terhubung ke server. Coba lagi.");
    } finally {
      setMemuat(false);
    }
  }

  async function salinKode() {
    if (!hasil) return;
    try {
      await navigator.clipboard.writeText(hasil.kode_akses);
      setTersalin(true);
    } catch {
      setTersalin(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-yellow mt-3"
        onClick={() => setTerbuka(true)}
      >
        + Buat kelas baru
      </button>

      {terbuka && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/45 p-4 py-12"
          role="dialog"
          aria-modal="true"
          aria-label="Buat kelas baru"
          onClick={(e) => {
            if (e.target === e.currentTarget) tutup();
          }}
        >
          <div className="panel w-full max-w-md p-7">
            {hasil ? (
              <>
                <p className="eyebrow mb-2">Kelas berhasil dibuat</p>
                <h3 className="font-display text-2xl tracking-tight">
                  {hasil.nama_kelas}.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Bagikan kode akses ini ke siswa — mereka masuk tanpa akun
                  melalui halaman{" "}
                  <Link
                    href="/siswa/masuk"
                    className="font-bold text-coral underline"
                  >
                    Masuk siswa
                  </Link>
                  .
                </p>

                <div className="mt-4 border border-line bg-soft px-4 py-4 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-muted">
                    Kode akses kelas
                  </p>
                  <p className="mt-1 font-display text-4xl tracking-[0.18em] text-ink">
                    {hasil.kode_akses}
                  </p>
                </div>

                <p className="mt-3 text-[11px] text-muted">
                  Jenjang: <b className="text-ink">{hasil.jenjang}</b>
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <button type="button" className="btn" onClick={salinKode}>
                    {tersalin ? "✓ Tersalin" : "Salin kode"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={tutup}
                  >
                    Selesai
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="eyebrow mb-3.5">Mulai ruang baru</p>
                <h3 className="mb-2 font-display text-2xl tracking-tight">
                  Buat kelas baru.
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-muted">
                  Kode akses 6 karakter dibuat otomatis — tinggal bagikan ke
                  siswa semester berikutnya.
                </p>

                <form onSubmit={buat}>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.13em] text-muted">
                    Nama kelas
                  </label>
                  <input
                    className="field mb-4"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="cth: Kelas Kesetaraan Angkatan 2027"
                    maxLength={80}
                    required
                  />

                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.13em] text-muted">
                    Jenjang
                  </label>
                  <select
                    className="field mb-4"
                    value={jenjang}
                    onChange={(e) => setJenjang(e.target.value)}
                  >
                    {JENJANG.map((j) => (
                      <option key={j} value={j}>
                        {j}
                      </option>
                    ))}
                  </select>

                  {pesan && (
                    <p className="mb-4 border-l-[3px] border-coral bg-[#fbe7de] px-3 py-2.5 text-[11px] leading-relaxed text-[#8a3a24]">
                      {pesan}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <button type="submit" className="btn" disabled={memuat}>
                      {memuat ? "Membuat…" : "+ Buat kelas baru"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={tutup}
                    >
                      Batal
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}