/**
 * Demo data must be opt-in. Production deployments always use Neon as the
 * source of truth, even when DATABASE_URL is missing or temporarily down.
 */
export const demoMode =
  process.env.NODE_ENV !== "production" && process.env.DEMO_MODE === "true";

export const publicDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export class DatabaseUnavailableError extends Error {
  constructor(message = "Database Neon tidak tersedia.") {
    super(message);
    this.name = "DatabaseUnavailableError";
  }
}
