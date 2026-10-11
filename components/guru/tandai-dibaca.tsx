"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/** Tombol "tandai semua sudah dibaca" untuk halaman masukan siswa. */
export function TandaiDibaca({ jumlahBelum }: { jumlahBelum: number }) {
  const router = useRouter();
  const [memuat, setMemuat] = useState(false);
  const [pesan, setPesan] = useState<string | null>(null);

  async function tandai() {
    setMemuat(true);
    setPesan(null);
    try {
      const res = await fetch("/api/guru/feedback", { method: "PATCH" });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setPesan(`${data.data.jumlah} masukan ditandai sudah dibaca.`);
        router.refresh();
      } else {
        setPesan(data?.error ?? "Gagal menandai. Coba lagi.");
      }
    } catch {
      setPesan("Tidak dapat terhubung ke server.");
    } finally {
      setMemuat(false);
    }
  }

  if (jumlahBelum === 0) {
    return <span className="text-[11px] text-muted">Semua masukan sudah dibaca ✓</span>;
  }

  return (
    <div className="flex flex-col items-end gap-1.5">
      <button type="button" className="btn btn-outline" onClick={tandai} disabled={memuat}>
        {memuat ? "Menandai…" : `Tandai ${jumlahBelum} sudah dibaca`}
      </button>
      {pesan && <span className="text-[11px] text-muted">{pesan}</span>}
    </div>
  );
}
