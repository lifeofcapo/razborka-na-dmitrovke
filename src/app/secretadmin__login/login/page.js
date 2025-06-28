'use client'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const { admin, loading, login } = useAdminAuth()
  const router = useRouter()

  useEffect(() => {
    if (admin) router.push('/secretadmin__login/dashboard')
  }, [admin])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    await login({
      email: formData.get('email'),
      password: formData.get('password')
    })
  }

  if (loading) return <div>Проверка авторизации...</div>

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>Вход в админ-панель</h1>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Пароль" required />
        <button type="submit">Войти</button>
      </form>
    </div>
  )
}