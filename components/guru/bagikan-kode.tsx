"use client";

import { useState } from "react";

interface KelasBagikan {
  id: string;
  nama: string;
  kode: string;
}

/** Banner kode kelas: pilih kelas yang kodenya ingin dibagikan, salin sekali klik. */
export function BagikanKode({ kelas }: { kelas: KelasBagikan[] }) {
  const [terpilih, setTerpilih] = useState(kelas[0]?.kode ?? "");
  const aktif = kelas.find((k) => k.kode === terpilih) ?? kelas[0];

  return (
    <div className="flex flex-col items-start gap-2 text-xs">
      <select
        aria-label="Pilih kelas untuk dibagikan"
        className="max-w-[260px] cursor-pointer border-0 bg-transparent p-0 text-[11px] font-bold text-ink outline-none"
        value={aktif?.kode ?? ""}
        onChange={(e) => setTerpilih(e.target.value)}
      >
        {kelas.map((k) => (
          <option key={k.id} value={k.kode}>
            {k.nama} · {k.kode}
          </option>
        ))}
      </select>
      <div className="inline-flex items-center gap-2.5">
        <span className="text-muted">KODE</span>
        <strong className="text-2xl tracking-[2px] text-coral">
          {aktif?.kode ?? "—"}
        </strong>
        <button
          type="button"
          onClick={() => {
            if (aktif) {
              navigator.clipboard
                ?.writeText(aktif.kode)
                .catch(() => undefined);
            }
          }}
          className="cursor-pointer border-0 bg-transparent text-[11px] font-bold text-ink hover:text-coral"
        >
          Salin
        </button>
      </div>
    </div>
  );
}