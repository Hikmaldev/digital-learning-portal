import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  MateriBaruPage,
  type MateriAwal,
} from "@/components/guru/materi-baru-page";
import { getGuruSession, guruMemilikiBab } from "@/lib/authorization";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Ubah Materi" };

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ babId: string }>;
}

export default async function UbahMateriRoute({ params }: Props) {
  const { babId } = await params;
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

  return (
    <MateriBaruPage
      materiAwal={bab as MateriAwal}
      kelasIdAwal={bab.kelas_id}
    />
  );
}
