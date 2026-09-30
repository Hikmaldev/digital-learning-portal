# PRD: Portal Belajar Digital

## 1. Ringkasan

Portal Belajar Digital adalah aplikasi web untuk mendukung pengajaran di kelas pendidikan kesetaraan (Paket A, B, C). Portal ini menyediakan materi ringkas, latihan soal, dan pemantauan progress siswa, tanpa bergantung pada buku cetak atau cetakan kertas yang terbatas.

## 2. Latar Belakang & Masalah

Kondisi kelas pendidikan kesetaraan saat ini punya beberapa kendala nyata:

- Siswa hanya membawa HP dengan akses internet, tidak ada laptop.
- Kuota internet siswa di rumah terbatas, jadi materi berat tetap perlu dijaga ringan untuk diakses dari luar kelas.
- Kelas sendiri sudah punya wifi, jadi konten yang lebih berat seperti video bisa dipakai saat sesi berlangsung.
- Cetakan materi dibatasi maksimal 1-2 lembar kertas per siswa.
- Beberapa mata pelajaran tidak punya bahan ajar formal, hanya papan tulis di kelas.
- Guru butuh cara memantau siapa yang sudah dan belum mengerjakan latihan, tanpa rekap manual.

Portal ini dibuat untuk mengatasi kendala itu langsung, bukan sekadar jadi LMS umum yang fiturnya berlebihan untuk kebutuhan kelas ini.

## 3. Tujuan

- Memberi siswa akses materi kapan saja lewat HP, tanpa perlu buku cetak atau fotokopi.
- Menyediakan latihan soal yang bisa dikerjakan dan dinilai otomatis untuk soal pilihan ganda.
- Memberi guru gambaran cepat soal progress siswa per bab.
- Menjaga performa aplikasi tetap ringan untuk pengguna dengan kuota dan device terbatas, terutama saat diakses dari luar kelas.

## 4. Target Pengguna & Peran

| Peran | Deskripsi                                             | Akses                                          |
| ----- | ----------------------------------------------------- | ---------------------------------------------- |
| Guru  | Membuat materi, membuat soal, memantau progress siswa | Login dengan akun (email/password)             |
| Siswa | Membaca materi, mengerjakan latihan soal              | Masuk kelas pakai kode kelas, tanpa perlu akun |

Siswa sengaja tidak diwajibkan bikin akun. Proses pendaftaran akun sering jadi hambatan untuk siswa yang kurang terbiasa pakai aplikasi.

## 5. Ruang Lingkup

**Termasuk dalam scope (Fase 1-2):**

- Manajemen materi per mata pelajaran dan bab
- Video pembelajaran opsional per bab (embed YouTube), untuk ditonton saat di kelas karena sudah ada wifi
- Link ke sumber buku asli (misalnya dari buku.kemendikdasmen.go.id) sebagai referensi tambahan per bab
- Latihan soal pilihan ganda dengan auto-grading
- Dashboard progress sederhana untuk guru
- Akses siswa tanpa akun, pakai kode kelas

**Tidak termasuk dalam scope awal:**

- Live streaming kelas
- Forum diskusi atau chat antar siswa
- Payment atau monetisasi
- Aplikasi mobile native (portal berbasis web, cukup diakses lewat browser HP)

## 6. User Flow

**Alur Guru:**

1. Login ke portal.
2. Buat kelas baru atau pilih kelas yang sudah ada (Paket A, B, atau C).
3. Upload materi per bab dalam bentuk teks dan gambar, opsional tempel link video YouTube dan link sumber buku asli.
4. Buat soal latihan untuk bab tersebut.
5. Bagikan kode kelas ke siswa (lewat WhatsApp grup, misalnya).
6. Pantau dashboard progress, lihat siapa yang sudah mengerjakan latihan.

**Alur Siswa:**

