"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Tombol hapus soal dengan konfirmasi. Menghapus soal juga menghapus
 * opsi jawabannya dan jawaban siswa pada soal tersebut (aturan cascade).
 */
export function TombolHapusSoal({
  soalId,
  nomor,
}: {
  soalId: string;
  nomor: number;
}) {
  const router = useRouter();
  const [memuat, setMemuat] = useState(false);

  async function hapus() {
    const yakin = window.confirm(
      `Hapus soal nomor ${nomor}?\n\nOpsi jawaban dan jawaban siswa pada soal ini ikut terhapus.`
    );
    if (!yakin) return;

    setMemuat(true);
    try {
      const res = await fetch(`/api/guru/soal/${encodeURIComponent(soalId)}`, {
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
      window.alert(json.error ?? "Gagal menghapus soal. Coba lagi.");
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
