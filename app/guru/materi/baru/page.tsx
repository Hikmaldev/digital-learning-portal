import type { Metadata } from "next";
import { MateriBaruPage } from "@/components/guru/materi-baru-page";

export const metadata: Metadata = { title: "Buat Materi" };

export default function MateriBaruRoute() {
  return <MateriBaruPage />;
}