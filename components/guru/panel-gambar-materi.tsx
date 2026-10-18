"use client";

import { useRef, useState } from "react";

export interface GambarItem {
  id: string;
  url: string;
}

const UKURAN_MAKS = 4 * 1024 * 1024; // 4 MB

/** Panel unggah gambar materi per bab (mode ubah materi). */
export function PanelGambarMateri({
  babId,
  awal,
}: {
  babId: string;
  awal: GambarItem[];
}) {
  const [daftar, setDaftar] = useState<GambarItem[]>(awal);
  const [pesan, setPesan] = useState<string | null>(null);
  const [sedang, setSedang] = useState(false);
  const referensiFile = useRef<HTMLInputElement>(null);

  async function unggah(file: File) {
    if (!file.type.startsWith("image/")) {
      setPesan("Format harus JPG, PNG, WEBP, atau GIF.");
      return;
    }
    if (file.size > UKURAN_MAKS) {
      setPesan("Ukuran gambar maksimal 4 MB. Kompres dulu ya.");
      return;
    }
    setSedang(true);
    setPesan(null);
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch(
        `/api/guru/materi/${encodeURIComponent(babId)}/gambar`,
        { method: "POST", body: form },
      );
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        data?: { gambar?: GambarItem };
      };
      if (res.ok && json.ok && json.data?.gambar) {
        setDaftar((d) => [...d, json.data!.gambar!]);
      } else {
        setPesan(json.error ?? "Gagal mengunggah gambar.");
      }
    } catch {
      setPesan("Tidak dapat terhubung. Coba lagi.");
    } finally {
      setSedang(false);
      if (referensiFile.current) referensiFile.current.value = "";
    }
  }

  async function hapus(id: string) {
    setSedang(true);
    setPesan(null);
    try {
      const res = await fetch(
        `/api/guru/materi/${encodeURIComponent(babId)}/gambar/${encodeURIComponent(id)}`,
        { method: "DELETE" },
      );
      if (res.ok) {
        setDaftar((d) => d.filter((g) => g.id !== id));
      } else {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        setPesan(json.error ?? "Gagal menghapus gambar.");
      }
    } catch {
      setPesan("Tidak dapat terhubung. Coba lagi.");
    } finally {
      setSedang(false);
    }
  }

  return (
    <section className="panel p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl tracking-tight">Gambar pendukung</h2>
        <span className="text-[10px] text-muted">
          {daftar.length} gambar terpasang
        </span>
      </div>

      {daftar.length > 0 && (
        <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-3">
          {daftar.map((g) => (
            <div key={g.id} className="border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.url}
                alt="Gambar materi"
                className="aspect-video w-full object-cover"
                loading="lazy"
              />
              <button
                type="button"
                onClick={() => hapus(g.id)}
                disabled={sedang}
                className="w-full cursor-pointer border-t border-line bg-paper py-2 text-[10px] font-bold text-coral hover:bg-[#fbe9e2] disabled:opacity-50"
              >
                Hapus gambar
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="grid min-h-[110px] place-items-center border border-dashed border-[#aeb4a8] bg-[#f9f8f1] p-4 text-center">
        <div>
          <strong className="block text-xs">Tambahkan gambar pendukung</strong>
          <span className="text-[11px] text-muted">
            JPG, PNG, WEBP, atau GIF · maksimal 4 MB · tampil di halaman materi
            siswa
          </span>
          <br />
          <button
            type="button"
            onClick={() => referensiFile.current?.click()}
            disabled={sedang}
            className="btn btn-outline mt-3 disabled:opacity-50"
          >
            {sedang ? "Memproses..." : "Pilih gambar"}
          </button>
        </div>
      </div>

      <input
        ref={referensiFile}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void unggah(file);
        }}
      />

      {pesan && (
        <p role="status" className="mt-3 border-l-[3px] border-coral bg-[#fbe9e2] px-3 py-2.5 text-[11px] font-bold text-[#8a4534]">
          {pesan}
        </p>
      )}
    </section>
  );
}
