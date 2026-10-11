import type { Metadata } from "next";
import { MateriBaruPage } from "@/components/guru/materi-baru-page";

export const metadata: Metadata = { title: "Buat Materi" };

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ kelasId?: string }>;
}

export default async function MateriBaruRoute({ searchParams }: Props) {
  const { kelasId } = await searchParams;
  return <MateriBaruPage kelasIdAwal={kelasId} />;
}
