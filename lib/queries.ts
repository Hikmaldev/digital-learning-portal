import { prisma } from "./prisma";
import {
  babSiswa,
  daftarSiswa,
  kelasAktif,
  kelassRingkasan,
  ringkasanPelajaran,
} from "./data";
import type {
  Bab,
  Kelas,
  MetricRingkasan,
  RingkasanPelajaran,
  RingkasanSiswa,
} from "./types";

/**
 * Akses data sisi server (Server Components / API routes).
 * Setiap fungsi mendahulukan database (Neon via Prisma) dan jatuh ke data
 * contoh bila database belum dikonfigurasi atau tidak dapat dijangkau,
 * supaya aplikasi tetap berjalan dalam kondisi apa pun.
 */

function dbTersedia(): boolean {
  return prisma !== null;
}

/** Jalankan query DB; jika gagal (belum ada DB / koneksi error) pakai fallback. */
async function cobaDb<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  if (!dbTersedia()) return fallback;
  try {
    return await query();
  } catch {
    // DB tidak terjangkau — pakai data contoh agar halaman tetap tersaji.
    return fallback;
  }
}

// --- Kelas ---

/** Kelas "aktif" (kode demo HB2026): id asli dari DB bila tersedia, fallback data contoh. */
export async function getKelasAktifDb(): Promise<Kelas> {
  const kelas = await getKelasByKode(kelasAktif.kode_akses);
  return kelas ?? kelasAktif;
}

export async function getKelasByKode(kode: string): Promise<Kelas | null> {
  if (!dbTersedia()) {
    return kode.toUpperCase() === kelasAktif.kode_akses ? kelasAktif : null;
  }
  try {
    const kelas = await prisma!.kelas.findUnique({
      where: { kode_akses: kode.toUpperCase() },
      select: {
        id: true,
        nama_kelas: true,
        jenjang: true,
        kode_akses: true,
        guru_id: true,
        guru: { select: { nama: true } },
      },
    });
    if (!kelas) return null;
    return {
      id: kelas.id,
      nama_kelas: kelas.nama_kelas,
      jenjang: kelas.jenjang as Kelas["jenjang"],
      kode_akses: kelas.kode_akses,
      guru_id: kelas.guru_id,
      guru_nama: kelas.guru.nama,
    };
  } catch {
    return kode.toUpperCase() === kelasAktif.kode_akses ? kelasAktif : null;
  }
}

// --- Bab ---

export async function getBabList(kelasId: string): Promise<Bab[]> {
  return cobaDb(async () => {
    const bab = await prisma!.bab.findMany({
      where: { kelas_id: kelasId },
      include: { _count: { select: { soal: true } } },
      orderBy: { urutan: "asc" },
    });

    return bab.map((b) => ({
      id: b.id,
      kelas_id: b.kelas_id,
      mata_pelajaran: b.mata_pelajaran,
      judul: b.judul,
      ringkasan: b.ringkasan ?? `${b._count.soal} latihan tersedia`,
      konten_materi: b.konten_materi,
      url_video: b.url_video ?? undefined,
      link_sumber: b.link_sumber ?? undefined,
      urutan: b.urutan,
      jumlah_latihan: b._count.soal,
      progres: 0, // dihitung dari ProgressSiswa pada implementasi penuh
      status: "BELUM_MULAI",
    }));
  }, babSiswa);
}

// --- Soal latihan ---

export interface OpsiDenganBenar {
  id: string;
  teks: string;
  is_benar: boolean;
}
export interface SoalDenganBenar {
  id: string;
  pertanyaan: string;
  opsi: OpsiDenganBenar[];
}

export async function getSoalBab(babId: string): Promise<SoalDenganBenar[] | null> {
  return cobaDb(async () => {
    const soal = await prisma!.soal.findMany({
      where: { bab_id: babId },
      include: { opsi: { orderBy: { id: "asc" } } },
      orderBy: { urutan: "asc" },
    });
    if (soal.length === 0) return null;

    return soal.map((s) => ({
      id: s.id,
      pertanyaan: s.pertanyaan,
      opsi: s.opsi.map((o) => ({ id: o.id, teks: o.teks, is_benar: o.is_benar })),
    }));
  }, null);
}

export interface InfoBabLatihan {
  babId: string;
  mataPelajaran: string;
  urutan: number;
  judul: string;
}

