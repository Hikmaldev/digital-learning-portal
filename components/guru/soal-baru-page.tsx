"use client";

import { useEffect, useState } from "react";
import { FooterSimple } from "../footer-simple";
import { TopBar } from "../top-bar";

const OPSI = 4;
const DRAFT_KUNCI = "rb_draft_soal";

interface SoalDraft {
  id: number;
  pertanyaan: string;
  benar: number;
  [key: string]: number | string;
}

interface KelasRingkas {
  id: string;
  nama: string;
  jenjang: string;
  kode: string;
}

interface BabRingkas {
  id: string;
  judul: string;
  mataPelajaran: string;
  urutan: number;
}

export function SoalBaruPage() {
  const [soal, setSoal] = useState<SoalDraft[]>([
    { id: 1, pertanyaan: "Apa yang dimaksud dengan gagasan utama?", benar: 0, o0: "Ide pokok atau inti pembahasan paragraf", o1: "Kalimat yang paling panjang", o2: "Contoh dalam bacaan", o3: "Kata-kata sulit" },
    { id: 2, pertanyaan: "", benar: 0, o0: "", o1: "", o2: "", o3: "" },
  ]);
  const [kelasList, setKelasList] = useState<KelasRingkas[]>([]);
  const [kelasId, setKelasId] = useState("");
  const [babList, setBabList] = useState<BabRingkas[]>([]);
  const [babId, setBabId] = useState("");
  const [memuat, setMemuat] = useState(false);
  const [pesan, setPesan] = useState<{ jenis: "ok" | "info" | "eror"; teks: string } | null>(null);

  // Muat daftar kelas (dari sesi guru; fallback demo bila tanpa DB).
  useEffect(() => {
    let aktif = true;
    fetch("/api/guru/kelas")
      .then((r) => (r.ok ? r.json() : null))
      .then((jk) => {
        if (!aktif) return;
        const daftar = Array.isArray(jk?.data?.kelas)
          ? (jk.data.kelas as KelasRingkas[])
          : [];
        if (daftar.length > 0) {
          setKelasList(daftar);
          setKelasId(daftar[0].id);
        }
      })
      .catch(() => undefined);
    return () => {
      aktif = false;
    };
  }, []);

  // Bab untuk kelas terpilih.
  useEffect(() => {
    let aktif = true;
    if (!kelasId) return;
    fetch(`/api/guru/bab?kelasId=${encodeURIComponent(kelasId)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((jb) => {
        if (!aktif) return;
        if (jb?.ok && Array.isArray(jb.data?.bab) && jb.data.bab.length > 0) {
          setBabList(jb.data.bab as BabRingkas[]);
          setBabId(String(jb.data.bab[0].id));
          setPesan(null);
        } else {
          setBabList([]);
          setBabId("");
        }
      })
      .catch(() => {
        if (aktif) {
          setBabList([]);
          setBabId("");
        }
      });
    return () => {
      aktif = false;
    };
  }, [kelasId]);

  function ubah(id: number, field: string, nilai: string) {
    setSoal((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: nilai } : s))
    );
    setPesan(null);
  }

  function tandaiBenar(id: number, index: number) {
    setSoal((prev) =>
      prev.map((s) => (s.id === id ? { ...s, benar: index } : s))
    );
  }

  function tambahSoal() {
    const id = soal.length + 1;
    setSoal((prev) => [
      ...prev,
      { id, pertanyaan: "", benar: 0, o0: "", o1: "", o2: "", o3: "" },
    ]);
  }

  function hapusSoal(id: number) {
    setSoal((prev) => prev.filter((s) => s.id !== id));
  }

  async function simpan(e: React.FormEvent) {
    e.preventDefault();
    setMemuat(true);
    setPesan(null);

    if (!babId) {
      setMemuat(false);
      setPesan({
        jenis: "eror",
        teks: "Pilih kelas dan bab dulu — kelas ini belum punya bab, buat materi lebih dulu.",
      });
      return;
    }

    const payload = {
      babId,
      soal: soal.map((s) => ({
        pertanyaan: String(s.pertanyaan).trim(),
        opsi: Array.from({ length: OPSI }, (_, i) => String(s[`o${i}`] ?? "").trim())
          .filter((teks) => teks.length > 0)
          .map((teks) => ({ teks })),
        indexBenar: s.benar,
      })),
    };

    try {
      const res = await fetch("/api/guru/soal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (res.ok && json.ok) {
        setPesan({ jenis: "ok", teks: "✓ Latihan soal tersimpan & diterbitkan." });
        return;
      }
      if (res.status === 503) {
        sessionStorage.setItem(DRAFT_KUNCI, JSON.stringify(payload));
        setPesan({
          jenis: "info",
          teks: "Database belum aktif — latihan disimpan sebagai draft lokal di perangkat ini.",
        });
        return;
      }
      setPesan({ jenis: "eror", teks: json.error ?? "Data tidak valid. Periksa kembali isianmu." });
    } catch {
      sessionStorage.setItem(DRAFT_KUNCI, JSON.stringify(payload));
      setPesan({
        jenis: "info",
        teks: "Tidak dapat terhubung — latihan disimpan sebagai draft lokal di perangkat ini.",
      });
    } finally {
      setMemuat(false);
    }
  }

  const namaKelasTerpilih =
    kelasList.find((k) => k.id === kelasId)?.nama ?? "Kelas pilihanmu";
  const pilihanKelas =
    kelasList.length > 0
      ? kelasList.map((k) => (
          <option key={k.id} value={k.id}>
            {k.nama} · {k.jenjang}
          </option>
        ))
      : [
          <option key="memuat" value="">
            Memuat kelas…
          </option>,
        ];

  const pilihanBab =
    babList.length > 0
      ? babList.map((b) => (
          <option key={b.id} value={b.id}>
            {b.mataPelajaran} · {b.judul}
          </option>
        ))
      : [
          <option key="kosong" value="">
            Belum ada bab — buat materi dulu di kelas ini
          </option>,
        ];

  return (
    <>
      <TopBar
        nav={[
          { href: "/guru/dashboard", label: "Dashboard" },
          { href: "/guru/materi/baru", label: "Materi" },
          { href: "/guru/soal/baru", label: "Latihan soal", aktif: true },
        ]}
        aksi={{ href: "/guru/dashboard", label: "Dashboard" }}
      />
      <main className="mx-auto w-full max-w-[1280px] px-5 py-12 md:px-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow eyebrow-muted mb-2.5">
              Kelola latihan · {namaKelasTerpilih}
            </p>
            <h1 className="text-[38px] leading-none tracking-[-2px]">
              Buat latihan <em className="font-display text-coral">soal.</em>
            </h1>
            <p className="mt-2.5 text-[13px] text-muted">
              Buat pertanyaan pilihan ganda yang langsung bisa dinilai
              otomatis.
            </p>
          </div>
          <button form="form-soal" type="submit" className="btn btn-coral self-start" disabled={memuat}>
            {memuat ? "Menyimpan..." : "Simpan latihan "}
            {!memuat && <span className="pl-1 text-base">→</span>}
          </button>
        </div>

        <form id="form-soal" onSubmit={simpan}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="panel p-6 md:p-8">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl tracking-tight">Soal latihan</h2>
                <button type="button" onClick={tambahSoal} className="btn btn-outline px-3 py-2">
                  + Tambah soal
                </button>
              </div>

              {soal.map((s, idx) => (
                <fieldset
                  key={s.id}
                  className="border-t border-line py-6 first:border-t-0 first:pt-0"
                >
                  <div className="mb-4 flex items-center justify-between text-[11px] font-bold">
                    <span>SOAL {String(idx + 1).padStart(2, "0")}</span>
                    <span className="flex items-center gap-4">
                      <span className="font-normal text-muted">Pilihan ganda</span>
                      {soal.length > 1 && (
                        <button
                          type="button"
                          onClick={() => hapusSoal(s.id)}
                          className="cursor-pointer border-0 bg-transparent text-[10px] font-bold text-coral"
                        >
                          Hapus
                        </button>
                      )}
                    </span>
                  </div>
                  <label className="mb-2 block text-[10px] font-bold text-ink">
                    Pertanyaan
                  </label>
                  <textarea
                    className="field min-h-[90px]"
                    placeholder="Tulis pertanyaan..."
                    value={s.pertanyaan}
                    onChange={(e) => ubah(s.id, "pertanyaan", e.target.value)}
                  />
                  <label className="mt-4 block text-[10px] text-muted">
                    Pilihan jawaban · tandai satu jawaban yang benar
                  </label>
                  {Array.from({ length: OPSI }, (_, i) => (
                    <div key={i} className="mt-2.5 flex items-center gap-2.5">
                      <input
                        type="radio"
                        name={`benar-${s.id}`}
                        checked={s.benar === i}
                        onChange={() => tandaiBenar(s.id, i)}
                        className="accent-coral"
                        aria-label={`Soal ${idx + 1} pilihan ${String.fromCharCode(65 + i)} benar`}
                      />
                      <input
                        type="text"
                        className="min-w-0 flex-1 border border-line bg-paper px-3 py-2.5 text-xs outline-none focus:border-coral"
                        placeholder={`Pilihan ${String.fromCharCode(65 + i)}`}
                        value={String(s[`o${i}`])}
                        onChange={(e) => ubah(s.id, `o${i}`, e.target.value)}
                      />
                    </div>
                  ))}
                </fieldset>
              ))}
            </div>

            <aside className="flex flex-col gap-4">
              <div className="panel self-start p-5">
                <p className="eyebrow eyebrow-muted mb-4">Pengaturan latihan</p>
                <div className="mb-4 flex flex-col gap-2">
                  <label htmlFor="kelas" className="text-[11px] font-bold">
                    Kelas
                  </label>
                  <select
                    id="kelas"
                    className="field"
                    value={kelasId}
                    onChange={(e) => {
                      setKelasId(e.target.value);
                      setBabId("");
                      setPesan(null);
                    }}
                  >
                    {pilihanKelas}
                  </select>
                </div>
                <div className="mb-4 flex flex-col gap-2">
                  <label htmlFor="bab" className="text-[11px] font-bold">
                    Bab terkait
                  </label>
                  <select
                    id="bab"
                    className="field"
                    value={babId}
                    onChange={(e) => {
                      setBabId(e.target.value);
                      setPesan(null);
                    }}
                  >
                    {pilihanBab}
                  </select>
                </div>
                <div className="mb-4 flex flex-col gap-2">
                  <label htmlFor="waktu" className="text-[11px] font-bold">
                    Waktu pengerjaan
                  </label>
                  <select id="waktu" className="field">
                    <option>Tidak dibatasi</option>
                    <option>15 menit</option>
                    <option>30 menit</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3.5">
                  <label className="flex items-start gap-2.5 text-[11px] text-muted">
                    <input type="checkbox" defaultChecked className="mt-1 accent-coral" />
                    Tampilkan nilai setelah submit
                  </label>
                  <label className="flex items-start gap-2.5 text-[11px] text-muted">
                    <input type="checkbox" defaultChecked className="mt-1 accent-coral" />
                    Izinkan mengulang latihan
                  </label>
                </div>
              </div>
              <div className="panel self-start p-5">
                <p className="eyebrow eyebrow-muted mb-3">Ringkasan</p>
                <p className="text-[11px] leading-relaxed text-muted">
                  {soal.length} soal dibuat
                  <br />
                  {soal.filter((s) => s.pertanyaan.trim()).length} pertanyaan
                  terisi
                  <br />
                  {soal.filter((s) => Array.from({ length: OPSI }, (_, i) => String(s[`o${i}`]).trim()).some(Boolean)).length}{" "}
                  soal berisi opsi jawaban
                  <br />
                  <br />
                  Tambahkan minimal 3 soal agar latihan lebih bermakna.
                </p>
              </div>
              {pesan && (
                <p
                  role="status"
                  className={`border-l-[3px] px-3 py-2.5 text-[11px] font-bold ${
                    pesan.jenis === "ok"
                      ? "border-leafgreen bg-[#e2ead8] text-[#536b55]"
                      : pesan.jenis === "info"
                        ? "border-yellow bg-[#f9efc9] text-[#73633a]"
                        : "border-coral bg-[#fbe9e2] text-[#8a4534]"
                  }`}
                >
                  {pesan.teks}
                </p>
              )}
            </aside>
          </div>
        </form>
      </main>
      <FooterSimple />
    </>
  );
}