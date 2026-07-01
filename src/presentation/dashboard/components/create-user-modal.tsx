import { useMemo, useState } from 'react'

import AuthField from '@/presentation/auth/components/auth-field'
import PasswordField from '@/presentation/auth/components/password-field'
import { UserIcon } from '@/presentation/icons'

export type CreateUserFormInput = {
  username: string
  displayName?: string | null
  password: string
  role: 'admin' | 'collaborator'
  requiredHours?: number
}

type CreateUserModalProps = {
  isOpen: boolean
  onClose: () => void
  onCreate: (input: CreateUserFormInput) => Promise<void>
}

const defaultRequiredHoursByRole: Record<CreateUserFormInput['role'], string> = {
  admin: '',
  collaborator: '8',
}

export function CreateUserModal({ isOpen, onClose, onCreate }: CreateUserModalProps) {
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [role, setRole] = useState<CreateUserFormInput['role']>('collaborator')
  const [requiredHours, setRequiredHours] = useState(defaultRequiredHoursByRole.collaborator)
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const requiredHoursHint = useMemo(() => {
    if (role === 'admin') {
      return 'Para administradores, o campo pode ficar vazio.'
    }

    return 'Carga horária diária esperada. Ex.: 8'
  }, [role])

  if (!isOpen) {
    return null
  }

  return (
    <dialog className="modal modal-open px-4" open>
      <div className="modal-box w-full max-w-xl border border-[#4b4d62]/70 bg-[#282a36] p-0 text-[#f8f8f2] shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
        <header className="flex items-start justify-between gap-3 border-b border-[#4b4d62]/70 bg-[#1e1f29] px-6 py-4">
          <div>
            <h2 className="text-lg font-medium tracking-[-0.02em]" id="create-user-modal-title">
              Criar usuário
            </h2>
            <p className="mt-1 text-xs text-[#6272a4]">
              Novo acesso para dashboard local
            </p>
          </div>
          <button
            aria-label="Fechar modal de criar usuário"
            className="btn btn-sm border-[#4b4d62] bg-transparent text-[#6272a4] hover:border-[#bd93f9] hover:bg-[#bd93f9]/10 hover:text-[#bd93f9]"
            disabled={isSubmitting}
            onClick={onClose}
            type="button"
          >
            Fechar
          </button>
        </header>

        <form
          aria-labelledby="create-user-modal-title"
          className="grid gap-4 px-6 py-5"
          onSubmit={async (event) => {
            event.preventDefault()
            const formData = new FormData(event.currentTarget)
            const password = String(formData.get('create-user-password') ?? '')

            const normalizedUsername = username.trim()
            const normalizedDisplayName = displayName.trim()
            const normalizedPassword = password.trim()
            const normalizedRequiredHours = requiredHours.trim()

            if (!normalizedUsername || !normalizedPassword) {
              setFeedbackMessage('Preencha usuário e senha.')
              return
            }

            const parsedRequiredHours = normalizedRequiredHours === ''
              ? undefined
              : Number(normalizedRequiredHours)

            if (
              parsedRequiredHours !== undefined
              && (!Number.isFinite(parsedRequiredHours)
                || parsedRequiredHours <= 0
                || parsedRequiredHours > 24)
            ) {
              setFeedbackMessage('Carga horária deve ser um número entre 0 e 24.')
              return
            }

            setIsSubmitting(true)
            setFeedbackMessage(null)

            try {
              await onCreate({
                username: normalizedUsername,
                displayName: normalizedDisplayName || null,
                password: normalizedPassword,
                role,
                requiredHours: parsedRequiredHours,
              })
            } catch (error) {
              if (error instanceof Error && error.message.trim()) {
                setFeedbackMessage(error.message)
              } else {
                setFeedbackMessage('Não foi possível criar o usuário.')
              }
            } finally {
              setIsSubmitting(false)
            }
          }}
        >
          <fieldset className="grid gap-3" disabled={isSubmitting}>
            <legend className="sr-only">Dados do novo usuário</legend>

            <AuthField label="Usuário" hint="Usado no login. Evite espaços e duplicidade.">
              {({ inputId, hintId }) => (
                <div className="flex w-full items-stretch overflow-hidden rounded-lg border border-[#4b4d62] bg-[#1e1f29]">
                  <div className="flex items-center border-r border-[#4b4d62] px-3 text-[#6272a4]">
                    <UserIcon className="h-5 w-5" />
                  </div>
                  <input
                    aria-describedby={hintId}
                    autoComplete="username"
                    className="input h-11 min-w-0 flex-1 border-0 bg-transparent text-[#f8f8f2] placeholder:text-[#6272a4] focus:outline-none"
                    id={inputId}
                    onChange={event => setUsername(event.target.value)}
                    placeholder="joao.silva"
                    required
                    type="text"
                    value={username}
                  />
                </div>
              )}
            </AuthField>

            <AuthField label="Nome de exibição" hint="Opcional. Mostrado no dashboard.">
              {({ inputId, hintId }) => (
                <input
                  aria-describedby={hintId}
                  className="input input-bordered h-11 border-[#4b4d62] bg-[#1e1f29] text-[#f8f8f2] placeholder:text-[#6272a4]"
                  id={inputId}
                  onChange={event => setDisplayName(event.target.value)}
                  placeholder="João Silva"
                  type="text"
                  value={displayName}
                />
              )}
            </AuthField>

            <PasswordField
              autoComplete="new-password"
              hint="Senha inicial de acesso"
              label="Senha"
              name="create-user-password"
              placeholder="••••••••"
            />

            <label className="form-control grid gap-2">
              <span className="label-text text-sm font-medium text-[#f8f8f2]">Perfil</span>
              <select
                className="select select-bordered border-[#4b4d62] bg-[#1e1f29] text-[#f8f8f2]"
                onChange={event => {
                  const nextRole = event.target.value as CreateUserFormInput['role']
                  setRole(nextRole)

                  if (nextRole === 'admin') {
                    setRequiredHours(defaultRequiredHoursByRole.admin)
                    return
                  }

                  if (requiredHours.trim() === '') {
                    setRequiredHours(defaultRequiredHoursByRole.collaborator)
                  }
                }}
                value={role}
              >
                <option value="collaborator">Funcionário</option>
                <option value="admin">Administrador</option>
              </select>
            </label>

            <AuthField label="Carga horária diária" hint={requiredHoursHint}>
              {({ inputId, hintId }) => (
                <input
                  aria-describedby={hintId}
                  className="input input-bordered h-11 border-[#4b4d62] bg-[#1e1f29] text-[#f8f8f2] placeholder:text-[#6272a4]"
                  id={inputId}
                  inputMode="numeric"
                  min={0}
                  onChange={event => setRequiredHours(event.target.value)}
                  placeholder="8"
                  step="0.5"
                  type="number"
                  value={requiredHours}
                />
              )}
            </AuthField>
          </fieldset>

          {feedbackMessage ? (
            <p aria-live="polite" className="rounded-lg border border-yellow-300/30 bg-yellow-300/10 px-4 py-3 text-sm text-yellow-100">
              {feedbackMessage}
            </p>
          ) : null}

          <div className="flex flex-col-reverse justify-end gap-2 border-t border-[#4b4d62]/70 pt-4 sm:flex-row">
            <button
              className="btn border-[#4b4d62] bg-transparent text-[#6272a4] hover:border-[#bd93f9] hover:bg-[#bd93f9]/10 hover:text-[#bd93f9]"
              disabled={isSubmitting}
              onClick={onClose}
              type="button"
            >
              Cancelar
            </button>
            <button
              className="btn border-0 bg-[#bd93f9] font-medium text-[#282a36] hover:bg-[#caa8ff]"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? 'Criando...' : 'Criar usuário'}
            </button>
          </div>
        </form>
      </div>

      <form className="modal-backdrop" method="dialog">
        <button onClick={onClose} type="button">fechar</button>
      </form>
    </dialog>
  )
}