/**
 * Model domain yang mencerminkan skema data PRD (tabel Neon / Prisma).
 * Pada implementasi penuh, tipe ini di-generate dari `prisma/schema.prisma`.
 */

export interface User {
  id: string;
  nama: string;
  email: string;
  password_hash: string;
}

export type JenjangKelas = "Paket A" | "Paket B" | "Paket C";

export interface Kelas {
  id: string;
  nama_kelas: string;
  jenjang: JenjangKelas;
  kode_akses: string;
  guru_id: string;
  guru_nama: string;
}

export type StatusBab = "SELESAI" | "SEDANG_DIPELAJARI" | "BELUM_MULAI";

export interface Bab {
  id: string;
  kelas_id: string;
  mata_pelajaran: string;
  judul: string;
  ringkasan: string;
  konten_materi: string;
  url_video?: string;
  link_sumber?: string;
  urutan: number;
  jumlah_latihan: number;
  progres: number;
  status: StatusBab;
}

export interface Gambar {
  id: string;
  bab_id: string;
  url: string;
  ukuran_file: number;
}

export type TipeSoal = "PILIHAN_GANDA" | "ESAI";

export interface Soal {
  id: string;
  bab_id: string;
  pertanyaan: string;
  tipe: TipeSoal;
  opsi: OpsiJawaban[];
}

export interface OpsiJawaban {
  id: string;
  teks: string;
  is_benar: boolean;
}

export interface ProgressSiswa {
  id: string;
  kelas_id: string;
  nama_siswa: string;
  bab_id: string;
  soal_id: string;
  jawaban: string;
  skor: number;
  waktu_submit: string;
}

export type StatusLatihan =
  | "SUDAH_MENGERJAKAN"
  | "SEDANG_BERJALAN"
  | "BELUM_MULAI";

export interface RingkasanSiswa {
  id: string;
  nama: string;
  bab_terakhir: string;
  nilai: number | null;
  status: StatusLatihan;
  terakhir_aktif: string;
}

export interface RingkasanPelajaran {
  mata_pelajaran: string;
  jumlah_bab: number;
  jumlah_latihan: number;
  progres: number;
}

export interface MetricRingkasan {
  label: string;
  nilai: number;
  delta: string;
  naik: boolean;
}