import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function makePrismaClient() {
  return new PrismaClient({ log: ["error", "warn", "info"] });
}

export const prisma = globalForPrisma.prisma || makePrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
