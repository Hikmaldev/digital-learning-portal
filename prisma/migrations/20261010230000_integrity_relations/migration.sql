-- Enforce the same referential actions declared in prisma/schema.prisma.
-- Existing data is preserved; only foreign-key behavior is corrected.

ALTER TABLE "Kelas" DROP CONSTRAINT IF EXISTS "Kelas_guru_id_fkey";
ALTER TABLE "Bab" DROP CONSTRAINT IF EXISTS "Bab_kelas_id_fkey";
ALTER TABLE "Gambar" DROP CONSTRAINT IF EXISTS "Gambar_bab_id_fkey";
ALTER TABLE "Soal" DROP CONSTRAINT IF EXISTS "Soal_bab_id_fkey";
ALTER TABLE "OpsiJawaban" DROP CONSTRAINT IF EXISTS "OpsiJawaban_soal_id_fkey";
ALTER TABLE "ProgressSiswa" DROP CONSTRAINT IF EXISTS "ProgressSiswa_kelas_id_fkey";
ALTER TABLE "ProgressSiswa" DROP CONSTRAINT IF EXISTS "ProgressSiswa_bab_id_fkey";
ALTER TABLE "ProgressSiswa" DROP CONSTRAINT IF EXISTS "ProgressSiswa_soal_id_fkey";

ALTER TABLE "Kelas"
  ADD CONSTRAINT "Kelas_guru_id_fkey"
  FOREIGN KEY ("guru_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Bab"
  ADD CONSTRAINT "Bab_kelas_id_fkey"
  FOREIGN KEY ("kelas_id") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Gambar"
  ADD CONSTRAINT "Gambar_bab_id_fkey"
  FOREIGN KEY ("bab_id") REFERENCES "Bab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Soal"
  ADD CONSTRAINT "Soal_bab_id_fkey"
  FOREIGN KEY ("bab_id") REFERENCES "Bab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "OpsiJawaban"
  ADD CONSTRAINT "OpsiJawaban_soal_id_fkey"
  FOREIGN KEY ("soal_id") REFERENCES "Soal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ProgressSiswa"
  ADD CONSTRAINT "ProgressSiswa_kelas_id_fkey"
  FOREIGN KEY ("kelas_id") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "ProgressSiswa"
  ADD CONSTRAINT "ProgressSiswa_bab_id_fkey"
  FOREIGN KEY ("bab_id") REFERENCES "Bab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ProgressSiswa"
  ADD CONSTRAINT "ProgressSiswa_soal_id_fkey"
  FOREIGN KEY ("soal_id") REFERENCES "Soal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
