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

## Data Spec

Bagian ini menjadi sumber kebenaran untuk kontrak data antara aplikasi Next.js, Prisma, dan database Neon PostgreSQL. Semua foreign key wajib memakai ID dari record yang benar-benar ada di Neon; jangan membuat ID lokal atau data contoh untuk ditampilkan sebagai data produksi.

### Entitas, field, tipe, dan field wajib

> Tipe di bawah menggunakan padanan PostgreSQL/Prisma. `String` berarti `TEXT`, `Int` berarti `INTEGER`, `Boolean` berarti `BOOLEAN`, dan `DateTime` berarti `TIMESTAMP(3)`.

#### 1. `User` — pemilik akun guru

| Field | Tipe | Wajib | Aturan |
| --- | --- | --- | --- |
| `id` | String | Ya | Primary key, dibuat server (`cuid`) |
| `nama` | String | Ya | Nama guru |
| `email` | String | Ya | Unique, dipakai untuk login |
| `password_hash` | String | Ya | Hash password, tidak boleh dikirim ke client |
| `createdAt` | DateTime | Ya | Default waktu dibuat |
| `updatedAt` | DateTime | Ya | Otomatis diperbarui |

#### 2. `Kelas` — ruang belajar milik guru

| Field | Tipe | Wajib | Aturan |
| --- | --- | --- | --- |
| `id` | String | Ya | Primary key, dibuat server |
| `nama_kelas` | String | Ya | Nama kelas |
| `jenjang` | String/Enum | Ya | Salah satu: `Paket A`, `Paket B`, `Paket C` |
| `kode_akses` | String | Ya | Unique, 6–8 karakter, uppercase; dipakai siswa untuk masuk |
| `guru_id` | String | Ya | Foreign key ke `User.id`; pemilik data kelas |
| `createdAt` | DateTime | Ya | Default waktu dibuat |
| `updatedAt` | DateTime | Ya | Otomatis diperbarui |

#### 3. `Bab` — materi/bab milik sebuah kelas

| Field | Tipe | Wajib | Aturan |
| --- | --- | --- | --- |
| `id` | String | Ya | Primary key, dibuat server |
| `kelas_id` | String | Ya | Foreign key ke `Kelas.id` |
| `mata_pelajaran` | String | Ya | Nama mata pelajaran |
| `judul` | String | Ya | Judul bab |
| `ringkasan` | String | Tidak | Ringkasan singkat, maksimal 200 karakter pada input |
| `konten_materi` | String | Ya | Isi materi |
| `url_video` | String | Tidak | URL/ID video YouTube yang valid |
| `link_sumber` | String | Tidak | URL sumber buku resmi yang valid |
| `urutan` | Int | Ya | Nomor urut bab, minimal 1 |
| `createdAt` | DateTime | Ya | Default waktu dibuat |
| `updatedAt` | DateTime | Ya | Otomatis diperbarui |

Kepemilikan `Bab` diturunkan dari `Bab.kelas_id -> Kelas.guru_id`. Guru hanya boleh membaca atau menambah bab pada kelas miliknya.

#### 4. `Gambar` — metadata gambar materi

| Field | Tipe | Wajib | Aturan |
| --- | --- | --- | --- |
| `id` | String | Ya | Primary key, dibuat server |
| `bab_id` | String | Ya | Foreign key ke `Bab.id` |
| `url` | String | Ya | URL file pada Vercel Blob |
| `ukuran_file` | Int | Ya | Ukuran file dalam byte |
| `createdAt` | DateTime | Ya | Default waktu dibuat |

#### 5. `Soal` — pertanyaan latihan milik sebuah bab

| Field | Tipe | Wajib | Aturan |
| --- | --- | --- | --- |
| `id` | String | Ya | Primary key, dibuat server |
| `bab_id` | String | Ya | Foreign key ke `Bab.id` |
| `pertanyaan` | String | Ya | Teks pertanyaan |
| `tipe` | String/Enum | Ya | `PILIHAN_GANDA` atau `ESAI`; default `PILIHAN_GANDA` |
| `urutan` | Int | Ya | Urutan soal; default 0 |

#### 6. `OpsiJawaban` — pilihan jawaban untuk soal pilihan ganda

| Field | Tipe | Wajib | Aturan |
| --- | --- | --- | --- |
| `id` | String | Ya | Primary key, dibuat server |
| `soal_id` | String | Ya | Foreign key ke `Soal.id` |
| `teks` | String | Ya | Teks pilihan jawaban |
| `is_benar` | Boolean | Ya | Default `false`; satu atau lebih sesuai aturan tipe soal |

#### 7. `ProgressSiswa` — jawaban dan hasil siswa

