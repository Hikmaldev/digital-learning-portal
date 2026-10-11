# 📚 Ruang Belajar — Digital Learning Portal

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)
![Neon Postgres](https://img.shields.io/badge/Neon-Postgres-00E599?logo=postgresql&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-4-3E67B1?logo=zod&logoColor=white)
![Auth.js](https://img.shields.io/badge/Auth.js-5_beta-000000)
![Vercel](https://img.shields.io/badge/Vercel-Deploy_ready-000?logo=vercel)
![TestSprite](https://img.shields.io/badge/Tested_TestSprite-10_10_passed-2ea44f)

**Ruang Belajar** is a full-stack web app for non-formal education classes (Paket A, B, C): bite-sized lessons, multiple-choice quizzes with auto-grading, and a progress dashboard for teachers — all in one application built with **Next.js 16 App Router**, **Neon Serverless Postgres**, and deployed on **Vercel**.

> *"Learning made simple — one class code, your entire set of lessons and quizzes in hand."*

---

## ✨ Key Features

### 🎒 Student Portal (no account needed)
- **Join with just a class code** (e.g. `HB2026`) — no registration required
- Chapter lists + bite-sized lesson materials per subject, with embedded videos & book sources
- **Multiple-choice quizzes with auto-grading** — score and answer breakdown appear instantly
- **Auto-saved drafts** — answers stay in `sessionStorage`, surviving page reloads
- **Overall & per-chapter progress** — a completed quiz chapter shows 100% "Selesai" on the class page
- **Student feedback form** — suggestions, bug reports, or praise straight from the class page

### 🧑‍🏫 Teacher Panel (Auth.js login)
- **Dashboard** — at-a-glance metrics: active students, collected quizzes, average progress
- **Create a new class** — auto-generated 6-character access code, ready to share. Levels: `Paket A`, `Paket B`, `Paket C`, or `CAMPURAN` (mixed classes)
- **Per-student progress** — summaries plus a newest-first activity log (student × chapter, score, status, WIB time)
- **Lesson editor** — add chapters with summary, content, video & book sources
- **Quiz builder** — compose multiple-choice questions and mark the correct answer
- **Feedback inbox** — read and mark student feedback as read

### 📖 User Guide
- **/panduan** — step-by-step guides with screenshots for students and teachers
  ([`/panduan/siswa`](app/panduan/siswa/page.tsx), [`/panduan/guru`](app/panduan/guru/page.tsx))

### 🛡️ Integrity & Resilience
- **Answer keys never reach the browser** — grading happens entirely on the server (`lib/grading.ts`)
- **Dual data mode** — queries prefer the database and automatically fall back to sample data when `DATABASE_URL` is not set, so the app always runs

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Server Components) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) 5 |
| **UI** | [React 19](https://react.dev/) + [Tailwind CSS v4](https://tailwindcss.com/) |
| **Database** | [Neon Serverless Postgres](https://neon.tech/) + [Prisma 7](https://www.prisma.io/) (`@prisma/adapter-pg`) |
| **Validation** | [Zod](https://zod.dev/) 4 |
| **Auth** | [Auth.js](https://authjs.dev/) v5 (Credentials, `bcryptjs`) |
| **Hosting** | [Vercel](https://vercel.com/) |
| **Testing** | [TestSprite CLI](https://testsprite.com/) (end-to-end) |

---

## 🗂️ Project Structure

```
Digital-Learning-Portal/
├── app/
│   ├── page.tsx               # Landing page
│   ├── siswa/                 # join · class · lessons · quiz · results
│   ├── guru/                  # login · dashboard · progress · materi/baru · soal/baru
│   └── api/                   # Route handlers (backend-for-frontend)
├── components/                # Server & client components
├── lib/
│   ├── queries.ts             # Query layer (DB-first, sample-data fallback)
│   ├── grading.ts             # Quiz auto-grading
│   ├── validations.ts         # Zod schemas
│   ├── data.ts                # Sample data (fallback without DB)
│   └── prisma.ts              # PrismaClient singleton + pg adapter
├── prisma/
│   ├── schema.prisma          # Database schema (7 models)
│   ├── migrations/            # SQL migrations
│   └── seed.ts                # Demo data
├── auth.config.ts, auth.ts    # Auth.js for teachers
├── proxy.ts                   # Teacher page protection (Next 16 middleware replacement)
└── testsprite-plans/          # End-to-end test plans
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v20+ (v24 recommended)
- A [Neon](https://neon.tech/) account (free) — *optional for local development*

### 1. Clone & Install

```bash
git clone https://github.com/Hikmaldev/digital-learning-portal.git
cd digital-learning-portal
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Neon Database URL (pooled mode) — grab from neon.tech → Dashboard → Connection Details
DATABASE_URL=postgresql://user:password@ep-xxxx-pooler.region.aws.neon.tech/neondb?sslmode=verify-full

# Auth.js secret — generate with: npx auth secret
AUTH_SECRET=

# Trust this host (required true when on Vercel / behind a proxy)
AUTH_TRUST_HOST=true

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **💡 No database?** No problem! The app automatically uses **sample data** (`lib/data.ts`), so you can run it straight away without any database setup.

### 3. Set Up the Database (Optional)

```bash
npm run db:generate   # generate the Prisma client
npm run db:migrate    # prisma migrate dev — create & apply migrations
npm run db:seed       # fill demo data (teacher, HB2026 class, chapters, quizzes, progress)
npm run db:konten     # add Paket A/B/C classes (PAKETA/PAKETB/PAKETC) with materials & quizzes
```

> Run `npm run db:seed` **only once** — chapter/quiz data uses `create` (not `upsert`).
> `npm run db:konten` is safe to run repeatedly: it upserts classes and chapters, and only
> creates quizzes for chapters that don't have any yet.

### 4. Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy to Vercel + Neon

### Step 1: Create a Database in Neon
1. Sign up / sign in at [neon.tech](https://neon.tech)
2. Create a new project → pick a nearby region (e.g. **Singapore** `ap-southeast-1` for Indonesia) — the `portal-belajar-digital` project was created via MCP
3. Copy the **connection string** from the Connection Details page (mode **pooled**, ending in `?sslmode=verify-full`)

### Step 2: Migrate & Seed
```bash
npm run db:generate
npm run db:deploy       # prisma migrate deploy — apply migrations (production)
npm run db:seed         # run once
```

### Step 3: Deploy to Vercel
1. Push the code to GitHub
2. Open [vercel.com](https://vercel.com) → **Import repository**
3. Add the **Environment Variables** (Production):

   | Key | Value |
   |---|---|
   | `DATABASE_URL` | Neon connection string (pooled) |
   | `AUTH_SECRET` | Random string — same as your local `.env` |
   | `AUTH_TRUST_HOST` | `true` |
   | `NEXT_PUBLIC_APP_URL` | `https://<project-name>.vercel.app` |

4. Click **Deploy** — done! 🎉

> ⚠️ The `postinstall` script in `package.json` already runs `prisma generate` automatically, and `prisma/migrations/` is committed so `migrate deploy` works on a fresh environment.

---

## 🔑 Demo Accounts

Once `npm run db:seed` has been run, these credentials are ready to use:

| Field | Value |
|---|---|
| Email | `hikmal@ruangbelajar.id` |
| Password | `demo1234` |
| Name | Hikmal Ananta Putra |
| Role | Teacher |

Demo class code for students:

| Class Code | Class Name | Level |
|---|---|---|
| `HB2026` | Kelas Kesetaraan Harapan Bersama | Paket B |
| `PAKETA` | Kelas A (Paket A — Setara SD) | Bahasa Indonesia, Matematika |
| `PAKETB` | Kelas B (Paket B — Setara SMP) | Bahasa Indonesia, Matematika, Bahasa Inggris |
| `PAKETC` | Kelas C (Paket C — Setara SMA) | Matematika, Bahasa Indonesia, Bahasa Inggris, Informatika |

> `PAKETA`/`PAKETB`/`PAKETC` come from `npm run db:konten`. Every chapter ships with
> materials and at least 5 auto-graded multiple-choice questions, sourced from
> official Kemendikdasmen textbooks (SIBI).

---

## 👥 Adding Teacher Accounts (Multi-Teacher)

The portal supports multiple teachers. Each class belongs to exactly one teacher,
so materials, quizzes, student progress, and feedback never mix between teachers —
even when the same subject (e.g. Mathematics) is taught in different classes.

Create a new teacher account from the CLI:

```bash
# Random password is generated and printed (share it via WhatsApp)
npm run guru:add -- --nama "Budi Santoso" --email budi@email.com

# Or set the initial password yourself
npm run guru:add -- --nama "Budi Santoso" --email budi@email.com --password "rahasia123"

# Validate without saving
npm run guru:add -- --nama "Budi Santoso" --email budi@email.com --dry-run
```

What the teacher can do after logging in at `/guru/masuk`:

- Manage their **own** classes only (create class, materials, quizzes, share class codes).
- **Kelola materi** (`/guru/materi`) — list every chapter of a class, then edit, delete, preview as a student, or add quiz questions for that chapter. The **+ Tambah materi** button opens the chapter form (`/guru/materi/baru`).
- See progress and student feedback for their **own** classes only, and download a CSV recap from the progress page (**Unduh rekap**).
- Change their own password at `/guru/akun` (menu **Akun** in the teacher panel).

> ⚠️ Change the seeded demo password (`demo1234`) before going live with real teachers.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/siswa/masuk` | Validate class code + student name |
| `GET` | `/api/siswa/kelas?kode=` | Class info + chapter list (student dashboard) |
| `GET` | `/api/siswa/latihan/soal?babId=` | Quiz questions (answer keys are never sent) |
| `POST` | `/api/siswa/latihan/submit` | Auto-grade answers + save progress |
| `GET/POST` | `/api/guru/kelas` | List classes / create a new class |
| `GET` | `/api/guru/bab?kelasId=` | Chapters per class (quiz builder) |
| `POST` | `/api/guru/materi` | Save a lesson chapter (text, video, book source) |
| `PATCH/DELETE` | `/api/guru/materi/:babId` | Edit or delete an existing chapter (owner only) |
| `POST` | `/api/guru/soal` | Save multiple-choice quiz questions |
| `GET` | `/api/guru/progress?kelasId=` | Per-student progress summary + metrics |
| `GET` | `/api/guru/rekap?kelasId=` | Download class progress recap (CSV) |
| `POST` | `/api/guru/password` | Change the logged-in teacher's password |
| `GET` | `/api/guru/status` | Infrastructure status (`dbAktif` / uptime) |
| `GET/POST` | `/api/auth/*` | Auth.js — teacher login |

All input is validated with **Zod** server-side; quiz grading runs in `lib/grading.ts` (works with both the database and sample data).

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Vercel (Hosting)                     │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Next.js 16 App Router                │  │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────────┐  │  │
│  │  │ Student   │  │ Teacher   │  │   API Routes   │  │  │
│  │  │ Portal    │  │ Panel     │  │  /api/*        │  │  │
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

**Dual data mode**: When `DATABASE_URL` is set, all data operations hit Neon Postgres directly. Without `DATABASE_URL`, the app serves sample data (`lib/data.ts`) — development works with zero setup and the frontend stays fully rendered.

---

## 🔒 Security

- **Teacher Auth**: Auth.js v5 with the Credentials provider; passwords hashed with `bcryptjs`, sessions stored as JWTs in HTTP-only cookies
- **Page Protection**: `proxy.ts` (Next 16's middleware replacement) guards `/guru/materi/*` and `/guru/soal/*` from unauthenticated visitors
- **Quiz Integrity**: answer keys (`is_benar`) are never sent to the browser — auto-grading happens entirely on the server
- **Input Validation**: every input is validated against a Zod schema server-side before processing
- **Student Privacy**: student sessions live in the browser's `sessionStorage` — no account, no sensitive data
- **Resilience**: even without a database the app keeps serving via the sample-data fallback

---

## 🧪 Testing with TestSprite

End-to-end test plans (in natural language) live in `testsprite-plans/` and run against the running app:

```bash
npm run start                          # production server on :3000
testsprite auth status                 # make sure credentials are active (testsprite setup if not)
testsprite test run <test-id…> --local 3000   # tunnel to the local app
```

Coverage (10 scenarios, **10/10 passed**): landing page & navigation, student join (valid/invalid code), class dashboard, lessons, quiz through results, draft persisting on reload, teacher login (Auth.js), teacher dashboard & progress, and unauthenticated access protection for the teacher pages.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an *issue* or *pull request* for bug fixes, new features, or documentation improvements.

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add a new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

<p align="center">
  Built with ❤️ for the champions of non-formal education — Paket A · B · C
</p>