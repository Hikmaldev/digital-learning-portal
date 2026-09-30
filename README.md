# 📚 Ruang Belajar — Portal Belajar Digital

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)
![Neon Postgres](https://img.shields.io/badge/Neon-Postgres-00E599?logo=postgresql&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-4-3E67B1?logo=zod&logoColor=white)
![Auth.js](https://img.shields.io/badge/Auth.js-5_beta-000000)
![Vercel](https://img.shields.io/badge/Vercel-Deploy_siap-000?logo=vercel)
![TestSprite](https://img.shields.io/badge/Diuji_TestSprite-10_10_passed-2ea44f)

**Ruang Belajar** adalah aplikasi web full-stack untuk pendidikan kesetaraan (Paket A, B, C): materi ringkas, latihan soal pilihan ganda dengan auto-grading, dan dashboard progres untuk guru — semua dalam satu aplikasi yang dibangun dengan **Next.js 16 App Router**, **Neon Serverless Postgres**, dan dideploy di **Vercel**.

> *"Belajar jadi sederhana — satu kode kelas, seluruh materi dan latihan di genggaman."*

---

## ✨ Fitur Utama

### 🎒 Portal Siswa (tanpa akun)
- **Masuk hanya dengan kode kelas** (mis. `HB2026`) — tidak perlu registrasi
- Daftar bab + materi ringkas per mata pelajaran, dilengkapi video embed & sumber buku
- **Latihan pilihan ganda dengan auto-grading** — nilai dan rincian jawaban langsung muncul
- **Draft otomatis** — jawaban tersimpan di `sessionStorage`, tetap ada walau halaman di-reload

### 🧑‍🏫 Panel Guru (login Auth.js)
- **Dashboard** — metrik ringkas: siswa aktif, latihan terkumpul, rata-rata progres
- **Progress per siswa** — status sudak mengerjakan / sedang berjalan / belum mulai
- **Editor materi** — tambah bab lengkap dengan ringkasan, konten, video & sumber buku
- **Builder latihan soal** — susun soal pilihan ganda + tandai kunci jawaban

### 🛡️ Integritas & Ketahanan
- **Kunci jawaban tidak pernah dikirim ke browser** — penilaian sepenuhnya di server (`lib/grading.ts`)
- **Mode data ganda** — query mendahulukan database dan otomatis jatuh ke data contoh bila `DATABASE_URL` belum diset, jadi aplikasi selalu bisa dijalankan

---

## 🛠️ Tech Stack

| Lapisan | Teknologi |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Server Components) |
| **Bahasa** | [TypeScript](https://www.typescriptlang.org/) 5 |
| **UI** | [React 19](https://react.dev/) + [Tailwind CSS v4](https://tailwindcss.com/) |
| **Database** | [Neon Serverless Postgres](https://neon.tech/) + [Prisma 7](https://www.prisma.io/) (`@prisma/adapter-pg`) |
| **Validasi** | [Zod](https://zod.dev/) 4 |
| **Autentikasi** | [Auth.js](https://authjs.dev/) v5 (Credentials, `bcryptjs`) |
| **Hosting** | [Vercel](https://vercel.com/) |
| **Testing** | [TestSprite CLI](https://testsprite.com/) (end-to-end) |

---

## 🗂️ Struktur Proyek

```
Digital-Learning-Portal/
├── app/
│   ├── page.tsx               # Beranda
│   ├── siswa/                 # masuk · kelas · materi · latihan · hasil
│   ├── guru/                  # masuk · dashboard · progress · materi/baru · soal/baru
│   └── api/                   # Route handler (backend-for-frontend)
├── components/                # Komponen server & client
├── lib/
│   ├── queries.ts             # Lapisan query (DB-first, fallback data contoh)
│   ├── grading.ts             # Auto-grading latihan
│   ├── validations.ts         # Skema Zod
│   ├── data.ts                # Data contoh (fallback tanpa DB)
│   └── prisma.ts              # PrismaClient singleton + adapter pg
├── prisma/
│   ├── schema.prisma          # Skema database (7 model)
│   ├── migrations/            # Migrasi SQL
│   └── seed.ts                # Data demo
├── auth.config.ts, auth.ts    # Auth.js untuk guru
├── proxy.ts                   # Proteksi halaman guru (pengganti middleware di Next 16)
└── testsprite-plans/          # Plan test end-to-end
```

---

## 🚀 Menjalankan

### Prasyarat
- [Node.js](https://nodejs.org/) v20+ (v24 disarankan)
- Akun [Neon](https://neon.tech/) (gratis) — *opsional untuk pengembangan lokal*

### 1. Clone & Install

```bash
git clone https://github.com/Hikmaldev/digital-learning-portal.git
cd digital-learning-portal
npm install
```

### 2. Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Neon Database URL (mode pooled) — ambil dari neon.tech → Dashboard → Connection Details
DATABASE_URL=postgresql://user:password@ep-xxxx-pooler.region.aws.neon.tech/neondb?sslmode=require

# Secret Auth.js — generate dengan: npx auth secret
AUTH_SECRET=

# Dipercaya sebagai host (wajib true saat di Vercel / proxy)
AUTH_TRUST_HOST=true

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **💡 Tidak punya database?** Tidak masalah! Aplikasi otomatis memakai **data contoh** (`lib/data.ts`), jadi bisa langsung dijalankan tanpa konfigurasi database apa pun.

### 3. Setup Database (Opsional)

```bash
npm run db:generate   # generate Prisma client
npm run db:migrate    # prisma migrate dev — buat & terapkan migrasi
npm run db:seed       # isi data demo (guru, kelas HB2026, bab, soal, progress)
```

> Jalankan `npm run db:seed` **sekali saja** — data bab/soal memakai `create` (bukan `upsert`).

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 🌐 Deploy ke Vercel + Neon

### Langkah 1: Buat Database di Neon
1. Daftar / masuk di [neon.tech](https://neon.tech)
2. Buat project baru → pilih region terdekat (mis. **Singapore** `ap-southeast-1` untuk Indonesia) — project `portal-belajar-digital` sudah dibuat via MCP
3. Salin **Connection String** dari halaman Connection Details (mode **pooled**, akhiri `?sslmode=require`)

### Langkah 2: Migrasi & Seed
```bash
npm run db:generate
npm run db:deploy       # prisma migrate deploy — terapkan migrasi (produksi)
npm run db:seed         # sekali saja
```

### Langkah 3: Deploy ke Vercel
1. Push kode ke GitHub
2. Buka [vercel.com](https://vercel.com) → **Import repository**
3. Tambahkan **Environment Variables** (Production):

   | Key | Value |
   |---|---|
   | `DATABASE_URL` | Connection string Neon (pooled) |
   | `AUTH_SECRET` | String acak — sama dengan `.env` lokal |
   | `AUTH_TRUST_HOST` | `true` |
   | `NEXT_PUBLIC_APP_URL` | `https://<nama-proyek>.vercel.app` |

4. Klik **Deploy** — selesai! 🎉

> ⚠️ `postinstall` di `package.json` sudah menjalankan `prisma generate` otomatis, dan `prisma/migrations/` ikut di-commit sehingga `migrate deploy` bisa jalan di lingkungan baru.

---

## 🔑 Akun Demo

Setelah menjalankan `npm run db:seed`, kredensial berikut siap dipakai:

| Field | Value |
|---|---|
| Email | `hikmal@ruangbelajar.id` |
| Password | `demo1234` |
| Nama | Hikmal Ananta Putra |
| Role | Guru |

Kode kelas demo untuk siswa:

| Kode Kelas | Nama Kelas | Jenjang |
|---|---|---|
| `HB2026` | Kelas Kesetaraan Harapan Bersama | Paket B |

---

## 📡 API Endpoints

| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/api/siswa/masuk` | Validasi kode kelas + nama siswa |
| `GET` | `/api/siswa/kelas?kode=` | Info kelas + daftar bab (dashboard siswa) |
| `GET` | `/api/siswa/latihan/soal?babId=` | Soal latihan (kunci jawaban tidak dikirim) |
| `POST` | `/api/siswa/latihan/submit` | Auto-grading jawaban + simpan progress |
| `GET/POST` | `/api/guru/kelas` | Daftar kelas / buat kelas baru |
| `GET` | `/api/guru/bab?kelasId=` | Daftar bab per kelas (builder soal) |
| `POST` | `/api/guru/materi` | Simpan materi bab (teks, video, sumber buku) |
| `POST` | `/api/guru/soal` | Simpan latihan soal pilihan ganda |
| `GET` | `/api/guru/progress?kelasId=` | Ringkasan progress per siswa + metrik |
| `GET` | `/api/guru/status` | Status infrastruktur (`dbAktif` / waktu buka) |
| `GET/POST` | `/api/auth/*` | Auth.js — login guru |

Semua input divalidasi dengan **Zod** di sisi server; penilaian latihan berjalan di `lib/grading.ts` (mendukung database maupun data contoh).

---

## 🏗️ Arsitektur

```
┌─────────────────────────────────────────────────────────┐
│                     Vercel (Hosting)                     │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Next.js 16 App Router                │  │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────────┐  │  │
│  │  │  Portal   │  │  Panel    │  │   API Routes   │  │  │
│  │  │  Siswa    │  │  Guru     │  │  /api/*        │  │  │
│  │  └─────┬────┘  └─────┬─────┘  └───────┬────────┘  │  │
│  │        │             │                │           │  │
│  │        └─────────────┼────────────────┘           │  │
│  │                      │                            │  │
│  │             ┌────────▼────────┐                   │  │
│  │             │  lib/queries.ts │                   │  │
│  │             │  lib/grading.ts │                   │  │
│  │             └────────┬────────┘                   │  │
│  │                      │                            │  │
│  │        ┌─────────────▼─────────────┐              │  │
│  │        │   Prisma 7 +              │              │  │
│  │        │   @prisma/adapter-pg      │              │  │
│  │        └─────────────┬─────────────┘              │  │
│  └──────────────────────┼────────────────────────────┘  │
└─────────────────────────┼───────────────────────────────┘
                          │ HTTPS
              ┌───────────▼───────────┐
              │   Neon Postgres       │
              │   (Serverless DB)     │
              │   Region: Singapore   │
              └───────────────────────┘
```

**Mode data ganda**: Saat `DATABASE_URL` terisi, semua operasi data langsung memakai Neon Postgres. Tanpa `DATABASE_URL`, aplikasi memakai data contoh (`lib/data.ts`) — pengembangan bisa jalan dengan nol setup dan frontend tetap tersaji penuh.

---

## 🔒 Keamanan

- **Autentikasi Guru**: Auth.js v5 dengan provider Credentials; password di-hash menggunakan `bcryptjs`, sesi disimpan sebagai JWT di cookie HTTP-only
- **Proteksi Halaman**: `proxy.ts` (pengganti middleware di Next 16) melindungi `/guru/materi/*` dan `/guru/soal/*` dari pengunjung belum login
- **Integritas Latihan**: kunci jawaban (`is_benar`) tidak pernah dikirim ke browser — auto-grading sepenuhnya di server
- **Validasi Input**: semua input divalidasi skema Zod di server sebelum diproses
- **Privasi Siswa**: sesi siswa disimpan di `sessionStorage` per browser, tanpa akun, tanpa data sensitif
- **Resilience**: tanpa database pun aplikasi tetap tersaji lewat fallback data contoh

---

## 🧪 Pengujian dengan TestSprite

Plan test end-to-end (bahasa natural) tersimpan di `testsprite-plans/` dan dieksekusi terhadap aplikasi berjalan:

```bash
npm run start                          # server produksi di :3000
testsprite auth status                 # pastikan kredensial aktif (testsprite setup jika belum)
testsprite test run <test-id…> --local 3000   # tunnel ke app lokal
```

Cakupan (10 skenario, **10/10 lulus**): beranda & navigasi, masuk siswa (kode valid/invalid), dashboard kelas, materi, latihan sampai hasil, draft bertahan saat reload, login guru (Auth.js), dashboard & progress guru, serta proteksi halaman kelola guru tanpa login.

---

## 📜 Lisensi

Proyek ini dilisensikan di bawah [Lisensi MIT](LICENSE).

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Jangan ragu membuka *issue* atau *pull request* untuk perbaikan bug, fitur baru, atau penyempurnaan dokumentasi.

1. Fork repository ini
2. Buat branch fitur (`git checkout -b fitur/fitur-anda`)
3. Commit perubahan (`git commit -m 'Tambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur/fitur-anda`)
5. Buka Pull Request

---

<p align="center">
  Dibuat dengan ❤️ untuk para pejuang pendidikan kesetaraan — Paket A · B · C
</p>