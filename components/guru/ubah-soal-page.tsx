"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FooterSimple } from "../footer-simple";
import { TopBar } from "../top-bar";

export interface SoalAwal {
  id: string;
  pertanyaan: string;
  opsi: { id: string; teks: string; is_benar: boolean }[];
}

interface Props {
  soalAwal: SoalAwal;
  kelasId: string;
  kelasKode: string;
  kelasNama: string;
  babId: string;
  babJudul: string;
  babUrutan: number;
  mapel: string;
  nomor: number;
}

let keyBaru = 0;

/**
 * Form ubah satu soal pilihan ganda: pertanyaan + opsi + kunci jawaban.
 * PATCH /api/guru/soal/:soalId — opsi lama diperbarui, opsi baru dibuat.
 */
export function UbahSoalPage({
  soalAwal,
  kelasId,
  kelasKode,
  kelasNama,
  babId,
  babJudul,
  babUrutan,
  mapel,
  nomor,
}: Props) {
  const router = useRouter();
  const [pertanyaan, setPertanyaan] = useState(soalAwal.pertanyaan);
  const [opsi, setOpsi] = useState<{ key: number; id?: string; teks: string }[]>(
    soalAwal.opsi.map((o) => ({ key: keyBaru++, id: o.id, teks: o.teks }))
  );
  const [indexBenar, setIndexBenar] = useState(() => {
    const idx = soalAwal.opsi.findIndex((o) => o.is_benar);
    return idx >= 0 ? idx : 0;
  });
  const [memuat, setMemuat] = useState(false);
  const [pesan, setPesan] = useState<{ jenis: "ok" | "eror"; teks: string } | null>(null);

  const hrefDashboard = `/guru/dashboard?kode=${encodeURIComponent(kelasKode)}`;
  const hrefMateri = `/guru/materi?kelasId=${encodeURIComponent(kelasId)}`;
  const hrefSoal = `/guru/soal?kelasId=${encodeURIComponent(kelasId)}&babId=${encodeURIComponent(babId)}`;

  function ubahTeks(key: number, teks: string) {
    setOpsi((prev) => prev.map((o) => (o.key === key ? { ...o, teks } : o)));
    setPesan(null);
  }

  function tambahOpsi() {
    if (opsi.length >= 6) return;
    setOpsi((prev) => [...prev, { key: keyBaru++, teks: "" }]);
    setPesan(null);
  }

  function hapusOpsi(key: number) {
    if (opsi.length <= 2) return;
    const idx = opsi.findIndex((o) => o.key === key);
    setOpsi((prev) => prev.filter((o) => o.key !== key));
    setIndexBenar((prev) => {
      if (idx < prev) return prev - 1;
      if (idx === prev) return 0;
      return prev;
    });
    setPesan(null);
  }

  async function simpan(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pertanyaan.trim().length < 5) {
      setPesan({ jenis: "eror", teks: "Pertanyaan minimal 5 karakter." });
      return;
    }
    if (opsi.some((o) => !o.teks.trim())) {
      setPesan({ jenis: "eror", teks: "Semua opsi jawaban harus diisi." });
      return;
    }

    setMemuat(true);
    setPesan(null);
    try {
      const res = await fetch(
        `/api/guru/soal/${encodeURIComponent(soalAwal.id)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pertanyaan: pertanyaan.trim(),
            opsi: opsi.map((o) => ({ id: o.id, teks: o.teks.trim() })),
            indexBenar,
          }),
        }
      );
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (res.ok && json.ok) {
        router.push(hrefSoal);
        return;
      }
      setPesan({
        jenis: "eror",
        teks:
          json.error ??
          (res.status === 401
            ? "Sesi berakhir — silakan masuk ulang."
            : "Gagal menyimpan perubahan. Coba lagi."),
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
          { href: hrefDashboard, label: "Dashboard" },
          { href: hrefMateri, label: "Materi" },
          { href: hrefSoal, label: "Latihan soal", aktif: true },
          { href: "/guru/akun", label: "Akun" },
        ]}
        aksi={{ href: hrefSoal, label: "Daftar soal" }}
      />
      <main className="mx-auto w-full max-w-[780px] px-5 py-12 md:px-10">
        <div className="mb-8">
          <p className="eyebrow eyebrow-muted mb-2.5">
            {kelasNama} · {mapel} · Bab{" "}
            {String(babUrutan ?? 0).padStart(2, "0")} — {babJudul}
          </p>
          <h1 className="text-[38px] leading-none tracking-[-2px]">
            Ubah <em className="font-display text-coral">soal.</em>
          </h1>
          <p className="mt-2.5 text-[13px] text-muted">
            Soal nomor {String(nomor ?? 0).padStart(2, "0")} pada bab ini.
          </p>
        </div>

        <form onSubmit={simpan} className="panel px-6 py-7 md:px-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="pertanyaan" className="text-[11px] font-bold">
              Pertanyaan
            </label>
            <textarea
              id="pertanyaan"
              className="field min-h-[90px]"
              value={pertanyaan}
              onChange={(e) => {
                setPertanyaan(e.target.value);
                setPesan(null);
              }}
              required
            />
          </div>

          <div className="mt-6 border-t border-line pt-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] font-bold">
                Pilihan jawaban · tandai satu jawaban yang benar
              </p>
              <button
                type="button"
                onClick={tambahOpsi}
                disabled={opsi.length >= 6}
                className="btn btn-outline px-3 py-2 text-[11px] disabled:opacity-40"
              >
                + Opsi
              </button>
            </div>

            {opsi.map((o, idx) => (
              <div key={o.key} className="mb-2.5 flex items-center gap-2.5">
                <input
                  type="radio"
                  name="benar"
                  checked={indexBenar === idx}
                  onChange={() => setIndexBenar(idx)}
                  className="accent-coral"
                  aria-label={`Opsi ${String.fromCharCode(65 + idx)} jawaban benar`}
                />
                <input
                  type="text"
                  className="min-w-0 flex-1 border border-line bg-paper px-3 py-2.5 text-xs outline-none focus:border-coral"
                  placeholder={`Pilihan ${String.fromCharCode(65 + idx)}`}
                  value={o.teks}
                  onChange={(e) => ubahTeks(o.key, e.target.value)}
                />
                {opsi.length > 2 && (
                  <button
                    type="button"
                    onClick={() => hapusOpsi(o.key)}
                    className="cursor-pointer border-0 bg-transparent text-[10px] font-bold text-coral"
                  >
                    Hapus
                  </button>
                )}
              </div>
            ))}
          </div>

          {pesan && (
            <p
              role="status"
              className={`mt-5 border-l-[3px] px-3 py-2.5 text-[11px] font-bold ${
                pesan.jenis === "ok"
                  ? "border-leafgreen bg-[#e2ead8] text-[#536b55]"
                  : "border-coral bg-[#fbe9e2] text-[#8a4534]"
              }`}
            >
              {pesan.teks}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
            <button type="submit" className="btn btn-coral" disabled={memuat}>
              {memuat ? "Menyimpan..." : "Simpan perubahan"}
            </button>
            <Link href={hrefSoal} className="btn btn-outline">
              Batal
            </Link>
          </div>
        </form>

        <Link
          href={hrefSoal}
          className="mt-6 inline-block text-[11px] text-muted hover:underline"
        >
          ← Kembali ke daftar soal bab ini
        </Link>
      </main>
      <FooterSimple />
    </>
  );
}
