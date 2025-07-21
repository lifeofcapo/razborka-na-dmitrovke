import { PrismaClient } from "@prisma/client";

declare global {
  // чтобы TS не ругался на расширение глобального объекта
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
