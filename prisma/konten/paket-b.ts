import type { PaketKonten } from "./tipe";

const SUMBER_BI =
  "https://buku.kemendikdasmen.go.id/katalog/bahasa-indonesia-untuk-smp-mts-kelas-vii-edisi-revisi";
const SUMBER_MTK =
  "https://buku.kemendikdasmen.go.id/katalog/Matematika-untuk-SMPMTs-Kelas-VII";
const SUMBER_ENG =
  "https://buku.kemendikdasmen.go.id/katalog/English-for-Nusantara-untuk-SMPMTs-Kelas-VII";

// Materi tambahan Sesi 2 menggunakan ilustrasi Wikimedia Commons berlisensi terbuka.
// Icelandic volcano eruption.jpg — CC BY 4.0, Yuo7si.
const GAMBAR_EKSPLANASI =
  "https://upload.wikimedia.org/wikipedia/commons/6/61/Icelandic_volcano_eruption.jpg";
// Writing a letter.jpg — CC BY-SA 3.0, Petar Milošević.
const GAMBAR_SURAT =
  "https://upload.wikimedia.org/wikipedia/commons/2/2c/Writing_a_letter.jpg";
// Balance scale.svg — CC0, Phlsph7.
const GAMBAR_PERSAMAAN =
  "https://upload.wikimedia.org/wikipedia/commons/f/f0/Balance_scale.svg";
// Basic triangle.svg — CC0, Douglas Paul Perkins.
const GAMBAR_GEOMETRI =
  "https://upload.wikimedia.org/wikipedia/commons/7/73/Basic_triangle.svg";
// Boy playing with ball in the backyard.jpg — CC BY 2.0, Shixart1985.
const GAMBAR_HOBI =
  "https://upload.wikimedia.org/wikipedia/commons/6/6d/Boy_playing_with_ball_in_the_backyard.jpg";
// Two directions sign (Unsplash).jpg — CC0, Pablo Garcia Saldaña.
const GAMBAR_DIRECTIONS =
  "https://upload.wikimedia.org/wikipedia/commons/2/27/Two_directions_sign_%28Unsplash%29.jpg";

const VIDEO_EKSPLANASI = "https://www.youtube.com/watch?v=_tPi7NmdQAc";
const VIDEO_SURAT = "https://www.youtube.com/watch?v=TyC_tZ0fQjU";
const VIDEO_PERSAMAAN = "https://www.youtube.com/watch?v=OyynhZDrU-0";
const VIDEO_GEOMETRI = "https://www.youtube.com/watch?v=GO-pUEzss8Y";
const VIDEO_HOBI = "https://www.youtube.com/watch?v=f7KX1AwgZ3w";
const VIDEO_DIRECTIONS = "https://www.youtube.com/watch?v=9XAJnf-7lAI";

/**
 * Paket B — setara SMP/MTs (Fase D Kurikulum Merdeka; Keputusan BSKAP 046/H/KR/2025).
 * Topik mengikuti buku teks resmi Kemendikdasmen kelas VII.
 */
