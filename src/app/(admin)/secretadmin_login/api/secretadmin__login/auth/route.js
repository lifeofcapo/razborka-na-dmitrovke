import { getSession } from '@/lib/session'

export async function GET() {
  const session = await getSession()
  
  if (!session || session.role !== 'admin') {
    return Response.json({ admin: null })
  }

  const admin = await prisma.admin.findUnique({
    where: { id: session.userId },
    select: { id: true, email: true }
  })

  return Response.json({ admin })
}