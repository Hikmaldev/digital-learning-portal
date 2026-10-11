"use client";

import { useRouter } from "next/navigation";

export interface ItemKelas {
  id: string;
  kode: string;
  nama: string;
  jenjang: string;
}

/**
 * Pemilih kelas yang membawa konteks ke URL (kode atau kelasId) supaya
 * perpindahan kelas selalu sinkron dengan halaman yang sedang dibuka.
 */
export function PilihKelas({
  daftar,
  aktif,
  basis,
  param,
}: {
  daftar: ItemKelas[];
  aktif: string;
  basis: string;
  param: "kode" | "kelasId";
}) {
  const router = useRouter();
  const nilai = (k: ItemKelas) => (param === "kode" ? k.kode : k.id);

  return (
    <label className="flex flex-col gap-1.5 text-left">
      <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-muted">
        Kelas
      </span>
      <select
        className="select-field w-full border border-[#bfc3b7] bg-paper px-3 py-2 text-[11px]"
        value={aktif}
        onChange={(e) => {
          const dipilih = e.target.value;
          if (dipilih) {
            router.push(`${basis}?${param}=${encodeURIComponent(dipilih)}`);
          }
        }}
      >
        {daftar.map((k) => (
          <option key={k.id} value={nilai(k)}>
            {k.nama} · {k.jenjang}
          </option>
        ))}
      </select>
    </label>
  );
}
