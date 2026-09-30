import Link from "next/link";

/** Logo "ruang belajar" dengan mark tiga kolom miring. */
export function Brand({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 text-[19px] font-bold tracking-tight no-underline ${className}`}
      aria-label="Ruang Belajar beranda"
    >
      <BrandMark />
      <span>
        ruang<span className="text-coral">belajar</span>
      </span>
    </Link>
  );
}

export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex w-[25px] -skew-x-9 items-end gap-0.5"
    >
      <i className="block h-3 w-1.5 rounded-t-sm bg-yellow" />
      <i className="block h-[18px] w-1.5 rounded-t-sm bg-coral" />
      <i
        className={`block h-[15px] w-1.5 rounded-t-sm ${
          inverse ? "bg-paper" : "bg-ink"
        }`}
      />
    </span>
  );
}