import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  MateriBaruPage,
  type MateriAwal,
} from "@/components/guru/materi-baru-page";
import { getGuruSession, guruMemilikiBab } from "@/lib/authorization";
import { getGambarBab } from "@/lib/queries";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Ubah Materi" };

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ babId: string }>;
  searchParams: Promise<{ gambarGagal?: string }>;
}

export default async function UbahMateriRoute({ params, searchParams }: Props) {
  const [{ babId }, { gambarGagal }] = await Promise.all([params, searchParams]);
  const guru = await getGuruSession();
  if (!guru) redirect("/guru/masuk");
  if (!prisma) redirect("/guru/materi");

  // Hanya pemilik bab yang boleh mengubah (kelas harus milik guru ini).
  if (!(await guruMemilikiBab(babId, guru.guruId))) notFound();

  const bab = await prisma.bab.findUnique({
    where: { id: babId },
    select: {
      id: true,
      kelas_id: true,
      mata_pelajaran: true,
      judul: true,
      ringkasan: true,
      konten_materi: true,
      url_video: true,
      link_sumber: true,
      urutan: true,
    },
  });
  if (!bab) notFound();

  const gambar = await getGambarBab(babId);
  const jumlahGagal = Number.parseInt(gambarGagal ?? "", 10);

  return (
    <MateriBaruPage
      materiAwal={bab as MateriAwal}
      kelasIdAwal={bab.kelas_id}
      gambarAwal={gambar}
      pesanAwal={
        jumlahGagal > 0
          ? `${jumlahGagal} gambar gagal diunggah saat menyimpan materi. Coba unggah ulang lewat panel gambar di bawah.`
          : undefined
      }
    />
  );
}
