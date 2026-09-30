/**
 * Helper sesi siswa (klien): disimpan di sessionStorage, tidak butuh akun.
 * Kunci: kode kelas + nama yang dipakai di halaman masuk siswa.
 */

export function bacaKodeKelas(): string | null {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem("rb_kode_kelas");
}

export function bacaNamaSiswa(): string | null {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem("rb_nama_siswa");
}

export function simpanSesiSiswa(kodeKelas: string, namaSiswa: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem("rb_kode_kelas", kodeKelas);
  window.sessionStorage.setItem("rb_nama_siswa", namaSiswa);
}