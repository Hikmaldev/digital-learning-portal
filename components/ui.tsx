import type { StatusBab, StatusLatihan } from "@/lib/types";

/** Lencana status "sudah dikerjakan" / belum. Prinsip PRD: elemen visual fungsional. */
export function StatusBadge({ status }: { status: StatusBab | StatusLatihan }) {
  const pending =
    status === "BELUM_MULAI" ||
    status === "SEDANG_BERJALAN" ||
    status === "SEDANG_DIPELAJARI";

  const label = {
    SELESAI: "Selesai",
    SEDANG_DIPELAJARI: "Sedang dipelajari",
    BELUM_MULAI: "Belum mulai",
    SUDAH_MENGERJAKAN: "Selesai",
    SEDANG_BERJALAN: "Sedang berjalan",
  }[status];

  return (
    <span className={pending ? "badge-status badge-status-pending" : "badge-status"}>
      {label}
    </span>
  );
}

/** Bilah progres fungsional dengan pilihan warna. */
export function ProgressBar({
  progres,
  color = "bg-coral",
  className = "h-1.5",
}: {
  progres: number;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`w-full overflow-hidden bg-[#e1e1d8] ${className}`}
      role="progressbar"
      aria-valuenow={progres}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={`h-full ${color}`} style={{ width: `${progres}%` }} />
    </div>
  );
}