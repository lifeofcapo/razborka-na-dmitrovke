'use client'
import { useAdminAuth } from '@/context/AdminAuthContext'
import ProtectedRoute from '@/components/admin/ProtectedRoute'

export default function Dashboard() {
  const { admin } = useAdminAuth()

  return (
    <ProtectedRoute>
      <div className="admin-dashboard">
        <h1>Добро пожаловать, {admin?.email}</h1>
        {/* Контент панели */}
      </div>
    </ProtectedRoute>
  )
}