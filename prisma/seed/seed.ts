import { PrismaClient } from "@prisma/client";
import { seedImages } from "./images.seed";

const prisma = new PrismaClient();

async function main() {
  // await prisma.$executeRaw`TRUNCATE TABLE "makes", "models" RESTART IDENTITY CASCADE;`;
  // await seedTaxnomy(prisma);
  // await seedClassified(prisma);
  await seedImages(prisma);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
