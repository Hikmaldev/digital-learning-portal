# Ruang Belajar — Portal Belajar Digital

Portal belajar untuk kelas pendidikan kesetaraan (Paket A, B, C): materi ringkas, latihan soal pilihan ganda dengan auto-grading, dan dashboard progres untuk guru.

Dibangun dengan **Next.js (App Router) + TypeScript + Tailwind CSS**, sesuai PRD (`PRD_Portal_Belajar_Digital.md`).

## Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Tanpa database, aplikasi berjalan dengan **data contoh** (`lib/data.ts`). Semua lapisan backend (Prisma, API routes, Auth.js) sudah terpasang dan siap dipakai begitu `DATABASE_URL` diisi — lihat [Backend](#backend).

## Struktur

```
app/                      # halaman (route) + route handler API
  page.tsx                # beranda
  siswa/masuk             # masuk siswa pakai kode kelas
  siswa/kelas             # kelas siswa (daftar bab)
  siswa/materi            # baca materi bab
  siswa/latihan           # kerjakan latihan (auto-grading)
  siswa/latihan/hasil     # hasil latihan
  guru/masuk              # login guru
  guru/dashboard          # dashboard ringkas
  guru/progress           # progress per siswa
  guru/materi/baru        # buat materi
  guru/soal/baru          # buat latihan soal
  api/                    # route handler (backend-for-frontend)
components/               # komponen bersama (server & client)
lib/                      # tipe domain, data contoh, validasi, query, grading
prisma/                   # skema database + seed
auth.config.ts, auth.ts    # Auth.js untuk guru
proxy.ts                  # proteksi halaman guru (pengganti middleware di Next 16)
```

## Halaman & alur

- **Siswa** (tanpa akun): masuk dengan kode kelas → daftar bab → baca materi → kerjakan latihan → hasil langsung.
- **Guru** (login): dashboard ringkas → progress per siswa → buat materi baru → buat latihan soal.

Kode kelas demo: `HB2026`. Akun guru demo (setelah seed database): `hikmal@ruangbelajar.id` / `demo1234`.

## Backend

### Database — Prisma + Neon (Postgres)

Skema di `prisma/schema.prisma` mengikuti struktur PRD §9: `User` (guru), `Kelas`, `Bab`, `Gambar`, `Soal`, `OpsiJawaban`, `ProgressSiswa`.

1. Buat project [Neon](https://neon.tech), salin connection string ke `.env` (lihat `.env.example`).
2. Generate & migrasi:
   ```bash
   npm run db:generate
   npm run db:migrate
   npm run db:seed        # data demo (guru, kelas HB2026, bab, soal, progress)
   ```

`lib/prisma.ts` membuat singleton `PrismaClient` dengan adapter `@prisma/adapter-pg` (kompatibel serverless/Neon). Tanpa `DATABASE_URL`, `prisma` bernilai `null` dan halaman memakai data contoh — aplikasi tetap jalan.

### API routes (backend-for-frontend)

| Endpoint | Fungsi |
| --- | --- |
| `POST /api/siswa/masuk` | Validasi kode kelas + nama siswa |
| `GET /api/siswa/kelas?kode=` | Info kelas + daftar bab (dashboard siswa) |
| `GET /api/siswa/latihan/soal?babId=` | Soal untuk dikerjakan (kunci jawaban tidak dikirim) |
| `POST /api/siswa/latihan/submit` | Nilai jawaban (auto-grading), simpan progress |
| `GET /api/guru/kelas`, `POST /api/guru/kelas` | Daftar kelas, buat kelas baru |
| `GET /api/guru/bab?kelasId=` | Daftar bab per kelas (builder soal) |
| `POST /api/guru/materi` | Simpan materi bab (teks, video, sumber buku) |
| `POST /api/guru/soal` | Simpan latihan soal pilihan ganda |
| `GET /api/guru/progress?kelasId=` | Ringkasan progress per siswa + metrik |
| `GET /api/guru/status` | Status infrastruktur (dipakai halaman login) |
| `GET/POST /api/auth/*` | Auth.js (login guru) |

Semua input divalidasi dengan **Zod** (`lib/validations.ts`); penilaian latihan di `lib/grading.ts` (mendukung DB dan data contoh). Halaman dashboard memakai lapisan query `lib/queries.ts` yang mendahulukan database dan otomatis jatuh ke data contoh.

### Integrasi frontend ↔ backend

- **Siswa**: masuk kelas → validasi API; dashboard kelas → data API; materi → konten, video embed, dan daftar bab dari data layer; latihan → soal dari server (kunci tidak bocor ke klien), submit dinilai di server.
- **Guru**: login → Auth.js Credentials (dengan jalur demo saat DB belum aktif); dashboard & progress → query layer; builder materi & soal → kirim ke API, dengan fallback draft lokal (sessionStorage) saat database belum tersambung.

### Autentikasi guru — Auth.js

`auth.config.ts` + `auth.ts` + `proxy.ts` (Next 16) melindungi halaman kelola guru (`/guru/materi/*`, `/guru/soal/*`) dengan login **Credentials** (email + password, hash `bcrypt`). Aktif setelah database tersedia.

## Catatan implementasi

- **Komponen Server di default**, klien hanya untuk interaksi (form, draft latihan, builder soal).
- **Draft latihan siswa** tersimpan di `sessionStorage` (mitigasi risiko PRD §11); hasil latihan dikirim ke API untuk dinilai & disimpan, lalu ditampilkan di halaman hasil.
- **Data contoh** ada di `lib/data.ts` sebagai fallback ketika database belum dikonfigurasi.
- Font di-self-host via `next/font/google` (DM Sans + Fraunces) untuk performa.

## Pengujian dengan TestSprite

Test end-to-end berbasis TestSprite CLI tersimpan di `testsprite-plans/` (plan berbahasa natural yang dieksekusi di atas aplikasi berjalan). Menjalankan ulang seluruh suite:

```bash
npm run start   # server produksi harus berjalan di :3000
testsprite auth status   # pastikan kredensial aktif (testsprite setup jika belum)
Get-ChildItem testsprite-plans\*.json | ForEach-Object {
  testsprite test create --plan-from $_.FullName
}
testsprite test run <test-id...> --local 3000   # tunnel ke app lokal
```

Cakupan: beranda & navigasi, masuk siswa (valid/invalid), dashboard kelas, materi, latihan lengkap sampai hasil, draft jawaban bertahan saat reload, login guru + jalur demo, dashboard & progress guru, dan proteksi halaman kelola guru tanpa login.

## Langkah berikutnya

- [ ] Sambungkan `POST /api/guru/materi` ke **Vercel Blob** untuk unggah gambar materi (saat ini gambar disimpan sebagai URL).
- [ ] Isi `guru_id` dari session (Auth aktif) di `POST /api/guru/kelas`.
- [ ] Hitung progres per bab dari `ProgressSiswa` di dashboard (saat ini placeholder 0).