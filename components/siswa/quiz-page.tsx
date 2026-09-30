"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FooterSimple } from "@/components/footer-simple";
import { TopBar } from "@/components/top-bar";
import { useSessionState } from "@/lib/session-state";
import { kelasAktif, namaSiswaDemo } from "@/lib/data";
import type { HasilLatihan } from "@/lib/data";

export interface QuizSoal {
  id: string;
  pertanyaan: string;
  opsi: { id: string; teks: string }[];
}

interface Props {
  soal: QuizSoal[];
  /** Kunci jawaban hanya tersedia saat soal dari data contoh (tanpa DB). */
  kunciLokal: Record<string, string> | null;
}

const KUNCI_DRAFT = "rb_draft_latihan";
const KUNCI_HASIL = "rb_hasil_latihan";
const BAB_ID = "bab-bindo-3";

export function QuizPage({ soal, kunciLokal }: Props) {
  const router = useRouter();
  const [jawaban, setJawaban] = useSessionState<Record<string, string>>(
    KUNCI_DRAFT,
    {}
  );
  const [tersimpan, setTersimpan] = useState(false);
  const [mengirim, setMengirim] = useState(false);
  const [gagal, setGagal] = useState("");

  useEffect(() => {
    if (!tersimpan) return;
    const timer = window.setTimeout(() => setTersimpan(false), 1800);
    return () => window.clearTimeout(timer);
  }, [tersimpan]);

  const terjawab = Object.keys(jawaban).length;

  function pilih(soalId: string, opsiId: string) {
    setJawaban((prev) => ({ ...prev, [soalId]: opsiId }));
    setTersimpan(true);
    setGagal("");
  }

  function kumpulkan(e: React.FormEvent) {
    e.preventDefault();
    void kirimJawaban();
  }

  /** Kirim ke API untuk dinilai & disimpan; fallback hitung lokal bila ada kunci. */
  async function kirimJawaban() {
    setMengirim(true);
    setGagal("");
    const namaSiswa = sessionStorage.getItem("rb_nama_siswa") ?? namaSiswaDemo;
    const kodeKelas = sessionStorage.getItem("rb_kode_kelas") ?? kelasAktif.kode_akses;

    let hasil: HasilLatihan;
    try {
      const res = await fetch("/api/siswa/latihan/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kodeKelas,
          namaSiswa,
          babId: BAB_ID,
          jawaban,
        }),
      });
      const json = (await res.json()) as { ok: boolean; data?: HasilLatihan };
      if (!res.ok || !json.ok || !json.data) throw new Error("Gagal mengirim");
      hasil = json.data;
    } catch {
      // Server tidak terjangkau. Hitung lokal hanya bila kunci tersedia
      // (mode data contoh); jika tidak, beri tahu siswa dan simpan draft.
      if (!kunciLokal) {
        setGagal(
          "Tidak dapat terhubung ke server. Jawabanmu tetap tersimpan — coba kirim lagi."
        );
        setMengirim(false);
        return;
      }
      let benar = 0;
      const rincian = soal.map((s, i) => {
        const benarSoal = jawaban[s.id] === kunciLokal[s.id];
        if (benarSoal) benar += 1;
        return { nomor: i + 1, label: s.pertanyaan, benar: benarSoal };
      });
      hasil = {
        nama: namaSiswa,
        mataPelajaran: "Bahasa Indonesia",
        bab: "Bab 03",
        skor: Math.round((benar / Math.max(soal.length, 1)) * 100),
        benar,
        jumlahSoal: soal.length,
        rincian,
        waktuSubmit: new Date().toLocaleString("id-ID"),
      };
    }
    sessionStorage.setItem(KUNCI_HASIL, JSON.stringify(hasil));
    sessionStorage.removeItem(KUNCI_DRAFT);
    setMengirim(false);
    router.push("/siswa/latihan/hasil");
  }

  return (
    <>
      <TopBar
        nav={[
          { href: "/siswa/kelas", label: "Kelas saya" },
          { href: "/siswa/materi", label: "Materi" },
          { href: "/siswa/latihan", label: "Latihan", aktif: true },
        ]}
        aksi={{ href: "/siswa/materi", label: "Kembali ke materi" }}
      />
      <main className="mx-auto max-w-[1180px] px-5 py-12 md:px-10">
        <nav
          aria-label="Jejak rute"
          className="mb-7 flex items-center gap-2.5 text-[11px] text-muted"
        >
          <Link className="hover:underline" href="/siswa/kelas">
            Kelas Harapan Bersama
          </Link>
          <span className="text-[#a3aaa1]">/</span>
          <Link className="hover:underline" href="/siswa/materi">
            Bahasa Indonesia · Bab 03
          </Link>
          <span className="text-[#a3aaa1]">/</span>
          <span>Latihan</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_245px]">
          <form onSubmit={kumpulkan} className="panel px-6 py-8 md:px-9">
            <div className="mb-6 flex items-center justify-between border-b border-line pb-5 text-[11px] text-muted">
              <span>BAHASA INDONESIA · BAB 03</span>
              <strong className="text-ink">
                {terjawab} dari {soal.length} soal
              </strong>
            </div>

            {soal.map((soalItem, idx) => (
              <fieldset
                key={soalItem.id}
                className="border-t border-line py-6 first:border-t-0 first:pt-0"
              >
                <legend className="mb-4 px-0 text-[16px] font-bold leading-snug tracking-tight">
                  {String(idx + 1).padStart(2, "0")}. {soalItem.pertanyaan}
                </legend>
                {soalItem.opsi.map((opsi) => (
                  <label
                    key={opsi.id}
                    className={`mb-2 flex cursor-pointer items-center gap-3 border px-3.5 py-3 text-xs hover:border-coral hover:bg-[#fff8ee] ${
                      jawaban[soalItem.id] === opsi.id
                        ? "border-coral bg-[#fff2e8]"
                        : "border-line"
                    }`}
                  >
                    <input
                      type="radio"
                      name={soalItem.id}
                      value={opsi.id}
                      checked={jawaban[soalItem.id] === opsi.id}
                      onChange={() => pilih(soalItem.id, opsi.id)}
                      className="accent-coral"
                    />
                    {opsi.teks}
                  </label>
                ))}
              </fieldset>
            ))}

            <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
              <span className="text-[10px] text-muted">
                {tersimpan
                  ? "✓ Draft tersimpan di perangkatmu."
                  : "Jawaban tersimpan sementara di perangkatmu."}
              </span>
              <button
                type="submit"
                disabled={terjawab < soal.length || mengirim}
                className="btn btn-coral disabled:cursor-not-allowed disabled:opacity-40"
              >
                {mengirim ? "Mengirim..." : "Kirim jawaban"}{" "}
                {!mengirim && <span className="pl-1 text-base">→</span>}
              </button>
            </div>
            {gagal && (
              <p
                role="alert"
                className="mt-4 border-l-[3px] border-coral bg-[#fbe9e2] px-3 py-2 text-[11px] text-[#8a4534]"
              >
                {gagal}
              </p>
            )}
          </form>

          <aside className="flex flex-col gap-4">
            <div className="panel self-start p-5">
              <p className="eyebrow eyebrow-muted mb-3">Progres latihan</p>
              <h3 className="mb-4 text-base tracking-tight">Gagasan utama</h3>
              <div className="grid grid-cols-5 gap-1.5">
                {soal.map((soalItem, i) => (
                  <span
                    key={soalItem.id}
                    className={`grid h-7 place-items-center text-[10px] ${
                      jawaban[soalItem.id]
                        ? "bg-sage text-ink"
                        : "bg-[#eeeee7] text-muted"
                    }`}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-[11px] leading-relaxed text-muted">
                Pilih satu jawaban yang paling tepat untuk setiap soal.
              </p>
            </div>
            <div className="panel p-5">
              <p className="eyebrow eyebrow-muted mb-3">Butuh bantuan?</p>
              <p className="mb-4 text-[11px] leading-relaxed text-muted">
                Baca kembali materi bab ini sebelum mengirim jawaban. Kamu bisa
                kembali tanpa kehilangan jawaban sementara.
              </p>
              <Link href="/siswa/materi" className="text-xs font-bold text-coral">
                Baca materi lagi <span className="pl-1 text-base">→</span>
              </Link>
            </div>
          </aside>
        </div>
      </main>
      <FooterSimple />
    </>
  );
}