import { prisma } from "./prisma";
import { babSiswa, daftarSiswa, kelasAktif, kelassRingkasan, ringkasanPelajaran, soalLatihan } from "./data";
import { demoMode, DatabaseUnavailableError } from "./runtime";
import type { Bab, Kelas, MetricRingkasan, RingkasanPelajaran, RingkasanSiswa } from "./types";

function requireDb() {
  if (!prisma) {
    if (demoMode) return null;
    throw new DatabaseUnavailableError("Database Neon belum dikonfigurasi atau tidak dapat dijangkau.");
  }
  return prisma;
}

function fallback<T>(value: T): T {
  if (demoMode) return value;
  throw new DatabaseUnavailableError();
}

export async function getKelasAktifDb(): Promise<Kelas> {
  const kelas = await getKelasByKode(kelasAktif.kode_akses);
  return kelas ?? fallback(kelasAktif);
}

export async function getKelasByKode(kode: string, guruId?: string): Promise<Kelas | null> {
  const db = requireDb();
  if (!db) return kode.toUpperCase() === kelasAktif.kode_akses ? kelasAktif : null;
  const kelas = await db.kelas.findFirst({
    where: { kode_akses: kode.toUpperCase(), ...(guruId ? { guru_id: guruId } : {}) },
    select: { id: true, nama_kelas: true, jenjang: true, kode_akses: true, guru_id: true, guru: { select: { nama: true } } },
  });
  if (!kelas) return null;
  return { id: kelas.id, nama_kelas: kelas.nama_kelas, jenjang: kelas.jenjang as Kelas["jenjang"], kode_akses: kelas.kode_akses, guru_id: kelas.guru_id, guru_nama: kelas.guru.nama };
}

export async function getBabList(kelasId: string, namaSiswa?: string): Promise<Bab[]> {
  const db = requireDb();
  if (!db) return fallback(babSiswa);
  const bab = await db.bab.findMany({ where: { kelas_id: kelasId }, include: { _count: { select: { soal: true } } }, orderBy: [{ mata_pelajaran: "asc" }, { urutan: "asc" }] });

  // Progres milik satu siswa (opsional): jumlah soal yang sudah dijawab per bab.
  const progresSiswa = namaSiswa
    ? await db.progressSiswa.groupBy({
        by: ["bab_id"],
        where: { kelas_id: kelasId, nama_siswa: namaSiswa },
        _count: { soal_id: true },
      })
    : [];
  const perBab = new Map<string, number>();
  for (const p of progresSiswa) perBab.set(p.bab_id, p._count.soal_id);

  return bab.map((b) => {
    const totalSoal = b._count.soal;
    const dijawab = perBab.get(b.id) ?? 0;
    const progres = totalSoal > 0 && dijawab > 0 ? Math.min(100, Math.round((dijawab / totalSoal) * 100)) : 0;
    const status: Bab["status"] = dijawab === 0 ? "BELUM_MULAI" : dijawab >= totalSoal ? "SELESAI" : "SEDANG_DIPELAJARI";
    return { id: b.id, kelas_id: b.kelas_id, mata_pelajaran: b.mata_pelajaran, judul: b.judul, ringkasan: b.ringkasan ?? `${totalSoal} latihan tersedia`, konten_materi: b.konten_materi, url_video: b.url_video ?? undefined, link_sumber: b.link_sumber ?? undefined, urutan: b.urutan, jumlah_latihan: totalSoal, progres, status };
  });
}

export interface OpsiDenganBenar { id: string; teks: string; is_benar: boolean; }
export interface SoalDenganBenar { id: string; pertanyaan: string; opsi: OpsiDenganBenar[]; }

export async function getSoalBab(babId: string): Promise<SoalDenganBenar[] | null> {
  const db = requireDb();
  if (!db) {
    const demo = soalLatihan.filter((s) => s.bab_id === babId).map((s) => ({ id: s.id, pertanyaan: s.pertanyaan, opsi: s.opsi.map((o) => ({ id: o.id, teks: o.teks, is_benar: o.is_benar })) }));
    return demo.length > 0 ? demo : null;
  }
  const soal = await db.soal.findMany({ where: { bab_id: babId }, include: { opsi: { orderBy: { id: "asc" } } }, orderBy: { urutan: "asc" } });
  if (soal.length === 0) return null;
  return soal.map((s) => ({ id: s.id, pertanyaan: s.pertanyaan, opsi: s.opsi.map((o) => ({ id: o.id, teks: o.teks, is_benar: o.is_benar })) }));
}

