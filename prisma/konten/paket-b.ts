import type { PaketKonten } from "./tipe";

const SUMBER_BI =
  "https://buku.kemendikdasmen.go.id/katalog/bahasa-indonesia-untuk-smp-mts-kelas-vii-edisi-revisi";
const SUMBER_MTK =
  "https://buku.kemendikdasmen.go.id/katalog/Matematika-untuk-SMPMTs-Kelas-VII";
const SUMBER_ENG =
  "https://buku.kemendikdasmen.go.id/katalog/English-for-Nusantara-untuk-SMPMTs-Kelas-VII";

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
