import type { Metadata } from "next";
import { SiswaKelasPage } from "@/components/siswa/kelas-page";

export const metadata: Metadata = { title: "Kelas Harapan Bersama" };

export default function KelasSiswaPage() {
  return <SiswaKelasPage />;
}