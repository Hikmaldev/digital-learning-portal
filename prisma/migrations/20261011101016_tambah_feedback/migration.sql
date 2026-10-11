-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "kelas_id" TEXT,
    "nama_siswa" TEXT,
    "kategori" TEXT NOT NULL DEFAULT 'SARAN',
    "pesan" TEXT NOT NULL,
    "kontak" TEXT,
    "dibaca" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Feedback_kelas_id_idx" ON "Feedback"("kelas_id");

-- CreateIndex
CREATE INDEX "Feedback_dibaca_idx" ON "Feedback"("dibaca");

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_kelas_id_fkey" FOREIGN KEY ("kelas_id") REFERENCES "Kelas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
