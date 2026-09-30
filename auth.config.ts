import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

const kredensialSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

/**
 * Auth.js config bersama — dipakai proxy.ts dan auth.ts.
 * Prisma di-import secara dinamis di dalam `authorize` (menjalankan proses
 * Node) supaya proxy yang berjalan di Edge tidak memuat driver Postgres.
 */
export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const valid = kredensialSchema.safeParse(credentials);
        if (!valid.success) return null;

        const { prisma } = await import("@/lib/prisma");
        if (!prisma) return null;

        const user = await prisma.user.findUnique({
          where: { email: valid.data.email.toLowerCase() },
        });
        if (!user) return null;

        const cocok = await bcrypt.compare(
          valid.data.password,
          user.password_hash
        );
        if (!cocok) return null;

        return { id: user.id, name: user.nama, email: user.email };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (token.id) session.user.id = token.id as string;
      return session;
    },
  },
} satisfies NextAuthConfig;