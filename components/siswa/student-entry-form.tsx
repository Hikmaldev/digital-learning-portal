"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { kelasAktif } from "@/lib/data";
import { simpanSesiSiswa } from "@/lib/siswa-session";

export const KODE_DEMO = kelasAktif.kode_akses;

/** Form masuk siswa: validasi kode via API, lalu simpan session & arahkan ke kelas. */
export function StudentEntryForm({ kodeAwal = "" }: { kodeAwal?: string }) {
  const router = useRouter();
  const [kode, setKode] = useState(kodeAwal);
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [memuat, setMemuat] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const kodeBersih = kode.trim().toUpperCase();
    const namaBersih = nama.trim() || "Siswa";
    setMemuat(true);
    setPesan("");

    try {
      const res = await fetch("/api/siswa/masuk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kodeKelas: kodeBersih, namaSiswa: namaBersih }),
      });
      const json = (await res.json()) as {
        ok: boolean;
        error?: string;
        data?: { kelas?: { kode_akses?: string } };
      };

      if (!res.ok || !json.ok) {
        // Fallback: kode demo tetap diterima saat database belum tersedia.
        if (kodeBersih !== KODE_DEMO) {
          setPesan(json.error ?? "Kode kelas tidak ditemukan. Coba periksa lagi.");
          return;
        }
      }
      simpanSesiSiswa(kodeBersih, namaBersih);
      router.push("/siswa/kelas");
    } catch {
      // Jaringan gagal total — pakai kode demo agar demo tetap berjalan.
      if (kodeBersih === KODE_DEMO) {
        simpanSesiSiswa(kodeBersih, namaBersih);
        router.push("/siswa/kelas");
      } else {
        setPesan("Tidak dapat terhubung. Periksa koneksimu.");
      }
    } finally {
      setMemuat(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 flex flex-col gap-2">
        <label htmlFor="code" className="text-[11px] font-bold">
          Kode kelas
        </label>
        <input
          id="code"
          name="kode"
          className="field"
          placeholder="Contoh: HB2026"
          maxLength={8}
          autoComplete="off"
          value={kode}
          onChange={(e) => setKode(e.target.value)}
          required
        />
        <small className="text-muted">
          Gunakan kode yang dibagikan oleh gurumu. Contoh demo:{" "}
          <b className="text-ink">{KODE_DEMO}</b>
        </small>
      </div>
      <div className="mb-5 flex flex-col gap-2">
        <label htmlFor="student" className="text-[11px] font-bold">
          Namamu
        </label>
        <input
          id="student"
          name="nama"
          className="field"
          placeholder="Tulis nama panggilanmu"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
        <small className="text-muted">
          Nama ini akan muncul di catatan latihanmu.
        </small>
      </div>
      {pesan && (
        <p
          role="alert"
          className="mb-4 border-l-[3px] border-coral bg-[#fbe9e2] px-3 py-2 text-[11px] text-[#8a4534]"
        >
          {pesan}
        </p>
      )}
      <button type="submit" disabled={memuat} className="btn btn-coral disabled:opacity-50">
        {memuat ? "Memeriksa kode..." : "Masuk ke kelas"}
        {!memuat && <span className="pl-1 text-base">→</span>}
      </button>
    </form>
  );
}