export interface InfoBabLatihan { babId: string; mataPelajaran: string; urutan: number; judul: string; }

export async function getBabLatihan(kodeKelas?: string): Promise<InfoBabLatihan | null> {
  const fallbackBab: InfoBabLatihan = { babId: "bab-bindo-3", mataPelajaran: "Bahasa Indonesia", urutan: 3, judul: "Menemukan gagasan utama" };
  const db = requireDb();
  if (!db) return fallback(fallbackBab);
  const kelas = await db.kelas.findUnique({ where: { kode_akses: (kodeKelas ?? kelasAktif.kode_akses).toUpperCase() }, select: { id: true } });
  if (!kelas) return null;
  const bab = await db.bab.findMany({ where: { kelas_id: kelas.id }, include: { _count: { select: { soal: true } } }, orderBy: { urutan: "asc" } });
  const pilihan = bab.find((b) => b._count.soal > 0 && b.mata_pelajaran === "Bahasa Indonesia") ?? bab.find((b) => b._count.soal > 0);
  if (!pilihan) return null;
  return { babId: pilihan.id, mataPelajaran: pilihan.mata_pelajaran, urutan: pilihan.urutan, judul: pilihan.judul };
}

export async function getRingkasanKelas(kelasId: string): Promise<RingkasanSiswa[]> {
  const db = requireDb();
  if (!db) return fallback(daftarSiswa);
  const [babs, kelompok] = await Promise.all([
    db.bab.findMany({ where: { kelas_id: kelasId }, select: { id: true, judul: true, mata_pelajaran: true, _count: { select: { soal: true } } } }),
    db.progressSiswa.groupBy({
      by: ["nama_siswa", "bab_id"],
      where: { kelas_id: kelasId },
      _count: { soal_id: true },
      _max: { skor: true, waktu_submit: true },
    }),
  ]);
  const infoBab = new Map(babs.map((b) => [b.id, b]));
  const totalWajib = babs.filter((b) => b._count.soal > 0).length;

  // Ringkas per siswa: aktivitas terbaru + jumlah bab yang benar-benar tuntas.
  const perSiswa = new Map<string, { waktu: Date; babId: string; skor: number; selesai: number }>();
  for (const g of kelompok) {
    const bab = infoBab.get(g.bab_id);
    if (!bab) continue;
    const tuntas = bab._count.soal > 0 && g._count.soal_id >= bab._count.soal;
    const waktu = g._max.waktu_submit ?? new Date(0);
    const skor = g._max.skor ?? 0;
    const cur = perSiswa.get(g.nama_siswa);
    if (!cur) {
      perSiswa.set(g.nama_siswa, { waktu, babId: g.bab_id, skor, selesai: tuntas ? 1 : 0 });
    } else {
      cur.selesai += tuntas ? 1 : 0;
      if (waktu > cur.waktu) { cur.waktu = waktu; cur.babId = g.bab_id; cur.skor = skor; }
    }
  }

  return [...perSiswa.entries()]
    .sort(([, a], [, b]) => b.waktu.getTime() - a.waktu.getTime())
    .map(([nama, s]) => {
      const bab = infoBab.get(s.babId);
      return {
        id: nama,
        nama,
        bab_terakhir: bab ? `${bab.mata_pelajaran} · ${bab.judul}` : "—",
        nilai: s.skor,
        status: totalWajib > 0 && s.selesai >= totalWajib ? ("SUDAH_MENGERJAKAN" as const) : ("SEDANG_BERJALAN" as const),
        terakhir_aktif: s.waktu.getTime() === 0 ? "—" : s.waktu.toLocaleString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" }),
      };
    });
}

