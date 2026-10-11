"use client";

import { useState } from "react";
import { bacaKodeKelas, bacaNamaSiswa } from "@/lib/siswa-session";

const KATEGORI = [
  { nilai: "SARAN", label: "Saran perbaikan" },
  { nilai: "BUG", label: "Laporan masalah / bug" },
  { nilai: "PUJIAN", label: "Pujian" },
  { nilai: "LAINNYA", label: "Lainnya" },
] as const;

/**
 * Form masukan siswa (tanpa akun) — tersimpan ke database dan dibaca guru
 * lewat halaman /guru/feedback.
 */
export function FeedbackForm() {
  const [kategori, setKategori] = useState<string>("SARAN");
  const [pesan, setPesan] = useState("");
  const [kontak, setKontak] = useState("");
  const [memuat, setMemuat] = useState(false);
  const [sukses, setSukses] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function kirim(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pesan.trim().length < 5) {
      setError("Tulis masukan minimal 5 karakter.");
      return;
    }
    setMemuat(true);
    setError(null);
    try {
      const res = await fetch("/api/siswa/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kodeKelas: bacaKodeKelas() ?? undefined,
          namaSiswa: bacaNamaSiswa() ?? undefined,
          kategori,
          pesan: pesan.trim(),
          kontak: kontak.trim() || undefined,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setError(data?.error ?? "Gagal mengirim masukan. Coba lagi.");
        return;
      }
      setSukses(true);
      setPesan("");
      setKontak("");
    } catch {
      setError("Tidak dapat terhubung ke server. Coba lagi.");
    } finally {
      setMemuat(false);
    }
  }

  return (
    <section className="panel mt-8 p-6 md:p-7">
      <p className="eyebrow eyebrow-muted mb-2">Masukan untuk pengembang</p>
      <h2 className="text-xl tracking-tight">Ada kendala atau saran?</h2>
      <p className="mt-1.5 mb-5 text-[11px] leading-relaxed text-muted">
        Tulis di sini — gurumu dan pengembang akan membacanya. Masukanmu
        membantu aplikasi ini jadi lebih baik.
      </p>

      {sukses ? (
        <div className="border-l-4 border-leafgreen bg-[#e3ead8] px-5 py-4">
          <strong className="block text-xs">Terkirim. Terima kasih! 🙌</strong>
          <p className="m-0 mt-1 text-xs text-[#58695a]">
            Masukanmu sudah kami terima.
          </p>
          <button
            type="button"
            className="btn btn-outline mt-3"
            onClick={() => setSukses(false)}
          >
            Kirim masukan lain
          </button>
        </div>
      ) : (
        <form onSubmit={kirim} className="flex max-w-[720px] flex-col gap-3.5">
          <div className="grid gap-3.5 md:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-[11px] font-bold">
              Jenis masukan
              <select
                className="field"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
              >
                {KATEGORI.map((k) => (
                  <option key={k.nilai} value={k.nilai}>
                    {k.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-[11px] font-bold">
              Kontak (opsional)
              <input
                className="field"
                value={kontak}
                onChange={(e) => setKontak(e.target.value)}
                maxLength={120}
                placeholder="No. WA atau IG (kalau mau dibalas)"
              />
            </label>
          </div>
          <label className="flex flex-col gap-1.5 text-[11px] font-bold">
            Masukan
            <textarea
              className="field min-h-[110px]"
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
              maxLength={1000}
              placeholder="cth: Soal di bab ini sulit dibaca dari HP; atau video materi tidak muncul."
              required
            />
          </label>
          {error && (
            <p className="border-l-[3px] border-coral bg-[#fbe7de] px-3 py-2.5 text-[11px] leading-relaxed text-[#8a3a24]">
              {error}
            </p>
          )}
          <div>
            <button type="submit" className="btn btn-coral" disabled={memuat}>
              {memuat ? "Mengirim…" : "Kirim masukan →"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
