"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

/**
 * Tombol keluar yang sungguhan: mengakhiri sesi Auth.js (jika ada),
 * lalu kembali ke halaman depan. Aman dipakai di area siswa yang
 * tidak memiliki sesi — tetap menavigasi ke halaman depan.
 */
export function TombolKeluar({ label }: { label: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await signOut({ redirect: false });
        } catch {
          // Tidak ada sesi / sudah keluar — abaikan.
        }
        router.push("/");
        router.refresh();
      }}
      className="cursor-pointer border-0 bg-transparent p-0 text-xs font-bold hover:text-coral"
    >
      {label} <span className="text-coral">↗</span>
    </button>
  );
}
