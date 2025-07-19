import prisma from "@/lib/prisma";
export async function GET() {
  try {
    const test = await prisma.$queryRaw`SELECT 1`;
    return Response.json({ success: true, test });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}
