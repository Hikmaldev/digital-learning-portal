"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FooterSimple } from "../footer-simple";
import { TopBar } from "../top-bar";
import { StatusBadge } from "../ui";
import { useSessionState } from "@/lib/session-state";
import { babSiswa, kelasAktif, namaSiswaDemo } from "@/lib/data";
import { bacaKodeKelas } from "@/lib/siswa-session";
import type { Bab, Kelas } from "@/lib/types";

interface DataKelas {
  kelas: Kelas;
  bab: Bab[];
}

export function SiswaKelasPage() {
  const [nama] = useSessionState("rb_nama_siswa", namaSiswaDemo);
  const [data, setData] = useState<DataKelas | null>(null);

  useEffect(() => {
    const kode = bacaKodeKelas() ?? kelasAktif.kode_akses;
    fetch(`/api/siswa/kelas?kode=${encodeURIComponent(kode)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json?.ok && json.data) {
          setData({ kelas: json.data.kelas, bab: json.data.bab });
        }
      })
      .catch(() => {
        /* pakai data contoh */
      });
  }, []);

  const kelas = data?.kelas ?? kelasAktif;
  const bab = data?.bab ?? babSiswa;

  const selesai = bab.filter((b) => b.status === "SELESAI").length;
  const total = bab.length;
  const prosentase = total === 0 ? 0 : Math.round((selesai / total) * 100);

  const kodeParam = `?kode=${encodeURIComponent(kelas.kode_akses)}`;
  const [kataDepan, kataAkhir] = (() => {
    const kata = kelas.nama_kelas.trim().split(/\s+/).filter(Boolean);
    if (kata.length <= 1) return ["", kata[0] ?? kelas.nama_kelas];
    return [kata.slice(0, -1).join(" "), kata[kata.length - 1]];
  })();

  return (
    <>
      <TopBar
        nav={[
          { href: "/siswa/kelas", label: "Kelas saya", aktif: true },
          { href: `/siswa/materi${kodeParam}`, label: "Materi" },
          { href: `/siswa/latihan${kodeParam}`, label: "Latihan" },
        ]}
        aksi={{ href: "/", label: "Keluar" }}
      />
      <header className="border-b border-line bg-soft px-5 py-9 md:px-10">
        <div className="mx-auto flex max-w-[1104px] flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow eyebrow-muted mb-2.5">
              Selamat datang kembali, {nama}
            </p>
            <h1 className="text-[39px] leading-none tracking-[-2px] md:text-[42px]">
              {kataDepan}
              {kataDepan ? " " : ""}
              <em className="font-display text-coral">{kataAkhir}.</em>
            </h1>
            <p className="mt-2.5 text-xs text-muted">
              {kelas.jenjang} · {kelas.guru_nama}
            </p>
          </div>
          <div className="inline-flex items-center gap-2.5 bg-ink px-3 py-2 text-xs text-paper">
            <span>KODE KELAS</span>
            <strong className="text-base tracking-[2px] text-yellow">
              {kelas.kode_akses}
            </strong>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1180px] px-5 py-10 md:px-10 md:py-12">
        <div className="mb-8 grid grid-cols-1 items-center gap-7 md:grid-cols-[1fr_220px]">
          <div>
            <p className="eyebrow eyebrow-muted mb-2">Ringkasan belajarmu</p>
            <h2 className="mb-2 text-2xl tracking-tight">
              Teruskan langkah kecilmu.
            </h2>
            <p className="text-xs text-muted">
              Kamu sudah menyelesaikan {selesai} dari {total} bab. Sedikit lagi
              sampai selesai!
            </p>
            <div className="mt-4 h-[9px] w-full bg-[#d8dcd1]">
              <div
                className="h-full bg-coral"
                style={{ width: `${prosentase}%` }}
              />
            </div>
          </div>
          <div className="border-t border-line pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <strong className="block text-[43px] leading-none tracking-[-3px]">
              {prosentase}%
            </strong>
            <span className="text-[11px] text-muted">
              progres keseluruhan
            </span>
          </div>
        </div>

        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="eyebrow eyebrow-muted mb-2">Semua pelajaran</p>
            <h2 className="text-2xl tracking-tight">
              Pilih bab yang ingin dipelajari.
            </h2>
          </div>
          <p className="mb-1 hidden text-[11px] text-muted md:block">
            {total} bab
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {bab.map((item: Bab) => (
            <Link
              key={item.id}
              href={`/siswa/materi?id=${item.id}&kode=${encodeURIComponent(kelas.kode_akses)}`}
              className="group flex min-h-[206px] flex-col border border-line bg-paper p-6 hover:border-coral"
            >
              <span className="text-[10px] font-bold tracking-[1px] text-coral">
                {item.mata_pelajaran}
              </span>
              <h3 className="mt-5 mb-2.5 text-lg leading-tight tracking-tight">
                {item.judul}
              </h3>
              <p className="min-h-9 text-[11px] text-muted">{item.ringkasan}</p>
              <div className="mt-auto flex items-center justify-between pt-4">
                <StatusBadge status={item.status} />
                <b className="text-[10px]">{item.progres}%</b>
              </div>
              {item.progres > 0 && (
                <div className="mt-2 h-1 w-full bg-[#deded4]">
                  <div
                    className="h-full bg-ink"
                    style={{ width: `${item.progres}%` }}
                  />
                </div>
              )}
            </Link>
          ))}
        </div>
      </main>
      <FooterSimple />
    </>
  );
}