import type { RekapLengkap } from "./queries";
import { formatWaktuWIB } from "./queries";

/** Bungkus nilai CSV agar aman untuk pemisah ; dan tanda kutip. */
export function kolomCsv(nilai: string | number): string {
  const teks = String(nilai);
  return /[";\r\n]/.test(teks) ? `"${teks.replace(/"/g, '""')}"` : teks;
}

/**
 * Susun isi CSV rekap kelas (tiga bagian):
 *  1. Info kelas + waktu unduh.
 *  2. Ringkasan per siswa (bab selesai, persentase, rata-rata & nilai terbaik).
 *  3. Rincian semua bab untuk setiap siswa (termasuk yang belum dikerjakan).
 *
 * Pemisah ";" supaya rapi dibuka di Excel Indonesia (route menambahkan BOM).
 */
export function bangunCsvRekap(rekap: RekapLengkap): string {
  const baris: string[] = [];

  // ── Bagian 1: info kelas ─────────────────────────────────────────
  baris.push("REKAP PROGRESS KELAS");
  baris.push(`Kelas;${kolomCsv(rekap.info.nama_kelas)}`);
  baris.push(`Kode Kelas;${kolomCsv(rekap.info.kode_akses)}`);
  baris.push(`Jenjang;${kolomCsv(rekap.info.jenjang)}`);
  baris.push(`Guru;${kolomCsv(rekap.info.guru_nama)}`);
  baris.push(`Tanggal Unduh;${kolomCsv(formatWaktuWIB(new Date()) + " WIB")}`);
  baris.push(`Jumlah Siswa;${rekap.ringkasan.length}`);
  baris.push(`Jumlah Bab;${rekap.bab.length}`);
  baris.push("");

  // ── Bagian 2: ringkasan per siswa ────────────────────────────────
  baris.push("RINGKASAN PER SISWA");
  baris.push(
    [
      "Nama Siswa",
      "Bab Selesai",
      "Total Bab",
      "Persentase Selesai",
      "Rata-rata Nilai",
      "Nilai Terbaik",
      "Bab Dikerjakan",
      "Terakhir Aktif",
    ].join(";")
  );
  for (const s of rekap.ringkasan) {
    baris.push(
      [
        kolomCsv(s.nama_siswa),
        s.bab_selesai,
        s.total_bab,
        `${s.persen}%`,
        s.rata_nilai,
        s.nilai_terbaik,
        s.bab_dikerjakan,
        kolomCsv(s.terakhir_aktif ? formatWaktuWIB(s.terakhir_aktif) : "Belum ada"),
      ].join(";")
    );
  }
  baris.push("");

  // ── Bagian 3: rincian semua bab per siswa ────────────────────────
  baris.push("RINCIAN PER BAB (semua siswa x semua bab)");
  baris.push(
    [
      "Nama Siswa",
      "Mata Pelajaran",
      "Bab",
      "Soal Dijawab",
      "Total Soal",
      "Skor",
      "Status",
      "Terakhir Mengerjakan",
    ].join(";")
  );
  const sel = new Map(rekap.detail.map((d) => [`${d.nama_siswa}__${d.bab_id}`, d]));
  for (const s of rekap.ringkasan) {
    for (const b of rekap.bab) {
      const d = sel.get(`${s.nama_siswa}__${b.id}`);
      baris.push(
        [
          kolomCsv(s.nama_siswa),
          kolomCsv(b.mata_pelajaran),
          kolomCsv(`Bab ${String(b.urutan).padStart(2, "0")} · ${b.judul}`),
          d?.dijawab ?? 0,
          b.total_soal,
          d ? d.skor : "",
          d ? (d.selesai ? "Selesai" : "Belum selesai") : "Belum dikerjakan",
          kolomCsv(d?.waktu ? formatWaktuWIB(d.waktu) : "—"),
        ].join(";")
      );
    }
  }

  return baris.join("\r\n");
}

/** Nama file unduhan: rekap-KODE-tanggal.csv */
export function namaFileRekap(kodeAkses: string): string {
  const kode = kodeAkses.replace(/[^A-Za-z0-9]+/g, "").toUpperCase() || "KELAS";
  return `rekap-${kode}-${new Date().toISOString().slice(0, 10)}.csv`;
}