export const paketB: PaketKonten = {
  kode: "PAKETB",
  nama: "Kelas B (Paket B — Setara SMP)",
  jenjang: "Paket B",
  babs: [
    // ── Bahasa Indonesia ────────────────────────────────────────────────
    {
      mapel: "Bahasa Indonesia",
      judul: "Teks deskripsi: menggambarkan objek dengan jelas",
      ringkasan: "Ciri, struktur, dan kebahasaan teks deskripsi beserta majas personifikasi.",
      konten: [
        "Teks deskripsi adalah teks yang menggambarkan suatu objek, tempat, atau suasana secara terperinci sehingga pembaca seolah-olah melihat dan merasakan sendiri.",
        "Struktur teks deskripsi terdiri atas identifikasi (pengenalan objek) dan deskripsi bagian (perincian objek). Bagian penutup bersifat pilihan, berisi kesan penulis.",
        "Ciri kebahasaan teks deskripsi antara lain penggunaan kalimat perincian, kata konkret, dan majas personifikasi — gaya bahasa yang membuat benda mati seolah hidup, misalnya \"nyala lilin yang menari-nari\".",
        "Tujuan penulisan teks deskripsi adalah memberikan informasi yang jelas sekaligus membangkitkan kesan indrawi pembaca terhadap objek yang digambarkan.",
      ].join("\n\n"),
      sumber: SUMBER_BI,
      soal: [
        {
          pertanyaan: "Teks deskripsi bertujuan...",
          opsi: ["menggambarkan objek secara terperinci", "menceritakan urutan peristiwa", "membujuk pembaca membeli barang", "memberikan langkah-langkah membuat sesuatu"],
          benar: 0,
        },
        {
          pertanyaan: "Struktur teks deskripsi terdiri atas...",
          opsi: ["identifikasi dan deskripsi bagian", "orientasi, komplikasi, resolusi", "tujuan dan langkah-langkah", "kepala berita dan tubuh berita"],
          benar: 0,
        },
        {
          pertanyaan: "Kalimat \"nyala lilin yang menari-nari\" menggunakan majas...",
          opsi: ["personifikasi", "hiperbola", "litotes", "ironi"],
          benar: 0,
        },
        {
          pertanyaan: "Kalimat perincian dalam teks deskripsi berfungsi...",
          opsi: ["membuat pembaca membayangkan objek dengan jelas", "menyembunyikan informasi penting", "memperpanjang teks saja", "menutup paragraf"],
          benar: 0,
        },
        {
          pertanyaan: "Objek dalam teks deskripsi dapat berupa...",
          opsi: ["benda, tempat, atau suasana", "hanya angka", "hanya tokoh sejarah", "hanya khayalan tanpa bentuk"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Bahasa Indonesia",
      judul: "Teks narasi: cerita fantasi",
      ringkasan: "Unsur cerita, alur, tokoh, latar, serta kalimat langsung dan tidak langsung.",
      konten: [
        "Teks narasi adalah teks yang menceritakan rangkaian peristiwa yang dialami tokoh. Cerita fantasi adalah narasi yang berisi kejadian tidak nyata atau imajinatif.",
        "Unsur utama cerita meliputi tokoh, latar (waktu dan tempat), alur (urutan peristiwa), dan amanat (pesan penulis). Alur terdiri atas orientasi, komplikasi, dan resolusi.",
        "Tokoh protagonis adalah tokoh utama yang membawa kebaikan, sedangkan tokoh antagonis merupakan lawannya. Perubahan sikap tokoh sepanjang cerita disebut penokohan.",
        "Kalimat langsung ditandai tanda petik dan menirukan ucapan tokoh, sedangkan kalimat tidak langsung menceritakan ucapan tokoh dengan bahasa penulis.",
      ].join("\n\n"),
      sumber: SUMBER_BI,
      soal: [
        {
          pertanyaan: "Cerita fantasi termasuk teks...",
          opsi: ["narasi", "deskripsi", "prosedur", "berita"],
          benar: 0,
        },
        {
          pertanyaan: "Urutan peristiwa dalam cerita disebut...",
          opsi: ["alur", "latar", "amanat", "tema"],
          benar: 0,
        },
        {
          pertanyaan: "Bagian cerita yang berisi masalah mulai muncul disebut...",
          opsi: ["komplikasi", "orientasi", "resolusi", "koda"],
          benar: 0,
        },
        {
          pertanyaan: "Kalimat tidak langsung adalah kalimat yang...",
          opsi: ["menceritakan ucapan tokoh dengan bahasa penulis", "menirukan ucapan tokoh dengan tanda petik", "berisi perintah langsung", "digunakan hanya dalam puisi"],
          benar: 0,
        },
        {
          pertanyaan: "Pesan yang ingin disampaikan penulis melalui cerita disebut...",
          opsi: ["amanat", "latar", "konflik", "sinopsis"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Bahasa Indonesia",
      judul: "Teks prosedur: panduan langkah demi langkah",
      ringkasan: "Tujuan, struktur, dan kalimat perintah dalam teks prosedur.",
      konten: [
        "Teks prosedur adalah teks yang berisi langkah-langkah untuk membuat, melakukan, atau menggunakan sesuatu agar tujuan tercapai dengan tepat.",
        "Struktur teks prosedur terdiri atas tujuan, alat dan bahan (jika diperlukan), serta langkah-langkah yang disusun berurutan.",
        "Ciri kebahasaan teks prosedur antara lain kalimat perintah (\"aduk hingga rata\"), kalimat ajakan, dan kata penghubung urutan seperti pertama, kemudian, dan selanjutnya.",
        "Langkah-langkah yang baik menggunakan kalimat yang jelas dan singkat sehingga pembaca tidak melakukan urutan yang keliru.",
      ].join("\n\n"),
      sumber: SUMBER_BI,
      soal: [
        {
          pertanyaan: "Teks prosedur berisi...",
          opsi: ["langkah-langkah untuk mencapai tujuan", "gambaran objek wisata", "kisah tokoh fantasi", "pendapat tentang berita"],
          benar: 0,
        },
        {
          pertanyaan: "Bagian awal teks prosedur berisi...",
          opsi: ["tujuan yang ingin dicapai", "kesimpulan penulis", "tokoh cerita", "tanggapan pembaca"],
          benar: 0,
        },
        {
          pertanyaan: "Kalimat \"Aduk hingga rata\" termasuk kalimat...",
          opsi: ["perintah", "tanya", "berita", "seru"],
          benar: 0,
        },
        {
          pertanyaan: "Kata penghubung yang menunjukkan urutan langkah adalah...",
          opsi: ["kemudian", "tetapi", "meskipun", "karena"],
          benar: 0,
        },
        {
          pertanyaan: "Bahasa dalam teks prosedur sebaiknya...",
          opsi: ["jelas, singkat, dan mudah diikuti", "panjang dan berbelit", "penuh kiasan", "berisi rahasia penulis"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Bahasa Indonesia",
      judul: "Teks berita: menyampaikan informasi faktual",
      ringkasan: "Unsur 5W+1H, struktur piramida terbalik, dan membedakan fakta dan opini.",
      konten: [
        "Teks berita adalah teks yang menyampaikan peristiwa faktual dan aktual kepada masyarakat. Berita harus berdasarkan kenyataan, bukan khayalan.",
        "Unsur berita dirangkum dalam 5W+1H: what (apa), who (siapa), when (kapan), where (di mana), why (mengapa), dan how (bagaimana) — dikenal juga dengan singkatan adiksimba.",
        "Struktur teks berita disusun piramida terbalik: judul, kepala berita (lead), tubuh berita, lalu ekor berita yang berisi informasi paling tidak mendesak.",
        "Fakta adalah pernyataan yang dapat dibuktikan kebenarannya, sedangkan opini adalah pendapat yang belum tentu benar. Pembaca perlu membedakan keduanya agar tidak terjebak berita bohong.",
      ].join("\n\n"),
      sumber: SUMBER_BI,
      soal: [
        {
          pertanyaan: "Singkatan adiksimba merujuk pada unsur...",
          opsi: ["5W+1H berita", "struktur teks deskripsi", "jenis puisi rakyat", "langkah teks prosedur"],
          benar: 0,
        },
        {
          pertanyaan: "Bagian berita yang memuat inti peristiwa disebut...",
          opsi: ["kepala berita (lead)", "ekor berita", "glosarium", "orientasi"],
          benar: 0,
        },
        {
          pertanyaan: "Pernyataan yang dapat dibuktikan kebenarannya disebut...",
          opsi: ["fakta", "opini", "asumsi", "harapan"],
          benar: 0,
        },
        {
          pertanyaan: "Struktur teks berita disusun dalam bentuk...",
          opsi: ["piramida terbalik", "lingkaran", "siklus", "kurva"],
          benar: 0,
        },
        {
          pertanyaan: "Ciri utama berita yang baik adalah...",
          opsi: ["faktual dan aktual", "imajinatif dan lucu", "berisi pendapat pribadi", "menggunakan bahasa puisi"],
          benar: 0,
        },
      ],
    },

    // ── Materi tambahan Sesi 2: Bahasa Indonesia ─────────────────────────
    {
      mapel: "Bahasa Indonesia",
      judul: "Teks eksplanasi: menjelaskan proses dan sebab-akibat",
      ringkasan: "Tujuan, struktur, ciri kebahasaan, dan cara menyusun teks eksplanasi berdasarkan fakta.",
      konten: [
        "Teks eksplanasi adalah teks yang menjelaskan proses terjadinya suatu fenomena alam, sosial, atau budaya secara logis dan berdasarkan fakta. Contohnya adalah proses terjadinya hujan, gunung meletus, atau banjir.",
        "Struktur teks eksplanasi terdiri atas pernyataan umum, deretan penjelas, dan interpretasi. Pernyataan umum mengenalkan fenomena, deretan penjelas menguraikan proses atau hubungan sebab-akibat secara berurutan, sedangkan interpretasi berisi simpulan atau tanggapan penulis yang bersifat pilihan.",
        "Teks eksplanasi banyak memakai konjungsi kausalitas seperti karena, sebab, sehingga, dan akibatnya. Konjungsi kronologis seperti kemudian, setelah itu, dan akhirnya dipakai untuk menunjukkan urutan proses.",
        "Informasi dalam teks eksplanasi harus dapat dibuktikan. Penulis sebaiknya menggunakan istilah khusus dan kalimat pasif jika diperlukan, tetapi tetap menyusun kalimat yang jelas agar pembaca memahami proses yang dijelaskan.",
      ].join("\n\n"),
      sumber: SUMBER_BI,
      urlVideo: VIDEO_EKSPLANASI,
      gambar: [{ url: GAMBAR_EKSPLANASI, ukuranFile: 180000 }],
      soal: [
        {
          pertanyaan: "Teks eksplanasi bertujuan menjelaskan...",
          opsi: ["proses terjadinya suatu fenomena", "langkah membuat kerajinan", "keindahan suatu tempat", "percakapan antartokoh"],
          benar: 0,
        },
        {
          pertanyaan: "Fenomena yang dapat dijelaskan dalam teks eksplanasi adalah...",
          opsi: ["proses terjadinya hujan", "daftar belanja", "jadwal pelajaran", "dialog drama"],
          benar: 0,
        },
        {
          pertanyaan: "Bagian yang mengenalkan fenomena disebut...",
          opsi: ["pernyataan umum", "deretan penjelas", "interpretasi", "orientasi tokoh"],
          benar: 0,
        },
        {
          pertanyaan: "Bagian yang menguraikan proses secara berurutan disebut...",
          opsi: ["deretan penjelas", "judul", "pernyataan umum", "salam pembuka"],
          benar: 0,
        },
        {
          pertanyaan: "Kata yang menunjukkan hubungan sebab-akibat adalah...",
          opsi: ["sehingga", "kemudian", "setelah itu", "akhirnya"],
          benar: 0,
        },
        {
          pertanyaan: "Kata kemudian dalam teks eksplanasi berfungsi menunjukkan...",
          opsi: ["urutan waktu", "tempat", "tokoh", "perbandingan"],
          benar: 0,
        },
        {
          pertanyaan: "Mengapa teks eksplanasi harus berdasarkan fakta?",
          opsi: ["Agar proses yang dijelaskan dapat dipercaya", "Agar ceritanya menjadi khayalan", "Agar kalimatnya selalu lucu", "Agar penulis tidak perlu melakukan pengamatan"],
          benar: 0,
        },
        {
          pertanyaan: "Urutan struktur teks eksplanasi yang tepat adalah...",
          opsi: ["pernyataan umum, deretan penjelas, interpretasi", "interpretasi, judul, pernyataan umum", "deretan penjelas, orientasi, resolusi", "tujuan, alat, langkah-langkah"],
          benar: 0,
        },
        {
          pertanyaan: "Kalimat yang paling sesuai untuk deretan penjelas adalah...",
          opsi: ["Uap air naik dan berkumpul membentuk awan.", "Hujan adalah fenomena yang sangat indah menurut saya.", "Ayo, kita membuat hujan buatan!", "Pada suatu hari, hiduplah awan yang sedih."],
          benar: 0,
        },
        {
          pertanyaan: "Jika sebuah teks hanya berisi pendapat tanpa menjelaskan proses dan fakta, teks itu belum tepat disebut teks eksplanasi karena...",
          opsi: ["teks eksplanasi harus menjelaskan fenomena secara logis dan faktual", "teks eksplanasi harus selalu berbentuk dialog", "teks eksplanasi hanya boleh membahas tokoh", "teks eksplanasi tidak boleh memakai konjungsi"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Bahasa Indonesia",
      judul: "Surat pribadi dan surat resmi",
      ringkasan: "Tujuan, bagian, perbedaan bahasa, dan etika menulis surat pribadi serta surat resmi.",
      konten: [
        "Surat adalah sarana komunikasi tertulis. Surat pribadi ditujukan kepada orang yang memiliki hubungan personal, seperti teman atau keluarga, sedangkan surat resmi digunakan untuk keperluan kedinasan atau organisasi.",
        "Surat pribadi biasanya memakai bahasa yang akrab, tetapi tetap sopan. Bagian surat pribadi dapat berupa tempat dan tanggal, alamat tujuan, salam pembuka, isi, salam penutup, dan nama pengirim.",
        "Surat resmi menggunakan bahasa baku dan struktur yang lebih lengkap. Bagian-bagiannya dapat meliputi kop surat, nomor, lampiran, perihal, alamat tujuan, salam pembuka, isi surat, penutup, tanda tangan, dan nama atau jabatan pengirim.",
        "Isi surat harus disesuaikan dengan penerima dan tujuan. Sebelum dikirim, periksa kembali nama penerima, alamat, tanggal, ejaan, serta kesantunan bahasa agar tidak terjadi salah paham.",
      ].join("\n\n"),
      sumber: SUMBER_BI,
      urlVideo: VIDEO_SURAT,
      gambar: [{ url: GAMBAR_SURAT, ukuranFile: 120000 }],
      soal: [
        {
          pertanyaan: "Surat pribadi biasanya ditujukan kepada...",
          opsi: ["teman atau anggota keluarga", "kepala dinas untuk urusan kantor", "sebuah perusahaan sebagai laporan resmi", "instansi untuk mengajukan keputusan"],
          benar: 0,
        },
        {
          pertanyaan: "Surat resmi digunakan untuk...",
          opsi: ["keperluan kedinasan atau organisasi", "menulis cerita fantasi", "mencatat resep makanan", "mengirim pesan rahasia kepada sahabat"],
          benar: 0,
        },
        {
          pertanyaan: "Bahasa yang tepat untuk surat resmi adalah bahasa...",
          opsi: ["baku dan sopan", "gaul dan bebas", "penuh singkatan tidak umum", "berupa bahasa percakapan saja"],
          benar: 0,
        },
        {
          pertanyaan: "Bagian surat resmi yang memuat identitas instansi disebut...",
          opsi: ["kop surat", "salam penutup", "isi surat", "alamat pengirim pribadi"],
          benar: 0,
        },
        {
          pertanyaan: "Bagian surat yang menjelaskan pokok pesan adalah...",
          opsi: ["isi surat", "kop surat", "tanggal surat", "tanda tangan"],
          benar: 0,
        },
        {
          pertanyaan: "Kalimat pembuka yang paling sesuai untuk surat pribadi kepada teman adalah...",
          opsi: ["Hai, Raka, apa kabarmu?", "Dengan hormat, berdasarkan surat keputusan...", "Yang bertanda tangan di bawah ini...", "Sehubungan dengan rapat dinas..."],
          benar: 0,
        },
        {
          pertanyaan: "Mengapa nama dan alamat penerima harus diperiksa sebelum surat dikirim?",
          opsi: ["Agar surat sampai kepada orang yang tepat", "Agar surat menjadi lebih panjang", "Agar kop surat tidak diperlukan", "Agar isi surat dapat dihilangkan"],
          benar: 0,
        },
        {
          pertanyaan: "Perbedaan utama surat pribadi dan surat resmi adalah...",
          opsi: ["tujuan, penerima, dan ragam bahasanya", "jumlah halaman dan warna kertasnya saja", "ukuran amplopnya saja", "keduanya tidak memiliki isi"],
          benar: 0,
        },
        {
          pertanyaan: "Jika siswa mengundang kepala sekolah untuk acara resmi, jenis surat yang paling tepat adalah...",
          opsi: ["surat resmi", "surat pribadi yang sangat santai", "catatan harian", "pesan tanpa alamat"],
          benar: 0,
        },
        {
          pertanyaan: "Kesalahan yang perlu diperbaiki dalam surat resmi adalah...",
          opsi: ["menggunakan banyak singkatan gaul dan tidak mencantumkan tujuan surat", "mencantumkan tanggal dan nama penerima", "menggunakan salam pembuka yang sopan", "memeriksa ejaan sebelum mengirim"],
          benar: 0,
        },
      ],
    },

    // ── Matematika ──────────────────────────────────────────────────────
    {
      mapel: "Matematika",
      judul: "Bilangan bulat dan operasinya",
      ringkasan: "Bilangan positif dan negatif, garis bilangan, serta operasi hitungnya.",
      konten: [
        "Bilangan bulat terdiri atas bilangan bulat positif, nol, dan bilangan bulat negatif. Bilangan negatif ditulis dengan tanda minus, misalnya −5 dibaca negatif lima.",
        "Garis bilangan membantu membandingkan bilangan: semakin ke kanan, nilai bilangan semakin besar. Jadi −2 lebih besar dari −5.",
        "Penjumlahan bilangan bulat: jika tandanya sama, jumlahkan angkanya lalu pakai tanda yang sama. Jika tandanya berbeda, kurangkan yang besar dengan yang kecil lalu pakai tanda bilangan yang lebih besar.",
        "Perkalian dan pembagian: positif × positif = positif, negatif × negatif = positif, dan positif × negatif = negatif. Aturan yang sama berlaku untuk pembagian.",
      ].join("\n\n"),
      sumber: SUMBER_MTK,
      soal: [
        {
          pertanyaan: "Nilai dari −7 + 3 adalah...",
          opsi: ["−4", "4", "−10", "10"],
          benar: 0,
        },
        {
          pertanyaan: "Nilai dari −6 × (−4) adalah...",
          opsi: ["24", "−24", "−10", "10"],
          benar: 0,
        },
        {
          pertanyaan: "Bilangan yang lebih besar antara −2 dan −5 adalah...",
          opsi: ["−2", "−5", "keduanya sama", "tidak dapat dibandingkan"],
          benar: 0,
        },
        {
          pertanyaan: "Suhu di suatu ruangan mula-mula 5 °C, lalu turun 8 °C. Suhu sekarang adalah...",
          opsi: ["−3 °C", "3 °C", "−13 °C", "13 °C"],
          benar: 0,
        },
        {
          pertanyaan: "Hasil dari 12 − (−5) adalah...",
          opsi: ["17", "7", "−17", "−7"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Matematika",
      judul: "Bilangan rasional dan pecahan",
      ringkasan: "Pecahan biasa, campuran, desimal, persen, serta operasinya.",
      konten: [
        "Bilangan rasional adalah bilangan yang dapat ditulis sebagai pecahan a/b dengan b tidak sama dengan nol. Contoh: 1/2, 3/4, dan −2/5.",
        "Pecahan dapat ditulis dalam beberapa bentuk: pecahan biasa (3/4), pecahan campuran (1 1/2), desimal (0,75), dan persen (75%).",
        "Untuk menjumlahkan atau mengurangkan pecahan, samakan penyebutnya terlebih dahulu. Contoh: 1/2 + 1/3 = 3/6 + 2/6 = 5/6.",
        "Untuk mengalikan pecahan, kalikan pembilang dengan pembilang dan penyebut dengan penyebut. Untuk membagi pecahan, kalikan dengan kebalikannya: 1/2 ÷ 1/4 = 1/2 × 4/1 = 2.",
      ].join("\n\n"),
      sumber: SUMBER_MTK,
      soal: [
        {
          pertanyaan: "Bentuk lain dari pecahan 1/2 + 1/3 adalah...",
          opsi: ["5/6", "2/5", "1/5", "2/6"],
          benar: 0,
        },
        {
          pertanyaan: "Bentuk persen dari 3/4 adalah...",
          opsi: ["75%", "34%", "43%", "70%"],
          benar: 0,
        },
        {
          pertanyaan: "Hasil dari 2/3 × 3/4 adalah...",
          opsi: ["1/2", "5/7", "6/7", "2/4"],
          benar: 0,
        },
        {
          pertanyaan: "Urutan pecahan dari yang terkecil adalah...",
          opsi: ["1/4, 1/3, 1/2", "1/2, 1/3, 1/4", "1/3, 1/4, 1/2", "1/4, 1/2, 1/3"],
          benar: 0,
        },
        {
          pertanyaan: "Pecahan campuran 1 1/2 sama nilainya dengan...",
          opsi: ["3/2", "2/3", "1/2", "11/2"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Matematika",
      judul: "Rasio dan skala",
      ringkasan: "Perbandingan senilai, skala peta, dan penerapannya dalam kehidupan.",
      konten: [
        "Rasio adalah perbandingan antara dua besaran sejenis. Contoh: perbandingan banyak siswa laki-laki dan perempuan 2 : 3.",
        "Skala adalah perbandingan ukuran pada gambar dengan ukuran sebenarnya. Skala 1 : 100.000 berarti 1 cm pada peta mewakili 100.000 cm atau 1 km pada kenyataannya.",
        "Pada perbandingan senilai, jika satu besaran bertambah, besaran lainnya juga bertambah. Contoh: semakin banyak buku dibeli, semakin besar biayanya.",
        "Contoh penerapan: jika 4 buku harganya Rp20.000, maka 6 buku harganya Rp30.000 karena satu buku Rp5.000.",
      ].join("\n\n"),
      sumber: SUMBER_MTK,
      soal: [
        {
          pertanyaan: "Skala 1 : 100.000 berarti 1 cm pada peta mewakili...",
          opsi: ["1 km pada kenyataannya", "100 m pada kenyataannya", "10 km pada kenyataannya", "100.000 km pada kenyataannya"],
          benar: 0,
        },
        {
          pertanyaan: "Jika 4 buku berharga Rp20.000, harga 6 buku adalah...",
          opsi: ["Rp30.000", "Rp28.000", "Rp32.000", "Rp24.000"],
          benar: 0,
        },
        {
          pertanyaan: "Perbandingan 2 : 3 sama dengan...",
          opsi: ["4 : 6", "3 : 2", "2 : 6", "6 : 4"],
          benar: 0,
        },
        {
          pertanyaan: "Jarak dua kota pada peta 5 cm dengan skala 1 : 200.000. Jarak sebenarnya adalah...",
          opsi: ["10 km", "1 km", "5 km", "100 km"],
          benar: 0,
        },
        {
          pertanyaan: "Pada perbandingan senilai, jika satu besaran bertambah maka besaran lainnya...",
          opsi: ["bertambah", "berkurang", "tetap", "hilang"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Matematika",
      judul: "Bentuk aljabar",
      ringkasan: "Variabel, koefisien, konstanta, serta operasi bentuk aljabar.",
      konten: [
        "Bentuk aljabar memuat variabel (huruf pengganti bilangan), koefisien (angka pengali variabel), dan konstanta (angka tetap). Pada 3x + 5: 3 adalah koefisien, x variabel, dan 5 konstanta.",
        "Suku-suku yang sejenis dapat disederhanakan. Contoh: 2x + 3x = 5x, sedangkan 2x + 3y tidak dapat disederhanakan karena variabelnya berbeda.",
        "Sifat distributif dipakai untuk mengalikan bentuk aljabar: 2(x + 3) = 2x + 6.",
        "Bentuk aljabar digunakan untuk memodelkan situasi nyata. Contoh: jika harga buku x rupiah, biaya 3 buku ditulis 3x.",
      ].join("\n\n"),
      sumber: SUMBER_MTK,
      soal: [
        {
          pertanyaan: "Pada bentuk aljabar 5a + 7, angka 7 disebut...",
          opsi: ["konstanta", "koefisien", "variabel", "suku"],
          benar: 0,
        },
        {
          pertanyaan: "Hasil penyederhanaan 4x + 2x adalah...",
          opsi: ["6x", "8x", "6x²", "2x"],
          benar: 0,
        },
        {
          pertanyaan: "Hasil dari 3(x + 2) adalah...",
          opsi: ["3x + 6", "3x + 2", "x + 6", "3x + 5"],
          benar: 0,
        },
        {
          pertanyaan: "Pasangan suku yang sejenis adalah...",
          opsi: ["3x dan 5x", "3x dan 3y", "3x dan 5", "5y dan 3"],
          benar: 0,
        },
        {
          pertanyaan: "Jika harga satu pulpen adalah p rupiah, biaya membeli 4 pulpen ditulis...",
          opsi: ["4p", "p + 4", "p/4", "p⁴"],
          benar: 0,
        },
      ],
    },

    // ── Materi tambahan Sesi 2: Matematika ───────────────────────────────
    {
      mapel: "Matematika",
      judul: "Persamaan linear satu variabel",
      ringkasan: "Pengertian persamaan, langkah menentukan nilai variabel, dan penerapannya dalam masalah sehari-hari.",
      konten: [
        "Persamaan linear satu variabel (PLSV) adalah kalimat matematika yang memuat tanda sama dengan dan satu variabel berpangkat satu. Contohnya 3x + 2 = 11. Huruf x disebut variabel, sedangkan bilangan yang diketahui disebut konstanta.",
        "Tujuan menyelesaikan persamaan adalah menemukan nilai variabel yang membuat ruas kiri dan ruas kanan bernilai sama. Untuk menjaga kesetaraan, operasi yang dilakukan pada satu ruas harus dilakukan juga pada ruas lainnya.",
        "Gunakan operasi kebalikan secara bertahap. Pada 3x + 2 = 11, kurangi 2 pada kedua ruas sehingga 3x = 9, lalu bagi kedua ruas dengan 3 sehingga x = 3. Pemeriksaan dilakukan dengan memasukkan nilai x ke persamaan awal.",
        "PLSV dapat digunakan untuk memodelkan masalah. Jika tiga buku dan biaya pengiriman Rp2.000 berharga Rp17.000, modelnya 3x + 2.000 = 17.000, dengan x sebagai harga satu buku.",
      ].join("\n\n"),
      sumber: SUMBER_MTK,
      urlVideo: VIDEO_PERSAMAAN,
      gambar: [{ url: GAMBAR_PERSAMAAN, ukuranFile: 24000 }],
      soal: [
        {
          pertanyaan: "Persamaan linear satu variabel memuat...",
          opsi: ["satu variabel berpangkat satu", "dua variabel berpangkat dua", "hanya bilangan tanpa tanda sama dengan", "gambar bangun ruang"],
          benar: 0,
        },
        {
          pertanyaan: "Pada persamaan 4x + 3 = 15, variabelnya adalah...",
          opsi: ["x", "4", "3", "15"],
          benar: 0,
        },
        {
          pertanyaan: "Nilai x pada x + 7 = 12 adalah...",
          opsi: ["5", "7", "12", "19"],
          benar: 0,
        },
        {
          pertanyaan: "Nilai x pada 3x = 18 adalah...",
          opsi: ["6", "15", "21", "54"],
          benar: 0,
        },
        {
          pertanyaan: "Langkah pertama yang tepat untuk 2x + 5 = 17 adalah...",
          opsi: ["mengurangi 5 pada kedua ruas", "menambah 5 hanya pada ruas kiri", "membagi 17 dengan 2 tanpa mengurangi 5", "mengalikan kedua ruas dengan 5"],
          benar: 0,
        },
        {
          pertanyaan: "Penyelesaian 5x − 4 = 21 adalah...",
          opsi: ["x = 5", "x = 4", "x = 17", "x = 25"],
          benar: 0,
        },
        {
          pertanyaan: "Mengapa operasi harus dilakukan pada kedua ruas persamaan?",
          opsi: ["Agar kesetaraan kedua ruas tetap terjaga", "Agar variabel selalu hilang", "Agar persamaan berubah menjadi pecahan", "Agar hanya ruas kiri yang berubah"],
          benar: 0,
        },
        {
          pertanyaan: "Model matematika dari 'dua kali suatu bilangan ditambah 3 sama dengan 13' adalah...",
          opsi: ["2x + 3 = 13", "2 + 3x = 13", "x + 3 = 26", "2x − 3 = 13"],
          benar: 0,
        },
        {
          pertanyaan: "Dina membeli 3 pensil dengan harga sama dan sebuah penghapus Rp2.000. Totalnya Rp11.000. Harga satu pensil adalah...",
          opsi: ["Rp3.000", "Rp2.000", "Rp4.000", "Rp9.000"],
          benar: 0,
        },
        {
          pertanyaan: "Cara terbaik memeriksa jawaban PLSV adalah...",
          opsi: ["memasukkan nilai variabel ke persamaan awal", "menghapus semua angka", "mengganti tanda sama dengan dengan tanda tambah", "membandingkan panjang kedua ruas"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Matematika",
      judul: "Segitiga dan segiempat",
      ringkasan: "Jenis, sifat, keliling, dan luas segitiga serta berbagai segiempat.",
      konten: [
        "Segitiga adalah bangun datar yang memiliki tiga sisi dan tiga sudut. Berdasarkan panjang sisinya, segitiga dapat berupa sama sisi, sama kaki, atau sembarang. Berdasarkan sudutnya, segitiga dapat berupa lancip, siku-siku, atau tumpul.",
        "Segiempat adalah bangun datar yang memiliki empat sisi dan empat sudut. Persegi memiliki empat sisi sama panjang dan empat sudut siku-siku. Persegi panjang memiliki sisi berhadapan sama panjang dan empat sudut siku-siku.",
        "Jajar genjang memiliki dua pasang sisi berhadapan sejajar dan sama panjang. Trapesium memiliki setidaknya satu pasang sisi sejajar. Belah ketupat memiliki empat sisi sama panjang, sedangkan layang-layang memiliki dua pasang sisi berdekatan sama panjang.",
        "Keliling diperoleh dengan menjumlahkan seluruh sisi. Luas segitiga adalah 1/2 × alas × tinggi, sedangkan luas persegi panjang adalah panjang × lebar. Satuan luas ditulis dalam satuan persegi, misalnya cm².",
      ].join("\n\n"),
      sumber: SUMBER_MTK,
      urlVideo: VIDEO_GEOMETRI,
      gambar: [{ url: GAMBAR_GEOMETRI, ukuranFile: 18000 }],
      soal: [
        {
          pertanyaan: "Segitiga memiliki...",
          opsi: ["tiga sisi dan tiga sudut", "empat sisi dan tiga sudut", "tiga sisi dan empat sudut", "empat sisi dan empat sudut"],
          benar: 0,
        },
        {
          pertanyaan: "Segitiga yang ketiga sisinya sama panjang disebut segitiga...",
          opsi: ["sama sisi", "sama kaki", "sembarang", "siku-siku"],
          benar: 0,
        },
        {
          pertanyaan: "Ciri persegi adalah...",
          opsi: ["empat sisi sama panjang dan empat sudut siku-siku", "hanya satu pasang sisi sejajar", "sisi berhadapan berbeda panjang", "tidak memiliki sudut"],
          benar: 0,
        },
        {
          pertanyaan: "Bangun yang memiliki sisi berhadapan sama panjang dan empat sudut siku-siku adalah...",
          opsi: ["persegi panjang", "layang-layang", "trapesium", "segitiga"],
          benar: 0,
        },
        {
          pertanyaan: "Rumus luas segitiga adalah...",
          opsi: ["1/2 × alas × tinggi", "alas + tinggi", "sisi × sisi × sisi", "2 × (alas + tinggi)"],
          benar: 0,
        },
        {
          pertanyaan: "Luas segitiga dengan alas 10 cm dan tinggi 6 cm adalah...",
          opsi: ["30 cm²", "16 cm²", "60 cm²", "120 cm²"],
          benar: 0,
        },
        {
          pertanyaan: "Keliling persegi dengan sisi 8 cm adalah...",
          opsi: ["32 cm", "16 cm", "24 cm", "64 cm"],
          benar: 0,
        },
        {
          pertanyaan: "Jajar genjang memiliki...",
          opsi: ["dua pasang sisi berhadapan sejajar", "tiga sisi sama panjang", "empat diagonal sama panjang selalu", "tidak memiliki sisi sejajar"],
          benar: 0,
        },
        {
          pertanyaan: "Sebuah persegi panjang berukuran 12 cm × 5 cm. Luasnya adalah...",
          opsi: ["60 cm²", "34 cm²", "17 cm²", "120 cm²"],
          benar: 0,
        },
        {
          pertanyaan: "Seorang siswa menghitung luas segitiga dengan rumus alas × tinggi tanpa membagi dua. Kesalahannya adalah...",
          opsi: ["lupa faktor 1/2 pada rumus luas segitiga", "menggunakan satuan panjang", "menganggap segitiga memiliki empat sisi", "menjumlahkan seluruh sisi"],
          benar: 0,
        },
      ],
    },

    // ── Bahasa Inggris ──────────────────────────────────────────────────
    {
      mapel: "Bahasa Inggris",
      judul: "About Me: introducing yourself",
      ringkasan: "Memperkenalkan diri, menyapa, dan bertanya kabar dalam bahasa Inggris.",
      konten: [
        "When you meet someone new, you can say: \"Hello! My name is Rani. Nice to meet you.\" You can also ask: \"What is your name?\"",
        "The verb \"to be\" (am, is, are) is used to tell about yourself. I am a student. She is my friend. They are my classmates.",
        "Possessive adjectives show ownership: my book, your pen, his bag, her shoes, our class, their school.",
        "To ask about someone's condition, say \"How are you?\" and answer with \"I'm fine, thank you.\" or \"I'm great, thanks.\"",
      ].join("\n\n"),
      sumber: SUMBER_ENG,
      soal: [
        {
          pertanyaan: "Complete the sentence: \"Hello, ... name is Dita.\"",
          opsi: ["my", "I", "me", "mine"],
          benar: 0,
        },
        {
          pertanyaan: "The correct greeting when meeting someone for the first time is...",
          opsi: ["Nice to meet you.", "Goodbye forever.", "See you never.", "I am angry."],
          benar: 0,
        },
        {
          pertanyaan: "Complete the sentence: \"They ... my classmates.\"",
          opsi: ["are", "is", "am", "be"],
          benar: 0,
        },
        {
          pertanyaan: "Someone asks \"How are you?\" The best answer is...",
          opsi: ["I'm fine, thank you.", "My name is Budi.", "I am twelve years old.", "Good night."],
          benar: 0,
        },
        {
          pertanyaan: "\"... bag is new.\" (milik Sari) — kata yang tepat adalah...",
          opsi: ["Her", "His", "My", "Their"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Bahasa Inggris",
      judul: "Culinary and Me: food and drinks",
      ringkasan: "Nama makanan dan minuman, countable/uncountable, dan some/any.",
      konten: [
        "Food and drink vocabulary: rice (nasi), bread (roti), egg (telur), water (air), milk (susu), and vegetables (sayur-sayuran).",
        "Countable nouns can be counted: one egg, two eggs. Uncountable nouns cannot be counted directly: water, rice, sugar — we use measures like a glass of water or a plate of rice.",
        "\"Some\" is used in positive sentences: I have some bread. \"Any\" is used in negative and question sentences: I don't have any milk. Do you have any sugar?",
        "To ask about someone's favourite food, say: \"What is your favourite food?\" — \"My favourite food is fried rice.\"",
      ].join("\n\n"),
      sumber: SUMBER_ENG,
      soal: [
        {
          pertanyaan: "Which word is an uncountable noun?",
          opsi: ["water", "egg", "apple", "book"],
          benar: 0,
        },
        {
          pertanyaan: "Complete the sentence: \"I have ... bread for breakfast.\"",
          opsi: ["some", "any", "a", "many"],
          benar: 0,
        },
        {
          pertanyaan: "Complete the sentence: \"Do you have ... sugar?\"",
          opsi: ["any", "some", "a", "an"],
          benar: 0,
        },
        {
          pertanyaan: "\"My favourite drink is ...\" The suitable word is...",
          opsi: ["milk", "rice", "bread", "fried rice"],
          benar: 0,
        },
        {
          pertanyaan: "We count water using...",
          opsi: ["a glass of water", "a water", "two waters", "an water"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Bahasa Inggris",
      judul: "Home Sweet Home: describing your home",
      ringkasan: "Nama ruangan dan perabot, there is/there are, serta kata depan tempat.",
      konten: [
        "Parts of the house: living room (ruang tamu), bedroom (kamar tidur), kitchen (dapur), bathroom (kamar mandi), and garden (kebun).",
        "\"There is\" is used for one thing: There is a table in the kitchen. \"There are\" is used for more than one thing: There are two chairs in the living room.",
        "Prepositions of place: in (di dalam), on (di atas), under (di bawah), behind (di belakang), and next to (di samping). The cat is under the table.",
        "To describe your home, you can say: \"My house is small but comfortable. It has a garden in front of it.\"",
      ].join("\n\n"),
      sumber: SUMBER_ENG,
      soal: [
        {
          pertanyaan: "Complete the sentence: \"... a lamp on the desk.\"",
          opsi: ["There is", "There are", "There am", "There be"],
          benar: 0,
        },
        {
          pertanyaan: "Complete the sentence: \"... three bedrooms in my house.\"",
          opsi: ["There are", "There is", "There was one", "There a"],
          benar: 0,
        },
        {
          pertanyaan: "We cook in the...",
          opsi: ["kitchen", "bedroom", "bathroom", "garage"],
          benar: 0,
        },
        {
          pertanyaan: "The cat is ... the table. (di bawah meja)",
          opsi: ["under", "on", "behind", "next to"],
          benar: 0,
        },
        {
          pertanyaan: "The correct sentence is...",
          opsi: ["There are two chairs in the living room.", "There is two chairs in the living room.", "There are a chair in the living room.", "There two chairs in living room."],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Bahasa Inggris",
      judul: "Hobbies and free-time activities",
      ringkasan: "Kosakata hobi, pola like/love/enjoy, dan cara membicarakan kegiatan waktu luang.",
      konten: [
        "A hobby is an activity that we enjoy in our free time. Examples are reading, drawing, playing football, swimming, cooking, and listening to music.",
        "To talk about likes, use: I like reading. She likes drawing. After like, love, or enjoy, an activity often uses the -ing form: playing, swimming, or cooking.",
        "To ask about a hobby, say: What do you like doing in your free time? A suitable answer is: I like playing badminton. You can also ask: Do you like reading? — Yes, I do. / No, I don't.",
        "Use simple present tense for regular activities. Remember that he, she, and it usually take -s or -es: He plays chess every Saturday. She watches films at home.",
      ].join("\n\n"),
      sumber: SUMBER_ENG,
      urlVideo: VIDEO_HOBI,
      gambar: [{ url: GAMBAR_HOBI, ukuranFile: 210000 }],
      soal: [
        {
          pertanyaan: "A hobby is an activity we enjoy in our...",
          opsi: ["free time", "classroom test", "sleeping time only", "school uniform"],
          benar: 0,
        },
        {
          pertanyaan: "Which word is a hobby?",
          opsi: ["drawing", "Monday", "bedroom", "hungry"],
          benar: 0,
        },
        {
          pertanyaan: "Complete: I like ... football.",
          opsi: ["playing", "plays", "play", "played"],
          benar: 0,
        },
        {
          pertanyaan: "Complete: She ... drawing.",
          opsi: ["likes", "like", "liking", "liked"],
          benar: 0,
        },
        {
          pertanyaan: "The correct question about a hobby is...",
          opsi: ["What do you like doing in your free time?", "Where is your pencil?", "How old is your bag?", "What colour are you hobby?"],
          benar: 0,
        },
        {
          pertanyaan: "The best answer to 'Do you like reading?' is...",
          opsi: ["Yes, I do.", "Yes, I am.", "Yes, I can do.", "Yes, I like."],
          benar: 0,
        },
        {
          pertanyaan: "Complete: He ... chess every Saturday.",
          opsi: ["plays", "play", "playing", "played"],
          benar: 0,
        },
        {
          pertanyaan: "Which sentence is correct?",
          opsi: ["They enjoy swimming.", "They enjoys swimming.", "They enjoy swim.", "They enjoying swimming."],
          benar: 0,
        },
        {
          pertanyaan: "Rina likes cooking and Budi likes cycling. What do they have in common?",
          opsi: ["They both have hobbies.", "They both dislike activities.", "They both go to school at night.", "They both are rooms."],
          benar: 0,
        },
        {
          pertanyaan: "A student writes 'She like read books.' The correct sentence is...",
          opsi: ["She likes reading books.", "She like reading books.", "She likes read books.", "She liking reads books."],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Bahasa Inggris",
      judul: "Asking for and giving directions",
      ringkasan: "Nama tempat, ungkapan meminta petunjuk, dan arah dalam bahasa Inggris.",
      konten: [
        "Directions help us find a place. Common places in town are school, library, hospital, supermarket, bank, park, and bus station.",
        "To ask for directions, say: Excuse me, where is the library? or How can I get to the hospital? Use polite words such as excuse me and thank you.",
        "Useful direction phrases are go straight, turn left, turn right, cross the street, next to, in front of, behind, and opposite. Example: Go straight and turn left at the bank.",
        "Read directions in order and identify landmarks. If the instruction says 'The library is next to the park', the library and the park are beside each other. A simple map can help us check whether the route is correct.",
      ].join("\n\n"),
      sumber: SUMBER_ENG,
      urlVideo: VIDEO_DIRECTIONS,
      gambar: [{ url: GAMBAR_DIRECTIONS, ukuranFile: 170000 }],
      soal: [
        {
          pertanyaan: "Which place is commonly found in a town?",
          opsi: ["library", "triangle", "breakfast", "happy"],
          benar: 0,
        },
        {
          pertanyaan: "The polite expression to start asking for directions is...",
          opsi: ["Excuse me", "Go away", "Be quiet", "I am sleeping"],
          benar: 0,
        },
        {
          pertanyaan: "Complete: How can I ... to the hospital?",
          opsi: ["get", "gets", "getting", "got"],
          benar: 0,
        },
        {
          pertanyaan: "Turn left means...",
          opsi: ["belok kiri", "belok kanan", "jalan lurus", "menyeberang jalan"],
          benar: 0,
        },
        {
          pertanyaan: "Go straight means...",
          opsi: ["jalan lurus", "belok kiri", "berhenti di belakang", "berputar di tempat"],
          benar: 0,
        },
        {
          pertanyaan: "If the bank is next to the park, the bank is ... the park.",
          opsi: ["beside", "inside", "under", "far above"],
          benar: 0,
        },
        {
          pertanyaan: "Which sentence gives a direction?",
          opsi: ["Turn right at the school.", "I like the school.", "The school is beautiful.", "I study English."],
          benar: 0,
        },
        {
          pertanyaan: "A person says 'Go straight and turn right at the bank.' What should you do first?",
          opsi: ["Go straight", "Turn right", "Cross the street twice", "Go behind the bank"],
          benar: 0,
        },
        {
          pertanyaan: "Why are landmarks useful when following directions?",
          opsi: ["They help us recognize where to turn or stop", "They make every route longer", "They replace all verbs", "They tell us the weather"],
          benar: 0,
        },
        {
          pertanyaan: "A student says 'Turn left' but turns right. The mistake is...",
          opsi: ["the student did not follow the direction correctly", "the map must have no places", "turn left means go straight", "the instruction needs no order"],
          benar: 0,
        },
      ],
    },
    {
      mapel: "Bahasa Inggris",
      judul: "My School Activities: daily routines",
      ringkasan: "Kegiatan sehari-hari, simple present tense, dan keterangan waktu.",
      konten: [
        "Daily activities: wake up (bangun), take a shower (mandi), have breakfast (sarapan), go to school (pergi ke sekolah), study (belajar), and do homework (mengerjakan PR).",
        "Simple present tense is used for habits and routines. I wake up at five o'clock. She studies every day. Note the -s for he, she, and it.",
        "Time expressions: in the morning, in the afternoon, in the evening, at night, every day, and on Sunday.",
        "To ask about routines, say: \"What time do you go to school?\" — \"I go to school at half past six.\"",
      ].join("\n\n"),
      sumber: SUMBER_ENG,
      soal: [
        {
          pertanyaan: "Complete the sentence: \"She ... to school every morning.\"",
          opsi: ["goes", "go", "going", "went"],
          benar: 0,
        },
        {
          pertanyaan: "\"Half past six\" means...",
          opsi: ["06.30", "06.15", "07.30", "06.45"],
          benar: 0,
        },
        {
          pertanyaan: "Complete the sentence: \"I ... breakfast before going to school.\"",
          opsi: ["have", "has", "having", "had"],
          benar: 0,
        },
        {
          pertanyaan: "\"I study at night.\" Kata \"at night\" menunjukkan...",
          opsi: ["keterangan waktu", "tempat", "jumlah", "cara"],
          benar: 0,
        },
        {
          pertanyaan: "The correct question to ask about daily activities is...",
          opsi: ["What time do you go to school?", "How much is your school?", "Where is your pencil?", "Who is your teacher's cat?"],
          benar: 0,
        },
      ],
    },
  ],
};
