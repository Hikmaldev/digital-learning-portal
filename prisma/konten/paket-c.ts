import type { PaketKonten } from "./tipe";

const SUMBER_MTK =
  "https://buku.kemendikdasmen.go.id/katalog/matematika-untuk-smamasmkmak-kelas-x-edisi-revisi";
const SUMBER_BI =
  "https://buku.kemendikdasmen.go.id/katalog/panduan-guru-bahasa-indonesia-untuk-sma-ma-smk-mak-kelas-x-edisi-revisi";
const SUMBER_ENG =
  "https://repositori.kemendikdasmen.go.id/8710/1/Bahasa%20Inggris%20Kelas%20X.pdf";
const SUMBER_INFO =
  "https://guru.kemdikbud.go.id/kurikulum/referensi-penerapan/capaian-pembelajaran/sd-sma/informatika/fase-e/";

// Materi tambahan Sesi 3 menggunakan ilustrasi Wikimedia Commons berlisensi terbuka.
// Matrix (maths), revised.png — CC BY-SA 3.0, User:Genesis.
const GAMBAR_MATRIKS =
  "https://upload.wikimedia.org/wikipedia/commons/b/b9/Matrix_%28maths%29%2C_revised.png";
// Two red dice 01.svg — CC0, Stephen Silver/Open Clip Art Library.
const GAMBAR_PELUANG =
  "https://upload.wikimedia.org/wikipedia/commons/3/36/Two_red_dice_01.svg";
// Sri Harjanto Sahid reading a poem — CC BY-SA 4.0, Crisco 1492.
const GAMBAR_PUISI =
  "https://upload.wikimedia.org/wikipedia/commons/0/0d/Sri_Harjanto_Sahid_reading_a_poem%2C_2015-08-22_02.jpg";
// Man writing on paper (Unsplash) — CC0, Olu Eletu.
const GAMBAR_KARYA_ILMIAH =
  "https://upload.wikimedia.org/wikipedia/commons/3/35/Man_writing_on_paper_%28Unsplash%29.jpg";
// Cooking Delicious Food — CC BY-SA 4.0, Mona Hassan Abo-Abda.
const GAMBAR_PROCEDURE =
  "https://upload.wikimedia.org/wikipedia/commons/0/06/Cooking_Delicious_Food.jpg";
// Dylan Marron delivering presentation — CC0, Indy beetle.
const GAMBAR_PRESENTASI =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/Dylan_Marron_delivering_presentation_at_NC_State_University.jpg";
// Cybersecurity.png — CC0, Pixabay/jaydeep_.
const GAMBAR_KEAMANAN =
  "https://upload.wikimedia.org/wikipedia/commons/4/46/Cybersecurity.png";
// Analytics 2016-02-26 at 10.19.24 AM.jpg — CC0, Lalmch from Pixabay.
const GAMBAR_DATA =
  "https://upload.wikimedia.org/wikipedia/commons/0/0f/Analytics_2016-02-26_at_10.19.24_AM.jpg";

// Tautan pencarian YouTube dipakai agar siswa dapat memilih penjelasan terbaru
// yang sesuai. Komponen materi menampilkannya sebagai tautan bila bukan URL embed.
const VIDEO_MATRIKS = "https://www.youtube.com/results?search_query=matriks+matematika+kelas+11";
const VIDEO_PELUANG = "https://www.youtube.com/results?search_query=peluang+matematika+kelas+12";
const VIDEO_PUISI = "https://www.youtube.com/results?search_query=puisi+kelas+10+bahasa+indonesia";
const VIDEO_KARYA_ILMIAH = "https://www.youtube.com/results?search_query=karya+ilmiah+kelas+11+bahasa+indonesia";
const VIDEO_PROCEDURE = "https://www.youtube.com/results?search_query=procedure+text+kelas+10";
const VIDEO_PRESENTASI = "https://www.youtube.com/results?search_query=asking+for+and+giving+opinion+kelas+10";
const VIDEO_KEAMANAN = "https://www.youtube.com/results?search_query=keamanan+digital+informatika+kelas+10";
const VIDEO_DATA = "https://www.youtube.com/results?search_query=analisis+data+informatika+kelas+10";

/**
 * Paket C — setara SMA/MA (Fase E–F Kurikulum Merdeka).
 * Topik mengikuti buku teks resmi Kemendikdasmen kelas X dan CP Informatika Fase E.
 */
