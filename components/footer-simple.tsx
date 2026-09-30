import { Brand } from "./brand";

/** Footer ringkas untuk halaman dalam aplikasi. */
export function FooterSimple() {
  return (
    <footer className="mt-auto flex items-center justify-between border-t border-line bg-cream px-[5vw] py-5 text-[10px] text-muted lg:px-[6.5vw]">
      <Brand className="text-[15px]" />
      <span>Portal Belajar Digital · 2026</span>
    </footer>
  );
}