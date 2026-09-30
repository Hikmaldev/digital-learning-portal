import { prisma } from "./lib/prisma";

const k = await prisma.kelas.findMany({
  include: {
    _count: { select: { bab: true } },
    user: { select: { nama: true, email: true } },
  },
});
const ringkas = k.map((x) => ({
  nama: x.nama_kelas,
  jenjang: x.jenjang,
  kode: x.kode_akses,
  guru: x.user?.email,
  bab: x._count.bab,
}));
console.log(JSON.stringify(ringkas, null, 2));

const prog = await prisma.progressSiswa.groupBy({
  by: ["kelas_id"],
  _count: { _all: true },
  _avg: { skor: true },
});
console.log("progress:", JSON.stringify(prog, null, 2));

await prisma.$disconnect();