/** Tipe konten kurikulum Paket A/B/C (dipakai prisma/seed-paket-abc.ts). */

export interface SoalKonten {
  pertanyaan: string;
  /** Tepat 4 opsi jawaban. */
  opsi: [string, string, string, string];
  /** Indeks opsi yang benar (0-3). */
  benar: 0 | 1 | 2 | 3;
}

export interface BabKonten {
  mapel: string;
  judul: string;
  ringkasan: string;
  /** Paragraf dipisah baris kosong — dirender sebagai <p> di halaman materi. */
  konten: string;
  /** Link buku resmi (SIBI/Kemendikdasmen) sebagai bacaan tambahan. */
  sumber: string;
  soal: SoalKonten[];
}

export interface PaketKonten {
  kode: string;
  nama: string;
  jenjang: "Paket A" | "Paket B" | "Paket C";
  babs: BabKonten[];
}
