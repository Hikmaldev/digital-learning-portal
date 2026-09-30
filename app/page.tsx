import type { Metadata } from "next";
import {
  ActiveClassSection,
  Hero,
  LandingFooter,
  LandingHeader,
  QuickBenefits,
  TeacherSection,
} from "@/components/landing/landing-sections";

export const metadata: Metadata = {
  title: "Ruang Belajar — Portal Belajar Digital",
  description:
    "Materi ringkas, latihan soal, dan progres belajar untuk kelas kesetaraan Paket A, B, dan C.",
};

export default function HomePage() {
  return (
    <>
      <LandingHeader />
      <main>
        <Hero />
        <QuickBenefits />
        <ActiveClassSection />
        <TeacherSection />
      </main>
      <LandingFooter />
    </>
  );
}