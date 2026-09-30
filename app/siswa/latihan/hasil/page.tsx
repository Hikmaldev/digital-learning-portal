import type { Metadata } from "next";
import { HasilLatihanPage } from "@/components/siswa/hasil-page";

export const metadata: Metadata = { title: "Hasil Latihan" };

export default function HasilLatihanRoute() {
  return <HasilLatihanPage />;
}