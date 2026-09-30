import { NextResponse } from "next/server";

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true as const, data }, init);
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json(
    { ok: false as const, error: message },
    { status }
  );
}

export async function bacaBodyUtf8(request: Request): Promise<unknown> {
  // Payload form siswa berukuran kecil, plain JSON cukup.
  const text = await request.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}