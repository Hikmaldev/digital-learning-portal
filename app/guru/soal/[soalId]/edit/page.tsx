import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  UbahSoalPage,
} from "@/components/guru/ubah-soal-page";
import { getGuruSession, guruMemilikiSoal } from "@/lib/authorization";
import { getSoalUntukEdit } from "@/lib/queries";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Ubah Soal" };

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ soalId: string }>;
}

export default async function UbahSoalRoute({ params }: Props) {
  const { soalId } = await params;
  const guru = await getGuruSession();
  if (!guru) redirect("/guru/masuk");
  if (!prisma) redirect("/guru/soal");

  // Hanya pemilik soal (lewat bab → kelas) yang boleh mengubah.
  if (!(await guruMemilikiSoal(soalId, guru.guruId))) notFound();

  const soal = await getSoalUntukEdit(soalId);
  if (!soal) notFound();

  return (
    <UbahSoalPage
      soalAwal={{ id: soal.id, pertanyaan: soal.pertanyaan, opsi: soal.opsi }}
      kelasId={soal.bab.kelas_id}
      kelasKode={soal.bab.kelas.kode_akses}
      kelasNama={soal.bab.kelas.nama_kelas}
      babId={soal.bab_id}
      babJudul={soal.bab.judul}
      babUrutan={soal.bab.urutan}
      mapel={soal.bab.mata_pelajaran}
      nomor={soal.urutan}
    />
  );
}
