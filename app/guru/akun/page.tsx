import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AkunPage } from "@/components/guru/akun-page";
import { getGuruSession } from "@/lib/authorization";

export const metadata: Metadata = { title: "Akun Guru" };

export const dynamic = "force-dynamic";

export default async function AkunGuruRoute() {
  const guru = await getGuruSession();
  if (!guru) redirect("/guru/masuk");
  return (
    <AkunPage
      nama={guru.session.user.name ?? "Guru"}
      email={guru.session.user.email ?? ""}
    />
  );
}
