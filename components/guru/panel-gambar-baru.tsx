"use client";

import { useEffect, useRef, useState } from "react";

const UKURAN_MAKS = 4 * 1024 * 1024; // 4 MB
const TIPE_OK = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

interface GambarLokal {
  file: File;
  url: string;
}

/**
 * Panel pilih gambar untuk materi BARU.
 * Gambar belum bisa diunggah karena bab belum punya id, jadi ditahan dulu
 * di memori lalu diunggah otomatis setelah materi berhasil disimpan.
 */
export function PanelGambarBaru({
  onChange,
}: {
  onChange: (files: File[]) => void;
}) {
  const [daftar, setDaftar] = useState<GambarLokal[]>([]);
  const [pesan, setPesan] = useState<string | null>(null);
  const referensiFile = useRef<HTMLInputElement>(null);
  const daftarUrl = useRef<Set<string>>(new Set());

  // Bersihkan object URL saat panel dilepas agar memori tidak bocor.
  useEffect(() => {
    const kumpulan = daftarUrl.current;
    return () => {
      for (const url of kumpulan) URL.revokeObjectURL(url);
    };
  }, []);

  function pilih(files: FileList | null) {
    if (!files || files.length === 0) return;
    const lolos: GambarLokal[] = [];
    const tolak: string[] = [];

    for (const file of Array.from(files)) {
      if (!TIPE_OK.has(file.type)) {
        tolak.push(`${file.name}: format tidak didukung`);
        continue;
      }
      if (file.size > UKURAN_MAKS) {
        tolak.push(`${file.name}: lebih dari 4 MB`);
        continue;
      }
      const url = URL.createObjectURL(file);
      daftarUrl.current.add(url);
      lolos.push({ file, url });
    }

    if (lolos.length > 0) {
      const gabung = [...daftar, ...lolos];
      setDaftar(gabung);
      onChange(gabung.map((g) => g.file));
    }
    setPesan(tolak.length > 0 ? tolak.join(" ") : null);
    if (referensiFile.current) referensiFile.current.value = "";
  }

  function hapus(url: string) {
    daftarUrl.current.delete(url);
    URL.revokeObjectURL(url);
    const sisa = daftar.filter((g) => g.url !== url);
    setDaftar(sisa);
    onChange(sisa.map((g) => g.file));
    setPesan(null);
  }

  return (
    <section className="panel p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl tracking-tight">Gambar pendukung</h2>
        <span className="text-[10px] text-muted">
          {daftar.length > 0 ? `${daftar.length} gambar dipilih` : "Opsional"}
        </span>
      </div>

      {daftar.length > 0 && (
        <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-3">
          {daftar.map((g) => (
            <div key={g.url} className="border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.url}
                alt={g.file.name}
                className="aspect-video w-full object-cover"
                loading="lazy"
              />
              <div className="flex items-center justify-between gap-2 border-t border-line bg-paper px-2 py-2">
                <span
                  className="truncate text-[9px] text-muted"
                  title={g.file.name}
                >
                  {g.file.name}
                </span>
                <button
                  type="button"
                  onClick={() => hapus(g.url)}
                  className="shrink-0 cursor-pointer text-[10px] font-bold text-coral hover:underline"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid min-h-[110px] place-items-center border border-dashed border-[#aeb4a8] bg-[#f9f8f1] p-4 text-center">
        <div>
          <strong className="block text-xs">Tambahkan gambar pendukung</strong>
          <span className="text-[11px] text-muted">
            JPG, PNG, WEBP, atau GIF · maksimal 4 MB per gambar · bisa pilih
            beberapa
          </span>
          <br />
          <button
            type="button"
            onClick={() => referensiFile.current?.click()}
            className="btn btn-outline mt-3"
          >
            Pilih gambar
          </button>
          <p className="mt-2 text-[10px] text-muted">
            Gambar diunggah otomatis setelah materi disimpan.
          </p>
        </div>
      </div>

      <input
        ref={referensiFile}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        className="hidden"
        onChange={(e) => pilih(e.target.files)}
      />

      {pesan && (
        <p
          role="status"
          className="mt-3 border-l-[3px] border-coral bg-[#fbe9e2] px-3 py-2.5 text-[11px] font-bold text-[#8a4534]"
        >
          {pesan}
        </p>
      )}
    </section>
  );
}
