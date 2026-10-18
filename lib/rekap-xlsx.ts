import writeXlsxFile, { type CellObject, type SheetData } from "write-excel-file/node";
import type { RekapLengkap } from "./queries";
import { formatWaktuWIB } from "./queries";

type Gaya = Omit<CellObject, "value" | "type" | "format">;

const sel = (value: string | number, gaya: Gaya = {}): CellObject => ({
  value,
  ...gaya,
});

const GAYA_HEADER: Gaya = {
  fontWeight: "bold",
  backgroundColor: "#E8E6DA",
  align: "left",
  alignVertical: "center",
};
const GAYA_JUDUL: Gaya = { fontWeight: "bold", fontSize: 13 };
const GAYA_SECTION: Gaya = {
  fontWeight: "bold",
  backgroundColor: "#F2F0E6",
  alignVertical: "center",
};
const GAYA_LABEL: Gaya = { fontWeight: "bold" };

/** Perkiraan tinggi baris (poin) agar teks panjang yang di-wrap tetap terbaca. */
function tinggiBaris(teks: string, lebar: number): number {
  const jumlahBaris = Math.max(1, Math.ceil(teks.length / Math.max(1, lebar - 2)));
  return Math.min(48, Math.max(15, jumlahBaris * 14 + 4));
}

/**
 * Susun rekap kelas sebagai file Excel (.xlsx) — ringkas namun informatif:
 *  - Sheet "Ringkasan": info kelas + ringkasan tiap siswa (7 kolom).
 *  - Sheet "Rincian per Bab": semua siswa × semua bab, header dibekukan.
 * Lebar kolom diatur per sheet; tinggi baris menyesuaikan teks yang di-wrap.
 */
export async function bangunXlsxRekap(rekap: RekapLengkap): Promise<Buffer> {
  // ── Sheet 1: Ringkasan ──────────────────────────────────────────
  const ringkasan: SheetData = [];

  ringkasan.push([
    sel("REKAP PROGRESS KELAS", { ...GAYA_JUDUL, columnSpan: 7, height: 24 }),
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const info: [string, string | number][] = [
    ["Kelas", rekap.info.nama_kelas],
    ["Kode Kelas", rekap.info.kode_akses],
    ["Jenjang", rekap.info.jenjang],
    ["Guru", rekap.info.guru_nama],
    ["Tanggal Unduh", `${formatWaktuWIB(new Date())} WIB`],
    ["Jumlah Siswa", rekap.ringkasan.length],
    ["Jumlah Bab", rekap.bab.length],
  ];
  for (const [label, value] of info) {
    ringkasan.push([sel(label, { ...GAYA_LABEL, height: 16 }), sel(value)]);
  }

  ringkasan.push([sel("", { height: 8 })]);
  ringkasan.push([
    sel("RINGKASAN PER SISWA", { ...GAYA_SECTION, columnSpan: 7, height: 20 }),
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  ringkasan.push([
    sel("Nama Siswa", { ...GAYA_HEADER, height: 20 }),
    sel("Bab Selesai", { ...GAYA_HEADER, align: "center" }),
    sel("Bab Dikerjakan", { ...GAYA_HEADER, align: "center" }),
    sel("Persentase", { ...GAYA_HEADER, align: "center" }),
    sel("Rata-rata", { ...GAYA_HEADER, align: "center" }),
    sel("Terbaik", { ...GAYA_HEADER, align: "center" }),
    sel("Terakhir Aktif", { ...GAYA_HEADER }),
  ]);
  for (const s of rekap.ringkasan) {
    ringkasan.push([
      sel(s.nama_siswa, { height: 16 }),
      sel(`${s.bab_selesai}/${s.total_bab}`, { align: "center" }),
      sel(`${s.bab_dikerjakan}/${s.total_bab}`, { align: "center" }),
      sel(`${s.persen}%`, { align: "center" }),
      sel(s.rata_nilai, { align: "center" }),
      sel(s.nilai_terbaik, { align: "center" }),
      sel(s.terakhir_aktif ? formatWaktuWIB(s.terakhir_aktif) : "Belum ada"),
    ]);
  }

  // ── Sheet 2: Rincian semua bab per siswa ────────────────────────
  const rincian: SheetData = [];
  rincian.push([
    sel("Nama Siswa", { ...GAYA_HEADER, height: 22 }),
    sel("Mata Pelajaran", { ...GAYA_HEADER }),
    sel("Bab", { ...GAYA_HEADER }),
    sel("Soal", { ...GAYA_HEADER, align: "center" }),
    sel("Skor", { ...GAYA_HEADER, align: "center" }),
    sel("Status", { ...GAYA_HEADER }),
    sel("Terakhir Mengerjakan", { ...GAYA_HEADER }),
  ]);

  const selMap = new Map(
    rekap.detail.map((d) => [`${d.nama_siswa}__${d.bab_id}`, d])
  );
  for (const s of rekap.ringkasan) {
    for (const b of rekap.bab) {
      const d = selMap.get(`${s.nama_siswa}__${b.id}`);
      const judul = `Bab ${String(b.urutan).padStart(2, "0")} · ${b.judul}`;
      rincian.push([
        sel(s.nama_siswa, { height: tinggiBaris(judul, 42) }),
        sel(b.mata_pelajaran),
        sel(judul, { wrap: true }),
        sel(`${d?.dijawab ?? 0}/${b.total_soal}`, { align: "center" }),
        sel(d ? d.skor : "—", { align: "center" }),
        sel(d ? (d.selesai ? "Selesai" : "Belum selesai") : "Belum dikerjakan"),
        sel(d?.waktu ? formatWaktuWIB(d.waktu) : "—"),
      ]);
    }
  }

  return writeXlsxFile(
    [
      {
        data: ringkasan,
        sheet: "Ringkasan",
        columns: [
          { width: 26 },
          { width: 14 },
          { width: 15 },
          { width: 12 },
          { width: 11 },
          { width: 10 },
          { width: 22 },
        ],
      },
      {
        data: rincian,
        sheet: "Rincian per Bab",
        columns: [
          { width: 20 },
          { width: 18 },
          { width: 42 },
          { width: 9 },
          { width: 7 },
          { width: 18 },
          { width: 20 },
        ],
        stickyRowsCount: 1,
      },
    ],
    { fontFamily: "Calibri", fontSize: 11 }
  ).toBuffer();
}

/** Nama file unduhan: rekap-KODE-tanggal.xlsx */
export function namaFileRekap(kodeAkses: string): string {
  const kode = kodeAkses.replace(/[^A-Za-z0-9]+/g, "").toUpperCase() || "KELAS";
  return `rekap-${kode}-${new Date().toISOString().slice(0, 10)}.xlsx`;
}
