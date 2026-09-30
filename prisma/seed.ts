/**
 * Seed data demo — dipakai setelah database (Neon) tersedia.
 * Jalankan: npx prisma db seed
 */
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const url = process.env.DATABASE_URL;
if (!url) {
  console.log(
    "DATABASE_URL belum diset di .env — lewati seed. Salin .env.example lalu isi koneksi Neon."
  );
  process.exit(0);
}

const adapter = new PrismaPg({ connectionString: url });
const prisma = new PrismaClient({ adapter });

async function main() {
  const password_hash = await bcrypt.hash("demo1234", 10);

  const guru = await prisma.user.upsert({
    where: { email: "hikmal@ruangbelajar.id" },
    update: {},
    create: {
      nama: "Hikmal Ananta Putra",
      email: "hikmal@ruangbelajar.id",
      password_hash,
    },
  });

  const kelas = await prisma.kelas.upsert({
    where: { kode_akses: "HB2026" },
    update: {},
    create: {
      nama_kelas: "Kelas Kesetaraan Harapan Bersama",
      jenjang: "Paket B",
      kode_akses: "HB2026",
      guru_id: guru.id,
    },
  });

  const mapelBab: { mapel: string; judul: string; ringkasan: string }[] = [
    { mapel: "Matematika", judul: "Bilangan dan operasinya", ringkasan: "4 bab · 18 latihan" },
    { mapel: "Bahasa Indonesia", judul: "Menemukan gagasan utama", ringkasan: "Bab 03 · latihan tersedia" },
    { mapel: "Ilmu Pengetahuan Alam", judul: "Energi di sekitar kita", ringkasan: "Bab 01 · latihan tersedia" },
    { mapel: "Ilmu Pengetahuan Sosial", judul: "Keragaman lingkungan", ringkasan: "Bab 02 · latihan tersedia" },
    { mapel: "Pendidikan Pancasila", judul: "Hidup bersama dalam perbedaan", ringkasan: "Bab 01 · latihan tersedia" },
    { mapel: "Bahasa Inggris", judul: "Introducing yourself", ringkasan: "Bab 02 · latihan tersedia" },
  ];

  for (const [i, m] of mapelBab.entries()) {
    const bab = await prisma.bab.create({
      data: {
        kelas_id: kelas.id,
        mata_pelajaran: m.mapel,
        judul: m.judul,
        ringkasan: m.ringkasan,
        konten_materi:
          m.mapel === "Bahasa Indonesia"
            ? "Gagasan utama adalah ide pokok atau inti dari sebuah paragraf. Gagasan utama menjadi dasar pengembangan kalimat-kalimat lain dalam paragraf tersebut.\n\nLangkah menemukannya: pertama, baca seluruh paragraf dengan teliti. Kedua, cari hal yang paling sering dibicarakan. Terakhir, tuliskan inti pembicaraan tersebut dengan kalimatmu sendiri.\n\nJangan terburu-buru memilih kalimat pertama sebagai jawaban. Periksa apakah kalimat tersebut benar-benar mewakili isi seluruh paragraf."
            : "Isi materi ringkas bab ini. Gantikan dengan konten yang diunggah guru melalui halaman kelola materi.",
        url_video: null,
        link_sumber: "https://buku.kemendikdasmen.go.id",
        urutan: i + 1,
      },
    });

    if (m.mapel === "Bahasa Indonesia") {
      const soal1 = await prisma.soal.create({
        data: {
          bab_id: bab.id,
          pertanyaan: "Apa yang dimaksud dengan gagasan utama dalam sebuah paragraf?",
          tipe: "PILIHAN_GANDA",
          urutan: 1,
          opsi: {
            create: [
              { teks: "Kalimat yang paling panjang dalam paragraf", is_benar: false },
              { teks: "Ide pokok atau inti pembahasan paragraf", is_benar: true },
              { teks: "Contoh yang digunakan untuk menjelaskan bacaan", is_benar: false },
              { teks: "Kata-kata sulit yang ada dalam bacaan", is_benar: false },
            ],
          },
        },
      });
      await prisma.soal.create({
        data: {
          bab_id: bab.id,
          pertanyaan: "Di mana gagasan utama biasanya dapat ditemukan?",
          tipe: "PILIHAN_GANDA",
          urutan: 2,
          opsi: {
            create: [
              { teks: "Hanya di bagian tengah paragraf", is_benar: false },
              { teks: "Di awal atau akhir paragraf", is_benar: true },
              { teks: "Selalu di kalimat terakhir", is_benar: false },
              { teks: "Di judul buku", is_benar: false },
            ],
          },
        },
      });

      // Contoh progress siswa (diperlukan dashboard guru).
      const kunci = await prisma.opsiJawaban.findFirst({
        where: { soal_id: soal1.id, is_benar: true },
      });
      if (kunci) {
        await prisma.progressSiswa.createMany({
          data: [
            { kelas_id: kelas.id, nama_siswa: "Andi Pratama", bab_id: bab.id, soal_id: soal1.id, jawaban: kunci.id, benar: true, skor: 90 },
            { kelas_id: kelas.id, nama_siswa: "Andi Pratama", bab_id: bab.id, soal_id: (await prisma.soal.findFirst({ where: { bab_id: bab.id, urutan: 2 } }))?.id ?? soal1.id, jawaban: (await prisma.opsiJawaban.findFirst({ where: { soal_id: soal1.id, is_benar: false } }))?.id ?? kunci.id, benar: false, skor: 90 },
          ],
        });
      }
    }
  }

  console.log("Seed selesai.");
  console.log("  Guru : hikmal@ruangbelajar.id / demo1234");
  console.log(`  Kelas: ${kelas.nama_kelas} (kode ${kelas.kode_akses})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());