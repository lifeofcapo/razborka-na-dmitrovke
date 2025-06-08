'use client'
import { createContext, useContext, useState, useEffect, checkAuth } from 'react'
import { useRouter } from 'next/navigation'

const AdminAuthContext = createContext()

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/5adm0inlog1n0sec6ret/auth')
      const data = await res.json()
      if (data.admin) {
        setAdmin(data.admin)
      } else {
        router.push('/5adm0inlog1n0sec6ret/login')
      }
    } catch (error) {
      router.push('/5adm0inlog1n0sec6ret/login')
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    const res = await fetch('/api/5adm0inlog1n0sec6ret/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
    const data = await res.json()
    if (data.admin) {
      setAdmin(data.admin)
      router.push('/5adm0inlog1n0sec6ret/dashboard')
    }
    return data
  }

  const logout = async () => {
    await fetch('/api/5adm0inlog1n0sec6ret/logout')
    setAdmin(null)
    router.push('/5adm0inlog1n0sec6ret/login')
  }

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => useContext(AdminAuthContext)