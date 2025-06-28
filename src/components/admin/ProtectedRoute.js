'use client'
import { useAdminAuth } from '@/context/AdminAuthContext'

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAdminAuth()

  if (loading || !admin) {
    return <div>Проверка доступа...</div>
  }

  return children
}