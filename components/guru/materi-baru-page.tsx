"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FooterSimple } from "../footer-simple";
import { TopBar } from "../top-bar";

const DRAFT_KUNCI = "rb_draft_materi";

const MAPEL_UMUM = [
  "Bahasa Indonesia",
  "Matematika",
  "Ilmu Pengetahuan Alam",
  "Ilmu Pengetahuan Sosial",
  "Pendidikan Pancasila",
  "Bahasa Inggris",
  "Informatika",
];

interface KelasRingkas {
  id: string;
  nama: string;
  jenjang: string;
  kode: string;
}

export interface MateriAwal {
  id: string;
  kelas_id: string;
  mata_pelajaran: string;
  judul: string;
  ringkasan: string | null;
  konten_materi: string;
  url_video: string | null;
  link_sumber: string | null;
  urutan: number;
}

/**
 * Form materi — dipakai untuk menambah bab baru (mode "baru") dan
 * mengubah bab yang sudah ada (mode "ubah", dikirim dari halaman edit).
 */
export function MateriBaruPage({
  kelasIdAwal,
  materiAwal,
}: {
  kelasIdAwal?: string;
  materiAwal?: MateriAwal;
}) {
  const router = useRouter();
  const modeUbah = Boolean(materiAwal);
  const [terbit, setTerbit] = useState(true);
  const [babBerikutnya, setBabBerikutnya] = useState(true);
  const [tambahLatihan, setTambahLatihan] = useState(false);
  const [kelasList, setKelasList] = useState<KelasRingkas[]>([]);
  const [kelasId, setKelasId] = useState(materiAwal?.kelas_id ?? "");
  const [memuat, setMemuat] = useState(false);
  const [pesan, setPesan] = useState<{ jenis: "ok" | "info" | "eror"; teks: string } | null>(null);

  useEffect(() => {
    fetch("/api/guru/kelas")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (j?.ok && Array.isArray(j.data.kelas)) {
          const daftar = j.data.kelas as KelasRingkas[];
          setKelasList(daftar);
          if (materiAwal) {
            setKelasId(materiAwal.kelas_id);
          } else {
            // Pilih kelas dari ?kelasId= (bila valid milik guru), jika tidak kelas pertama.
            const cocok =
              kelasIdAwal && daftar.some((k) => k.id === kelasIdAwal)
                ? kelasIdAwal
                : daftar[0]?.id;
            setKelasId(String(cocok ?? ""));
          }
        }
      })
      .catch(() => {
        setPesan({ jenis: "eror", teks: "Daftar kelas tidak dapat dimuat dari database." });
      });
  }, [kelasIdAwal, materiAwal]);

  async function simpan(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMemuat(true);
    setPesan(null);
    const form = new FormData(e.currentTarget);

    const payload = {
      kelasId: kelasId || String(form.get("kelas") ?? ""),
      mataPelajaran: String(form.get("mapel") ?? "Bahasa Indonesia"),
      judul: String(form.get("judul") ?? "").trim(),
      ringkasan: String(form.get("ringkasan") ?? "").trim(),
      kontenMateri: String(form.get("konten") ?? "").trim(),
      urutan: Math.max(parseInt(String(form.get("bab") ?? "1"), 10) || 1, 1),
      urlVideo: String(form.get("video") ?? "").trim(),
      linkSumber: String(form.get("sumber") ?? "").trim(),
      terbitkan: terbit,
    };

    try {
      const res =
        modeUbah && materiAwal
          ? await fetch(`/api/guru/materi/${encodeURIComponent(materiAwal.id)}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            })
          : await fetch("/api/guru/materi", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (res.ok && json.ok) {
        // Kembali ke halaman kelola materi agar hasilnya langsung terlihat.
        router.push(`/guru/materi?kelasId=${encodeURIComponent(payload.kelasId)}`);
        return;
      }
      if (res.status === 503) {
        // Database belum aktif — simpan draft lokal agar tidak hilang.
        sessionStorage.setItem(DRAFT_KUNCI, JSON.stringify(payload));
        setPesan({
          jenis: "info",
          teks: "Database belum aktif — materi disimpan sebagai draft lokal di perangkat ini.",
        });
        return;
      }
      setPesan({ jenis: "eror", teks: json.error ?? "Data tidak valid. Periksa kembali isianmu." });
    } catch {
      sessionStorage.setItem(DRAFT_KUNCI, JSON.stringify(payload));
      setPesan({
        jenis: "info",
        teks: "Tidak dapat terhubung — materi disimpan sebagai draft lokal di perangkat ini.",
      });
    } finally {
      setMemuat(false);
    }
  }

  const pilihanKelas = kelasList;
  const kodeKelasTerpilih = pilihanKelas.find((k) => k.id === kelasId)?.kode;
  const namaKelasTerpilih = pilihanKelas.find((k) => k.id === kelasId)?.nama;
  const daftarMapel =
    materiAwal && !MAPEL_UMUM.includes(materiAwal.mata_pelajaran)
      ? [materiAwal.mata_pelajaran, ...MAPEL_UMUM]
      : MAPEL_UMUM;
  const selectKelas =
    pilihanKelas.length > 0
      ? pilihanKelas.map((k) => (
          <option key={k.id} value={k.id}>
            {k.nama} · {k.jenjang}
          </option>
        ))
      : [
          <option key="kosong" value="">
            Belum ada kelas — buat kelas dulu di dashboard
          </option>,
        ];

  // Tautan antar halaman membawa konteks kelas yang sedang dipilih.
  const hrefDashboard = kodeKelasTerpilih
    ? `/guru/dashboard?kode=${encodeURIComponent(kodeKelasTerpilih)}`
    : "/guru/dashboard";
  const hrefMateri = kelasId
    ? `/guru/materi?kelasId=${encodeURIComponent(kelasId)}`
    : "/guru/materi";
  const hrefSoal = kelasId
    ? `/guru/soal/baru?kelasId=${encodeURIComponent(kelasId)}`
    : "/guru/soal/baru";

  return (
    <>
      <TopBar
        nav={[
          { href: hrefDashboard, label: "Dashboard" },
          { href: hrefMateri, label: "Materi", aktif: true },
          { href: hrefSoal, label: "Latihan soal" },
          { href: "/guru/akun", label: "Akun" },
        ]}
        aksi={{ href: hrefDashboard, label: "Dashboard" }}
      />
      <main className="mx-auto w-full max-w-[1180px] px-5 py-12 md:px-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow eyebrow-muted mb-2.5">
              Kelola materi ·{" "}
              {namaKelasTerpilih ??
                (pilihanKelas.length > 0 ? "Pilih kelas di bawah" : "Kelas pilihanmu")}
            </p>
            <h1 className="text-[38px] leading-none tracking-[-2px]">
              {modeUbah ? (
                <>
                  Ubah <em className="font-display text-coral">materi.</em>
                </>
              ) : (
                <>
                  Buat materi{" "}
                  <em className="font-display text-coral">baru.</em>
                </>
              )}
            </h1>
            <p className="mt-2.5 text-[13px] text-muted">
              {modeUbah
                ? "Perbarui isi bab, lalu simpan perubahan."
                : "Susun materi ringkas yang nyaman dibaca siswa lewat HP."}
            </p>
          </div>
          <button type="submit" form="form-materi" className="btn btn-coral self-start" disabled={memuat}>
            {memuat
              ? "Menyimpan..."
              : modeUbah
                ? "Simpan perubahan "
                : "Simpan & terbitkan "}
            {!memuat && <span className="pl-1 text-base">→</span>}
          </button>
        </div>

        <form id="form-materi" onSubmit={simpan}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_285px]">
            <div className="flex flex-col gap-5">
              <section className="panel p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl tracking-tight">Informasi bab</h2>
                  <span
                    className={
                      modeUbah ? "badge-status" : "badge-status badge-status-pending"
                    }
                  >
                    {modeUbah ? "Terbit" : "Draft"}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="kelas" className="text-[11px] font-bold">
                      Kelas
                    </label>
                    <select
                      id="kelas"
                      name="kelas"
                      className="field disabled:opacity-60"
                      value={kelasId}
                      onChange={(e) => setKelasId(e.target.value)}
                      disabled={modeUbah}
                    >
                      {selectKelas}
                    </select>
                    {modeUbah && (
                      <small className="text-[10px] text-muted">
                        Kelas tidak bisa dipindah setelah materi dibuat.
                      </small>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="mapel" className="text-[11px] font-bold">
                      Mata pelajaran
                    </label>
                    <select
                      id="mapel"
                      name="mapel"
                      className="field"
                      defaultValue={materiAwal?.mata_pelajaran ?? "Bahasa Indonesia"}
                    >
                      {daftarMapel.map((m) => (
                        <option key={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="bab" className="text-[11px] font-bold">
                      Nomor bab
                    </label>
                    <input
                      id="bab"
                      name="bab"
                      className="field"
                      defaultValue={materiAwal ? String(materiAwal.urutan) : "04"}
                      inputMode="numeric"
                    />
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <label htmlFor="judul" className="text-[11px] font-bold">
                    Judul bab
                  </label>
                  <input
                    id="judul"
                    name="judul"
                    className="field"
                    placeholder="Contoh: Menyimpulkan isi bacaan"
                    defaultValue={materiAwal?.judul ?? ""}
                    required
                  />
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <label htmlFor="ringkasan" className="text-[11px] font-bold">
                    Ringkasan singkat
                  </label>
                  <input
                    id="ringkasan"
                    name="ringkasan"
                    className="field"
                    placeholder="Satu kalimat yang menjelaskan isi bab"
                    defaultValue={materiAwal?.ringkasan ?? ""}
                  />
                </div>
              </section>

              <section className="panel p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl tracking-tight">Isi materi</h2>
                  <span className="text-[10px] text-muted">
                    Gunakan kalimat sederhana dan ringkas.
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="konten" className="text-[11px] font-bold">
                    Konten materi
                  </label>
                  <textarea
                    id="konten"
                    name="konten"
                    className="field min-h-[145px]"
                    placeholder="Tulis materi pelajaran di sini..."
                    defaultValue={materiAwal?.konten_materi ?? ""}
                    required
                  />
                </div>
                <div className="mt-4 grid min-h-[130px] place-items-center border border-dashed border-[#aeb4a8] bg-[#f9f8f1] p-4 text-center">
                  <div>
                    <strong className="block text-xs">
                      Tambahkan gambar pendukung
                    </strong>
                    <span className="text-[11px] text-muted">
                      PNG atau JPG · maksimal 2 MB · terhubung dengan Vercel
                      Blob (Fase 2)
                    </span>
                    <br />
                    <button type="button" className="btn btn-outline mt-3">
                      Pilih gambar
                    </button>
                  </div>
                </div>
              </section>

              <section className="panel p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl tracking-tight">Referensi tambahan</h2>
                  <span className="text-[10px] text-muted">Opsional</span>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="video" className="text-[11px] font-bold">
                    Link video YouTube
                  </label>
                  <input
                    id="video"
                    name="video"
                    type="url"
                    className="field"
                    placeholder="https://youtube.com/watch?v=..."
                    defaultValue={materiAwal?.url_video ?? ""}
                  />
                  <small className="text-[10px] text-muted">
                    Video akan ditampilkan langsung di halaman materi.
                  </small>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <label htmlFor="sumber" className="text-[11px] font-bold">
                    Link sumber buku resmi
                  </label>
                  <input
                    id="sumber"
                    name="sumber"
                    type="url"
                    className="field"
                    placeholder="https://buku.kemendikdasmen.go.id/..."
                    defaultValue={materiAwal?.link_sumber ?? ""}
                  />
                  <small className="text-[10px] text-muted">
                    Gunakan link ke sumber asli, bukan upload file.
                  </small>
                </div>
              </section>
            </div>

            <aside className="flex flex-col gap-4">
              {modeUbah && materiAwal ? (
                <div className="panel p-5">
                  <p className="eyebrow eyebrow-muted mb-3">Bab ini</p>
                  <div className="flex flex-col gap-2.5">
                    <Link
                      href={`/guru/soal/baru?kelasId=${encodeURIComponent(kelasId)}&babId=${encodeURIComponent(materiAwal.id)}`}
                      className="btn btn-outline w-full"
                    >
                      + Tambah soal bab ini
                    </Link>
                    {kodeKelasTerpilih && (
                      <a
                        href={`/siswa/materi?id=${encodeURIComponent(materiAwal.id)}&kode=${encodeURIComponent(kodeKelasTerpilih)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline w-full"
                      >
                        Lihat sebagai siswa ↗
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="panel p-5">
                  <p className="eyebrow eyebrow-muted mb-4">Pengaturan terbit</p>
                  <div className="flex flex-col gap-3.5">
                    <label className="flex items-start gap-2.5 text-[11px] text-muted">
                      <input
                        type="checkbox"
                        checked={terbit}
                        onChange={(e) => setTerbit(e.target.checked)}
                        className="mt-1 accent-coral"
                      />
                      Terbitkan ke siswa setelah disimpan
                    </label>
                    <label className="flex items-start gap-2.5 text-[11px] text-muted">
                      <input
                        type="checkbox"
                        checked={babBerikutnya}
                        onChange={(e) => setBabBerikutnya(e.target.checked)}
                        className="mt-1 accent-coral"
                      />
                      Tampilkan sebagai bab berikutnya
                    </label>
                    <label className="flex items-start gap-2.5 text-[11px] text-muted">
                      <input
                        type="checkbox"
                        checked={tambahLatihan}
                        onChange={(e) => setTambahLatihan(e.target.checked)}
                        className="mt-1 accent-coral"
                      />
                      Tambahkan latihan setelah materi
                    </label>
                  </div>
                </div>
              )}
              <div className="panel p-5">
                <p className="eyebrow eyebrow-muted mb-3">Tips materi ringan</p>
                <p className="text-[11px] leading-relaxed text-muted">
                  Gunakan paragraf pendek, kompres gambar, dan beri label video
                  sebagai konten yang disarankan ditonton saat ada Wi-Fi.
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
              <p className="text-[10px] leading-relaxed text-muted">
                <Link href={hrefMateri} className="font-bold text-coral">
                  ← Kembali ke daftar materi
                </Link>
              </p>
            </aside>
          </div>
        </form>
      </main>
      <FooterSimple />
    </>
  );
}
