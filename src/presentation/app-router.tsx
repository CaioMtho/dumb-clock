import { Navigate, Route, Routes } from 'react-router-dom'

import DashboardPage from '@/presentation/dashboard/pages/dashboard-page'
import LoginPage from '@/presentation/auth/pages/login-page'
import { getAuthenticatedUser } from '@/presentation/session'

function ProtectedDashboardRoute() {
  const authenticatedUser = getAuthenticatedUser()

  if (!authenticatedUser) {
    return <Navigate replace to="/login" />
  }

  return <DashboardPage user={authenticatedUser} />
}

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Navigate replace to="/login" />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<ProtectedDashboardRoute />} path="/dashboard" />
      <Route element={<Navigate replace to="/login" />} path="*" />
    </Routes>
  )
}