export const paketC: PaketKonten = {
  kode: "PAKETC",
  nama: "Kelas C (Paket C — Setara SMA)",
  jenjang: "Paket C",
  babs: [
    // ── Matematika ──────────────────────────────────────────────────────
    {
      mapel: "Matematika",
      judul: "Eksponen dan logaritma",
      ringkasan: "Sifat bilangan berpangkat, bentuk akar, dan pengertian logaritma.",
      konten: [
        "Eksponen (bilangan berpangkat) adalah bentuk perkalian berulang. Contoh: 2³ = 2 × 2 × 2 = 8. Pada bentuk a^n, a disebut basis dan n disebut eksponen.",
        "Sifat-sifat eksponen: a^m × a^n = a^(m+n); a^m ÷ a^n = a^(m−n); (a^m)^n = a^(m×n); a⁰ = 1 (dengan a ≠ 0); dan a^(−n) = 1/a^n.",
        "Logaritma adalah kebalikan dari eksponen. Jika 2³ = 8, maka log₂ 8 = 3. Secara umum: jika a^p = b maka logₐ b = p.",
        "Sifat logaritma: log (m × n) = log m + log n; log (m ÷ n) = log m − log n; dan log m^n = n × log m.",
      ].join("\n\n"),
      sumber: SUMBER_MTK,
      soal: [
        {
          pertanyaan: "Nilai dari 2⁴ adalah...",
          opsi: ["16", "8", "12", "24"],
          benar: 0,
        },
        {
          pertanyaan: "Bentuk sederhana dari a^5 × a^3 adalah...",
          opsi: ["a^8", "a^15", "2a^8", "a^2"],
          benar: 0,
        },
        {
          pertanyaan: "Jika 3² = 9, maka nilai log₃ 9 adalah...",
          opsi: ["2", "3", "9", "1/2"],
          benar: 0,
        },
        {
          pertanyaan: "Nilai dari 5⁰ adalah...",
          opsi: ["1", "0", "5", "tidak terdefinisi"],
          benar: 0,
        },
        {
          pertanyaan: "Sifat logaritma untuk perkalian adalah...",
          opsi: ["log (m × n) = log m + log n", "log (m × n) = log m × log n", "log (m × n) = log m − log n", "log (m × n) = m × n"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Matematika",
      judul: "Persamaan dan fungsi kuadrat",
      ringkasan: "Bentuk umum, grafik parabola, titik puncak, dan akar-akar fungsi kuadrat.",
      konten: [
        "Fungsi kuadrat memiliki bentuk umum f(x) = ax² + bx + c dengan a ≠ 0. Grafik fungsi kuadrat berbentuk parabola.",
        "Jika a > 0, parabola terbuka ke atas sehingga memiliki titik minimum. Jika a < 0, parabola terbuka ke bawah sehingga memiliki titik maksimum.",
        "Titik puncak parabola berada pada x = −b / (2a). Nilai x ini juga menjadi sumbu simetri grafik.",
        "Akar-akar persamaan kuadrat dapat dicari dengan memfaktorkan, melengkapkan kuadrat sempurna, atau memakai rumus abc: x = (−b ± √(b² − 4ac)) / (2a). Contoh: x² − 4x + 3 = 0 ⇒ (x − 1)(x − 3) = 0 ⇒ x = 1 atau x = 3.",
      ].join("\n\n"),
      sumber: SUMBER_MTK,
      soal: [
        {
          pertanyaan: "Bentuk umum fungsi kuadrat adalah...",
          opsi: ["f(x) = ax² + bx + c, a ≠ 0", "f(x) = ax + b, a ≠ 0", "f(x) = a/x, x ≠ 0", "f(x) = a·b^x"],
          benar: 0,
        },
        {
          pertanyaan: "Grafik fungsi kuadrat berbentuk...",
          opsi: ["parabola", "garis lurus", "lingkaran", "hiperbola"],
          benar: 0,
        },
        {
          pertanyaan: "Sumbu simetri grafik f(x) = x² − 4x + 3 berada di x = ...",
          opsi: ["2", "1", "−2", "4"],
          benar: 0,
        },
        {
          pertanyaan: "Jika a > 0, parabola terbuka ke...",
          opsi: ["atas", "bawah", "kiri", "kanan"],
          benar: 0,
        },
        {
          pertanyaan: "Faktor dari x² − 4x + 3 adalah...",
          opsi: ["(x − 1)(x − 3)", "(x + 1)(x + 3)", "(x − 2)(x − 2)", "(x − 1)(x + 3)"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Matematika",
      judul: "Perbandingan trigonometri",
      ringkasan: "Sinus, kosinus, dan tangen pada segitiga siku-siku serta sudut istimewa.",
      konten: [
        "Pada segitiga siku-siku: sin θ = sisi depan ÷ sisi miring; cos θ = sisi samping ÷ sisi miring; dan tan θ = sisi depan ÷ sisi samping.",
        "Sudut istimewa: sin 30° = 1/2, cos 30° = ½√3, tan 30° = ⅓√3; sin 45° = ½√2, cos 45° = ½√2, tan 45° = 1; sin 60° = ½√3, cos 60° = 1/2, tan 60° = √3.",
        "Contoh: pada segitiga siku-siku dengan sisi depan 3, sisi samping 4, dan sisi miring 5, nilai sin θ = 3/5, cos θ = 4/5, dan tan θ = 3/4.",
        "Trigonometri banyak dipakai untuk mengukur hal yang sulit diukur langsung, misalnya tinggi pohon atau bangunan menggunakan sudut dan jarak.",
      ].join("\n\n"),
      sumber: SUMBER_MTK,
      soal: [
        {
          pertanyaan: "Nilai sin θ pada segitiga siku-siku adalah...",
          opsi: ["sisi depan ÷ sisi miring", "sisi samping ÷ sisi miring", "sisi depan ÷ sisi samping", "sisi miring ÷ sisi depan"],
          benar: 0,
        },
        {
          pertanyaan: "Segitiga siku-siku memiliki sisi depan 3, sisi samping 4, dan sisi miring 5. Nilai cos θ adalah...",
          opsi: ["4/5", "3/5", "3/4", "5/4"],
          benar: 0,
        },
        {
          pertanyaan: "Nilai sin 30° adalah...",
          opsi: ["1/2", "½√2", "½√3", "1"],
          benar: 0,
        },
        {
          pertanyaan: "Nilai tan 45° adalah...",
          opsi: ["1", "0", "½√3", "√3"],
          benar: 0,
        },
        {
          pertanyaan: "tan θ didefinisikan sebagai perbandingan...",
          opsi: ["sisi depan ÷ sisi samping", "sisi samping ÷ sisi miring", "sisi miring ÷ sisi depan", "sisi depan ÷ sisi miring"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Matematika",
      judul: "Statistika: ukuran pemusatan data",
      ringkasan: "Mean, median, dan modus data tunggal serta penerapannya.",
      konten: [
        "Statistika adalah ilmu tentang mengumpulkan, mengolah, menyajikan, dan menafsirkan data. Data tunggal adalah data yang belum dikelompokkan.",
        "Mean (rata-rata) = jumlah seluruh data dibagi banyaknya data. Contoh: mean dari 4, 6, 8, 10, 12 adalah 40 ÷ 5 = 8.",
        "Median adalah nilai tengah setelah data diurutkan. Jika banyak data genap, median adalah rata-rata dua nilai tengah.",
        "Modus adalah nilai yang paling sering muncul dalam data. Data dapat memiliki satu modus, lebih dari satu modus, atau tidak ada modus.",
      ].join("\n\n"),
      sumber: SUMBER_MTK,
      soal: [
        {
          pertanyaan: "Mean dari data 4, 6, 8, 10, 12 adalah...",
          opsi: ["8", "6", "10", "7"],
          benar: 0,
        },
        {
          pertanyaan: "Median dari data 3, 5, 7, 9, 11 adalah...",
          opsi: ["7", "5", "9", "6"],
          benar: 0,
        },
        {
          pertanyaan: "Modus dari data 2, 3, 3, 4, 5 adalah...",
          opsi: ["3", "2", "4", "5"],
          benar: 0,
        },
        {
          pertanyaan: "Mean dihitung dengan cara...",
          opsi: ["jumlah data dibagi banyaknya data", "nilai tengah data", "nilai yang paling sering muncul", "selisih nilai terbesar dan terkecil"],
          benar: 0,
        },
        {
          pertanyaan: "Median dari data 4, 6, 8, 10 adalah...",
          opsi: ["7", "6", "8", "9"],
          benar: 0,
        },
      ],
    },
    // ── Materi tambahan Sesi 3: Matematika ───────────────────────────────
    {
      mapel: "Matematika",
      judul: "Matriks dan operasinya",
      ringkasan: "Pengertian matriks, ordo, elemen, serta penjumlahan dan perkalian matriks sederhana.",
      konten: [
        "Matriks adalah susunan bilangan yang ditulis dalam baris dan kolom. Matriks biasanya diberi nama dengan huruf kapital, sedangkan setiap bilangan di dalamnya disebut elemen atau entri.",
        "Ordo matriks menyatakan banyak baris × banyak kolom. Matriks dengan 2 baris dan 3 kolom memiliki ordo 2 × 3. Elemen aᵢⱼ berada pada baris ke-i dan kolom ke-j.",
        "Dua matriks dapat dijumlahkan atau dikurangkan jika ordonya sama. Operasinya dilakukan dengan menjumlahkan atau mengurangkan elemen-elemen yang menempati posisi sama.",
        "Perkalian matriks memiliki aturan khusus: banyak kolom matriks pertama harus sama dengan banyak baris matriks kedua. Elemen hasil diperoleh dari jumlah perkalian setiap elemen baris dengan elemen kolom yang bersesuaian.",
      ].join("\n\n"),
      sumber: SUMBER_MTK,
      urlVideo: VIDEO_MATRIKS,
      gambar: [{ url: GAMBAR_MATRIKS, ukuranFile: 26000 }],
      soal: [
        {
          pertanyaan: "Matriks adalah susunan bilangan dalam...",
          opsi: ["baris dan kolom", "satu garis saja", "lingkaran dan busur", "diagram tanpa angka"],
          benar: 0,
        },
        {
          pertanyaan: "Matriks dengan 3 baris dan 2 kolom memiliki ordo...",
          opsi: ["3 × 2", "2 × 3", "3 + 2", "6 × 1"],
          benar: 0,
        },
        {
          pertanyaan: "Bilangan yang terdapat di dalam matriks disebut...",
          opsi: ["elemen atau entri", "determinan saja", "ordo", "vektor"],
          benar: 0,
        },
        {
          pertanyaan: "Matriks A dan B dapat dijumlahkan jika...",
          opsi: ["ordonya sama", "semua elemennya nol", "A selalu persegi", "B hanya memiliki satu baris"],
          benar: 0,
        },
        {
          pertanyaan: "Jika A = [[1, 2], [3, 4]] dan B = [[5, 6], [7, 8]], elemen baris pertama kolom pertama dari A + B adalah...",
          opsi: ["6", "5", "1", "2"],
          benar: 0,
        },
        {
          pertanyaan: "Pada matriks, a₂₃ menunjukkan elemen pada...",
          opsi: ["baris kedua kolom ketiga", "baris ketiga kolom kedua", "baris kedua dan ketiga saja", "kolom kedua baris pertama"],
          benar: 0,
        },
        {
          pertanyaan: "Syarat perkalian matriks A × B dapat dilakukan adalah...",
          opsi: ["banyak kolom A sama dengan banyak baris B", "ordo A dan B harus selalu sama", "semua elemen A dan B sama", "A dan B harus memiliki satu kolom"],
          benar: 0,
        },
        {
          pertanyaan: "Jika A berordo 2 × 3 dan B berordo 3 × 4, maka A × B berordo...",
          opsi: ["2 × 4", "3 × 3", "4 × 2", "2 × 3"],
          benar: 0,
        },
        {
          pertanyaan: "Seorang siswa menjumlahkan matriks berordo 2 × 3 dengan matriks berordo 3 × 2. Kesalahannya adalah...",
          opsi: ["menjumlahkan matriks yang ordonya berbeda", "menjumlahkan elemen pada posisi sama", "menulis matriks dalam baris", "memeriksa jumlah kolom"],
          benar: 0,
        },
        {
          pertanyaan: "Dalam penjumlahan matriks, elemen yang dijumlahkan adalah elemen yang...",
          opsi: ["posisinya sama", "nilainya paling besar", "berada di diagonal saja", "berada pada baris berbeda"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Matematika",
      judul: "Peluang kejadian",
      ringkasan: "Ruang sampel, titik sampel, peluang teoretis, dan peluang kejadian sederhana.",
      konten: [
        "Peluang menyatakan kemungkinan terjadinya suatu kejadian. Nilai peluang berada antara 0 dan 1. Peluang 0 berarti mustahil, sedangkan peluang 1 berarti pasti terjadi.",
        "Ruang sampel adalah himpunan semua hasil yang mungkin. Setiap hasil tunggal disebut titik sampel. Pada pelemparan satu dadu, ruang sampelnya adalah {1, 2, 3, 4, 5, 6}.",
        "Untuk kejadian dengan titik sampel yang memiliki kesempatan sama, peluang kejadian A dirumuskan P(A) = banyak hasil yang mendukung A dibagi banyak seluruh hasil dalam ruang sampel.",
        "Peluang dapat digunakan untuk memperkirakan kejadian, tetapi hasil percobaan nyata bisa berbeda. Semakin banyak percobaan dilakukan, biasanya frekuensi relatif semakin mendekati peluang teoretis.",
      ].join("\n\n"),
      sumber: SUMBER_MTK,
      urlVideo: VIDEO_PELUANG,
      gambar: [{ url: GAMBAR_PELUANG, ukuranFile: 22000 }],
      soal: [
        {
          pertanyaan: "Nilai peluang selalu berada pada interval...",
          opsi: ["0 sampai 1", "−1 sampai 1", "1 sampai 10", "0 sampai 100 tanpa pecahan"],
          benar: 0,
        },
        {
          pertanyaan: "Peluang suatu kejadian yang mustahil adalah...",
          opsi: ["0", "1/2", "1", "2"],
          benar: 0,
        },
        {
          pertanyaan: "Peluang suatu kejadian yang pasti adalah...",
          opsi: ["1", "0", "1/2", "−1"],
          benar: 0,
        },
        {
          pertanyaan: "Ruang sampel pelemparan satu dadu adalah...",
          opsi: ["{1, 2, 3, 4, 5, 6}", "{0, 1}", "{genap}", "{merah, putih}"],
          benar: 0,
        },
        {
          pertanyaan: "Pada pelemparan satu dadu, peluang muncul angka genap adalah...",
          opsi: ["1/2", "1/6", "1/3", "5/6"],
          benar: 0,
        },
        {
          pertanyaan: "Rumus peluang kejadian A adalah...",
          opsi: ["banyak hasil yang mendukung dibagi banyak seluruh hasil", "banyak seluruh hasil dibagi hasil yang mendukung", "jumlah angka dikali dua", "hasil terbesar dikurangi hasil terkecil"],
          benar: 0,
        },
        {
          pertanyaan: "Satu koin dilempar sekali. Peluang muncul sisi gambar adalah...",
          opsi: ["1/2", "1", "0", "2"],
          benar: 0,
        },
        {
          pertanyaan: "Jika sebuah kotak berisi 3 bola merah dan 2 bola biru, peluang mengambil bola merah adalah...",
          opsi: ["3/5", "2/5", "3/2", "1/3"],
          benar: 0,
        },
        {
          pertanyaan: "Hasil percobaan dapat berbeda dari peluang teoretis karena...",
          opsi: ["percobaan bersifat acak", "peluang selalu salah", "ruang sampel tidak pernah ada", "semua hasil harus sama"],
          benar: 0,
        },
        {
          pertanyaan: "Seorang siswa menyatakan peluang muncul angka 7 pada dadu biasa adalah 1/6. Kesalahannya adalah...",
          opsi: ["angka 7 tidak termasuk ruang sampel dadu", "dadu memiliki tujuh sisi", "peluang harus lebih dari 1", "angka 7 pasti muncul"],
          benar: 0,
        },
      ],
    },

    // ── Bahasa Indonesia ────────────────────────────────────────────────
    {
      mapel: "Bahasa Indonesia",
      judul: "Teks anekdot: kritik yang dikemas humor",
      ringkasan: "Pengertian, struktur, dan tujuan kritik dalam teks anekdot.",
      konten: [
        "Teks anekdot adalah teks yang berisi kritik atau sindiran yang dikemas dengan humor. Peristiwa lucu dipakai untuk menyampaikan pesan yang lebih dalam.",
        "Struktur teks anekdot: abstraksi (gambaran awal), orientasi (pengenalan tokoh dan peristiwa), krisis (masalah memuncak), reaksi (tanggapan terhadap krisis), dan koda (penutup).",
        "Kritik dalam anekdot biasanya ditujukan kepada pelayanan publik, kebijakan, atau perilaku sosial yang perlu diperbaiki.",
        "Ciri kebahasaan anekdot: kalimat lucu, majas sindiran, kata kerja tindakan, dan sering menampilkan tokoh terkenal atau tokoh tertentu agar terasa hidup.",
      ].join("\n\n"),
      sumber: SUMBER_BI,
      soal: [
        {
          pertanyaan: "Tujuan teks anekdot adalah...",
          opsi: ["menyampaikan kritik melalui humor", "menceritakan riwayat hidup tokoh", "menjelaskan langkah membuat sesuatu", "menggambarkan objek wisata"],
          benar: 0,
        },
        {
          pertanyaan: "Bagian anekdot yang berisi masalah memuncak disebut...",
          opsi: ["krisis", "orientasi", "abstraksi", "koda"],
          benar: 0,
        },
        {
          pertanyaan: "Bagian penutup teks anekdot disebut...",
          opsi: ["koda", "krisis", "reaksi", "orientasi"],
          benar: 0,
        },
        {
          pertanyaan: "Teks anekdot umumnya mengkritik...",
          opsi: ["pelayanan publik dan perilaku sosial", "keindahan alam", "prestasi atlet", "resep makanan"],
          benar: 0,
        },
        {
          pertanyaan: "Humor dalam anekdot berfungsi untuk...",
          opsi: ["menyampaikan kritik dengan cara yang tidak menyakitkan", "menutupi kebenaran", "memperpanjang cerita", "menggantikan kesimpulan"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Bahasa Indonesia",
      judul: "Hikayat: cerita rakyat klasik",
      ringkasan: "Ciri, unsur, dan nilai yang terkandung dalam hikayat.",
      konten: [
        "Hikayat adalah karya sastra lama berbentuk prosa yang menggunakan bahasa Melayu klasik. Isinya sering berupa kesaktian, kepahlawanan, dan keajaiban.",
        "Unsur hikayat meliputi tokoh, latar, alur, tema, dan amanat. Tokoh dalam hikayat sering memiliki kesaktian dan digambarkan secara berlebihan.",
        "Ciri bahasa hikayat: banyak kata arkais (kuno) seperti syahdan dan hatta, serta kalimatnya panjang dan sering berulang.",
        "Hikayat bersifat istana-sentris (pusat cerita berada di istana) dan anonim (penulisnya tidak dikenal). Bandingkan dengan cerpen modern yang pengarangnya jelas.",
      ].join("\n\n"),
      sumber: SUMBER_BI,
      soal: [
        {
          pertanyaan: "Hikayat adalah karya sastra lama yang berbentuk...",
          opsi: ["prosa", "puisi", "pantun", "drama"],
          benar: 0,
        },
        {
          pertanyaan: "Kata \"syahdan\" dalam hikayat termasuk...",
          opsi: ["kata arkais (kuno)", "bahasa gaul", "istilah ilmiah", "kata serapan modern"],
          benar: 0,
        },
        {
          pertanyaan: "Ciri khas tokoh dalam hikayat adalah...",
          opsi: ["sering memiliki kesaktian", "selalu tokoh biasa", "tidak memiliki nama", "berasal dari luar negeri"],
          benar: 0,
        },
        {
          pertanyaan: "Alur yang sering digunakan dalam hikayat adalah...",
          opsi: ["alur maju", "alur mundur", "alur campuran", "alur melingkar"],
          benar: 0,
        },
        {
          pertanyaan: "Hikayat biasanya bersifat istana-sentris, artinya...",
          opsi: ["pusat cerita berada di lingkungan istana", "ditulis oleh raja", "hanya dibaca bangsawan", "berisi peraturan istana"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Bahasa Indonesia",
      judul: "Teks negosiasi: mencapai kesepakatan",
      ringkasan: "Tujuan, struktur, dan bahasa santun dalam teks negosiasi.",
      konten: [
        "Teks negosiasi adalah teks yang berisi proses tawar-menawar untuk mencapai kesepakatan antara dua pihak atau lebih.",
        "Struktur teks negosiasi: orientasi (pembuka), pengajuan (usulan), penawaran (tawar-menawar), dan persetujuan (kesepakatan) yang diakhiri penutup.",
        "Bahasa teks negosiasi harus santun dan persuasif, tidak memaksa. Contoh: \"Maaf, apakah harganya bisa kurang sedikit?\"",
        "Tujuan akhir negosiasi adalah kesepakatan yang menguntungkan kedua belah pihak, yang disebut win-win solution.",
      ].join("\n\n"),
      sumber: SUMBER_BI,
      soal: [
        {
          pertanyaan: "Tujuan utama teks negosiasi adalah...",
          opsi: ["mencapai kesepakatan antara kedua pihak", "menceritakan pengalaman masa lalu", "menghibur pembaca", "menggambarkan suatu objek"],
          benar: 0,
        },
        {
          pertanyaan: "Bagian tawar-menawar dalam teks negosiasi disebut...",
          opsi: ["penawaran", "orientasi", "persetujuan", "koda"],
          benar: 0,
        },
        {
          pertanyaan: "Bahasa yang digunakan dalam negosiasi sebaiknya...",
          opsi: ["santun dan persuasif", "kasar dan memaksa", "penuh sindiran", "berbelit-belit"],
          benar: 0,
        },
        {
          pertanyaan: "Kalimat yang termasuk bagian negosiasi adalah...",
          opsi: ["Apakah harganya bisa kurang sedikit?", "Buku itu sangat tebal.", "Aku bangun pukul lima.", "Hujan turun dengan deras."],
          benar: 0,
        },
        {
          pertanyaan: "Kesepakatan yang menguntungkan kedua pihak disebut...",
          opsi: ["win-win solution", "kompromi paksa", "kalah-menang", "deadline"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Bahasa Indonesia",
      judul: "Teks biografi: riwayat tokoh inspiratif",
      ringkasan: "Struktur teks biografi dan nilai keteladanan dari tokoh.",
      konten: [
        "Teks biografi adalah teks yang menceritakan riwayat hidup seorang tokoh secara faktual. Biografi ditulis oleh orang lain, berbeda dengan autobiografi yang ditulis sendiri oleh tokohnya.",
        "Struktur teks biografi: orientasi (pengenalan tokoh), peristiwa penting (kisah perjalanan hidup), dan reorientasi (kesan penulis terhadap tokoh).",
        "Biografi memuat fakta seperti tempat dan tanggal lahir, pendidikan, pekerjaan, dan prestasi tokoh sehingga harus dapat dipertanggungjawabkan.",
        "Tujuan membaca biografi adalah mengambil keteladanan dari perjuangan tokoh, misalnya kerja keras, kejujuran, dan pantang menyerah.",
      ].join("\n\n"),
      sumber: SUMBER_BI,
      soal: [
        {
          pertanyaan: "Teks biografi ditulis oleh...",
          opsi: ["orang lain", "tokoh itu sendiri", "pembaca", "anak tokoh"],
          benar: 0,
        },
        {
          pertanyaan: "Urutan struktur teks biografi adalah...",
          opsi: ["orientasi, peristiwa penting, reorientasi", "abstraksi, krisis, koda", "tujuan, langkah, penutup", "orientasi, penawaran, persetujuan"],
          benar: 0,
        },
        {
          pertanyaan: "Riwayat hidup yang ditulis oleh tokohnya sendiri disebut...",
          opsi: ["autobiografi", "biografi", "bibliografi", "antologi"],
          benar: 0,
        },
        {
          pertanyaan: "Bagian biografi yang berisi kesan penulis terhadap tokoh disebut...",
          opsi: ["reorientasi", "orientasi", "peristiwa penting", "koda"],
          benar: 0,
        },
        {
          pertanyaan: "Isi teks biografi harus bersifat...",
          opsi: ["faktual", "imajinatif", "humor", "fiktif"],
          benar: 0,
        },
      ],
    },

    // ── Materi tambahan Sesi 3: Bahasa Indonesia ─────────────────────────
    {
      mapel: "Bahasa Indonesia",
      judul: "Puisi: diksi, imaji, dan majas",
      ringkasan: "Unsur pembangun puisi, pemilihan kata, citraan, majas, serta cara menafsirkan makna puisi.",
      konten: [
        "Puisi adalah karya sastra yang mengungkapkan pikiran dan perasaan melalui bahasa yang padat, indah, dan bermakna. Penyair memilih kata dengan cermat agar bunyi, suasana, dan makna dapat dirasakan pembaca.",
        "Unsur fisik puisi meliputi diksi, imaji, kata konkret, rima, tipografi, dan majas. Diksi adalah pilihan kata. Imaji atau citraan membuat pembaca seolah-olah melihat, mendengar, meraba, mencium, atau merasakan sesuatu.",
        "Unsur batin puisi meliputi tema, rasa, nada, dan amanat. Majas dipakai untuk menyampaikan makna secara kias, misalnya personifikasi yang memberi sifat manusia kepada benda atau metafora yang membandingkan dua hal secara langsung.",
        "Untuk menafsirkan puisi, bacalah keseluruhan bait, perhatikan kata-kata penting dan hubungan antarbaris, lalu simpulkan suasana serta pesan berdasarkan bukti dalam teks. Tafsiran harus didukung oleh kata atau larik puisi, bukan hanya dugaan.",
      ].join("\n\n"),
      sumber: SUMBER_BI,
      urlVideo: VIDEO_PUISI,
      gambar: [{ url: GAMBAR_PUISI, ukuranFile: 190000 }],
      soal: [
        {
          pertanyaan: "Puisi mengungkapkan pikiran dan perasaan melalui bahasa yang...",
          opsi: ["padat, indah, dan bermakna", "selalu berupa langkah kerja", "hanya berisi data angka", "tidak memiliki pilihan kata"],
          benar: 0,
        },
        {
          pertanyaan: "Diksi dalam puisi berarti...",
          opsi: ["pilihan kata", "jumlah bait", "pola halaman", "nama pengarang"],
          benar: 0,
        },
        {
          pertanyaan: "Imaji berfungsi membuat pembaca...",
          opsi: ["seolah-olah mengalami sesuatu melalui indra", "menghafal biografi penyair", "menghitung jumlah kata", "menemukan tokoh utama"],
          benar: 0,
        },
        {
          pertanyaan: "Majas yang memberi sifat manusia kepada benda disebut...",
          opsi: ["personifikasi", "metafora", "ironi", "hiperbola"],
          benar: 0,
        },
        {
          pertanyaan: "Tema dan amanat termasuk unsur...",
          opsi: ["batin puisi", "fisik puisi", "surat resmi", "teks prosedur"],
          benar: 0,
        },
        {
          pertanyaan: "Rima berkaitan dengan...",
          opsi: ["pengulangan bunyi dalam puisi", "riwayat hidup penyair", "jumlah tokoh", "tempat kejadian"],
          benar: 0,
        },
        {
          pertanyaan: "Cara yang tepat untuk menafsirkan amanat puisi adalah...",
          opsi: ["menghubungkan pesan dengan kata dan larik yang digunakan", "mengabaikan seluruh isi puisi", "hanya melihat judul", "menyalin pendapat orang tanpa membaca"],
          benar: 0,
        },
        {
          pertanyaan: "Larik 'angin berbisik di antara daun' menggunakan majas...",
          opsi: ["personifikasi", "metonimia", "litotes", "repetisi"],
          benar: 0,
        },
        {
          pertanyaan: "Jika puisi banyak memakai kata 'sunyi', 'kelam', dan 'air mata', suasana yang mungkin dibangun adalah...",
          opsi: ["sedih atau muram", "meriah", "lucu", "tegang karena pertandingan"],
          benar: 0,
        },
        {
          pertanyaan: "Tafsiran puisi yang hanya berdasarkan perasaan pembaca tanpa bukti larik perlu diperbaiki karena...",
          opsi: ["tafsiran seharusnya didukung bukti dari teks", "puisi tidak boleh ditafsirkan", "semua puisi harus memiliki satu tokoh", "makna puisi hanya ditentukan rima"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Bahasa Indonesia",
      judul: "Karya ilmiah: menyusun gagasan berdasarkan data",
      ringkasan: "Ciri, struktur, bahasa, dan langkah menyusun karya ilmiah sederhana secara objektif.",
      konten: [
        "Karya ilmiah adalah tulisan yang membahas suatu masalah berdasarkan data, pengamatan, atau kajian sumber secara sistematis. Tujuannya menyampaikan pengetahuan atau hasil penelitian dengan cara yang dapat dipertanggungjawabkan.",
        "Struktur karya ilmiah sederhana dapat terdiri atas judul, pendahuluan, pembahasan, penutup, dan daftar pustaka. Pendahuluan menjelaskan latar belakang serta tujuan, pembahasan memaparkan data dan analisis, sedangkan penutup berisi simpulan dan saran.",
        "Bahasa karya ilmiah harus baku, objektif, logis, dan efektif. Penulis membedakan fakta dari pendapat, mencantumkan sumber ketika menggunakan gagasan orang lain, serta tidak mengubah data agar sesuai dengan keinginannya.",
        "Langkah penyusunan karya ilmiah meliputi menentukan topik, merumuskan masalah, mengumpulkan data, mengolah dan menganalisis data, menulis laporan, lalu memeriksa kembali isi dan daftar pustaka. Simpulan harus menjawab masalah berdasarkan pembahasan.",
      ].join("\n\n"),
      sumber: SUMBER_BI,
      urlVideo: VIDEO_KARYA_ILMIAH,
      gambar: [{ url: GAMBAR_KARYA_ILMIAH, ukuranFile: 160000 }],
      soal: [
        {
          pertanyaan: "Karya ilmiah disusun berdasarkan...",
          opsi: ["data, pengamatan, atau kajian sumber", "khayalan tanpa bukti", "pendapat yang tidak perlu diperiksa", "dialog antartokoh"],
          benar: 0,
        },
        {
          pertanyaan: "Bagian yang menjelaskan latar belakang dan tujuan adalah...",
          opsi: ["pendahuluan", "daftar pustaka", "judul saja", "lampiran foto"],
          benar: 0,
        },
        {
          pertanyaan: "Pembahasan dalam karya ilmiah berisi...",
          opsi: ["data dan analisis", "salam pembuka", "tokoh dan alur", "daftar harga"],
          benar: 0,
        },
        {
          pertanyaan: "Bahasa karya ilmiah sebaiknya...",
          opsi: ["baku, objektif, logis, dan efektif", "santai dan penuh singkatan", "emosional dan memihak", "berisi majas sebanyak mungkin"],
          benar: 0,
        },
        {
          pertanyaan: "Daftar pustaka digunakan untuk...",
          opsi: ["mencantumkan sumber yang digunakan", "menyimpan semua data mentah", "menulis salam penutup", "menggantikan simpulan"],
          benar: 0,
        },
        {
          pertanyaan: "Langkah awal yang tepat dalam menyusun karya ilmiah adalah...",
          opsi: ["menentukan topik", "menulis simpulan tanpa data", "menghapus sumber", "mengubah hasil pengamatan"],
          benar: 0,
        },
        {
          pertanyaan: "Mengapa data tidak boleh diubah agar sesuai keinginan penulis?",
          opsi: ["Karya ilmiah harus objektif dan dapat dipertanggungjawabkan", "Agar tulisan menjadi fiksi", "Agar daftar pustaka lebih pendek", "Karena data tidak boleh dianalisis"],
          benar: 0,
        },
        {
          pertanyaan: "Simpulan yang baik harus...",
          opsi: ["menjawab rumusan masalah berdasarkan pembahasan", "memuat topik baru yang tidak diteliti", "berisi pendapat tanpa data", "mengulang judul saja"],
          benar: 0,
        },
        {
          pertanyaan: "Seorang siswa mengambil gagasan dari buku tetapi tidak mencantumkan sumber. Perbaikan yang tepat adalah...",
          opsi: ["mencantumkan sumber dalam kutipan atau daftar pustaka", "menghapus semua data penelitian", "menyatakan gagasan itu miliknya", "mengganti bahasa baku dengan bahasa gaul"],
          benar: 0,
        },
        {
          pertanyaan: "Urutan kegiatan yang paling logis adalah...",
          opsi: ["menentukan topik, mengumpulkan data, menganalisis, menulis laporan", "menulis simpulan, menentukan topik, menghapus data, mencari judul", "menganalisis tanpa data, lalu mencari masalah", "menyalin tulisan, mengganti nama, lalu menerbitkan"],
          benar: 0,
        },
      ],
    },

    // ── Bahasa Inggris ──────────────────────────────────────────────────
    {
      mapel: "Bahasa Inggris",
      judul: "Descriptive text: describing people and places",
      ringkasan: "Purpose, structure, and language features of descriptive text.",
      konten: [
        "A descriptive text describes a particular person, place, or thing in detail so the reader can imagine it clearly.",
        "The structure: identification (introducing the subject) and description (explaining its parts, qualities, or characteristics).",
        "Language features: simple present tense (\"She has long hair\"), adjectives (friendly, beautiful, tall), and specific nouns.",
        "Example: \"My mother is a kind woman. She has curly hair and a warm smile. She always helps our neighbours.\"",
      ].join("\n\n"),
      sumber: SUMBER_ENG,
      soal: [
        {
          pertanyaan: "The purpose of a descriptive text is to...",
          opsi: ["describe a person, place, or thing in detail", "tell a sequence of past events", "explain how to make something", "persuade people to buy a product"],
          benar: 0,
        },
        {
          pertanyaan: "The structure of a descriptive text is...",
          opsi: ["identification and description", "orientation, complication, resolution", "goal and steps", "thesis and arguments"],
          benar: 0,
        },
        {
          pertanyaan: "Complete the sentence: \"She ... long black hair.\"",
          opsi: ["has", "have", "is", "are"],
          benar: 0,
        },
        {
          pertanyaan: "Which word is an adjective?",
          opsi: ["friendly", "run", "table", "quickly"],
          benar: 0,
        },
        {
          pertanyaan: "Descriptive text mostly uses...",
          opsi: ["simple present tense", "simple past tense", "future tense", "passive voice only"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Bahasa Inggris",
      judul: "Recount text: telling past experiences",
      ringkasan: "Purpose, structure, and language features of recount text.",
      konten: [
        "A recount text tells about past events or experiences in chronological order, for example a diary entry about a holiday.",
        "The structure: orientation (who, what, when, where), events (what happened, in order), and reorientation (conclusion or feeling).",
        "Language features: simple past tense (\"We visited the museum\"), time connectives (then, after that, finally), and action verbs.",
        "Example: \"Last week, my class visited the city museum. We saw traditional tools and old photographs. It was an amazing experience.\"",
      ].join("\n\n"),
      sumber: SUMBER_ENG,
      soal: [
        {
          pertanyaan: "A recount text tells about...",
          opsi: ["past events or experiences", "future plans", "how to cook something", "the writer's opinion about a book"],
          benar: 0,
        },
        {
          pertanyaan: "The structure of a recount text is...",
          opsi: ["orientation, events, reorientation", "identification, description", "goal, steps", "complication, resolution"],
          benar: 0,
        },
        {
          pertanyaan: "Complete the sentence: \"We ... the museum last Sunday.\"",
          opsi: ["visited", "visit", "visiting", "visits"],
          benar: 0,
        },
        {
          pertanyaan: "Which word is a time connective?",
          opsi: ["after that", "beautiful", "museum", "visited"],
          benar: 0,
        },
        {
          pertanyaan: "\"Last week\" in a recount text is an example of...",
          opsi: ["a time expression", "an adjective", "a verb", "a noun"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Bahasa Inggris",
      judul: "Narrative text: stories with a moral",
      ringkasan: "Purpose, structure, and language features of narrative text.",
      konten: [
        "A narrative text tells a story to entertain the reader. It can be a folktale, legend, or fairy tale, such as the story of Malin Kundang from West Sumatra.",
        "The structure: orientation (setting and characters), complication (the problem), and resolution (how the problem is solved).",
        "Language features: simple past tense, time connectives (once upon a time, one day), and direct speech to make the story alive.",
        "Many narratives carry a moral value. For example, Malin Kundang teaches us to respect our parents.",
      ].join("\n\n"),
      sumber: SUMBER_ENG,
      soal: [
        {
          pertanyaan: "The purpose of a narrative text is to...",
          opsi: ["entertain the reader with a story", "describe a product", "report a news event", "give instructions"],
          benar: 0,
        },
        {
          pertanyaan: "\"Complication\" in a narrative means...",
          opsi: ["the problem in the story", "the happy ending", "the list of characters", "the place of the story"],
          benar: 0,
        },
        {
          pertanyaan: "The correct order of a narrative structure is...",
          opsi: ["orientation, complication, resolution", "complication, orientation, resolution", "resolution, complication, orientation", "orientation, resolution, complication"],
          benar: 0,
        },
        {
          pertanyaan: "\"Once upon a time\" is usually found in the...",
          opsi: ["orientation", "complication", "resolution", "title"],
          benar: 0,
        },
        {
          pertanyaan: "The moral message of a story is called...",
          opsi: ["moral value", "setting", "character", "plot"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Bahasa Inggris",
      judul: "Announcement: sharing information",
      ringkasan: "Purpose, structure, and language features of announcements.",
      konten: [
        "An announcement is a short text that informs people about an event, program, or important news.",
        "An announcement usually contains: the title or purpose, date and time, place, and a contact person.",
        "Language features: simple and clear sentences, often using imperative sentences (\"Please come on time\") and future tense (\"The event will be held on Monday\").",
        "Example: \"School Holiday — All students will have a holiday from 24 to 26 June. The school will reopen on 27 June.\"",
      ].join("\n\n"),
      sumber: SUMBER_ENG,
      soal: [
        {
          pertanyaan: "The purpose of an announcement is to...",
          opsi: ["inform people about something", "tell a fictional story", "describe a beautiful place", "explain past experiences"],
          benar: 0,
        },
        {
          pertanyaan: "Which one is usually NOT found in an announcement?",
          opsi: ["a long fictional story", "date and time", "place", "contact person"],
          benar: 0,
        },
        {
          pertanyaan: "Complete the sentence: \"The event ... be held on Monday.\"",
          opsi: ["will", "was", "were", "has"],
          benar: 0,
        },
        {
          pertanyaan: "\"Please come on time\" is an example of...",
          opsi: ["an imperative sentence", "a question", "a description", "a narrative"],
          benar: 0,
        },
        {
          pertanyaan: "The language of an announcement should be...",
          opsi: ["short and clear", "long and poetic", "full of metaphors", "difficult to understand"],
          benar: 0,
        },
      ],
    },

    // ── Materi tambahan Sesi 3: Bahasa Inggris ───────────────────────────
    {
      mapel: "Bahasa Inggris",
      judul: "Procedure text: explaining how to do something",
      ringkasan: "Purpose, structure, imperative verbs, and sequence connectors in procedure texts.",
      konten: [
        "A procedure text explains how to make or do something through a clear sequence of steps. Its purpose is to help the reader achieve a result correctly and safely.",
        "The structure usually consists of a goal, materials or ingredients, and steps. The materials section is needed when the procedure uses objects or ingredients.",
        "Procedure texts use imperative verbs such as cut, mix, press, and turn. They also use sequence connectors such as first, next, then, after that, and finally.",
        "Good instructions are specific and ordered. Check the result after each important step and add warnings when an action may be dangerous, for example when using heat or sharp tools.",
      ].join("\n\n"),
      sumber: SUMBER_ENG,
      urlVideo: VIDEO_PROCEDURE,
      gambar: [{ url: GAMBAR_PROCEDURE, ukuranFile: 170000 }],
      soal: [
        {
          pertanyaan: "The purpose of a procedure text is to...",
          opsi: ["explain how to make or do something", "describe a famous person", "tell a funny story", "report yesterday's news"],
          benar: 0,
        },
        {
          pertanyaan: "Which part tells the reader what the procedure will achieve?",
          opsi: ["goal", "materials", "last step only", "contact person"],
          benar: 0,
        },
        {
          pertanyaan: "Which word is an imperative verb?",
          opsi: ["mix", "beautiful", "carefully", "ingredient"],
          benar: 0,
        },
        {
          pertanyaan: "Complete: ..., wash the vegetables.",
          opsi: ["First", "Because", "Although", "Yesterday"],
          benar: 0,
        },
        {
          pertanyaan: "The materials section contains...",
          opsi: ["objects or ingredients needed", "the writer's biography", "the moral of a story", "the final opinion only"],
          benar: 0,
        },
        {
          pertanyaan: "Which sentence is a clear instruction?",
          opsi: ["Press the button once.", "The button is interesting.", "I pressed it yesterday.", "Maybe the button is blue."],
          benar: 0,
        },
        {
          pertanyaan: "Why must procedure steps be in the correct order?",
          opsi: ["So the reader can achieve the intended result", "So the text becomes a narrative", "So materials are unnecessary", "So every sentence becomes a question"],
          benar: 0,
        },
        {
          pertanyaan: "Which connector shows the final step?",
          opsi: ["finally", "next", "first", "before"],
          benar: 0,
        },
        {
          pertanyaan: "A recipe lists 'bake the cake' before 'pour the batter into the pan'. The problem is...",
          opsi: ["the steps are in an illogical order", "the recipe has too many materials", "the imperative verb is missing", "the title must be a question"],
          benar: 0,
        },
        {
          pertanyaan: "A warning is important in a procedure when...",
          opsi: ["an action may be dangerous", "the reader already knows the title", "the text has a goal", "the materials are listed alphabetically"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Bahasa Inggris",
      judul: "Giving opinions and presenting ideas",
      ringkasan: "Expressions for stating opinions, agreeing, disagreeing politely, and presenting ideas.",
      konten: [
        "An opinion is what someone thinks or feels about a topic. Useful expressions include I think..., In my opinion..., and I believe....",
        "To agree, say I agree, I think so too, or That's a good point. To disagree politely, say I see your point, but... or I am not sure I agree because....",
        "A short presentation usually has an opening, the main points, and a closing. Start by greeting the audience and introducing the topic, then explain ideas in a clear order.",
        "Support an opinion with a reason or example. Listen to other speakers, do not interrupt, and use polite language even when your opinion is different.",
      ].join("\n\n"),
      sumber: SUMBER_ENG,
      urlVideo: VIDEO_PRESENTASI,
      gambar: [{ url: GAMBAR_PRESENTASI, ukuranFile: 180000 }],
      soal: [
        {
          pertanyaan: "An opinion is...",
          opsi: ["what someone thinks or feels", "a confirmed measurement only", "a sequence of cooking steps", "a place on a map"],
          benar: 0,
        },
        {
          pertanyaan: "Which expression states an opinion?",
          opsi: ["In my opinion...", "Open the door!", "Where is the bank?", "I was born in May."],
          benar: 0,
        },
        {
          pertanyaan: "Which expression shows agreement?",
          opsi: ["I agree.", "I disagree because...", "Please wait.", "I don't know where."],
          benar: 0,
        },
        {
          pertanyaan: "A polite way to disagree is...",
          opsi: ["I see your point, but...", "You are stupid.", "Be quiet.", "That is impossible, stop talking."],
          benar: 0,
        },
        {
          pertanyaan: "A presentation usually begins with...",
          opsi: ["a greeting and an introduction", "the final conclusion only", "an unrelated joke", "a list of questions without a topic"],
          benar: 0,
        },
        {
          pertanyaan: "An opinion becomes stronger when it has...",
          opsi: ["a reason or example", "a louder voice", "many interruptions", "no explanation"],
          benar: 0,
        },
        {
          pertanyaan: "Complete: I think recycling is important ... it reduces waste.",
          opsi: ["because", "but", "or", "although"],
          benar: 0,
        },
        {
          pertanyaan: "What should a good listener do during a presentation?",
          opsi: ["listen and avoid interrupting", "talk louder than the speaker", "leave before the topic starts", "change the topic repeatedly"],
          benar: 0,
        },
        {
          pertanyaan: "A student says 'I think uniforms are useful because they make students look neat.' The word because introduces...",
          opsi: ["a reason", "a greeting", "a disagreement", "a closing"],
          benar: 0,
        },
        {
          pertanyaan: "Which presentation order is most logical?",
          opsi: ["greeting, topic, main points, closing", "closing, greeting, unrelated topic, main points", "main points, goodbye, greeting, topic", "questions only, then no conclusion"],
          benar: 0,
        },
      ],
    },

    // ── Informatika ─────────────────────────────────────────────────────
    {
      mapel: "Informatika",
      judul: "Berpikir komputasional",
      ringkasan: "Dekomposisi, pengenalan pola, abstraksi, dan algoritma.",
      konten: [
        "Berpikir komputasional (computational thinking) adalah cara menyelesaikan masalah seperti seorang ilmuwan komputer. Ada empat fondasinya: dekomposisi, pengenalan pola, abstraksi, dan algoritma.",
        "Dekomposisi berarti memecah masalah besar menjadi bagian-bagian kecil yang lebih mudah diselesaikan satu per satu.",
        "Pengenalan pola berarti mencari kesamaan atau keteraturan dari masalah yang pernah dihadapi, sehingga solusinya dapat dipakai ulang.",
        "Abstraksi berarti menyaring informasi yang penting dan mengabaikan detail yang tidak perlu. Setelah itu, solusi disusun menjadi langkah-langkah runtut yang disebut algoritma.",
      ].join("\n\n"),
      sumber: SUMBER_INFO,
      soal: [
        {
          pertanyaan: "Empat fondasi berpikir komputasional adalah...",
          opsi: ["dekomposisi, pengenalan pola, abstraksi, algoritma", "membaca, menulis, menghitung, menggambar", "input, proses, output, penyimpanan", "hardware, software, brainware, network"],
          benar: 0,
        },
        {
          pertanyaan: "Dekomposisi berarti...",
          opsi: ["memecah masalah besar menjadi bagian yang lebih kecil", "menghafal semua solusi", "menggabungkan banyak masalah", "menghindari masalah"],
          benar: 0,
        },
        {
          pertanyaan: "Mencari kesamaan dari masalah yang pernah dihadapi disebut...",
          opsi: ["pengenalan pola", "dekomposisi", "abstraksi", "enkripsi"],
          benar: 0,
        },
        {
          pertanyaan: "Menyaring informasi penting dan mengabaikan detail yang tidak perlu disebut...",
          opsi: ["abstraksi", "algoritma", "kompilasi", "iterasi"],
          benar: 0,
        },
        {
          pertanyaan: "Langkah-langkah runtut untuk menyelesaikan masalah disebut...",
          opsi: ["algoritma", "abstraksi", "dekomposisi", "pola"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Informatika",
      judul: "Sistem komputer",
      ringkasan: "Perangkat keras, perangkat lunak, dan peran sistem operasi.",
      konten: [
        "Sistem komputer terdiri atas perangkat keras (hardware) dan perangkat lunak (software) yang bekerja bersama melayani pengguna.",
        "Perangkat keras utama: perangkat input (keyboard, mouse, scanner), perangkat proses (CPU dan memori), serta perangkat output (monitor, printer, speaker).",
        "Sistem operasi seperti Windows, Linux, dan Android mengatur sumber daya komputer serta menjadi jembatan antara perangkat keras, aplikasi, dan pengguna.",
        "Data diproses mengikuti alur input → proses → output. Contoh: angka diketik (input), dihitung oleh CPU (proses), lalu hasilnya tampil di layar (output).",
      ].join("\n\n"),
      sumber: SUMBER_INFO,
      soal: [
        {
          pertanyaan: "Berikut ini yang termasuk perangkat input adalah...",
          opsi: ["keyboard", "monitor", "printer", "speaker"],
          benar: 0,
        },
        {
          pertanyaan: "CPU termasuk perangkat...",
          opsi: ["proses", "input", "output", "penyimpanan eksternal"],
          benar: 0,
        },
        {
          pertanyaan: "Alur pemrosesan data dalam komputer adalah...",
          opsi: ["input → proses → output", "output → proses → input", "proses → input → output", "input → output → proses"],
          benar: 0,
        },
        {
          pertanyaan: "Fungsi utama sistem operasi adalah...",
          opsi: ["mengatur sumber daya dan menghubungkan perangkat keras, perangkat lunak, dan pengguna", "mencetak dokumen", "menggambar ilustrasi", "menyimpan file di flashdisk"],
          benar: 0,
        },
        {
          pertanyaan: "Monitor merupakan perangkat...",
          opsi: ["output", "input", "proses", "jaringan"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Informatika",
      judul: "Jaringan komputer dan internet",
      ringkasan: "Jaringan lokal, internet, dan cara melindungi data pribadi.",
      konten: [
        "Jaringan komputer menghubungkan dua atau lebih perangkat agar dapat berkomunikasi dan berbagi data. Jaringan lokal (LAN) mencakup area kecil seperti sekolah atau kantor.",
        "Internet adalah jaringan global yang menghubungkan miliaran perangkat di seluruh dunia. Koneksi dapat melalui kabel (fiber optik) maupun nirkabel (Wi-Fi dan jaringan seluler).",
        "Manfaatkan Wi-Fi kelas untuk mengunduh materi besar agar kuota pribadi tetap hemat.",
        "Saat terhubung ke internet, lindungi data pribadi: gunakan kata sandi yang kuat, jangan bagikan data kepada orang tak dikenal, dan gunakan enkripsi agar isi dokumen tidak dapat dibaca pihak lain.",
      ].join("\n\n"),
      sumber: SUMBER_INFO,
      soal: [
        {
          pertanyaan: "LAN adalah jaringan komputer yang mencakup...",
          opsi: ["area kecil seperti sekolah atau kantor", "seluruh dunia", "hanya dua negara", "ruang angkasa"],
          benar: 0,
        },
        {
          pertanyaan: "Internet adalah...",
          opsi: ["jaringan global yang menghubungkan perangkat di seluruh dunia", "jaringan satu ruangan saja", "perangkat keras komputer", "aplikasi pengolah kata"],
          benar: 0,
        },
        {
          pertanyaan: "Contoh koneksi nirkabel adalah...",
          opsi: ["Wi-Fi", "kabel fiber optik", "kabel LAN", "kabel listrik"],
          benar: 0,
        },
        {
          pertanyaan: "Cara melindungi data pribadi saat berinternet adalah...",
          opsi: ["menggunakan kata sandi kuat dan tidak membagikan data sembarangan", "membagikan kata sandi kepada semua orang", "menggunakan kata sandi yang sama di semua akun", "mengabaikan pembaruan keamanan"],
          benar: 0,
        },
        {
          pertanyaan: "Enkripsi berfungsi untuk...",
          opsi: ["menyandikan data agar tidak dapat dibaca pihak yang tidak berhak", "mempercepat koneksi internet", "menghapus semua data", "menggandakan dokumen"],
          benar: 0,
        },
      ],
    },
    // ── Materi tambahan Sesi 3: Informatika ──────────────────────────────
    {
      mapel: "Informatika",
      judul: "Keamanan digital dan perlindungan data",
      ringkasan: "Ancaman digital, kata sandi kuat, autentikasi, phishing, dan kebiasaan aman di internet.",
      konten: [
        "Keamanan digital adalah upaya melindungi perangkat, akun, jaringan, dan data saat menggunakan teknologi. Data pribadi meliputi nama lengkap, alamat, nomor telepon, kata sandi, kode OTP, dan informasi keuangan.",
        "Gunakan kata sandi yang panjang, unik untuk setiap akun, dan sulit ditebak. Aktifkan autentikasi multifaktor jika tersedia. Jangan pernah membagikan kata sandi atau kode OTP kepada orang lain.",
        "Phishing adalah penipuan yang mencoba mencuri informasi melalui pesan, situs, atau tautan palsu. Periksa alamat pengirim dan URL, waspadai permintaan yang mendesak, dan jangan mengunduh lampiran mencurigakan.",
        "Perbarui sistem dan aplikasi, gunakan jaringan tepercaya, buat cadangan data penting, dan laporkan kejadian mencurigakan. Keamanan digital merupakan tanggung jawab bersama, bukan hanya tugas penyedia layanan.",
      ].join("\n\n"),
      sumber: SUMBER_INFO,
      urlVideo: VIDEO_KEAMANAN,
      gambar: [{ url: GAMBAR_KEAMANAN, ukuranFile: 130000 }],
      soal: [
        {
          pertanyaan: "Keamanan digital bertujuan melindungi...",
          opsi: ["perangkat, akun, jaringan, dan data", "warna layar saja", "semua berita agar menjadi benar", "kecepatan mengetik"],
          benar: 0,
        },
        {
          pertanyaan: "Contoh data pribadi yang harus dijaga adalah...",
          opsi: ["kata sandi dan kode OTP", "warna favorit yang diumumkan", "nama mata pelajaran", "judul buku di perpustakaan"],
          benar: 0,
        },
        {
          pertanyaan: "Kata sandi yang baik seharusnya...",
          opsi: ["panjang, unik, dan sulit ditebak", "sama untuk semua akun", "berisi tanggal lahir saja", "dibagikan kepada teman"],
          benar: 0,
        },
        {
          pertanyaan: "Autentikasi multifaktor menambah...",
          opsi: ["lapisan verifikasi saat masuk akun", "jumlah iklan di layar", "kecepatan internet", "kapasitas baterai"],
          benar: 0,
        },
        {
          pertanyaan: "Phishing adalah...",
          opsi: ["penipuan untuk mencuri informasi melalui pesan atau tautan palsu", "cara memperbarui aplikasi", "metode membuat cadangan data", "jaringan lokal di sekolah"],
          benar: 0,
        },
        {
          pertanyaan: "Jika mendapat pesan yang meminta kode OTP dengan segera, tindakan paling aman adalah...",
          opsi: ["tidak membagikan OTP dan memeriksa kebenaran pesan", "langsung mengirim OTP", "meneruskan pesan kepada semua teman", "mengunduh semua lampiran"],
          benar: 0,
        },
        {
          pertanyaan: "Mengapa aplikasi perlu diperbarui?",
          opsi: ["pembaruan dapat memperbaiki celah keamanan", "agar kata sandi menjadi publik", "agar data pribadi terhapus", "supaya semua tautan dapat dipercaya"],
          benar: 0,
        },
        {
          pertanyaan: "Tindakan yang membantu mencegah kehilangan data adalah...",
          opsi: ["membuat cadangan data penting", "menggunakan satu kata sandi di semua akun", "menonaktifkan semua pembaruan", "membuka tautan tidak dikenal"],
          benar: 0,
        },
        {
          pertanyaan: "Seseorang mengirim tautan hadiah dengan alamat situs yang aneh dan meminta kata sandi. Ciri yang perlu dicurigai adalah...",
          opsi: ["tautan dan permintaan informasinya mencurigakan", "hadiahnya pasti benar", "kata sandi boleh dibagikan", "semua situs memakai alamat yang sama"],
          benar: 0,
        },
        {
          pertanyaan: "Seorang siswa memakai kata sandi yang sama untuk semua akun. Risikonya adalah...",
          opsi: ["satu kebocoran dapat membahayakan banyak akun", "semua akun menjadi lebih aman", "OTP tidak lagi diperlukan", "data otomatis dicadangkan"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Informatika",
      judul: "Analisis data dan visualisasi informasi",
      ringkasan: "Jenis data, pembersihan data, tabel, grafik, dan cara menarik kesimpulan secara tepat.",
      konten: [
        "Data adalah fakta atau keterangan yang dikumpulkan untuk menjawab pertanyaan. Data dapat berupa angka, teks, tanggal, gambar, atau kategori. Sebelum dianalisis, data perlu diperiksa agar lengkap dan sesuai tujuan.",
        "Pembersihan data meliputi menghapus duplikasi, memperbaiki kesalahan penulisan, menangani data kosong, dan memastikan satuan atau formatnya konsisten. Data yang tidak rapi dapat menghasilkan kesimpulan yang menyesatkan.",
        "Tabel menyajikan data dalam baris dan kolom. Diagram batang cocok untuk membandingkan kategori, diagram garis menunjukkan perubahan dari waktu ke waktu, sedangkan diagram lingkaran menunjukkan bagian terhadap keseluruhan.",
        "Kesimpulan harus sesuai dengan data dan tidak melebih-lebihkan. Perhatikan judul, label sumbu, satuan, skala, serta sumber data sebelum membaca atau membuat visualisasi.",
      ].join("\n\n"),
      sumber: SUMBER_INFO,
      urlVideo: VIDEO_DATA,
      gambar: [{ url: GAMBAR_DATA, ukuranFile: 150000 }],
      soal: [
        {
          pertanyaan: "Data adalah...",
          opsi: ["fakta atau keterangan yang dikumpulkan", "pendapat yang selalu benar", "program komputer saja", "warna pada diagram"],
          benar: 0,
        },
        {
          pertanyaan: "Contoh data berbentuk kategori adalah...",
          opsi: ["jenis transportasi: bus, sepeda, atau kereta", "tinggi badan dalam sentimeter", "jumlah buku sebanyak 12", "suhu 30 °C"],
          benar: 0,
        },
        {
          pertanyaan: "Menghapus data yang tercatat dua kali disebut...",
          opsi: ["menghapus duplikasi", "membuat prediksi", "mengubah skala", "menggambar sumbu"],
          benar: 0,
        },
        {
          pertanyaan: "Diagram batang paling sesuai untuk...",
          opsi: ["membandingkan beberapa kategori", "menunjukkan perubahan waktu secara terus-menerus saja", "menulis paragraf", "menyimpan kata sandi"],
          benar: 0,
        },
        {
          pertanyaan: "Diagram garis cocok untuk menunjukkan...",
          opsi: ["perubahan data dari waktu ke waktu", "bagian dari keseluruhan saja", "daftar nama tanpa urutan", "langkah algoritma"],
          benar: 0,
        },
        {
          pertanyaan: "Sebelum menarik kesimpulan dari grafik, kita perlu memeriksa...",
          opsi: ["judul, label, satuan, skala, dan sumber data", "warna favorit pembuat grafik", "panjang nama file saja", "jumlah gambar di halaman"],
          benar: 0,
        },
        {
          pertanyaan: "Mengapa data kosong perlu ditangani?",
          opsi: ["Agar analisis tidak menghasilkan kesimpulan yang menyesatkan", "Agar semua data menjadi angka nol", "Agar sumber data dapat dihapus", "Agar grafik tidak memiliki judul"],
          benar: 0,
        },
        {
          pertanyaan: "Diagram lingkaran menunjukkan...",
          opsi: ["bagian terhadap keseluruhan", "urutan langkah program", "perubahan suhu setiap menit saja", "nama kolom tabel"],
          benar: 0,
        },
        {
          pertanyaan: "Jika sumbu grafik tidak memiliki satuan, masalahnya adalah...",
          opsi: ["pembaca sulit menafsirkan ukuran data dengan tepat", "data otomatis menjadi benar", "grafik berubah menjadi tabel", "semua kategori hilang"],
          benar: 0,
        },
        {
          pertanyaan: "Sebuah grafik memakai skala yang dipotong sehingga selisih kecil tampak sangat besar. Hal yang perlu dilakukan adalah...",
          opsi: ["memeriksa skala sebelum menerima kesimpulan", "langsung menyebarkan grafik", "menghapus judul grafik", "menganggap semua data sama"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Informatika",
      judul: "Algoritma dan pemrograman",
      ringkasan: "Notasi algoritma, variabel, ekspresi, serta struktur kontrol program.",
      konten: [
        "Algoritma adalah urutan langkah logis dan terbatas untuk menyelesaikan masalah. Algoritma dapat dituliskan dengan diagram alir (flowchart) atau pseudokode.",
        "Program adalah algoritma yang ditulis dalam bahasa pemrograman agar dapat dijalankan komputer. Contoh bahasa prosedural: C, Java, dan Python.",
        "Dalam program, variabel dipakai untuk menyimpan nilai, misalnya nama = \"Rina\" atau umur = 16. Ekspresi adalah perhitungan yang menghasilkan nilai, misalnya umur + 1.",
        "Struktur kontrol mengatur alur program: percabangan (if-else) memilih langkah berdasarkan kondisi, sedangkan perulangan (for/while) mengulang langkah berkali-kali.",
      ].join("\n\n"),
      sumber: SUMBER_INFO,
      soal: [
        {
          pertanyaan: "Algoritma adalah...",
          opsi: ["urutan langkah untuk menyelesaikan masalah", "perangkat keras komputer", "nama bahasa pemrograman", "aplikasi pengolah gambar"],
          benar: 0,
        },
        {
          pertanyaan: "Algoritma dapat digambarkan dengan...",
          opsi: ["diagram alir (flowchart)", "foto pemandangan", "lagu daerah", "grafik penjualan"],
          benar: 0,
        },
        {
          pertanyaan: "Variabel dalam program digunakan untuk...",
          opsi: ["menyimpan nilai", "mencetak dokumen", "menghapus memori", "menggambar diagram"],
          benar: 0,
        },
        {
          pertanyaan: "Struktur kontrol yang memilih langkah berdasarkan kondisi disebut...",
          opsi: ["percabangan (if-else)", "perulangan (for)", "variabel", "komentar"],
          benar: 0,
        },
        {
          pertanyaan: "Perulangan (for/while) dipakai untuk...",
          opsi: ["mengulang langkah berkali-kali", "memilih satu dari dua kondisi", "menyimpan angka", "menampilkan gambar"],
          benar: 0,
        },
      ],
    },
  ],
};
