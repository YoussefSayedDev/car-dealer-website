import { PrismaClient } from "@prisma/client";
import { seedTaxnomy } from "./taxnomy.seed";

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRaw`TRUNCATE TABLE "makes", "models" RESTART IDENTITY CASCADE;`;
  await seedTaxnomy(prisma);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
