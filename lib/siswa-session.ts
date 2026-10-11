/**
 * Helper sesi siswa (klien): disimpan di sessionStorage, tidak butuh akun.
 * Kunci: kode kelas + nama yang dipakai di halaman masuk siswa.
 */

function bacaNilai(key: string): string | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(key);
  if (raw === null) return null;
  // Nilai dapat tersimpan mentah (simpanSesiSiswa) atau JSON (useSessionState).
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "string" ? parsed : raw;
  } catch {
    return raw;
  }
}

export function bacaKodeKelas(): string | null {
  return bacaNilai("rb_kode_kelas");
}

export function bacaNamaSiswa(): string | null {
  return bacaNilai("rb_nama_siswa");
}

export function simpanSesiSiswa(kodeKelas: string, namaSiswa: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem("rb_kode_kelas", kodeKelas);
  window.sessionStorage.setItem("rb_nama_siswa", namaSiswa);
}