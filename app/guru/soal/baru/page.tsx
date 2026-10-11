import type { Metadata } from "next";
import { SoalBaruPage } from "@/components/guru/soal-baru-page";

export const metadata: Metadata = { title: "Buat Latihan Soal" };

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ kelasId?: string }>;
}

export default async function SoalBaruRoute({ searchParams }: Props) {
  const { kelasId } = await searchParams;
  return <SoalBaruPage kelasIdAwal={kelasId} />;
}
