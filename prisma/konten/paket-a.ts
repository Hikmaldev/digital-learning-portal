import type { PaketKonten } from "./tipe";

const SUMBER_BI =
  "https://buku.kemendikdasmen.go.id/katalog/bahasa-indonesia-lihat-sekitar-untuk-sdmi-kelas-iv-edisi-revisi";
const SUMBER_MTK =
  "https://buku.kemendikdasmen.go.id/katalog/Matematika-untuk-SDMI-Kelas-IV";
// Ilustrasi dari Wikimedia Commons (bukan aset buatan sendiri).
// Miki Sakurai telling story for children.jpg — CC0, Miki Sakurai.
// Dipilih karena tidak memiliki label berbahasa Inggris dan sesuai dengan narasi.
const GAMBAR_NARASI = "https://upload.wikimedia.org/wikipedia/commons/e/eb/Miki_Sakurai_telling_story_for_children.jpg";
// Hand washing with soap.jpg — CC BY-SA 4.0, Justmee3001.
// Foto tanpa teks sehingga dapat dipahami siswa Indonesia.
const GAMBAR_PETUNJUK = "https://upload.wikimedia.org/wikipedia/commons/9/97/Hand_washing_with_soap.jpg";
// Geometry Shapes and Solids.svg — CC0, C b grenouille.
const GAMBAR_BANGUN_DATAR = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Geometry_Shapes_and_Solids.svg";
// Metric clock.JPG — CC0, Jpeterson101.
const GAMBAR_WAKTU = "https://upload.wikimedia.org/wikipedia/commons/3/34/Metric_clock.JPG";
// Ruler and coin.svg — CC BY-SA 4.0, Tomchen1989.
const GAMBAR_UANG = "https://upload.wikimedia.org/wikipedia/commons/e/eb/Ruler_and_coin.svg";
// FourMetricInstruments.JPG — CC BY-SA 3.0, Martinvl.
const GAMBAR_BERAT = "https://upload.wikimedia.org/wikipedia/commons/c/c1/FourMetricInstruments.JPG";
const VIDEO_NARASI = "https://www.youtube.com/watch?v=CfhmEyvUKTo";
const VIDEO_PETUNJUK = "https://www.youtube.com/watch?v=mQ9jLcKFpgc";
const VIDEO_BANGUN_DATAR = "https://www.youtube.com/watch?v=1ENevf_mFRs";
const VIDEO_PENGUKURAN = "https://www.youtube.com/watch?v=pB-iNV45ypI";

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

    // ── Materi tambahan sesi 1 ────────────────────────────────────────────
    {
      mapel: "Bahasa Indonesia",
      judul: "Teks narasi: menceritakan pengalaman dan imajinasi",
      ringkasan: "Mengenali tujuan, unsur, urutan peristiwa, dan cara menulis teks narasi berdasarkan pengalaman atau imajinasi.",
      urlVideo: VIDEO_NARASI,
      sumber: SUMBER_BI,
      gambar: [{ url: GAMBAR_NARASI, ukuranFile: 68000 }],
      konten: [
        "Teks narasi adalah teks yang menceritakan rangkaian peristiwa secara berurutan. Peristiwanya dapat berupa pengalaman nyata, seperti membantu orang tua, atau cerita imajinasi, seperti kisah hewan yang dapat berbicara. Tujuan narasi adalah membuat pembaca memahami apa yang terjadi, siapa yang terlibat, kapan dan di mana kejadian berlangsung, serta bagaimana ceritanya berakhir.",
        "Unsur penting dalam narasi adalah tokoh, latar, alur, masalah, dan penyelesaian. Tokoh merupakan pelaku cerita, sedangkan latar adalah keterangan tempat dan waktu. Alur menunjukkan urutan kejadian. Masalah adalah kesulitan yang dihadapi tokoh, sementara penyelesaian menjelaskan cara masalah tersebut berakhir. Narasi sederhana biasanya dimulai dengan pengenalan tokoh dan latar, dilanjutkan masalah atau kejadian penting, lalu diakhiri penyelesaian dan pesan cerita.",
        "Agar urutan cerita mudah diikuti, gunakan kata penghubung waktu, seperti mula-mula, kemudian, setelah itu, sementara itu, akhirnya, dan keesokan harinya. Gunakan pula kata kerja tindakan, misalnya berjalan, menemukan, membawa, menolong, dan menanam. Kata sifat seperti ramah, lelah, gelap, atau ramai dapat membantu menggambarkan tokoh dan suasana.",
        "Saat menulis pengalaman nyata, ceritakan kejadian sesuai urutan sebenarnya dan gunakan kata ganti aku atau saya secara konsisten. Contohnya: ‘Pada Minggu pagi, Lala dan ayahnya membersihkan selokan di depan rumah. Setelah hujan deras, banyak daun menyumbat aliran air. Mereka mengangkat daun dan memasukkannya ke tempat sampah. Akhirnya, air kembali mengalir.’ Tokoh cerita adalah Lala dan ayahnya, latarnya Minggu pagi di depan rumah, masalahnya daun menyumbat selokan, dan penyelesaiannya adalah membersihkan daun. Cerita itu juga menyampaikan pesan bahwa menjaga kebersihan merupakan tanggung jawab bersama.",
        "Sebelum tulisan dikumpulkan, periksa apakah judulnya sesuai dengan isi, tokoh dan latarnya jelas, peristiwa tersusun runtut, serta setiap kalimat menggunakan huruf kapital dan tanda baca yang tepat. Pastikan pula bagian akhir benar-benar menjawab masalah yang muncul dalam cerita.",
      ].join("\n\n"),
      soal: [
        {
          pertanyaan: "Tujuan utama teks narasi adalah...",
          opsi: ["menceritakan rangkaian peristiwa secara berurutan", "menjelaskan cara menggunakan alat", "mengelompokkan benda berdasarkan warna", "menyampaikan daftar harga"],
          benar: 0,
        },
        {
          pertanyaan: "Dalam cerita tentang Raka yang tersesat di pasar, keterangan pasar termasuk unsur...",
          opsi: ["latar tempat", "tokoh", "masalah", "penyelesaian"],
          benar: 0,
        },
        {
          pertanyaan: "Bagian cerita yang memperkenalkan tokoh dan tempat disebut bagian...",
          opsi: ["awal", "tengah", "akhir", "judul"],
          benar: 0,
        },
        {
          pertanyaan: "Kata penghubung yang paling tepat untuk melanjutkan urutan setelah ‘mula-mula’ adalah...",
          opsi: ["kemudian", "tetapi", "karena", "walaupun"],
          benar: 0,
        },
        {
          pertanyaan: "Bacalah: ‘Nina lupa membawa payung. Hujan turun ketika ia pulang.’ Masalah dalam cerita tersebut adalah...",
          opsi: ["Nina tidak membawa payung saat hujan", "Nina membeli payung baru", "Nina bermain di halaman", "hujan berhenti sebelum Nina pulang"],
          benar: 0,
        },
        {
          pertanyaan: "Urutan yang paling logis untuk cerita memasak mi adalah...",
          opsi: ["merebus air – memasukkan mi – menambahkan bumbu", "menambahkan bumbu – memakan mi – merebus air", "memakan mi – merebus air – membeli mi", "menutup panci – membeli mi – memasukkan mi"],
          benar: 0,
        },
        {
          pertanyaan: "Kalimat yang paling tepat untuk menunjukkan penyelesaian masalah adalah...",
          opsi: ["Akhirnya, Sari menemukan jalan pulang dengan mengikuti petunjuk warga.", "Sari berjalan tanpa tahu arah.", "Sari melihat jalan yang ramai.", "Sari merasa bingung sejak pagi."],
          benar: 0,
        },
        {
          pertanyaan: "Jika narasi menceritakan kejadian nyata yang dialami penulis, kata ganti yang paling konsisten digunakan adalah...",
          opsi: ["aku atau saya", "dia dan mereka bergantian tanpa alasan", "kita meskipun sendirian", "kamu untuk semua tokoh"],
          benar: 0,
        },
        {
          pertanyaan: "Perhatikan peristiwa: (1) Beni menanam bibit. (2) Beni menyiram tanah. (3) Beni membuat lubang. Urutan yang paling tepat adalah...",
          opsi: ["3–1–2", "1–2–3", "2–3–1", "3–2–1"],
          benar: 0,
        },
        {
          pertanyaan: "Mengapa cerita tentang membersihkan selokan dapat memiliki pesan ‘menjaga kebersihan adalah tanggung jawab bersama’?",
          opsi: ["Karena tindakan tokoh menyelesaikan masalah lingkungan melalui kerja sama.", "Karena tokoh hanya menonton hujan.", "Karena selokan merupakan tempat bermain.", "Karena cerita tidak memiliki masalah."],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Bahasa Indonesia",
      judul: "Teks petunjuk: memahami instruksi dalam kehidupan sehari-hari",
      ringkasan: "Memahami tujuan, urutan langkah, kata perintah, dan cara menulis petunjuk yang aman serta mudah diikuti.",
      urlVideo: VIDEO_PETUNJUK,
      sumber: SUMBER_BI,
      gambar: [{ url: GAMBAR_PETUNJUK, ukuranFile: 64000 }],
      konten: [
        "Teks petunjuk adalah teks yang menjelaskan cara melakukan sesuatu, menggunakan alat, atau mencapai tujuan tertentu. Contohnya petunjuk mencuci tangan, membuat minuman, menyalakan komputer, meminjam buku, dan menuju suatu tempat. Petunjuk yang baik memiliki tujuan jelas serta langkah yang lengkap, berurutan, dan mudah dilakukan.",
        "Kata yang sering digunakan dalam petunjuk antara lain siapkan, buka, masukkan, tekan, campurkan, tunggu, jangan, dan pastikan. Kata-kata tersebut merupakan kata kerja perintah karena meminta pembaca melakukan tindakan. Kata pertama, kedua, selanjutnya, setelah itu, lalu, dan terakhir membantu menunjukkan urutan langkah.",
        "Jika kegiatan membutuhkan benda, petunjuk dapat mencantumkan alat dan bahan. Alat membantu pekerjaan, misalnya gunting atau penggaris. Bahan digunakan atau diolah, misalnya kertas, lem, dan air. Penyebutan alat dan bahan membuat pembaca dapat mempersiapkan kebutuhan sebelum mulai bekerja.",
        "Contoh petunjuk mencuci tangan adalah sebagai berikut: basahi tangan dengan air mengalir, gunakan sabun, gosok telapak tangan, punggung tangan, sela-sela jari, dan kuku, lalu bilas hingga bersih. Setelah itu, keringkan tangan. Urutan tersebut perlu diikuti agar tangan benar-benar bersih.",
        "Petunjuk keselamatan harus diperhatikan, terutama jika kegiatan menggunakan listrik, api, atau benda tajam. Kata jangan dan dilarang biasanya menandai larangan. Contohnya, jangan menyentuh kabel dengan tangan basah dan jangan memasukkan benda ke dalam stopkontak. Petunjuk arah juga harus menggunakan penanda yang jelas, seperti lurus, belok kiri, di sebelah kanan, di depan, dan berseberangan.",
        "Sebelum menggunakan sebuah petunjuk, periksa apakah tujuannya jelas, alat dan bahan sudah disebutkan bila diperlukan, semua langkah tersusun runtut, dan aturan keselamatannya tersedia. Petunjuk sebaiknya singkat, tetapi tidak boleh menghilangkan informasi penting atau menggabungkan tindakan yang dapat membingungkan pembaca.",
      ].join("\n\n"),
      soal: [
        {
          pertanyaan: "Teks petunjuk dibuat untuk...",
          opsi: ["menjelaskan cara melakukan atau menggunakan sesuatu", "menceritakan tokoh dalam dongeng", "menggambarkan suasana tempat", "menyebutkan nama-nama benda"],
          benar: 0,
        },
        {
          pertanyaan: "Kata ‘tekan’ dan ‘masukkan’ dalam petunjuk termasuk...",
          opsi: ["kata kerja perintah", "kata sifat", "kata tanya", "kata bilangan"],
          benar: 0,
        },
        {
          pertanyaan: "Dalam petunjuk membuat teh, langkah yang sebaiknya dilakukan pertama adalah...",
          opsi: ["menyiapkan gelas, teh, gula, dan air panas", "meminum teh", "mencuci gelas setelah selesai", "membuang teh ke tempat sampah"],
          benar: 0,
        },
        {
          pertanyaan: "Mengapa langkah dalam teks petunjuk harus berurutan?",
          opsi: ["Agar pembaca dapat melakukan pekerjaan dengan benar dan aman.", "Agar teks menjadi lebih panjang.", "Agar semua kalimat memiliki jumlah kata sama.", "Agar pembaca tidak mengetahui tujuannya."],
          benar: 0,
        },
        {
          pertanyaan: "Kalimat yang merupakan petunjuk keselamatan adalah...",
          opsi: ["Jangan menyentuh kabel dengan tangan basah.", "Kabel itu panjang dan hitam.", "Saya melihat kabel di lantai.", "Kabel digunakan setiap hari."],
          benar: 0,
        },
        {
          pertanyaan: "Jika petunjuk berbunyi ‘Terakhir, keringkan tangan’, tindakan itu dilakukan...",
          opsi: ["setelah tangan dibilas", "sebelum tangan dibasahi", "sebelum menggunakan sabun", "sebelum menggosok sela jari"],
          benar: 0,
        },
        {
          pertanyaan: "Dalam petunjuk membuat kolase, kertas dan lem disebut bahan, sedangkan gunting disebut...",
          opsi: ["alat", "tujuan", "langkah", "arah"],
          benar: 0,
        },
        {
          pertanyaan: "Petunjuk dari rumah ke perpustakaan yang paling jelas adalah...",
          opsi: ["Berjalan lurus sampai pertigaan, belok kiri, lalu perpustakaan ada di sebelah kanan.", "Perpustakaan itu bagus dan ramai.", "Rumah saya dekat dengan sesuatu.", "Pergilah ke tempat yang kamu suka."],
          benar: 0,
        },
        {
          pertanyaan: "Urutan yang tepat untuk mengirim surat adalah: (1) memasukkan surat ke amplop, (2) menulis alamat, (3) menutup amplop. Urutan yang benar adalah...",
          opsi: ["2–1–3", "1–3–2", "3–2–1", "2–3–1"],
          benar: 0,
        },
        {
          pertanyaan: "Sebuah petunjuk langsung menyuruh anak menyalakan alat tanpa menyebutkan bahaya kabel basah. Perbaikan terbaik adalah...",
          opsi: ["menambahkan peringatan agar tidak menyentuh kabel dengan tangan basah", "menghapus tujuan petunjuk", "menukar semua langkah secara acak", "menambahkan cerita yang tidak berhubungan"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Matematika",
      judul: "Bangun datar dan sifat-sifatnya",
      ringkasan: "Mengenal segi banyak, ciri persegi, persegi panjang, segitiga, dan hubungan keliling dengan ukuran sisi.",
      urlVideo: VIDEO_BANGUN_DATAR,
      sumber: SUMBER_MTK,
      gambar: [{ url: GAMBAR_BANGUN_DATAR, ukuranFile: 64000 }],
      konten: [
        "Bangun datar adalah bentuk yang memiliki panjang dan lebar, tetapi tidak memiliki tinggi atau ketebalan. Contohnya persegi, persegi panjang, segitiga, lingkaran, jajar genjang, dan trapesium. Sisi merupakan garis pembatas bangun, sedangkan titik sudut adalah pertemuan dua sisi.",
        "Persegi memiliki empat sisi sama panjang dan empat sudut siku-siku. Persegi panjang memiliki dua pasang sisi berhadapan yang sama panjang dan empat sudut siku-siku. Segitiga memiliki tiga sisi dan tiga titik sudut. Segitiga sama sisi memiliki tiga sisi sama panjang, sedangkan segitiga sama kaki memiliki dua sisi sama panjang.",
        "Keliling adalah panjang seluruh sisi yang mengelilingi bangun. Rumus keliling persegi adalah 4 × sisi, keliling persegi panjang adalah 2 × (panjang + lebar), dan keliling segitiga adalah jumlah ketiga sisinya. Misalnya, persegi dengan sisi 6 cm memiliki keliling 4 × 6 = 24 cm. Persegi panjang berukuran 8 cm × 3 cm memiliki keliling 2 × (8 + 3) = 22 cm.",
        "Luas adalah banyaknya satuan persegi yang menutupi bagian dalam bangun. Rumus luas persegi adalah sisi × sisi, sedangkan luas persegi panjang adalah panjang × lebar. Persegi panjang berukuran 8 cm × 3 cm memiliki luas 8 × 3 = 24 cm².",
        "Satuan keliling menggunakan satuan panjang, seperti cm atau m. Satuan luas menggunakan satuan persegi, seperti cm² atau m². Saat menyelesaikan soal, tuliskan informasi yang diketahui, pilih rumus yang sesuai, pastikan satuannya sama, lalu periksa kembali satuan jawaban.",
        "Bangun gabungan dapat dipecah menjadi beberapa bangun yang lebih sederhana. Jika bagian-bagiannya tidak saling tumpang tindih, luas seluruh bangun diperoleh dengan menjumlahkan luas setiap bagian. Cara ini membantu menghitung bentuk seperti huruf L atau bentuk lain yang tidak sederhana.",
      ].join("\n\n"),
      soal: [
        {
          pertanyaan: "Bangun datar yang memiliki empat sisi sama panjang dan empat sudut siku-siku adalah...",
          opsi: ["persegi", "segitiga", "lingkaran", "trapesium"],
          benar: 0,
        },
        {
          pertanyaan: "Persegi panjang dengan panjang 9 cm dan lebar 4 cm memiliki keliling...",
          opsi: ["26 cm", "36 cm", "13 cm", "18 cm"],
          benar: 0,
        },
        {
          pertanyaan: "Luas persegi dengan sisi 7 cm adalah...",
          opsi: ["49 cm²", "28 cm²", "14 cm²", "49 cm"],
          benar: 0,
        },
        {
          pertanyaan: "Sebuah segitiga memiliki sisi 5 cm, 6 cm, dan 7 cm. Kelilingnya adalah...",
          opsi: ["18 cm", "17 cm", "30 cm", "18 cm²"],
          benar: 0,
        },
        {
          pertanyaan: "Ciri yang pasti dimiliki persegi panjang adalah...",
          opsi: ["sisi yang berhadapan sama panjang", "semua sisinya selalu sama panjang", "memiliki tiga titik sudut", "tidak memiliki sudut siku-siku"],
          benar: 0,
        },
        {
          pertanyaan: "Taman berbentuk persegi panjang berukuran 12 m × 5 m. Panjang pagar yang diperlukan untuk mengelilinginya adalah...",
          opsi: ["34 m", "60 m", "17 m", "34 m²"],
          benar: 0,
        },
        {
          pertanyaan: "Sebuah persegi memiliki keliling 32 cm. Panjang setiap sisinya adalah...",
          opsi: ["8 cm", "16 cm", "28 cm", "128 cm"],
          benar: 0,
        },
        {
          pertanyaan: "Satuan yang tepat untuk menyatakan luas lantai kelas adalah...",
          opsi: ["m²", "m", "cm", "liter"],
          benar: 0,
        },
        {
          pertanyaan: "Dua persegi panjang masing-masing memiliki luas 12 cm² dan 15 cm². Jika digabung tanpa tumpang tindih, luas seluruhnya adalah...",
          opsi: ["27 cm²", "27 cm", "180 cm²", "3 cm²"],
          benar: 0,
        },
        {
          pertanyaan: "Rina menghitung luas persegi panjang 10 cm × 4 cm dengan rumus 2 × (10 + 4). Kesalahan Rina adalah...",
          opsi: ["rumus itu untuk keliling, sedangkan luas harus dihitung dengan panjang × lebar", "angka 10 harus diganti 2", "lebar tidak boleh digunakan", "luas harus memakai satuan cm saja"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Matematika",
      judul: "Pengukuran panjang, berat, waktu, dan uang",
      ringkasan: "Memilih satuan yang tepat, mengonversi pengukuran, serta menyelesaikan masalah sehari-hari tentang panjang, berat, waktu, dan uang.",
      urlVideo: VIDEO_PENGUKURAN,
      sumber: SUMBER_MTK,
      gambar: [
        { url: GAMBAR_BERAT, ukuranFile: 1400000 },
        { url: GAMBAR_WAKTU, ukuranFile: 24000 },
        { url: GAMBAR_UANG, ukuranFile: 9000 },
      ],
      konten: [
        "Pengukuran digunakan untuk mengetahui ukuran suatu benda atau lama suatu kegiatan dengan satuan yang disepakati. Panjang dapat diukur dengan milimeter, sentimeter, meter, atau kilometer. Gunakan milimeter atau sentimeter untuk benda kecil, meter untuk panjang ruangan atau halaman, dan kilometer untuk jarak antarkota.",
        "Hubungan satuan panjang yang penting adalah 1 cm = 10 mm, 1 m = 100 cm, dan 1 km = 1.000 m. Saat mengubah satuan besar ke satuan kecil, kalikan. Saat mengubah satuan kecil ke satuan besar, bagi. Contohnya 3 m = 300 cm dan 450 cm = 4,5 m. Sebelum menjumlahkan atau mengurangkan panjang, samakan satuannya terlebih dahulu.",
        "Berat atau massa benda dapat diukur dengan gram dan kilogram. Hubungannya adalah 1 kg = 1.000 g. Jadi, 2 kg 300 g sama dengan 2.300 g, sedangkan 3.500 g sama dengan 3 kg 500 g. Gram cocok untuk benda yang ringan, sedangkan kilogram digunakan untuk benda yang lebih berat.",
        "Waktu dapat dinyatakan dalam detik, menit, jam, hari, dan minggu. Satu menit sama dengan 60 detik, satu jam sama dengan 60 menit, satu hari sama dengan 24 jam, dan satu minggu sama dengan 7 hari. Untuk mencari lama kegiatan, tentukan waktu mulai dan waktu selesai. Kegiatan dari pukul 07.30 sampai 09.00 berlangsung 1 jam 30 menit.",
        "Harga barang ditulis menggunakan rupiah (Rp). Total belanja diperoleh dengan menjumlahkan semua harga barang. Kembalian dihitung dengan rumus uang yang dibayarkan dikurangi total harga. Misalnya, buku seharga Rp12.000 dan pensil seharga Rp3.500 memiliki total Rp15.500. Jika dibayar dengan Rp20.000, kembaliannya Rp4.500.",
        "Saat mengerjakan soal cerita, perhatikan angka dan satuannya, tentukan besaran yang dicari, lalu pilih operasi yang sesuai. Perkirakan jawaban sebelum menghitung agar hasil yang terlalu besar atau terlalu kecil dapat diketahui. Setelah itu, tuliskan hasil dengan satuan yang tepat.",
      ].join("\n\n"),
      soal: [
        {
          pertanyaan: "Satuan yang tepat untuk mengukur jarak antarkota adalah...",
          opsi: ["kilometer", "sentimeter", "milimeter", "gram"],
          benar: 0,
        },
        {
          pertanyaan: "4 m sama dengan...",
          opsi: ["400 cm", "40 cm", "4.000 cm", "0,4 cm"],
          benar: 0,
        },
        {
          pertanyaan: "2 kg 250 g sama dengan...",
          opsi: ["2.250 g", "225 g", "2.025 g", "22.500 g"],
          benar: 0,
        },
        {
          pertanyaan: "90 menit sama dengan...",
          opsi: ["1 jam 30 menit", "1 jam 20 menit", "2 jam 30 menit", "90 jam"],
          benar: 0,
        },
        {
          pertanyaan: "Sebuah film dimulai pukul 13.15 dan selesai pukul 15.00. Lama film adalah...",
          opsi: ["1 jam 45 menit", "1 jam 15 menit", "2 jam 15 menit", "45 menit"],
          benar: 0,
        },
        {
          pertanyaan: "Ibu membeli beras Rp28.000 dan minyak Rp17.500. Total belanja Ibu adalah...",
          opsi: ["Rp45.500", "Rp44.500", "Rp46.500", "Rp45.000"],
          benar: 0,
        },
        {
          pertanyaan: "Doni membayar belanja Rp32.000 dengan uang Rp50.000. Kembaliannya adalah...",
          opsi: ["Rp18.000", "Rp22.000", "Rp82.000", "Rp12.000"],
          benar: 0,
        },
        {
          pertanyaan: "Pita sepanjang 3 m dipotong 75 cm. Sisa pita adalah...",
          opsi: ["225 cm", "275 cm", "375 cm", "2.925 cm"],
          benar: 0,
        },
        {
          pertanyaan: "Untuk menjumlahkan 2 m dan 35 cm, langkah pertama yang paling tepat adalah...",
          opsi: ["mengubah keduanya ke satuan yang sama", "langsung menulis 2 + 35 = 37 m", "mengubah meter menjadi kilogram", "menghapus satuannya"],
          benar: 0,
        },
        {
          pertanyaan: "Sebuah perjalanan dimulai pukul 08.40 dan berlangsung 2 jam 35 menit. Perjalanan selesai pukul...",
          opsi: ["11.15", "10.75", "11.05", "10.15"],
          benar: 0,
        },
      ],
    },
  ],
};
