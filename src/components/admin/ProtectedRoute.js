'use client'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAdminAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !admin) {
      router.push('/5adm0inlog1n0sec6ret/login')
    }
  }, [admin, loading])

  if (loading || !admin) {
    return <div>Проверка доступа...</div>
  }

  return children
}