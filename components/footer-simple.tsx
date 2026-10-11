import Link from "next/link";
import { Brand } from "./brand";

/** Footer ringkas untuk halaman dalam aplikasi. */
export function FooterSimple() {
  return (
    <footer className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-line bg-cream px-[5vw] py-5 text-[10px] text-muted lg:px-[6.5vw]">
      <Brand className="text-[15px]" />
      <span className="flex flex-wrap items-center gap-4">
        <Link href="/panduan/siswa" className="hover:text-ink">
          Panduan siswa
        </Link>
        <Link href="/panduan/guru" className="hover:text-ink">
          Panduan guru
        </Link>
        <span>Portal Belajar Digital · 2026</span>
      </span>
    </footer>
  );
}