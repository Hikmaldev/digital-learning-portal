import Link from "next/link";
import { Brand } from "./brand";

export interface NavItem {
  href: string;
  label: string;
  aktif?: boolean;
}

interface TopBarProps {
  nav: NavItem[];
  aksi?: { href: string; label: string };
}

/** Bar navigasi atas untuk area siswa & guru. */
export function TopBar({ nav, aksi }: TopBarProps) {
  return (
    <header className="border-b border-ink/15 bg-cream px-[5vw] lg:px-[6.5vw]">
      <div className="flex h-[74px] items-center justify-between">
        <Brand />
        <nav className="mr-8 hidden items-center gap-7 text-xs text-muted md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.aktif ? "font-bold text-ink" : "hover:text-ink"}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {aksi && (
          <Link href={aksi.href} className="text-xs font-bold hover:text-coral">
            {aksi.label} <span className="text-coral">↗</span>
          </Link>
        )}
      </div>
      {/* Nav mobile: baris kedua, scroll horizontal, selalu terlihat di HP */}
      {nav.length > 0 && (
        <nav
          aria-label="Menu utama"
          className="flex gap-6 overflow-x-auto pb-3 text-xs text-muted md:hidden"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap ${
                item.aktif ? "font-bold text-ink" : "hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}