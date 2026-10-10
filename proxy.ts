import { auth } from "@/auth";

/**
 * Proxy (pengganti Middleware di Next.js 16) — lindungi halaman kelola guru.
 * Siswa tetap bisa masuk tanpa akun (PRD §4); hanya halaman guru yang dijaga.
 */
export const proxy = auth((req) => {
  const demoMode = process.env.NODE_ENV !== "production" && process.env.DEMO_MODE === "true";
  if (!req.auth && !demoMode && req.nextUrl.pathname !== "/guru/masuk") {
    const newUrl = new URL("/guru/masuk", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/guru/:path*"],
};