export async function getRingkasanPelajaranDb(
  guruId?: string
): Promise<RingkasanPelajaran[]> {
  const db = requireDb();
  if (!db) return fallback(ringkasanPelajaran);

  const bab = await db.bab.findMany({
    where: guruId ? { kelas: { guru_id: guruId } } : undefined,
    select: {
      id: true,
      kelas_id: true,
      mata_pelajaran: true,
      _count: { select: { soal: true } },
    },
  });
  if (bab.length === 0) return [];

  // Siswa unik yang sudah mengerjakan tiap bab dan yang aktif di tiap kelas.
  const progres = await db.progressSiswa.groupBy({
    by: ["bab_id", "kelas_id", "nama_siswa"],
    where: { bab_id: { in: bab.map((b) => b.id) } },
  });
  const siswaPerBab = new Map<string, Set<string>>();
  const siswaPerKelas = new Map<string, Set<string>>();
  for (const p of progres) {
    const babSet = siswaPerBab.get(p.bab_id) ?? new Set<string>();
    babSet.add(p.nama_siswa);
    siswaPerBab.set(p.bab_id, babSet);
    const kelasSet = siswaPerKelas.get(p.kelas_id) ?? new Set<string>();
    kelasSet.add(p.nama_siswa);
    siswaPerKelas.set(p.kelas_id, kelasSet);
  }

  const perMapel = new Map<
    string,
    { jumlah_bab: number; jumlah_latihan: number; jumlah_siswa: number; total_progres: number; bab_dihitung: number }
  >();
  for (const b of bab) {
    const kunci = kunciMapel(b.mata_pelajaran);
    const cur =
      perMapel.get(kunci) ??
      { jumlah_bab: 0, jumlah_latihan: 0, jumlah_siswa: 0, total_progres: 0, bab_dihitung: 0 };
    cur.jumlah_bab += 1;
    cur.jumlah_latihan += b._count.soal;
    const murid = siswaPerKelas.get(b.kelas_id);
    if (murid && murid.size > 0) {
      const sudah = siswaPerBab.get(b.id)?.size ?? 0;
      cur.total_progres += Math.round((sudah / murid.size) * 100);
      cur.bab_dihitung += 1;
      cur.jumlah_siswa = Math.max(cur.jumlah_siswa, murid.size);
    }
    perMapel.set(kunci, cur);
  }

  return [...perMapel.entries()].map(([nama, v]) => ({
    mata_pelajaran: nama,
    jumlah_bab: v.jumlah_bab,
    jumlah_latihan: v.jumlah_latihan,
    jumlah_siswa: v.jumlah_siswa,
    progres: v.bab_dihitung > 0 ? Math.round(v.total_progres / v.bab_dihitung) : 0,
  }));
}

function kunciMapel(nama: string): string { return ({ "Ilmu Pengetahuan Alam": "Ilmu Pengetahuan Alam", IPA: "Ilmu Pengetahuan Alam", "Ilmu Pengetahuan Sosial": "Ilmu Pengetahuan Sosial", IPS: "Ilmu Pengetahuan Sosial", "Bahasa Indonesia": "Bahasa Indonesia", Matematika: "Matematika" } as Record<string, string>)[nama] ?? nama; }

export async function getMetrics(kelasId: string): Promise<MetricRingkasan[]> {
  const db = requireDb();
  const demo: MetricRingkasan[] = [{ label: "Siswa aktif", nilai: 24, delta: "3 sejak minggu lalu", naik: true }, { label: "Latihan terkumpul", nilai: 86, delta: "12 minggu ini", naik: true }, { label: "Rata-rata progres", nilai: 72, delta: "8% sejak bulan lalu", naik: true }];
  if (!db) return fallback(demo);
  const [siswa, latihan, rata] = await Promise.all([
    db.progressSiswa.groupBy({ by: ["nama_siswa"], where: { kelas_id: kelasId } }),
    db.progressSiswa.count({ where: { kelas_id: kelasId } }),
    getProgressRataKelas(kelasId),
  ]);
  return [{ label: "Siswa aktif", nilai: siswa.length, delta: "dari kelas ini", naik: true }, { label: "Latihan terkumpul", nilai: latihan, delta: "jawaban tersimpan", naik: true }, { label: "Rata-rata progres", nilai: rata ?? 0, delta: rata === null ? "belum ada latihan" : "rata-rata nilai latihan", naik: true }];
}

export async function getProgressRataKelas(kelasId: string): Promise<number | null> {
  const db = requireDb();
  if (!db) return null;
  const agg = await db.progressSiswa.aggregate({ where: { kelas_id: kelasId }, _count: { _all: true }, _avg: { skor: true } });
  return agg._count._all === 0 ? null : Math.round(agg._avg.skor ?? 0);
}

export async function getKelasList(guruId?: string) {
  const db = requireDb();
  if (!db) return fallback(kelassRingkasan);
  const kelas = await db.kelas.findMany({ where: guruId ? { guru_id: guruId } : undefined, include: { _count: { select: { bab: true } } }, orderBy: { createdAt: "asc" } });
  return kelas.map((k) => ({ id: k.id, nama: k.nama_kelas, jenjang: k.jenjang, kode: k.kode_akses, jumlahBab: k._count.bab }));
}
