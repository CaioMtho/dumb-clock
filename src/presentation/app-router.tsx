import { Navigate, Route, Routes } from 'react-router-dom'

import LoginPage from '@/presentation/auth/pages/login-page'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Navigate replace to="/login" />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<Navigate replace to="/login" />} path="*" />
    </Routes>
  )
}
