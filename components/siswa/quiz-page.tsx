"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FooterSimple } from "@/components/footer-simple";
import { TopBar } from "@/components/top-bar";
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
  /** ID bab asli (database) tempat hasil latihan disimpan. */
  babId: string;
  mapel: string;
  labelBab: string;
  kelasNama: string;
  kodeKelas: string;
  namaSiswa?: string;
}

/** Kunci draft versi lama (global) — dibersihkan agar tidak mengacaukan hitungan. */
const KUNCI_DRAFT_LAMA = "rb_draft_latihan";
const KUNCI_HASIL = "rb_hasil_latihan";
/** Batas waktu kirim — koneksi lambat tidak boleh membuat tombol macet. */
const TIMEOUT_KIRIM_MS = 15000;

/** Baca draft bab ini dari perangkat; hanya jawaban yang soalnya masih ada. */
function bacaDraft(kunci: string, soal: QuizSoal[]): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    window.sessionStorage.removeItem(KUNCI_DRAFT_LAMA);
    const mentah = window.sessionStorage.getItem(kunci);
    if (!mentah) return {};
    const isi = JSON.parse(mentah) as Record<string, string>;
    const bersih: Record<string, string> = {};
    for (const s of soal) {
      if (isi[s.id]) bersih[s.id] = isi[s.id];
    }
    return bersih;
  } catch {
    return {};
  }
}