1. Buka link portal dari HP.
2. Masukkan kode kelas yang diberikan guru.
3. Pilih bab yang ingin dipelajari.
4. Baca materi, tonton video kalau ada (disarankan saat di kelas karena pakai wifi), buka link buku asli kalau mau baca lebih lengkap.
5. Kerjakan latihan soal.
6. Lihat hasil langsung setelah submit (untuk soal pilihan ganda).

## 7. Fitur

### Fase 1, MVP

- Guru bisa membuat kelas dan mengatur kode akses kelas.
- Guru bisa upload materi per bab (teks dan gambar, gambar otomatis dikompresi saat upload).
- Guru bisa tempel link video YouTube per bab, video tampil embed langsung di halaman materi.
- Guru bisa tempel link ke sumber buku asli (misalnya PDF dari buku.kemendikdasmen.go.id) sebagai bacaan tambahan, bukan file yang diupload dan disimpan sendiri.
- Siswa bisa masuk kelas pakai kode, tanpa akun.
- Siswa bisa membaca materi, menonton video, dan membuka link sumber buku dari HP.
- Guru bisa membuat soal pilihan ganda per bab.
- Siswa bisa mengerjakan soal, hasil dinilai otomatis dan langsung tersimpan.

### Fase 2, setelah MVP jalan

- Dashboard progress untuk guru, menampilkan siapa yang sudah dan belum mengerjakan tiap bab.
- Soal esai singkat, siswa ketik jawaban, guru review manual lewat portal.
- Mode PWA, siswa bisa install portal ke homescreen HP dan buka lebih cepat.

### Fase 3, opsional untuk pengembangan lanjut

- Bank soal, soal yang sudah dibuat bisa dipakai ulang untuk kelas atau semester lain.
- Statistik sederhana, misalnya bab mana yang paling sering salah dikerjakan siswa.

## 8. Tech Stack & Arsitektur

Karena tidak memakai Supabase, beberapa fungsi yang biasanya jadi satu paket di Supabase (Auth, Database, Storage) perlu dipisah jadi komponen berbeda.

| Kebutuhan                 | Pilihan                                                             | Alasan                                                                                                                |
| ------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Framework                 | Next.js (App Router), TypeScript                                    | Sudah dikuasai, mendukung PWA dan performa baik                                                                       |
| Styling                   | Tailwind CSS                                                        | Cepat dipakai, hasil ringan                                                                                           |
| Database                  | Neon (Postgres serverless)                                          | Sesuai permintaan, cocok dipasangkan dengan Vercel                                                                    |
| ORM                       | Prisma                                                              | Mempermudah query dan migrasi skema ke Neon                                                                           |
| Autentikasi guru          | Auth.js (NextAuth) dengan Credentials Provider                      | Neon tidak punya Auth bawaan seperti Supabase, Auth.js jadi penggantinya, ringan dan terintegrasi baik dengan Next.js |
| Akses siswa               | Kode kelas disimpan di database, dicocokkan lewat session sederhana | Tidak perlu sistem akun penuh untuk siswa                                                                             |
| Penyimpanan gambar materi | Vercel Blob Storage                                                 | Pengganti Supabase Storage, terintegrasi langsung dengan hosting Vercel                                               |
| Video pembelajaran        | Embed YouTube (simpan video ID saja)                                | Menghindari biaya hosting video sendiri                                                                               |
| Validasi input            | Zod                                                                 | Menjaga data yang masuk dari form guru dan siswa tetap konsisten                                                      |
| Hosting                   | Vercel                                                              | Sesuai permintaan, deploy otomatis dari GitHub                                                                        |

**Catatan arsitektur:**

- Karena siswa tidak login penuh, gunakan session berbasis kode kelas yang disimpan di cookie, bukan sistem auth penuh seperti untuk guru.
- Gambar materi wajib melalui proses kompresi otomatis sebelum disimpan ke Vercel Blob, supaya tidak membebani kuota siswa saat load halaman.
- Video ditandai di UI sebagai konten opsional, dengan keterangan singkat bahwa lebih cocok ditonton saat di kelas.
- Link sumber buku asli disimpan sebagai URL biasa di database, tidak perlu proses upload atau storage tambahan.
- Struktur halaman dibuat seringan mungkin, hindari library besar yang tidak perlu, karena target pengguna punya device dan koneksi terbatas saat di luar kelas.

