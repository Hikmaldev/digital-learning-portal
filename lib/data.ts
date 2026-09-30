import {
  Bab,
  Kelas,
  MetricRingkasan,
  RingkasanPelajaran,
  RingkasanSiswa,
  Soal,
} from "./types";

/**
 * Data contoh untuk prototype halaman.
 * Pada implementasi penuh diambil dari database (Neon) melalui Prisma.
 */

export const kelasAktif: Kelas = {
  id: "kls-1",
  nama_kelas: "Kelas Kesetaraan Harapan Bersama",
  jenjang: "Paket B",
  kode_akses: "HB2026",
  guru_id: "guru-1",
  guru_nama: "Hikmal Ananta Putra",
};

export const namaSiswaDemo = "Hikmal";

export const kelassRingkasan = [
  {
    id: "kls-1",
    nama: "Kelas Kesetaraan Harapan Bersama",
    jenjang: "Paket B",
    kode: "HB2026",
    jumlahBab: 6,
  },
  {
    id: "kls-2",
    nama: "Kelas Paket A · Pagi",
    jenjang: "Paket A",
    kode: "PA2026",
    jumlahBab: 4,
  },
];

export const babSiswa: Bab[] = [
  {
    id: "bab-mtk-1",
    kelas_id: "kls-1",
    mata_pelajaran: "MATEMATIKA",
    judul: "Bilangan dan operasinya",
    ringkasan: "4 bab · 18 latihan",
    konten_materi: "",
    urutan: 1,
    jumlah_latihan: 18,
    progres: 86,
    status: "SELESAI",
  },
  {
    id: "bab-bindo-3",
    kelas_id: "kls-1",
    mata_pelajaran: "BAHASA INDONESIA",
    judul: "Menemukan gagasan utama",
    ringkasan: "Bab 03 · 4 latihan tersedia",
    konten_materi:
      "Gagasan utama adalah ide pokok atau inti dari sebuah paragraf. " +
      "Gagasan utama menjadi dasar pengembangan kalimat-kalimat lain dalam paragraf tersebut.\n\n" +
      "Langkah menemukannya: pertama, baca seluruh paragraf dengan teliti. " +
      "Kedua, cari hal yang paling sering dibicarakan. " +
      "Terakhir, tuliskan inti pembicaraan tersebut dengan kalimatmu sendiri.\n\n" +
      "Jangan terburu-buru memilih kalimat pertama sebagai jawaban. " +
      "Periksa apakah kalimat tersebut benar-benar mewakili isi seluruh paragraf.",
    urutan: 2,
    jumlah_latihan: 5,
    progres: 68,
    status: "SEDANG_DIPELAJARI",
  },
  {
    id: "bab-ipa-1",
    kelas_id: "kls-1",
    mata_pelajaran: "ILMU PENGETAHUAN ALAM",
    judul: "Energi di sekitar kita",
    ringkasan: "Bab 01 · 5 latihan tersedia",
    konten_materi: "",
    urutan: 3,
    jumlah_latihan: 5,
    progres: 0,
    status: "BELUM_MULAI",
  },
  {
    id: "bab-ips-2",
    kelas_id: "kls-1",
    mata_pelajaran: "ILMU PENGETAHUAN SOSIAL",
    judul: "Keragaman lingkungan",
    ringkasan: "Bab 02 · 3 latihan tersedia",
    konten_materi: "",
    urutan: 4,
    jumlah_latihan: 3,
    progres: 22,
    status: "BELUM_MULAI",
  },
  {
    id: "bab-ppkn-1",
    kelas_id: "kls-1",
    mata_pelajaran: "PENDIDIKAN PANCASILA",
    judul: "Hidup bersama dalam perbedaan",
    ringkasan: "Bab 01 · 3 latihan tersedia",
    konten_materi: "",
    urutan: 5,
    jumlah_latihan: 3,
    progres: 100,
    status: "SELESAI",
  },
  {
    id: "bab-bing-2",
    kelas_id: "kls-1",
    mata_pelajaran: "BAHASA INGGRIS",
    judul: "Introducing yourself",
    ringkasan: "Bab 02 · 4 latihan tersedia",
    konten_materi: "",
    urutan: 6,
    jumlah_latihan: 4,
    progres: 10,
    status: "BELUM_MULAI",
  },
];

export const daftarBabPelajaran: {
  nomor: number;
  judul: string;
  aktif?: boolean;
}[] = [
  { nomor: 1, judul: "Mengenal teks informasi" },
  { nomor: 2, judul: "Kalimat utama dan penjelas" },
  { nomor: 3, judul: "Menemukan gagasan utama", aktif: true },
  { nomor: 4, judul: "Menyimpulkan isi bacaan" },
];

