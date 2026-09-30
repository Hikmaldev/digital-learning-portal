-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kelas" (
    "id" TEXT NOT NULL,
    "nama_kelas" TEXT NOT NULL,
    "jenjang" TEXT NOT NULL,
    "kode_akses" TEXT NOT NULL,
    "guru_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bab" (
    "id" TEXT NOT NULL,
    "kelas_id" TEXT NOT NULL,
    "mata_pelajaran" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "ringkasan" TEXT,
    "konten_materi" TEXT NOT NULL,
    "url_video" TEXT,
    "link_sumber" TEXT,
    "urutan" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gambar" (
    "id" TEXT NOT NULL,
    "bab_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "ukuran_file" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gambar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Soal" (
    "id" TEXT NOT NULL,
    "bab_id" TEXT NOT NULL,
    "pertanyaan" TEXT NOT NULL,
    "tipe" TEXT NOT NULL DEFAULT 'PILIHAN_GANDA',
    "urutan" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Soal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpsiJawaban" (
    "id" TEXT NOT NULL,
    "soal_id" TEXT NOT NULL,
    "teks" TEXT NOT NULL,
    "is_benar" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "OpsiJawaban_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgressSiswa" (
    "id" TEXT NOT NULL,
    "kelas_id" TEXT NOT NULL,
    "nama_siswa" TEXT NOT NULL,
    "bab_id" TEXT NOT NULL,
    "soal_id" TEXT NOT NULL,
    "jawaban" TEXT NOT NULL,
    "benar" BOOLEAN NOT NULL,
    "skor" INTEGER NOT NULL,
    "waktu_submit" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProgressSiswa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Kelas_kode_akses_key" ON "Kelas"("kode_akses");

-- CreateIndex
CREATE INDEX "Bab_kelas_id_idx" ON "Bab"("kelas_id");

-- CreateIndex
CREATE INDEX "Gambar_bab_id_idx" ON "Gambar"("bab_id");

-- CreateIndex
CREATE INDEX "Soal_bab_id_idx" ON "Soal"("bab_id");

-- CreateIndex
CREATE INDEX "OpsiJawaban_soal_id_idx" ON "OpsiJawaban"("soal_id");

-- CreateIndex
CREATE INDEX "ProgressSiswa_kelas_id_bab_id_idx" ON "ProgressSiswa"("kelas_id", "bab_id");

-- CreateIndex
CREATE INDEX "ProgressSiswa_nama_siswa_idx" ON "ProgressSiswa"("nama_siswa");

-- AddForeignKey
ALTER TABLE "Kelas" ADD CONSTRAINT "Kelas_guru_id_fkey" FOREIGN KEY ("guru_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bab" ADD CONSTRAINT "Bab_kelas_id_fkey" FOREIGN KEY ("kelas_id") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gambar" ADD CONSTRAINT "Gambar_bab_id_fkey" FOREIGN KEY ("bab_id") REFERENCES "Bab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Soal" ADD CONSTRAINT "Soal_bab_id_fkey" FOREIGN KEY ("bab_id") REFERENCES "Bab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpsiJawaban" ADD CONSTRAINT "OpsiJawaban_soal_id_fkey" FOREIGN KEY ("soal_id") REFERENCES "Soal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressSiswa" ADD CONSTRAINT "ProgressSiswa_kelas_id_fkey" FOREIGN KEY ("kelas_id") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressSiswa" ADD CONSTRAINT "ProgressSiswa_bab_id_fkey" FOREIGN KEY ("bab_id") REFERENCES "Bab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressSiswa" ADD CONSTRAINT "ProgressSiswa_soal_id_fkey" FOREIGN KEY ("soal_id") REFERENCES "Soal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