/** Pilih bab latihan kelas aktif: DB → bab ber-soal (prefer Bahasa Indonesia); tanpa DB → demo. */
export async function getBabLatihan(): Promise<InfoBabLatihan> {
  const fallback: InfoBabLatihan = {
    babId: "bab-bindo-3",
    mataPelajaran: "Bahasa Indonesia",
    urutan: 3,
    judul: "Menemukan gagasan utama",
  };
  if (!dbTersedia()) return fallback;
  try {
    const kelas = await prisma!.kelas.findUnique({
      where: { kode_akses: kelasAktif.kode_akses },
      select: { id: true },
    });
    if (!kelas) return fallback;

    const bab = await prisma!.bab.findMany({
      where: { kelas_id: kelas.id },
      include: { _count: { select: { soal: true } } },
      orderBy: { urutan: "asc" },
    });
    const berSoal = bab.filter((b) => b._count.soal > 0);
    const pilihan =
      berSoal.find((b) => b.mata_pelajaran === "Bahasa Indonesia") ??
      berSoal[0] ??
      bab[0];
    if (!pilihan) return fallback;

    return {
      babId: pilihan.id,
      mataPelajaran: pilihan.mata_pelajaran,
      urutan: pilihan.urutan,
      judul: pilihan.judul,
    };
  } catch {
    return fallback;
  }
}

// --- Dashboard guru ---

export async function getRingkasanKelas(
  kelasId: string
): Promise<RingkasanSiswa[]> {
  return cobaDb(async () => {
    const siswa = await prisma!.progressSiswa.groupBy({
      by: ["nama_siswa"],
      where: { kelas_id: kelasId },
      _count: true,
      _max: { waktu_submit: true },
    });

    return siswa.map((s) => ({
      id: s.nama_siswa,
      nama: s.nama_siswa,
      bab_terakhir: "—",
      nilai: null,
      status: "SUDAH_MENGERJAKAN" as const,
      terakhir_aktif: s._max.waktu_submit?.toLocaleString("id-ID") ?? "—",
    }));
  }, daftarSiswa);
}

export async function getRingkasanPelajaranDb(): Promise<RingkasanPelajaran[]> {
  return cobaDb(async () => {
    // Ambil bab + hitung jumlah soal per mata pelajaran.
    const bab = await prisma!.bab.findMany({
      include: { _count: { select: { soal: true } } },
    });

    const perMapel = new Map<
      string,
      { jumlah_bab: number; jumlah_latihan: number }
    >();
    for (const b of bab) {
      const kunci = kunciMapel(b.mata_pelajaran);
      const cur = perMapel.get(kunci) ?? { jumlah_bab: 0, jumlah_latihan: 0 };
      cur.jumlah_bab += 1;
      cur.jumlah_latihan += b._count.soal;
      perMapel.set(kunci, cur);
    }

    return [...perMapel.entries()].map(([nama, v]) => ({
      mata_pelajaran: nama,
      jumlah_bab: v.jumlah_bab,
      jumlah_latihan: v.jumlah_latihan,
      progres: 0, // dihitung dari ProgressSiswa pada implementasi penuh
    }));
  }, ringkasanPelajaran);
}

/** Samakan penamaan mapel di DB dengan data contoh. */
function kunciMapel(nama: string): string {
  const peta: Record<string, string> = {
    "Ilmu Pengetahuan Alam": "Ilmu Pengetahuan Alam",
    IPA: "Ilmu Pengetahuan Alam",
    "Ilmu Pengetahuan Sosial": "Ilmu Pengetahuan Sosial",
    IPS: "Ilmu Pengetahuan Sosial",
    "Bahasa Indonesia": "Bahasa Indonesia",
    Matematika: "Matematika",
  };
  return peta[nama] ?? nama;
}

export async function getMetrics(kelasId: string): Promise<MetricRingkasan[]> {
  const fallback: MetricRingkasan[] = [
    { label: "Siswa aktif", nilai: 24, delta: "3 sejak minggu lalu", naik: true },
    { label: "Latihan terkumpul", nilai: 86, delta: "12 minggu ini", naik: true },
    { label: "Rata-rata progres", nilai: 72, delta: "8% sejak bulan lalu", naik: true },
  ];

  return cobaDb(async () => {
    const [siswa, latihan] = await Promise.all([
      prisma!.progressSiswa.groupBy({
        by: ["nama_siswa"],
        where: { kelas_id: kelasId },
      }),
      prisma!.progressSiswa.count({ where: { kelas_id: kelasId } }),
    ]);

    return [
      { label: "Siswa aktif", nilai: siswa.length, delta: "dari kelas ini", naik: true },
      { label: "Latihan terkumpul", nilai: latihan, delta: "jawaban tersimpan", naik: true },
      { label: "Rata-rata progres", nilai: 72, delta: "sementara", naik: true },
    ];
  }, fallback);
}

export async function getKelasList(guruId?: string) {
  return cobaDb(async () => {
    const kelas = await prisma!.kelas.findMany({
      where: guruId ? { guru_id: guruId } : undefined,
      include: { _count: { select: { bab: true } } },
      orderBy: { createdAt: "asc" },
    });
    return kelas.map((k) => ({
      id: k.id,
      nama: k.nama_kelas,
      jenjang: k.jenjang,
      kode: k.kode_akses,
      jumlahBab: k._count.bab,
    }));
  }, kelassRingkasan);
}