## 9. Skema Data (Ringkas)

Tabel utama yang dibutuhkan di Neon lewat Prisma:

- **User** (guru): id, nama, email, password_hash
- **Kelas**: id, nama_kelas, kode_akses, guru_id
- **Bab**: id, kelas_id, judul, konten_materi, url_video (opsional), link_sumber (opsional), urutan
- **Gambar**: id, bab_id, url, ukuran_file
- **Soal**: id, bab_id, pertanyaan, tipe (pilihan_ganda/esai)
- **Opsi_Jawaban**: id, soal_id, teks, is_benar
- **Progress_Siswa**: id, kelas_id, nama_siswa, bab_id, soal_id, jawaban, skor, waktu_submit

Nama siswa dicatat manual saat submit jawaban pertama kali, karena tidak ada sistem akun untuk siswa.

## 10. Metrik Keberhasilan

- Persentase siswa yang berhasil membuka materi dari HP tanpa kendala teknis.
- Waktu load halaman materi tetap di bawah target wajar untuk koneksi lambat, misalnya di bawah 3 detik.
- Jumlah latihan soal yang terkumpul progressnya per bab, dibandingkan sebelumnya yang direkap manual.
- Feedback langsung dari guru soal kemudahan membuat materi dan soal baru.

## 11. Risiko & Mitigasi

| Risiko                                                         | Mitigasi                                                                               |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Siswa kesulitan mengetik jawaban esai di HP                    | Batasi panjang jawaban esai, sediakan draft otomatis tersimpan                         |
| Koneksi internet siswa putus saat mengerjakan soal             | Simpan progress sementara di local storage browser sebelum submit final                |
| Guru lupa kode kelas hilang atau bocor ke luar kelas           | Sediakan fitur reset kode kelas kapan saja dari dashboard guru                         |
| Biaya Neon atau Vercel Blob membengkak seiring data bertambah  | Pantau penggunaan tier gratis secara berkala, siapkan rencana upgrade kalau dibutuhkan |
| Siswa menonton video dari rumah dan menghabiskan kuota pribadi | Beri label jelas di UI bahwa video disarankan ditonton saat di kelas                   |

## 12. Arahan Desain

Tujuannya web terlihat dirancang dengan sengaja untuk konteks kelas kesetaraan, bukan hasil template generik yang mudah dikenali sebagai buatan AI.

**Hindari:**

- Gradient hangat krem-terracotta atau ungu-biru generik yang jadi ciri khas landing page AI
- Kartu serba rounded-corner dengan shadow abu-abu tipis yang sama di semua elemen
- Label huruf kapital semua dengan tracking lebar di atas tiap heading
- Ikon generik dari library besar dipasang tanpa kurasi
- Animasi fade-and-slide-up di setiap section, atau hover effect di semua card

**Ganti dengan:**

- Palet warna yang diambil dari konteks kelas kesetaraan itu sendiri, hangat dan approachable, bukan warna SaaS korporat. Tentukan 4-6 warna inti dan pakai konsisten di semua halaman.
- Tipografi dengan hierarki jelas, satu font untuk judul bab, satu font untuk isi materi, dengan ukuran dan spacing yang disengaja, bukan default framework.
- Elemen visual yang fungsional, seperti progress bar dan badge status "sudah dikerjakan", bukan ilustrasi dekoratif yang tidak berhubungan dengan konten.
- Satu momen animasi yang berarti, misalnya transisi saat siswa submit jawaban dan hasil muncul, dibanding animasi tersebar di banyak tempat.

**Prioritas performa tetap di atas estetika.** Karena target pengguna siswa dengan device dan kuota terbatas di luar kelas, hindari animasi berat, font custom berukuran besar, atau elemen visual yang menambah waktu load tanpa manfaat fungsional.
