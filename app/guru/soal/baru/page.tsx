import type { Metadata } from "next";
import { SoalBaruPage } from "@/components/guru/soal-baru-page";

export const metadata: Metadata = { title: "Buat Latihan Soal" };

export default function SoalBaruRoute() {
  return <SoalBaruPage />;
}