import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
export async function GET() {
  const categories = await prisma.category.findMany();
  const brands = await prisma.carBrand.findMany({ include: { models: true } });
  return NextResponse.json({ categories, brands });
}

// Для получения категорий и брендов из призмы
// Мб убрать в будущем
