"use client";

import { useRouter } from "next/navigation";

export interface KelasSingkat {
  kode: string;
  nama: string;
  jenjang: string;
}

/**
 * Pemilih kelas di halaman progress: ganti kelas membawa ?kode= yang sesuai,
 * jadi tidak ada lagi kelas "acak" yang tampil.
 */
export function PilihKelasProgress({
  daftar,
  aktif,
}: {
  daftar: KelasSingkat[];
  aktif: string;
}) {
  const router = useRouter();

  return (
    <label className="flex flex-col gap-1.5 text-left">
      <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-muted">
        Kelas
      </span>
      <select
        className="select-field w-full border border-[#bfc3b7] bg-paper px-3 py-2 text-[11px]"
        value={aktif}
        onChange={(e) => {
          const kode = e.target.value;
          if (kode) {
            router.push(`/guru/progress?kode=${encodeURIComponent(kode)}`);
          }
        }}
      >
        {daftar.map((k) => (
          <option key={k.kode} value={k.kode}>
            {k.nama} · {k.jenjang}
          </option>
        ))}
      </select>
    </label>
  );
}
