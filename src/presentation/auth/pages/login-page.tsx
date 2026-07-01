import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import AuthField from '@/presentation/auth/components/auth-field'
import LoginShell from '@/presentation/auth/components/login-shell'
import LoginBrandPanel from '@/presentation/auth/components/login-brand-panel'
import PasswordField from '@/presentation/auth/components/password-field'
import { Button } from '@/presentation/shared/components'
import { LoginIcon, UserIcon } from '@/presentation/icons'
import { useDeps } from '@/presentation/deps'
import {
  getAuthenticatedUser,
  setAuthenticatedUser,
} from '@/presentation/session'

export default function LoginPage() {
  const authenticateUserCommandHandler = useDeps('authenticateUserCommandHandler')
  const getUserQueryHandler = useDeps('getUserQueryHandler')
  const navigate = useNavigate()
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const authenticatedUser = getAuthenticatedUser()

  if (authenticatedUser) {
    return <Navigate replace to="/dashboard" />
  }

  return (
    <LoginShell>
      <section className="grid w-full overflow-hidden rounded-[22px] border border-[#4b4d62]/70 bg-[#282a36] shadow-[0_30px_90px_rgba(0,0,0,0.45)] lg:grid-cols-2">
        <div className="flex items-center justify-center border-b border-[#4b4d62]/70 px-6 py-12 sm:px-10 lg:border-b-0 lg:border-r">
          <form
            aria-label="Formulário de login"
            className="flex w-full max-w-72.5 flex-col gap-4"
            onSubmit={async (event) => {
              event.preventDefault()

              const formData = new FormData(event.currentTarget)
              const username = String(formData.get('username') ?? '')
              const password = String(formData.get('password') ?? '')

              if (!username || !password) {
                setFeedbackMessage('Preencha usuário e senha.')
                return
              }

              const isAuthenticated = await authenticateUserCommandHandler.handle({
                username,
                password,
              })

              if (!isAuthenticated) {
                setFeedbackMessage('Usuário ou senha inválidos.')
                return
              }

              const user = await getUserQueryHandler.handle({ username })

              if (!user) {
                setFeedbackMessage('Usuário autenticado não encontrado.')
                return
              }

              setAuthenticatedUser({
                id: user.id,
                username: user.username,
                displayName: user.displayName ?? null,
                role: user.role,
                requiredHours: user.requiredHours,
              })
              navigate('/dashboard', { replace: true })
            }}
          >
            <header className="space-y-2">
              <h1 className="text-[22px] font-medium tracking-[-0.02em] text-[#f8f8f2]">
                Bom dia 👋
              </h1>
              <p className="text-sm leading-6 text-[#6272a4]">
                Vamos bater ponto?
              </p>
            </header>

            <fieldset className="grid gap-3">
              <legend className="sr-only">Credenciais de acesso</legend>

              <AuthField label="Usuário">
                {({ inputId }) => (
                  <div className="flex overflow-hidden rounded-lg border border-[#4b4d62] bg-[#1e1f29]">
                    <span className="pointer-events-none flex items-center border-r border-[#4b4d62] px-3 text-[#6272a4]">
                      <UserIcon className="h-5 w-5" />
                    </span>
                    <input
                      autoComplete="username"
                      className="input h-11 min-w-0 flex-1 border-0 bg-transparent text-[#f8f8f2] placeholder:text-[#6272a4] focus:outline-none"
                      id={inputId}
                      name="username"
                      placeholder="joao.silva"
                      type="text"
                    />
                  </div>
                )}
              </AuthField>

              <PasswordField
                autoComplete="current-password"
                label="Senha"
                name="password"
                placeholder="••••••••"
              />
            </fieldset>

            {feedbackMessage ? (
              <p aria-live="polite" className="text-sm leading-6 text-[#f8f8f2]">
                {feedbackMessage}
              </p>
            ) : null}

            <Button className="shadow-[0_12px_30px_rgba(189,147,249,0.22)]" fullWidth type="submit" variant="primary">
              <LoginIcon className="h-5 w-5" />
              Entrar
            </Button>
          </form>
        </div>

        <LoginBrandPanel />
      </section>
    </LoginShell>
  )
}
