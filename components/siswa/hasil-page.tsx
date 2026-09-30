"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FooterSimple } from "@/components/footer-simple";
import { TopBar } from "@/components/top-bar";
import { ProgressBar } from "@/components/ui";
import { bacaSessionStorage } from "@/lib/session-state";
import { bacaKodeKelas } from "@/lib/siswa-session";
import type { HasilLatihan } from "@/lib/data";

const KUNCI_HASIL = "rb_hasil_latihan";

const labelSingkat = (pertanyaan: string) => {
  if (pertanyaan.includes("pengertian")) return "Pengertian gagasan utama";
  if (pertanyaan.includes("dapat ditemukan")) return "Letak gagasan utama";
  if (pertanyaan.includes("kalimat penjelas")) return "Kalimat penjelas";
  if (pertanyaan.includes("Langkah pertama")) return "Cara membaca paragraf";
  return "Menyimpulkan bacaan";
};

export function HasilLatihanPage() {
  const router = useRouter();
  // Inisialisasi lazy dari sessionStorage (SSR-safe), tanpa setState di efek.
  const [hasil] = useState<HasilLatihan | null>(() =>
    bacaSessionStorage<HasilLatihan | null>(KUNCI_HASIL, null)
  );
  const kodeKelas = bacaKodeKelas();

  useEffect(() => {
    if (!hasil) router.replace("/siswa/latihan");
  }, [hasil, router]);

  if (!hasil) {
    return (
      <main className="grid min-h-[60vh] place-items-center text-sm text-muted">
        Memuat hasil...
      </main>
    );
  }

  return (
    <>
      <TopBar
        nav={[
          { href: "/siswa/kelas", label: "Kelas saya" },
          { href: `/siswa/materi?kode=${kodeKelas}`, label: "Materi" },
          { href: `/siswa/latihan?kode=${kodeKelas}`, label: "Latihan", aktif: true },
        ]}
        aksi={{ href: "/siswa/kelas", label: "Kembali ke kelas" }}
      />
      <main className="mx-auto max-w-[780px] px-5 py-14 md:py-20">
        <div className="text-center">
          <div className="mx-auto mb-5 grid size-[66px] place-items-center rounded-full bg-sage text-3xl">
            ✓
          </div>
          <p className="eyebrow mb-3.5">Latihan tersimpan</p>
          <h1 className="text-[43px] leading-tight tracking-[-2px]">
            Bagus, {hasil.nama}.
            <br />
            <em className="font-display text-coral">Satu langkah selesai.</em>
          </h1>
          <p className="mt-3 text-[13px] text-muted">
            Hasil latihanmu untuk {hasil.mataPelajaran} · {hasil.bab} sudah
            dicatat.
          </p>
        </div>

        <div className="my-8 grid grid-cols-1 items-center gap-8 bg-ink p-7 text-paper md:grid-cols-[180px_1fr]">
          <div>
            <strong className="block text-[59px] leading-none tracking-[-4px] text-yellow">
              {hasil.skor}
            </strong>
            <span className="text-[10px] text-[#b6c2b9]">NILAI LATIHAN</span>
          </div>
          <div>
            <p className="text-[11px] text-[#c2ccc4]">
              Jawaban benar:{" "}
              <b className="text-yellow">
                {hasil.benar} dari {hasil.jumlahSoal} soal
              </b>
            </p>
            <ProgressBar
              progres={hasil.skor}
              color="bg-coral"
              className="h-[11px] bg-[#56655d]"
            />
            <p className="mt-2.5 text-[11px] text-[#c2ccc4]">
              Teruskan latihanmu. Setiap jawaban membantumu memahami materi
              lebih baik.
            </p>
          </div>
        </div>

        <div className="border border-line bg-paper">
          <h2 className="border-b border-line px-6 py-5 text-[19px] tracking-tight">
            Ringkasan jawaban
          </h2>
          {hasil.rincian.map((r) => (
            <div
              key={r.nomor}
              className="flex items-center justify-between border-b border-line px-6 py-3.5 text-xs last:border-0"
            >
              <span className="text-muted">
                {String(r.nomor).padStart(2, "0")} · {labelSingkat(r.label)}
              </span>
              <b className={r.benar ? "text-leafgreen" : "text-coral"}>
                {r.benar ? "Benar ✓" : "Salah · Pelajari lagi"}
              </b>
            </div>
          ))}
        </div>

        <div className="mt-7 flex justify-center gap-3">
          <Link href={`/siswa/materi?kode=${kodeKelas}`} className="btn btn-outline">
            Baca materi lagi
          </Link>
          <Link href="/siswa/kelas" className="btn btn-coral">
            Kembali ke kelas <span className="pl-1 text-base">→</span>
          </Link>
        </div>
      </main>
      <FooterSimple />
    </>
  );
}