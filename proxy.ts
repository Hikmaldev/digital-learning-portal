import { auth } from "@/auth";

/**
 * Proxy (pengganti Middleware di Next.js 16) — lindungi halaman kelola guru.
 * Siswa tetap bisa masuk tanpa akun (PRD §4); hanya halaman guru yang dijaga.
 */
export const proxy = auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/guru/masuk") {
    const newUrl = new URL("/guru/masuk", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/guru/materi/:path*", "/guru/soal/:path*"],
};