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
    <header className="flex h-[74px] items-center justify-between border-b border-ink/15 bg-cream px-[5vw] lg:px-[6.5vw]">
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
    </header>
  );
}