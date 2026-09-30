"use client";

import { useCallback, useState } from "react";

/**
 * `useSessionState` — state React yang disinkronkan dengan sessionStorage.
 *
 * Inisialisasi dilakukan secara lazy (bukan di dalam efek) sehingga tidak
 * memicu "cascading renders" (lihat react-hooks/set-state-in-effect).
 * Aman untuk SSR: sessionStorage hanya dibaca di browser.
 */
export function useSessionState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return fallback;
    try {
      const tersimpan = window.sessionStorage.getItem(key);
      return tersimpan === null ? fallback : (JSON.parse(tersimpan) as T);
    } catch {
      return fallback;
    }
  });

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const nilai =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          window.sessionStorage.setItem(key, JSON.stringify(nilai));
        } catch {
          /* penyimpanan tidak tersedia */
        }
        return nilai;
      });
    },
    [key]
  );

  return [value, set] as const;
}

/** Baca langsung dari sessionStorage (untuk komponen di mana satu kali baca cukup). */
export function bacaSessionStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const tersimpan = window.sessionStorage.getItem(key);
    return tersimpan === null ? fallback : (JSON.parse(tersimpan) as T);
  } catch {
    return fallback;
  }
}