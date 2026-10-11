import { z } from "zod";

/**
 * Skema validasi Zod (PRD §8) — menjaga data dari form guru dan siswa
 * tetap konsisten sebelum masuk ke database.
 */

// --- Siswa ---

export const masukKelasSchema = z.object({
  kodeKelas: z
    .string()
    .trim()
    .min(4, "Kode kelas minimal 4 karakter")
    .max(8, "Kode kelas maksimal 8 karakter")
    .transform((v) => v.toUpperCase()),
  namaSiswa: z
    .string()
    .trim()
    .min(2, "Nama minimal 2 karakter")
    .max(60, "Nama terlalu panjang"),
});

export type MasukKelasInput = z.infer<typeof masukKelasSchema>;

export const submitLatihanSchema = z.object({
  kodeKelas: z.string().trim().min(4).max(8).transform((v) => v.toUpperCase()),
  namaSiswa: z.string().trim().min(2).max(60),
  babId: z.string().min(1),
  jawaban: z
    .record(z.string(), z.string())
    .refine((obj) => Object.keys(obj).length > 0, {
      message: "Tidak ada jawaban yang dikirim",
    }),
});

export type SubmitLatihanInput = z.infer<typeof submitLatihanSchema>;

// --- Guru ---

export const buatKelasSchema = z.object({
  namaKelas: z.string().trim().min(3).max(80),
  jenjang: z.enum(["Paket A", "Paket B", "Paket C", "CAMPURAN"]),
});

export type BuatKelasInput = z.infer<typeof buatKelasSchema>;

export const kirimFeedbackSchema = z.object({
  kodeKelas: z
    .string()
    .trim()
    .min(4)
    .max(8)
    .transform((v) => v.toUpperCase())
    .optional()
    .or(z.literal("").transform(() => undefined)),
  namaSiswa: z.string().trim().max(60).optional(),
  kategori: z.enum(["SARAN", "BUG", "PUJIAN", "LAINNYA"]).default("SARAN"),
  pesan: z.string().trim().min(5, "Masukan minimal 5 karakter").max(1000, "Masukan maksimal 1000 karakter"),
  kontak: z.string().trim().max(120).optional(),
});

export type KirimFeedbackInput = z.infer<typeof kirimFeedbackSchema>;

export const simpanMateriSchema = z.object({
  kelasId: z.string().min(1),
  mataPelajaran: z.string().trim().min(2),
  judul: z.string().trim().min(3).max(120),
  ringkasan: z.string().max(200).optional(),
  kontenMateri: z.string().min(1),
  urutan: z.number().int().min(1).default(1),
  urlVideo: z.string().url().optional().or(z.literal("")),
  linkSumber: z.string().url().optional().or(z.literal("")),
  terbitkan: z.boolean().default(true),
});

export type SimpanMateriInput = z.infer<typeof simpanMateriSchema>;

export const ubahMateriSchema = z.object({
  mataPelajaran: z.string().trim().min(2),
  judul: z.string().trim().min(3).max(120),
  ringkasan: z.string().max(200).optional(),
  kontenMateri: z.string().min(1),
  urutan: z.number().int().min(1).default(1),
  urlVideo: z.string().url().optional().or(z.literal("")),
  linkSumber: z.string().url().optional().or(z.literal("")),
});

export type UbahMateriInput = z.infer<typeof ubahMateriSchema>;

export const simpanSoalSchema = z.object({
  babId: z.string().min(1),
  soal: z
    .array(
      z.object({
        pertanyaan: z.string().trim().min(5),
        opsi: z
          .array(z.object({ teks: z.string().trim().min(1) }))
          .min(2)
          .max(6),
        indexBenar: z.number().int().min(0),
      })
    )
    .min(1, "Minimal satu soal"),
});

export type SimpanSoalInput = z.infer<typeof simpanSoalSchema>;

export const gantiPasswordSchema = z.object({
  passwordLama: z.string().min(6, "Password lama minimal 6 karakter").max(100),
  passwordBaru: z
    .string()
    .min(8, "Password baru minimal 8 karakter")
    .max(100, "Password baru maksimal 100 karakter"),
});

export type GantiPasswordInput = z.infer<typeof gantiPasswordSchema>;

// --- Umum ---

export const idParamsSchema = z.object({
  id: z.string().min(1),
});