| Field | Tipe | Wajib | Aturan |
| --- | --- | --- | --- |
| `id` | String | Ya | Primary key, dibuat server |
| `kelas_id` | String | Ya | Foreign key ke `Kelas.id` |
| `nama_siswa` | String | Ya | Identitas siswa karena siswa tidak memiliki akun |
| `bab_id` | String | Ya | Foreign key ke `Bab.id`; wajib berasal dari kelas yang sama dengan `kelas_id` |
| `soal_id` | String | Ya | Foreign key ke `Soal.id`; wajib berasal dari `bab_id` yang sama |
| `jawaban` | String | Ya | ID `OpsiJawaban` yang dipilih, atau nilai jawaban esai |
| `benar` | Boolean | Ya | Hasil penilaian otomatis untuk soal pilihan ganda |
| `skor` | Int | Ya | Nilai 0–100 untuk satu pengumpulan latihan |
| `waktu_submit` | DateTime | Ya | Default waktu submit |

Untuk MVP, identitas siswa adalah gabungan `kelas_id + nama_siswa`. Saat siswa mengirim ulang latihan bab yang sama, seluruh jawaban sebelumnya untuk gabungan tersebut dihapus dalam satu transaksi lalu diganti dengan jawaban terbaru. Validasi server tetap wajib memastikan `kelas_id`, `bab_id`, `soal_id`, dan `jawaban` saling berelasi; client tidak boleh menjadi sumber kebenaran.

### Relasi antar entitas dan aturan hapus

| Relasi | Kardinalitas | Foreign key | Aturan hapus |
| --- | --- | --- | --- |
| `User` → `Kelas` | 1-N | `Kelas.guru_id` | `RESTRICT`; akun guru tidak boleh dihapus jika masih memiliki kelas |
| `Kelas` → `Bab` | 1-N | `Bab.kelas_id` | `RESTRICT`; kelas tidak boleh dihapus sebelum bab dipindahkan/dihapus secara eksplisit |
| `Bab` → `Gambar` | 1-N | `Gambar.bab_id` | `CASCADE`; metadata gambar ikut dihapus setelah file Blob ditangani |
| `Bab` → `Soal` | 1-N | `Soal.bab_id` | `CASCADE`; soal ikut dihapus saat bab dihapus |
| `Soal` → `OpsiJawaban` | 1-N | `OpsiJawaban.soal_id` | `CASCADE`; pilihan jawaban ikut dihapus saat soal dihapus |
| `Kelas` → `ProgressSiswa` | 1-N | `ProgressSiswa.kelas_id` | `RESTRICT` untuk mencegah hilangnya rekap tanpa tindakan eksplisit |
| `Bab` → `ProgressSiswa` | 1-N | `ProgressSiswa.bab_id` | `CASCADE`; progress bab ikut dihapus jika bab memang dihapus |
| `Soal` → `ProgressSiswa` | 1-N | `ProgressSiswa.soal_id` | `CASCADE`; jawaban soal ikut dihapus jika soal dihapus |

MVP tidak memiliki relasi N-N. Jika fitur bank soal atau pemakaian soal lintas kelas diaktifkan, relasi `Soal`–`Kelas` wajib dibuat melalui tabel pivot, misalnya `KelasSoal(kelas_id, soal_id, urutan)`, bukan menyimpan array ID pada satu kolom.

### Kepemilikan dan aturan integritas

- **Guru** memiliki `User` dan seluruh `Kelas` dengan `Kelas.guru_id = session.user.id`.
- **Kelas** memiliki `Bab` dan menjadi konteks utama akses siswa melalui `kode_akses`.
- **Bab** memiliki `Gambar`, `Soal`, dan progress yang terkait dengannya.
- **Siswa** tidak memiliki akun; data aktivitasnya dimiliki oleh kelas dan diidentifikasi melalui `nama_siswa` pada `ProgressSiswa`.
- Setiap query guru wajib memfilter kepemilikan berdasarkan `session.user.id`; menerima `kelasId` dari browser saja tidak cukup.
- Endpoint siswa wajib memvalidasi bahwa kode kelas cocok dengan bab dan soal yang diminta. Tidak boleh menerima `babId` dari kelas lain.
- Neon adalah sumber data produksi tunggal. Fallback data demo hanya boleh aktif pada mode development/demo yang eksplisit, tidak saat deployment Vercel production.
- Aplikasi dan migration harus memakai `DATABASE_URL` Neon yang sama. Setelah migration dijalankan, cek foreign key, unique index, dan jumlah record pada database yang benar.
- Operasi yang mengubah beberapa entitas sekaligus, termasuk membuat soal beserta opsinya dan mengganti seluruh progress satu submit, wajib menggunakan transaksi database.

