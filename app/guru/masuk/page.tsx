import type { Metadata } from "next";
import { GuruLoginPage } from "@/components/guru/login-page";

export const metadata: Metadata = { title: "Masuk Guru" };

export default function GuruMasukPage() {
  return <GuruLoginPage />;
}