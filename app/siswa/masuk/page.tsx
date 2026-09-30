import type { Metadata } from "next";
import { FooterSimple } from "@/components/footer-simple";
import { StudentEntryForm } from "@/components/siswa/student-entry-form";
import { TopBar } from "@/components/top-bar";

export const metadata: Metadata = { title: "Masuk Kelas" };

interface Props {
  searchParams: Promise<{ kode?: string }>;
}

export default async function SiswaMasukPage({ searchParams }: Props) {
  const params = await searchParams;
  const kodeAwal = params.kode ?? "";

  return (
    <>
      <TopBar
        nav={[]}
        aksi={{ href: "/guru/masuk", label: "Masuk sebagai guru" }}
      />
      <main className="grid min-h-[calc(100vh-74px)] place-items-center px-5 py-14">
        <div className="w-full max-w-[490px]">
          <div className="panel p-7 md:p-9">
            <div className="mb-6 grid size-[54px] place-items-center bg-yellow text-2xl">
              ⌁
            </div>
            <p className="eyebrow mb-3.5">Ruang belajar siswa</p>
            <h1 className="mb-4 text-[39px] leading-[1.05] tracking-[-2px]">
              Masuk ke kelasmu.
            </h1>
            <p className="mb-7 text-sm leading-relaxed text-muted">
              Minta kode kelas dari gurumu, lalu masukkan di bawah. Tidak perlu
              membuat akun atau mengingat password.
            </p>
            <StudentEntryForm kodeAwal={kodeAwal} />
          </div>
          <p className="mt-5 text-center text-[10px] text-muted">
            Data siswa hanya digunakan untuk mencatat progres latihan di kelas
            ini.
          </p>
        </div>
      </main>
      <FooterSimple />
    </>
  );
}