## Action Inventory

Kontrak aksi UI dan API yang harus dipakai. `Entitas` menunjukkan tabel yang dibaca atau ditulis oleh aksi tersebut.

| ID aksi | Halaman | Elemen UI | Endpoint | Entitas | Hasil sukses | Hasil gagal |
| --- | --- | --- | --- | --- | --- | --- |
| AUTH-01 | `/guru/masuk` | Form email dan password | `/api/auth/[...nextauth]` | `User`, session guru | Session guru terbentuk lalu diarahkan ke dashboard | Pesan kredensial salah; tidak membuat user baru secara diam-diam |
| CLS-01 | `/guru/dashboard`, `/guru/materi/baru`, `/guru/soal/baru` | Daftar/select kelas | `GET /api/guru/kelas` | `User`, `Kelas` | Hanya kelas milik guru aktif dikembalikan; empty state jika belum ada kelas | `401` jika belum login; `5xx` jika Neon tidak tersedia; jangan menampilkan data demo di production |
| CLS-02 | `/guru/dashboard` | Dialog “Buat kelas baru” | `POST /api/guru/kelas` | `User` → `Kelas` | Satu kelas tersimpan dengan `guru_id` dari session dan `kode_akses` unique; muncul di daftar | `401` belum login, `400` validasi gagal, `409` kode bentrok, `5xx` gagal simpan |
| BAB-01 | `/guru/materi/baru` | Form materi, tombol “Simpan & terbitkan” | `POST /api/guru/materi` | `Kelas` → `Bab` | Satu bab tersimpan dengan `kelas_id` yang valid dan muncul di daftar kelas | `401/403` tidak memiliki kelas, `400` input tidak valid, `404` kelas tidak ditemukan, `5xx` gagal simpan |
| BAB-02 | `/guru/soal/baru` | Select kelas dan select bab | `GET /api/guru/bab?kelasId={id}` | `Kelas`, `Bab` | Bab milik kelas terpilih dikembalikan berurutan; empty state jika belum ada bab | `400` parameter tidak ada, `401/403` bukan pemilik kelas, `404` kelas tidak ditemukan |
| SOAL-01 | `/guru/soal/baru` | Form pertanyaan, opsi, radio jawaban benar | `POST /api/guru/soal` | `Bab` → `Soal` → `OpsiJawaban` | Semua soal dan opsi tersimpan atomik pada bab yang dipilih; jumlah soal dikembalikan | `400` validasi gagal, `401/403` tidak memiliki bab/kelas, `404` bab tidak ditemukan, `5xx` seluruh transaksi dibatalkan |
| STU-01 | `/siswa/masuk` | Form kode kelas dan nama siswa | `POST /api/siswa/masuk` | `Kelas` | Kode diverifikasi dan session/cookie siswa menyimpan konteks kelas serta nama | `400` input tidak valid, `404` kode tidak ditemukan; tidak menyimpan progress |
| STU-02 | `/siswa/kelas` | Halaman “Kelas saya” | `GET /api/siswa/kelas?kode={kode}` | `Kelas`, `Bab`, `ProgressSiswa` | Kelas dan bab dari kode tersebut tampil; empty state jika kelas belum punya bab | `400` kode tidak ada, `404` kelas tidak ditemukan, `5xx` error Neon |
| STU-03 | `/siswa/latihan` | Pilih bab/soal | `GET /api/siswa/latihan/soal?babId={id}` | `Bab`, `Soal`, `OpsiJawaban` | Soal dan opsi dikirim tanpa `is_benar`; hanya soal dari kelas siswa yang aktif | `400` parameter tidak ada, `404` soal/bab belum tersedia atau tidak sesuai kelas |
| STU-04 | `/siswa/latihan` | Tombol “Kirim jawaban” | `POST /api/siswa/latihan/submit` | `Kelas`, `Bab`, `Soal`, `OpsiJawaban`, `ProgressSiswa` | Jawaban dinilai server, progress terbaru tersimpan atomik, skor ditampilkan langsung | `400` jawaban tidak valid, `404` konteks kelas/bab/soal tidak cocok, `5xx` simpan gagal; hasil tidak boleh dianggap tersimpan |
| PROG-01 | `/guru/progress` | Filter/pilih kelas dan tabel progress | `GET /api/guru/progress?kelasId={id}` | `Kelas`, `ProgressSiswa`, `Bab` | Ringkasan siswa dan metrik hanya dari kelas milik guru aktif | `400` parameter tidak ada, `401/403` bukan pemilik kelas, `5xx` error Neon |
| HEALTH-01 | internal/status | Indikator status database | `GET /api/guru/status` | koneksi `User`/Neon | Status DB dan auth dilaporkan secara akurat | Error koneksi ditampilkan sebagai masalah konfigurasi, bukan dianggap data kosong |