export const soalLatihan: Soal[] = [
  {
    id: "soal-1",
    bab_id: "bab-bindo-3",
    pertanyaan: "Apa yang dimaksud dengan gagasan utama dalam sebuah paragraf?",
    tipe: "PILIHAN_GANDA",
    opsi: [
      { id: "o1", teks: "Kalimat yang paling panjang dalam paragraf", is_benar: false },
      { id: "o2", teks: "Ide pokok atau inti pembahasan paragraf", is_benar: true },
      { id: "o3", teks: "Contoh yang digunakan untuk menjelaskan bacaan", is_benar: false },
      { id: "o4", teks: "Kata-kata sulit yang ada dalam bacaan", is_benar: false },
    ],
  },
  {
    id: "soal-2",
    bab_id: "bab-bindo-3",
    pertanyaan: "Di mana gagasan utama biasanya dapat ditemukan?",
    tipe: "PILIHAN_GANDA",
    opsi: [
      { id: "o1", teks: "Hanya di bagian tengah paragraf", is_benar: false },
      { id: "o2", teks: "Di awal atau akhir paragraf", is_benar: true },
      { id: "o3", teks: "Selalu di kalimat terakhir", is_benar: false },
      { id: "o4", teks: "Di judul buku", is_benar: false },
    ],
  },
  {
    id: "soal-3",
    bab_id: "bab-bindo-3",
    pertanyaan: "Kalimat yang menjelaskan gagasan utama disebut kalimat...",
    tipe: "PILIHAN_GANDA",
    opsi: [
      { id: "o1", teks: "pembuka", is_benar: false },
      { id: "o2", teks: "penjelas", is_benar: true },
      { id: "o3", teks: "tanya", is_benar: false },
      { id: "o4", teks: "perintah", is_benar: false },
    ],
  },
  {
    id: "soal-4",
    bab_id: "bab-bindo-3",
    pertanyaan: "Langkah pertama saat mencari gagasan utama adalah...",
    tipe: "PILIHAN_GANDA",
    opsi: [
      { id: "o1", teks: "Menghitung jumlah kalimat", is_benar: false },
      { id: "o2", teks: "Membaca seluruh paragraf dengan teliti", is_benar: true },
      { id: "o3", teks: "Menebak jawaban langsung", is_benar: false },
      { id: "o4", teks: "Mencari kata sulit di kamus", is_benar: false },
    ],
  },
  {
    id: "soal-5",
    bab_id: "bab-bindo-3",
    pertanyaan: "Kalimat utama mewakili...",
    tipe: "PILIHAN_GANDA",
    opsi: [
      { id: "o1", teks: "Hanya bagian awal bacaan", is_benar: false },
      { id: "o2", teks: "Seluruh isi paragraf", is_benar: true },
      { id: "o3", teks: "Judul buku saja", is_benar: false },
      { id: "o4", teks: "Pendapat penulis lain", is_benar: false },
    ],
  },
];

export interface HasilLatihan {
  nama: string;
  mataPelajaran: string;
  bab: string;
  skor: number;
  benar: number;
  jumlahSoal: number;
  rincian: { nomor: number; label: string; benar: boolean }[];
  waktuSubmit: string;
}

export const peringatanKunci =
  "Gagasan utama biasanya dapat ditemukan di awal atau akhir paragraf. Kalimat yang menjelaskan gagasan utama disebut kalimat penjelas.";

export const ringkasanPelajaran: RingkasanPelajaran[] = [
  { mata_pelajaran: "Matematika", jumlah_bab: 4, jumlah_latihan: 18, progres: 86 },
  { mata_pelajaran: "Bahasa Indonesia", jumlah_bab: 3, jumlah_latihan: 12, progres: 68 },
  { mata_pelajaran: "Ilmu Pengetahuan Alam", jumlah_bab: 5, jumlah_latihan: 20, progres: 45 },
];

export const daftarSiswa: RingkasanSiswa[] = [
  { id: "s1", nama: "Andi Pratama", bab_terakhir: "Gagasan utama", nilai: 90, status: "SUDAH_MENGERJAKAN", terakhir_aktif: "Hari ini, 09.12" },
  { id: "s2", nama: "Dina Nuraini", bab_terakhir: "Gagasan utama", nilai: 80, status: "SUDAH_MENGERJAKAN", terakhir_aktif: "Hari ini, 08.48" },
  { id: "s3", nama: "Rudi Hartono", bab_terakhir: "Kalimat penjelas", nilai: null, status: "SEDANG_BERJALAN", terakhir_aktif: "Kemarin, 14.20" },
  { id: "s4", nama: "Siti Aminah", bab_terakhir: "—", nilai: null, status: "BELUM_MULAI", terakhir_aktif: "Belum ada" },
  { id: "s5", nama: "Yusuf Maulana", bab_terakhir: "Gagasan utama", nilai: 70, status: "SUDAH_MENGERJAKAN", terakhir_aktif: "Senin, 16.30" },
];

export const metricsDashboard: MetricRingkasan[] = [
  { label: "Siswa aktif", nilai: 24, delta: "3 sejak minggu lalu", naik: true },
  { label: "Latihan terkumpul", nilai: 86, delta: "12 minggu ini", naik: true },
  { label: "Rata-rata progres", nilai: 72, delta: "8% sejak bulan lalu", naik: true },
];

export const metricsProgress: MetricRingkasan[] = [
  { label: "Sudah mengerjakan semua", nilai: 18, delta: "75% dari 24 siswa", naik: true },
  { label: "Masih berjalan", nilai: 4, delta: "sedang mengerjakan", naik: false },
  { label: "Belum mulai", nilai: 2, delta: "perlu diingatkan", naik: false },
];