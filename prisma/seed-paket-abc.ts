/**
 * Seed konten kurikulum Paket A/B/C — menambahkan 3 kelas (Kelas A, B, C)
 * beserta materi dan latihan soal untuk setiap bab.
 *
 * Jalankan: npm run db:konten
 * (butuh DATABASE_URL di .env; skrip aman dijalankan berulang)
 */
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { paketA } from "./konten/paket-a";
import { paketB } from "./konten/paket-b";
import { paketC } from "./konten/paket-c";
import type { PaketKonten, SoalKonten } from "./konten/tipe";

const url = process.env.DATABASE_URL;
if (!url) {
  console.log(
    "DATABASE_URL belum diset di .env — lewati seed konten. Salin .env.example lalu isi koneksi Neon."
  );
  process.exit(0);
}

const adapter = new PrismaPg({ connectionString: url });
const prisma = new PrismaClient({ adapter });

const GURU_EMAIL = "hikmal@ruangbelajar.id";

/** Acak urutan opsi (Fisher-Yates) agar posisi jawaban benar bervariasi. */
function acakOpsi(soal: SoalKonten) {
  const opsi = soal.opsi.map((teks, i) => ({ teks, is_benar: i === soal.benar }));
  for (let i = opsi.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [opsi[i], opsi[j]] = [opsi[j], opsi[i]];
  }
  return opsi;
}

async function seedPaket(paket: PaketKonten, guruId: string) {
  const kelas = await prisma.kelas.upsert({
    where: { kode_akses: paket.kode },
    update: { nama_kelas: paket.nama, jenjang: paket.jenjang },
    create: {
      nama_kelas: paket.nama,
      jenjang: paket.jenjang,
      kode_akses: paket.kode,
      guru_id: guruId,
    },
  });

  let babBaru = 0;
  let babDiperbarui = 0;
  let soalDibuat = 0;
  let soalDilewati = 0;
  const urutanPerMapel = new Map<string, number>();

  for (const item of paket.babs) {
    const urutan = (urutanPerMapel.get(item.mapel) ?? 0) + 1;
    urutanPerMapel.set(item.mapel, urutan);

    const data = {
      mata_pelajaran: item.mapel,
      judul: item.judul,
      ringkasan: item.ringkasan,
      konten_materi: item.konten,
      link_sumber: item.sumber,
      urutan,
    };

    let bab = await prisma.bab.findFirst({
      where: {
        kelas_id: kelas.id,
        mata_pelajaran: item.mapel,
        judul: item.judul,
      },
      select: { id: true },
    });

    if (bab) {
      await prisma.bab.update({ where: { id: bab.id }, data });
      babDiperbarui++;
    } else {
      bab = await prisma.bab.create({
        data: { kelas_id: kelas.id, ...data },
        select: { id: true },
      });
      babBaru++;
    }

    const [jumlahSoal, jumlahProgress] = await Promise.all([
      prisma.soal.count({ where: { bab_id: bab.id } }),
      prisma.progressSiswa.count({ where: { bab_id: bab.id } }),
    ]);

    if (jumlahSoal > 0 || jumlahProgress > 0) {
      soalDilewati += item.soal.length;
      continue;
    }

    for (const [i, s] of item.soal.entries()) {
      await prisma.soal.create({
        data: {
          bab_id: bab.id,
          pertanyaan: s.pertanyaan,
          tipe: "PILIHAN_GANDA",
          urutan: i + 1,
          opsi: { create: acakOpsi(s) },
        },
      });
      soalDibuat++;
    }
  }

  console.log(
    `  ${paket.nama} [${paket.kode}]: ${paket.babs.length} bab ` +
      `(${babBaru} baru, ${babDiperbarui} diperbarui), ` +
      `${soalDibuat} soal dibuat, ${soalDilewati} dilewati (sudah ada).`
  );
}

async function main() {
  const guru = await prisma.user.findUnique({ where: { email: GURU_EMAIL } });
  if (!guru) {
    console.error(`Guru ${GURU_EMAIL} tidak ditemukan. Jalankan "npm run db:seed" dulu.`);
    process.exit(1);
  }

  console.log("Menambahkan konten Paket A/B/C...");
  await seedPaket(paketA, guru.id);
  await seedPaket(paketB, guru.id);
  await seedPaket(paketC, guru.id);
  console.log("Selesai. Kode kelas: PAKETA, PAKETB, PAKETC.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