export function QuizPage({
  soal,
  kunciLokal,
  babId,
  mapel,
  labelBab,
  kelasNama,
  kodeKelas,
  namaSiswa: namaSiswaProp,
}: Props) {
  const router = useRouter();

  // Draft dipisah per kelas + bab, jadi jawaban bab lain tidak pernah tercampur.
  const kunciDraft = `rb_draft_latihan:${kodeKelas}:${babId}`;

  // Inisialisasi lazy: draft perangkat dibaca sekali saat mount (setelah
  // hidrasi) sehingga tidak memicu setState di dalam effect.
  const [jawaban, setJawaban] = useState<Record<string, string>>(() =>
    bacaDraft(kunciDraft, soal)
  );
  const [tersimpan, setTersimpan] = useState(false);
  const [mengirim, setMengirim] = useState(false);
  const [gagal, setGagal] = useState("");

  // AUTO-SAVE: setiap perubahan jawaban langsung ditulis ke perangkat siswa.
  useEffect(() => {
    try {
      window.sessionStorage.setItem(kunciDraft, JSON.stringify(jawaban));
    } catch {
      /* penyimpanan tidak tersedia */
    }
  }, [jawaban, kunciDraft]);

  useEffect(() => {
    if (!tersimpan) return;
    const timer = window.setTimeout(() => setTersimpan(false), 1800);
    return () => window.clearTimeout(timer);
  }, [tersimpan]);

  // Hitung hanya jawaban untuk soal bab ini.
  const terjawab = useMemo(
    () => soal.filter((s) => jawaban[s.id]).length,
    [soal, jawaban]
  );
  const sisa = soal.length - terjawab;
  const lengkap = soal.length > 0 && sisa === 0;

  function pilih(soalId: string, opsiId: string) {
    setJawaban((prev) => ({ ...prev, [soalId]: opsiId }));
    setTersimpan(true);
    setGagal("");
  }

  function ulangi() {
    if (!window.confirm("Hapus semua jawaban di bab ini dan mulai dari awal?")) {
      return;
    }
    setJawaban({});
    setTersimpan(false);
    setGagal("");
    try {
      window.sessionStorage.removeItem(kunciDraft);
    } catch {
      /* penyimpanan tidak tersedia */
    }
  }

  function kumpulkan(e: React.FormEvent) {
    e.preventDefault();
    if (!lengkap || mengirim) return;
    void kirimJawaban();
  }

  /** Kirim ke API untuk dinilai & disimpan; fallback hitung lokal bila ada kunci. */
  async function kirimJawaban() {
    setMengirim(true);
    setGagal("");
    const namaSiswa =
      namaSiswaProp ?? sessionStorage.getItem("rb_nama_siswa") ?? namaSiswaDemo;
    // Kode dari URL halaman adalah konteks kelas yang benar; sessionStorage
    // hanya dipakai bila prop tidak tersedia.
    const kodeKirim =
      kodeKelas || sessionStorage.getItem("rb_kode_kelas") || kelasAktif.kode_akses;
    // Kirim hanya jawaban soal bab ini (kunci sisa bab lain tidak ikut).
    const jawabanKirim = Object.fromEntries(
      soal.filter((s) => jawaban[s.id]).map((s) => [s.id, jawaban[s.id]])
    );

    let hasil: HasilLatihan;
    try {
      const kontrol = new AbortController();
      const timer = window.setTimeout(() => kontrol.abort(), TIMEOUT_KIRIM_MS);
      let res: Response;
      try {
        res = await fetch("/api/siswa/latihan/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            kodeKelas: kodeKirim,
            namaSiswa,
            babId,
            jawaban: jawabanKirim,
          }),
          signal: kontrol.signal,
        });
      } finally {
        window.clearTimeout(timer);
      }
      const json = (await res.json()) as { ok: boolean; data?: HasilLatihan };
      if (!res.ok || !json.ok || !json.data) throw new Error("Gagal mengirim");
      hasil = json.data;
    } catch {
      // Server tidak terjangkau / terlalu lama. Hitung lokal hanya bila kunci
      // tersedia (mode data contoh); jika tidak, simpan draft & beri tahu siswa.
      if (!kunciLokal) {
        setGagal(
          "Koneksi ke server terputus atau terlalu lama. Jawabanmu tetap tersimpan otomatis di perangkat ini — tekan “Kirim jawaban” lagi."
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
        mataPelajaran: mapel,
        bab: labelBab,
        babId,
        skor: Math.round((benar / Math.max(soal.length, 1)) * 100),
        benar,
        jumlahSoal: soal.length,
        rincian,
        waktuSubmit: new Date().toLocaleString("id-ID"),
      };
    }
    sessionStorage.setItem(KUNCI_HASIL, JSON.stringify(hasil));
    sessionStorage.removeItem(kunciDraft);
    sessionStorage.removeItem(KUNCI_DRAFT_LAMA);
    setMengirim(false);
    router.push("/siswa/latihan/hasil");
  }

  const namaParam = namaSiswaProp ? `&nama=${encodeURIComponent(namaSiswaProp)}` : "";
  const urlMateri = `/siswa/materi?id=${encodeURIComponent(babId)}&kode=${encodeURIComponent(kodeKelas)}${namaParam}`;
  const urlLatihan = `/siswa/latihan?kode=${encodeURIComponent(kodeKelas)}${namaParam}`;

  return (
    <>
      <TopBar
        nav={[
          { href: "/siswa/kelas", label: "Kelas saya" },
          { href: urlMateri, label: "Materi" },
          { href: urlLatihan, label: "Latihan", aktif: true },
        ]}
        aksi={{ href: urlMateri, label: "Kembali ke materi" }}
      />
      <main className="mx-auto max-w-[1180px] px-5 py-12 md:px-10">
        <nav
          aria-label="Jejak rute"
          className="mb-7 flex items-center gap-2.5 text-[11px] text-muted"
        >
          <Link className="hover:underline" href="/siswa/kelas">
            {kelasNama}
          </Link>
          <span className="text-[#a3aaa1]">/</span>
          <Link className="hover:underline" href={urlMateri}>
            {mapel} · {labelBab}
          </Link>
          <span className="text-[#a3aaa1]">/</span>
          <span>Latihan</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_245px]">
          <form onSubmit={kumpulkan} className="panel px-6 py-8 md:px-9">
            <div className="mb-6 flex items-center justify-between border-b border-line pb-5 text-[11px] text-muted">
              <span>
                {mapel.toUpperCase()} · {labelBab}
              </span>
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

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-muted">
                  {tersimpan
                    ? "✓ Jawaban tersimpan otomatis di perangkatmu."
                    : "Jawaban tersimpan otomatis di perangkatmu."}
                </span>
                {terjawab > 0 && !mengirim && (
                  <button
                    type="button"
                    onClick={ulangi}
                    className="self-start text-[10px] font-bold text-muted underline hover:text-coral"
                  >
                    Ulangi dari awal
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={!lengkap || mengirim}
                className="btn btn-coral disabled:cursor-not-allowed disabled:opacity-40"
              >
                {mengirim
                  ? "Mengirim..."
                  : lengkap
                    ? "Kirim jawaban"
                    : `Jawab ${sisa} soal lagi`}{" "}
                {!mengirim && lengkap && <span className="pl-1 text-base">→</span>}
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
              <h3 className="mb-4 text-base tracking-tight">{mapel}</h3>
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
                Jawabanmu tersimpan otomatis — aman walau halaman ditutup.
              </p>
            </div>
            <div className="panel p-5">
              <p className="eyebrow eyebrow-muted mb-3">Butuh bantuan?</p>
              <p className="mb-4 text-[11px] leading-relaxed text-muted">
                Baca kembali materi bab ini sebelum mengirim jawaban. Kamu bisa
                kembali tanpa kehilangan jawaban sementara.
              </p>
              <div className="flex flex-col gap-2.5">
                <Link
                  href={urlMateri}
                  className="text-xs font-bold text-coral"
                >
                  Baca materi lagi <span className="pl-1 text-base">→</span>
                </Link>
                <Link
                  href={urlLatihan}
                  className="text-xs font-bold text-coral"
                >
                  Latihan bab lain <span className="pl-1 text-base">→</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <FooterSimple />
    </>
  );
}