## Acceptance Criteria per fitur

### Kriteria umum sinkronisasi data

- Akun baru tanpa data: halaman dashboard, daftar kelas, daftar bab, dan daftar progress menampilkan **empty state** yang jelas, bukan data demo yang tampak seperti data milik user.
- Tambah data baru: setelah respons `2xx`, data muncul di list terkait tanpa refresh manual melalui update state atau `router.refresh()` yang benar-benar membaca Neon.
- Data tetap ada setelah refresh dan setelah pindah menu; data yang ditampilkan setelah navigasi berasal dari query Neon, bukan hanya state/session storage browser.
- Jika penyimpanan gagal, UI menampilkan status gagal dan tidak memberi label “tersimpan”. Draft lokal hanya boleh diberi label draft dan tidak boleh dianggap sebagai record Neon.
- Setiap record baru memiliki foreign key yang benar. Contoh: bab baru menunjuk `kelas_id` kelas terpilih, soal menunjuk `bab_id` terpilih, dan progress menunjuk pasangan kelas–bab–soal yang konsisten.
- Setelah penambahan data, data yang sama dapat ditemukan melalui endpoint list terkait dan dapat dibaca dari deployment Vercel setelah hard refresh.
- Tidak ada silent fallback dari error Neon ke data demo pada production. Error koneksi, migration belum dijalankan, atau `DATABASE_URL` salah harus terlihat pada log dan pesan UI yang sesuai.

### Akun dan kelas

- Guru berhasil login dan hanya melihat kelas dengan `guru_id` yang sama dengan ID pada session.
- Guru tanpa kelas melihat empty state dan tombol “Buat kelas baru”.
- Setelah membuat kelas, kelas tampil di dashboard, tetap tampil setelah refresh, dan dapat dipilih pada form materi serta form latihan soal.
- Kode akses kelas unique, dapat dipakai siswa untuk masuk, dan tidak membuat kelas duplikat saat request diulang secara tidak sengaja.
- Guru tidak dapat membaca atau mengubah kelas milik guru lain dengan mengganti `kelasId` di URL atau request body.

### Materi dan bab

- Guru tanpa bab melihat empty state pada daftar materi dan instruksi untuk membuat materi pertama.
- Materi baru tersimpan ke Neon dengan `kelas_id` yang dipilih, muncul pada daftar kelas tanpa refresh manual, tetap ada setelah refresh, dan tampil setelah pindah menu.
- Bab yang dibuat pada Kelas A tidak muncul pada Kelas B dan tidak dapat dipakai untuk membuat soal pada Kelas B.
- Field wajib ditolak jika kosong; field opsional tidak menghasilkan string kosong yang dianggap sebagai URL valid.
- Siswa yang masuk memakai kode kelas hanya melihat bab milik kelas tersebut.

### Latihan soal dan opsi jawaban

- Form latihan hanya menampilkan bab milik kelas terpilih; jika kelas belum punya bab, tampil empty state dan arahan membuat materi terlebih dahulu.
- Menyimpan beberapa soal membuat seluruh soal dan opsi tersimpan atau seluruhnya dibatalkan; tidak boleh hanya sebagian tersimpan.
- Soal baru muncul pada daftar/halaman latihan tanpa refresh manual, tetap ada setelah refresh, dan tetap terkait ke bab yang benar.
- Siswa tidak menerima field `is_benar` melalui endpoint pengambilan soal.
- Soal atau opsi dari bab/kelas lain tidak dapat diminta atau dikirim dengan manipulasi request.

### Masuk siswa, submit, dan progress

- Siswa dengan kode kelas valid dapat melihat kelas dan empty state bila belum ada materi atau latihan.
- Submit jawaban menghitung skor dari jawaban benar di server, bukan dari nilai yang dikirim client.
- Setelah submit berhasil, progress tersimpan di Neon dan hasil skor tampil langsung tanpa refresh manual.
- Submit ulang oleh siswa yang sama untuk bab yang sama menggantikan hasil sebelumnya secara atomik, tidak menggandakan progress lama.
- Setelah refresh atau pindah ke halaman progress guru, hasil submit tetap terlihat dan berada pada kelas, bab, serta soal yang benar.
- Progress siswa di Kelas A tidak muncul pada dashboard Kelas B meskipun nama siswa sama.
- Jika submit gagal disimpan, siswa mendapat pesan gagal dan sistem tidak menampilkan hasil sebagai data yang sudah tersimpan.

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
