"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

/** Form masuk kelas di halaman utama: arahkan ke halaman masuk siswa. */
export function ClassEntryForm() {
  const router = useRouter();
  const kodeRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="max-w-[433px]"
      onSubmit={(e) => {
        e.preventDefault();
        const kode = kodeRef.current?.value.trim() ?? "";
        router.push(`/siswa/masuk?kode=${encodeURIComponent(kode)}`);
      }}
    >
      <label
        htmlFor="class-code"
        className="mb-2 block text-xs font-bold text-ink"
      >
        Sudah punya kode kelas?
      </label>
      <div className="flex h-[50px] border border-[#bbbeb2] bg-paper">
        <input
          ref={kodeRef}
          id="class-code"
          name="kode-kelas"
          type="text"
          placeholder="Masukkan kode kelas"
          autoComplete="off"
          maxLength={8}
          className="min-w-0 flex-1 bg-transparent px-4 text-xs outline-none placeholder:text-[#a0a59c]"
        />
        <button
          type="submit"
          className="cursor-pointer border-0 bg-ink px-4 text-xs font-semibold text-paper"
        >
          Masuk kelas <span className="pl-1 text-lg text-yellow">→</span>
        </button>
      </div>
      <p className="mt-2.5 text-[11px] text-[#7c837b]">
        <span className="mr-1.5 text-yellow">✦</span>
        Tidak perlu membuat akun siswa
      </p>
    </form>
  );
}