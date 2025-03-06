import { PrismaClient } from "@prisma/client";
import { seedClassified } from "./classifieds.seed";
import { seedImages } from "./images.seed";
import { seedTaxnomy } from "./taxnomy.seed";

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRaw`TRUNCATE TABLE "makes", "models" RESTART IDENTITY CASCADE;`;
  await seedTaxnomy(prisma);
  await seedClassified(prisma);
  await seedImages(prisma);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
