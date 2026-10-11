import type { PaketKonten } from "./tipe";

const SUMBER_BI =
  "https://buku.kemendikdasmen.go.id/katalog/bahasa-indonesia-lihat-sekitar-untuk-sdmi-kelas-iv-edisi-revisi";
const SUMBER_MTK =
  "https://buku.kemendikdasmen.go.id/katalog/Matematika-untuk-SDMI-Kelas-IV";

/**
 * Paket A — setara SD/MI (Fase A–C Kurikulum Merdeka).
 * Topik mengikuti Capaian Pembelajaran Fase B dan buku teks resmi Kemendikdasmen.
 */
export const paketA: PaketKonten = {
  kode: "PAKETA",
  nama: "Kelas A (Paket A — Setara SD)",
  jenjang: "Paket A",
  babs: [
    // ── Bahasa Indonesia ────────────────────────────────────────────────
    {
      mapel: "Bahasa Indonesia",
      judul: "Kalimat dan tanda baca",
      ringkasan: "Mengenal kalimat yang baik serta pemakaian huruf kapital dan tanda baca.",
      konten: [
        "Kalimat adalah kumpulan kata yang menyampaikan satu pikiran lengkap. Kalimat yang baik dimulai dengan huruf kapital dan diakhiri tanda baca yang sesuai.",
        "Titik (.) dipakai untuk mengakhiri kalimat berita, tanda tanya (?) untuk kalimat tanya, dan tanda seru (!) untuk perintah atau perasaan yang kuat.",
        "Huruf kapital dipakai pada awal kalimat, nama orang, nama tempat, nama hari, dan nama bulan. Contoh: Setiap Senin, Siti belajar di Balai Desa.",
        "Tanda koma (,) dipakai untuk memisahkan rincian. Contoh: Ibu membeli beras, minyak, dan gula.",
      ].join("\n\n"),
      sumber: SUMBER_BI,
      soal: [
        {
          pertanyaan: "Penulisan kalimat yang benar adalah...",
          opsi: ["siti membaca buku.", "Siti Membaca Buku.", "Siti membaca buku.", "Siti membaca buku"],
          benar: 2,
        },
        {
          pertanyaan: "Tanda baca yang tepat untuk mengakhiri kalimat tanya adalah...",
          opsi: ["titik (.)", "tanda seru (!)", "tanda tanya (?)", "koma (,)"],
          benar: 2,
        },
        {
          pertanyaan: "Huruf kapital dipakai pada...",
          opsi: ["awal kalimat dan nama orang", "semua kata dalam kalimat", "kata terakhir kalimat", "kata yang panjang saja"],
          benar: 0,
        },
        {
          pertanyaan: "Fungsi tanda koma dalam kalimat adalah...",
          opsi: ["memisahkan rincian", "mengakhiri kalimat berita", "menandai kalimat tanya", "mengganti titik"],
          benar: 0,
        },
        {
          pertanyaan: "Perbaikan yang tepat untuk kalimat \"Setiap senin, Rina belajar di rumah.\" adalah...",
          opsi: ["Setiap Senin, Rina belajar di rumah.", "Setiap senin, rina belajar Di rumah.", "Setiap SENIN, Rina belajar di rumah.", "setiap Senin, rina belajar di rumah."],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Bahasa Indonesia",
      judul: "Ide pokok dan informasi dalam teks",
      ringkasan: "Menemukan ide pokok paragraf dan informasi yang tertulis di dalam teks.",
      konten: [
        "Ide pokok adalah inti pembahasan sebuah paragraf. Semua kalimat lain dalam paragraf itu menjelaskan atau mendukung ide pokok tersebut.",
        "Ide pokok sering berada di awal paragraf, tetapi bisa juga di akhir paragraf. Untuk menemukannya, bacalah seluruh paragraf dengan tenang lalu tanyakan: paragraf ini sebenarnya membahas apa?",
        "Kalimat yang menjelaskan ide pokok disebut kalimat penjelas. Kalimat penjelas biasanya berisi contoh, alasan, atau rincian.",
        "Informasi tersurat adalah informasi yang tertulis jelas di dalam teks. Jawabannya bisa langsung ditemukan dengan membaca ulang bagian teks yang sesuai.",
      ].join("\n\n"),
      sumber: SUMBER_BI,
      soal: [
        {
          pertanyaan: "Ide pokok adalah...",
          opsi: ["inti pembahasan sebuah paragraf", "kalimat yang paling panjang", "kata-kata sulit dalam bacaan", "judul dari sebuah buku"],
          benar: 0,
        },
        {
          pertanyaan: "Ide pokok paragraf biasanya dapat ditemukan di...",
          opsi: ["awal atau akhir paragraf", "hanya di tengah paragraf", "hanya di kalimat terakhir", "di halaman lain"],
          benar: 0,
        },
        {
          pertanyaan: "Kalimat penjelas adalah kalimat yang...",
          opsi: ["menjelaskan ide pokok", "menggantikan judul", "berisi angka saja", "berdiri sendiri di luar paragraf"],
          benar: 0,
        },
        {
          pertanyaan: "Informasi tersurat adalah informasi yang...",
          opsi: ["tertulis jelas di dalam teks", "tersembunyi di dalam teks", "berupa pendapat pembaca", "tidak ada di dalam teks"],
          benar: 0,
        },
        {
          pertanyaan: "Langkah pertama menemukan ide pokok paragraf adalah...",
          opsi: ["membaca seluruh paragraf dengan teliti", "menghitung jumlah kalimatnya", "mencari kata yang paling panjang", "membaca judul saja"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Bahasa Indonesia",
      judul: "Kosakata baru dan makna kata",
      ringkasan: "Menambah kosakata baru, sinonim, antonim, dan cara mencari arti kata di kamus.",
      konten: [
        "Setiap bacaan sering memuat kata-kata baru. Kita dapat menebak artinya dari kalimat di sekitarnya, lalu memastikan dengan kamus.",
        "Sinonim adalah kata yang maknanya sama atau mirip, misalnya pandai dan cerdas. Antonim adalah kata yang maknanya berlawanan, misalnya rajin dan malas.",
        "Kamus Besar Bahasa Indonesia (KBBI) memuat arti kata secara lengkap. Gunakan kamus untuk memastikan arti kata yang belum kamu kenal.",
        "Perhatikan juga penggunaan kata dalam konteks kalimat. Kata \"merendam\" pada kalimat \"Banjir merendam kampung itu\" berarti menutupi dengan air.",
      ].join("\n\n"),
      sumber: SUMBER_BI,
      soal: [
        {
          pertanyaan: "Sinonim dari kata \"pandai\" adalah...",
          opsi: ["cerdas", "malas", "lambat", "sedih"],
          benar: 0,
        },
        {
          pertanyaan: "Antonim dari kata \"rajin\" adalah...",
          opsi: ["giat", "malas", "tekun", "cepat"],
          benar: 1,
        },
        {
          pertanyaan: "Kata \"gigih\" berarti...",
          opsi: ["tidak mudah menyerah", "cepat putus asa", "suka berbaring", "suka mengeluh"],
          benar: 0,
        },
        {
          pertanyaan: "Cara yang tepat untuk mencari arti kata baru adalah...",
          opsi: ["membuka kamus atau menyimak kalimatnya", "menebak tanpa membaca", "melewati kata itu", "menghafal seluruh buku"],
          benar: 0,
        },
        {
          pertanyaan: "Kata \"merendam\" pada kalimat \"Banjir merendam kampung itu\" berarti...",
          opsi: ["menutupi dengan air", "membakar habis", "menjemur di panas", "mengangkat ke atas"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Bahasa Indonesia",
      judul: "Menulis paragraf sederhana",
      ringkasan: "Menyusun kalimat menjadi paragraf yang runtut dan mudah dipahami.",
      konten: [
        "Paragraf adalah kumpulan kalimat yang membahas satu ide. Paragraf yang baik memiliki kalimat utama dan beberapa kalimat penjelas.",
        "Kalimat utama berisi ide pokok, biasanya diletakkan di awal paragraf. Kalimat penjelas menyempurnakan ide itu dengan contoh atau rincian.",
        "Paragraf yang runtut artinya kalimat-kalimatnya disusun urut dan saling berhubungan, sehingga pembaca mudah memahami maksudnya.",
        "Mulailah paragraf dengan huruf kapital, akhiri kalimat dengan tanda baca, dan hindari mencampur banyak ide dalam satu paragraf.",
      ].join("\n\n"),
      sumber: SUMBER_BI,
      soal: [
        {
          pertanyaan: "Paragraf adalah...",
          opsi: ["kumpulan kalimat yang membahas satu ide", "satu kata yang berdiri sendiri", "daftar judul bacaan", "kumpulan buku di rak"],
          benar: 0,
        },
        {
          pertanyaan: "Kalimat utama sebuah paragraf berisi...",
          opsi: ["ide pokok paragraf", "nama penulis", "kesimpulan pembaca", "contoh dari buku lain"],
          benar: 0,
        },
        {
          pertanyaan: "Paragraf disebut runtut apabila...",
          opsi: ["kalimat-kalimatnya urut dan saling berhubungan", "kalimatnya acak-acakan", "paragrafnya sangat panjang", "berisi banyak istilah sulit"],
          benar: 0,
        },
        {
          pertanyaan: "Kalimat penjelas sebaiknya...",
          opsi: ["mendukung kalimat utama", "bertentangan dengan kalimat utama", "membahas topik yang berbeda", "hanya berupa angka"],
          benar: 0,
        },
        {
          pertanyaan: "Setiap kalimat dalam paragraf harus diawali dengan...",
          opsi: ["huruf kapital", "angka urut", "tanda tanya", "huruf kecil"],
          benar: 0,
        },
      ],
    },

    // ── Matematika ──────────────────────────────────────────────────────
    {
      mapel: "Matematika",
      judul: "Bilangan cacah sampai 10.000",
      ringkasan: "Nilai tempat, membaca, membandingkan, dan mengurutkan bilangan cacah.",
      konten: [
        "Bilangan cacah adalah bilangan 0, 1, 2, 3, dan seterusnya. Setiap angka dalam bilangan memiliki nilai tempat: ribuan, ratusan, puluhan, dan satuan.",
        "Contoh: pada bilangan 4.756, angka 4 bernilai 4 ribuan, angka 7 bernilai 7 ratusan, angka 5 bernilai 5 puluhan, dan angka 6 bernilai 6 satuan.",
        "Untuk membandingkan dua bilangan, bandingkan dulu angka pada nilai tempat yang paling besar. Contoh: pada 3.482 dan 3.428, angka ribuan dan ratusannya sama, yaitu 3 dan 4. Bandingkan puluhannya: 8 lebih besar dari 2, jadi 3.482 lebih besar dari 3.428.",
        "Alat bantu yang tepat adalah garis bilangan. Semakin ke kanan letak bilangan, semakin besar nilainya.",
      ].join("\n\n"),
      sumber: SUMBER_MTK,
      soal: [
        {
          pertanyaan: "Nilai tempat angka 7 pada bilangan 4.756 adalah...",
          opsi: ["ratusan", "ribuan", "puluhan", "satuan"],
          benar: 0,
        },
        {
          pertanyaan: "Angka 9 pada bilangan 9.105 menempati nilai tempat...",
          opsi: ["ribuan", "ratusan", "puluhan", "satuan"],
          benar: 0,
        },
        {
          pertanyaan: "Lambang yang tepat untuk 5.204 ... 5.240 adalah...",
          opsi: ["<", ">", "=", "tidak dapat dibandingkan"],
          benar: 0,
        },
        {
          pertanyaan: "Urutan bilangan dari yang terkecil adalah...",
          opsi: ["2.130, 2.301, 2.310", "2.310, 2.301, 2.130", "2.301, 2.130, 2.310", "2.130, 2.310, 2.301"],
          benar: 0,
        },
        {
          pertanyaan: "Bilangan cacah adalah bilangan...",
          opsi: ["0, 1, 2, 3, dan seterusnya", "negatif dan positif", "pecahan dan desimal", "hanya bilangan ganjil"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Matematika",
      judul: "Penjumlahan dan pengurangan",
      ringkasan: "Berhitung bersusun dengan teknik menyimpan dan meminjam, serta soal cerita.",
      konten: [
        "Penjumlahan dan pengurangan bilangan cacah dapat dihitung dengan cara bersusun. Susun angka sesuai nilai tempat, lalu hitung dari satuan.",
        "Saat hasil penjumlahan pada satu tempat lebih dari 9, kita menyimpan 1 ke nilai tempat berikutnya. Contoh: 2.345 + 1.278 = 3.623.",
        "Saat angka yang dikurangi lebih kecil, kita meminjam 1 dari nilai tempat di sebelahnya. Contoh: 4.500 − 1.750 = 2.750.",
        "Penjumlahan dan pengurangan saling berkebalikan. Jika 8 + 7 = 15, maka 15 − 7 = 8 dan 15 − 8 = 7. Sifat ini berguna untuk memeriksa jawaban.",
      ].join("\n\n"),
      sumber: SUMBER_MTK,
      soal: [
        {
          pertanyaan: "Hasil dari 2.345 + 1.278 adalah...",
          opsi: ["3.623", "3.513", "3.633", "4.623"],
          benar: 0,
        },
        {
          pertanyaan: "Hasil dari 4.500 − 1.750 adalah...",
          opsi: ["2.750", "2.850", "2.650", "3.250"],
          benar: 0,
        },
        {
          pertanyaan: "Teknik menyimpan pada penjumlahan dipakai ketika...",
          opsi: ["hasil pada satu nilai tempat lebih dari 9", "mengurangi bilangan nol", "menulis angka ribuan", "membandingkan dua bilangan"],
          benar: 0,
        },
        {
          pertanyaan: "Ani memiliki 1.250 kelereng lalu membeli 650 kelereng lagi. Jumlah kelereng Ani sekarang adalah...",
          opsi: ["1.900", "1.800", "1.890", "2.100"],
          benar: 0,
        },
        {
          pertanyaan: "Jika 8 + 7 = 15, maka pernyataan yang benar adalah...",
          opsi: ["15 − 7 = 8", "7 − 8 = 15", "15 + 8 = 7", "8 × 15 = 7"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Matematika",
      judul: "Perkalian dan pembagian",
      ringkasan: "Arti perkalian dan pembagian, kelipatan, serta pembagian bersisa.",
      konten: [
        "Perkalian adalah penjumlahan berulang. Contoh: 4 × 3 sama dengan 3 + 3 + 3 + 3 = 12.",
        "Pembagian adalah kebalikan dari perkalian. Jika 12 × 3 = 36, maka 36 ÷ 3 = 12 dan 36 ÷ 12 = 3.",
        "Hasil pembagian tidak selalu pas. Contoh: 25 ÷ 4 = 6 sisa 1, karena 4 × 6 = 24 dan tersisa 1.",
        "Kelipatan adalah hasil perkalian suatu bilangan dengan bilangan cacah. Kelipatan 5 dimulai dari 5, 10, 15, 20, dan seterusnya.",
      ].join("\n\n"),
      sumber: SUMBER_MTK,
      soal: [
        {
          pertanyaan: "Hasil dari 12 × 8 adalah...",
          opsi: ["96", "86", "108", "92"],
          benar: 0,
        },
        {
          pertanyaan: "Hasil dari 72 ÷ 9 adalah...",
          opsi: ["8", "7", "9", "6"],
          benar: 0,
        },
        {
          pertanyaan: "Hasil dari 25 ÷ 4 adalah...",
          opsi: ["6 sisa 1", "5 sisa 5", "6 sisa 2", "7 sisa 1"],
          benar: 0,
        },
        {
          pertanyaan: "Ibu membuat 36 kue lalu membaginya rata kepada 6 anak. Setiap anak mendapat... kue.",
          opsi: ["6", "5", "7", "8"],
          benar: 0,
        },
        {
          pertanyaan: "Kelompok bilangan yang semuanya kelipatan 5 adalah...",
          opsi: ["10, 15, 20", "7, 12, 17", "6, 11, 16", "3, 8, 13"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Matematika",
      judul: "Pecahan sederhana",
      ringkasan: "Pecahan senilai, membandingkan pecahan, serta hubungan pecahan, desimal, dan persen.",
      konten: [
        "Pecahan menyatakan bagian dari keseluruhan. Pada pecahan 3/4, angka 3 disebut pembilang dan angka 4 disebut penyebut.",
        "Pecahan senilai adalah pecahan yang nilainya sama meskipun angkanya berbeda. Contoh: 1/2 senilai dengan 2/4 dan 3/6.",
        "Untuk membandingkan pecahan dengan pembilang sama, lihat penyebutnya: semakin kecil penyebut, semakin besar nilainya. Contoh: 1/3 lebih besar dari 1/4.",
        "Pecahan dapat diubah menjadi desimal dan persen. Contoh: 1/2 = 0,5 = 50%, dan 1/4 = 0,25 = 25%.",
      ].join("\n\n"),
      sumber: SUMBER_MTK,
      soal: [
        {
          pertanyaan: "Pecahan yang senilai dengan 1/2 adalah...",
          opsi: ["2/4", "1/3", "2/3", "1/4"],
          benar: 0,
        },
        {
          pertanyaan: "Pecahan yang lebih besar antara 1/3 dan 1/4 adalah...",
          opsi: ["1/3", "1/4", "sama besar", "tidak dapat dibandingkan"],
          benar: 0,
        },
        {
          pertanyaan: "Bentuk persen dari 0,5 adalah...",
          opsi: ["50%", "5%", "0,5%", "500%"],
          benar: 0,
        },
        {
          pertanyaan: "Pizza dipotong menjadi 4 bagian sama besar. Rani makan 1 bagian. Bagian yang Rani makan adalah...",
          opsi: ["1/4", "1/2", "4/1", "3/4"],
          benar: 0,
        },
        {
          pertanyaan: "Pecahan 3/4 dibaca...",
          opsi: ["tiga per empat", "empat per tiga", "tiga empat", "tiga kali empat"],
          benar: 0,
        },
      ],
    },
  ],
};
