import type { PaketKonten } from "./tipe";

const SUMBER_MTK =
  "https://buku.kemendikdasmen.go.id/katalog/matematika-untuk-smamasmkmak-kelas-x-edisi-revisi";
const SUMBER_BI =
  "https://buku.kemendikdasmen.go.id/katalog/panduan-guru-bahasa-indonesia-untuk-sma-ma-smk-mak-kelas-x-edisi-revisi";
const SUMBER_ENG =
  "https://repositori.kemendikdasmen.go.id/8710/1/Bahasa%20Inggris%20Kelas%20X.pdf";
const SUMBER_INFO =
  "https://guru.kemdikbud.go.id/kurikulum/referensi-penerapan/capaian-pembelajaran/sd-sma/informatika/fase-e/";

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
