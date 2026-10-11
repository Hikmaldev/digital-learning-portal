"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Tombol hapus bab dengan konfirmasi. Menghapus bab juga menghapus soal
 * dan progres siswa pada bab tersebut (aturan cascade).
 */
export function TombolHapusBab({
  babId,
  judul,
}: {
  babId: string;
  judul: string;
}) {
  const router = useRouter();
  const [memuat, setMemuat] = useState(false);

  async function hapus() {
    const yakin = window.confirm(
      `Hapus materi “${judul}”?\n\nSoal latihan dan progres siswa pada bab ini ikut terhapus.`
    );
    if (!yakin) return;

    setMemuat(true);
    try {
      const res = await fetch(`/api/guru/materi/${encodeURIComponent(babId)}`, {
        method: "DELETE",
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (res.ok && json.ok) {
        router.refresh();
        return;
      }
      window.alert(json.error ?? "Gagal menghapus materi. Coba lagi.");
    } catch {
      window.alert("Tidak dapat terhubung ke server. Coba lagi.");
    } finally {
      setMemuat(false);
    }
  }

  return (
    <button
      type="button"
      onClick={hapus}
      disabled={memuat}
      className="btn btn-outline px-3 py-2 text-[11px]"
    >
      {memuat ? "Menghapus..." : "Hapus"}
    </button>
  );
}
