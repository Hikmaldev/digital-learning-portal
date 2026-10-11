/**
 * Tambah akun guru baru (multi-guru).
 *
 * Jalankan lewat:
 *   npm run guru:add -- --nama "Nama Guru" --email guru@email.id
 *   npm run guru:add -- --nama "Nama Guru" --email guru@email.id --password "rahasia123"
 *
 * Tanpa --password, password acak dibuat dan dicetak untuk dibagikan (mis. lewat WA).
 * Guru bisa mengganti password sendiri di /guru/akun setelah masuk.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

/** Muat .env bila DATABASE_URL belum ada di environment (script berdiri sendiri). */
function muatEnv() {
  if (process.env.DATABASE_URL) return;
  try {
    const isi = readFileSync(path.join(process.cwd(), ".env"), "utf8");
    for (const baris of isi.split(/\r?\n/)) {
      const cocok = baris.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
      if (!cocok) continue;
      let nilai = cocok[2];
      if (
        (nilai.startsWith('"') && nilai.endsWith('"')) ||
        (nilai.startsWith("'") && nilai.endsWith("'"))
      ) {
        nilai = nilai.slice(1, -1);
      }
      if (!(cocok[1] in process.env)) process.env[cocok[1]] = nilai;
    }
  } catch {
    // .env tidak ada — andalkan environment yang sudah diset.
  }
}

function arg(nama: string): string | undefined {
  const i = process.argv.indexOf(`--${nama}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

const adaFlag = (nama: string) => process.argv.includes(`--${nama}`);

/** Huruf/angka tanpa karakter yang mudah tertukar (O/0, I/1, l). */
const ABJAD = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";

function passwordAcak(panjang = 10): string {
  return Array.from({ length: panjang }, () =>
    ABJAD.charAt(Math.floor(Math.random() * ABJAD.length))
  ).join("");
}

function cetakBantuan() {
  console.log(`
Tambah akun guru baru untuk Portal Belajar Digital.

Pemakaian:
  npm run guru:add -- --nama "Nama Guru" --email guru@email.id [--password "rahasia123"] [--dry-run]

Opsi:
  --nama       Nama guru (wajib, minimal 2 karakter)
  --email      Email login guru (wajib, unik; disimpan huruf kecil)
  --password   Password awal (opsional; minimal 8 karakter.
               Bila dikosongkan, password acak dibuat dan dicetak)
  --dry-run    Cek tanpa menyimpan ke database
  --help       Tampilkan bantuan ini

Catatan:
  - 1 kelas hanya dimiliki 1 guru; materi/latihan/progres tidak
    tercampur antar guru walaupun mata pelajarannya sama.
  - Bagikan email & password lewat WhatsApp. Guru dapat mengganti
    password sendiri di halaman /guru/akun setelah masuk.
`);
}

async function main() {
  if (adaFlag("help") || adaFlag("bantuan")) {
    cetakBantuan();
    return;
  }

  muatEnv();
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error(
      "DATABASE_URL belum diset. Salin .env.example ke .env lalu isi koneksi Neon."
    );
    process.exitCode = 1;
    return;
  }

  const nama = arg("nama")?.trim();
  const email = arg("email")?.trim().toLowerCase();
  const passwordArg = arg("password");
  const dryRun = adaFlag("dry-run");

  if (!nama || nama.length < 2) {
    console.error('Argumen --nama wajib diisi (minimal 2 karakter). Lihat: npm run guru:add -- --help');
    process.exitCode = 1;
    return;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error("Argumen --email wajib diisi dengan format email yang valid.");
    process.exitCode = 1;
    return;
  }
  if (passwordArg !== undefined && passwordArg.length < 8) {
    console.error("--password minimal 8 karakter (atau kosongkan agar dibuat acak).");
    process.exitCode = 1;
    return;
  }

  const password = passwordArg ?? passwordAcak();
  const adapter = new PrismaPg({ connectionString: url });
  const prisma = new PrismaClient({ adapter });

  try {
    const sudahAda = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (sudahAda) {
      console.error(`Email ${email} sudah terdaftar. Gunakan email lain.`);
      process.exitCode = 1;
      return;
    }

    const password_hash = await bcrypt.hash(password, 10);

    if (dryRun) {
      console.log("(dry-run) Akun berikut akan dibuat:");
      console.log(`  Nama  : ${nama}`);
      console.log(`  Email : ${email}`);
      console.log("Jalankan ulang tanpa --dry-run untuk menyimpan.");
      return;
    }

    await prisma.user.create({
      data: { nama, email, password_hash },
    });

    console.log("✓ Akun guru berhasil dibuat.");
    console.log(`  Nama     : ${nama}`);
    console.log(`  Email    : ${email}`);
    if (passwordArg === undefined) {
      console.log(`  Password : ${password}   ← simpan & bagikan lewat WA; tidak ditampilkan lagi`);
    } else {
      console.log("  Password : (sesuai yang Anda isi)");
    }
    console.log("");
    console.log("Guru masuk di /guru/masuk, lalu bisa ganti password di /guru/akun.");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error("Gagal menambahkan akun guru:", e instanceof Error ? e.message : e);
  process.exitCode = 1;
});
