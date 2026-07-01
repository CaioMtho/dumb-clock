import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { Clock, ClockStatus } from '@/domain/entities/clock.entity'
import type { User } from '@/domain/entities/user.entity'
import { useDeps } from '@/presentation/deps'
import {
  type AuthenticatedUser,
  clearAuthenticatedUser,
  getUserDisplayName,
} from '@/presentation/session'
import { ClockIcon } from '@/presentation/icons'
import {
  buildHistoryRows,
  getCurrentStatus,
  getDateInputValue,
  getMonthStartValue,
  parseDateInput,
} from '@/presentation/dashboard/utils'
import { DashboardHistoryTable } from '@/presentation/dashboard/components/dashboard-history-table'
import { DashboardStatusCard } from '@/presentation/dashboard/components/dashboard-status-card'
import { type CreateUserFormInput, CreateUserModal } from '@/presentation/dashboard/components/create-user-modal'

type DashboardPageProps = {
  user: AuthenticatedUser
}

export default function DashboardPage({ user }: DashboardPageProps) {
  const navigate = useNavigate()
  const createClockCommandHandler = useDeps('createClockCommandHandler')
  const createUserCommandHandler = useDeps('createUserCommandHandler')
  const listUsersQueryHandler = useDeps('listUsersQueryHandler')
  const listClockHistoryQueryHandler = useDeps('listClockHistoryQueryHandler')
  const [users, setUsers] = useState<User[]>([])
  const [clocks, setClocks] = useState<Clock[]>([])
  const [currentUserClocks, setCurrentUserClocks] = useState<Clock[]>([])
  const [selectedUserId, setSelectedUserId] = useState('')
  const [startDate, setStartDate] = useState(getMonthStartValue(new Date()))
  const [endDate, setEndDate] = useState(getDateInputValue(new Date()))
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false)
  const [createUserModalVersion, setCreateUserModalVersion] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const isAdmin = user.role === 'admin'
  const dateRangeInvalid = startDate !== '' && endDate !== '' && startDate > endDate
  const visibleUsers = useMemo(() => {
    const userById = new Map(users.map(currentUser => [currentUser.id, currentUser]))

    if (!userById.has(user.id)) {
      userById.set(user.id, {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        password: '',
        role: user.role,
        requiredHours: user.requiredHours,
      })
    }

    return Array.from(userById.values())
  }, [user, users])
  const usersById = useMemo(
    () => new Map(visibleUsers.map(currentUser => [currentUser.id, currentUser])),
    [visibleUsers],
  )
  const historyRows = useMemo(
    () => buildHistoryRows(clocks, usersById),
    [clocks, usersById],
  )
  const currentStatus = useMemo(
    () => getCurrentStatus(currentUserClocks, user.id),
    [currentUserClocks, user.id],
  )

  const loadDashboardData = useCallback(async (): Promise<void> => {
    setFeedbackMessage(null)

    if (dateRangeInvalid) {
      setFeedbackMessage('Data inicial não pode ser maior que a data final.')
      setClocks([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    try {
      const [loadedUsers, loadedClocks, loadedCurrentUserClocks] = await Promise.all([
        listUsersQueryHandler.handle(),
        listClockHistoryQueryHandler.handle({
          collaboratorId: isAdmin ? selectedUserId || undefined : user.id,
          startDate: startDate ? parseDateInput(startDate) : undefined,
          endDate: endDate ? parseDateInput(endDate) : undefined,
        }),
        listClockHistoryQueryHandler.handle({
          collaboratorId: user.id,
          startDate: parseDateInput(getDateInputValue(new Date())),
          endDate: parseDateInput(getDateInputValue(new Date())),
        }),
      ])

      setUsers(loadedUsers)
      setClocks(loadedClocks)
      setCurrentUserClocks(loadedCurrentUserClocks)
    } catch {
      setFeedbackMessage('Não foi possível carregar o dashboard.')
    } finally {
      setIsLoading(false)
    }
  }, [
    dateRangeInvalid,
    endDate,
    isAdmin,
    listClockHistoryQueryHandler,
    listUsersQueryHandler,
    selectedUserId,
    startDate,
    user.id,
  ])

  useEffect(() => {
    void Promise.resolve().then(() => loadDashboardData())
  }, [loadDashboardData])

  async function handleClockAction(status: ClockStatus): Promise<void> {
    try {
      await createClockCommandHandler.handle({
        collaboratorId: user.id,
        adminId: user.id,
        date: new Date(),
        status,
      })
      await loadDashboardData()
    } catch {
      setFeedbackMessage('Não foi possível registrar o ponto.')
    }
  }

  function handleLogout(): void {
    clearAuthenticatedUser()
    navigate('/login', { replace: true })
  }

  async function handleCreateUser(input: CreateUserFormInput): Promise<void> {
    const normalizedUsername = input.username.trim()
    const userAlreadyExists = users.some(currentUser => currentUser.username === normalizedUsername)

    if (userAlreadyExists) {
      throw new Error('Já existe usuário com esse login.')
    }

    await createUserCommandHandler.handle({
      username: normalizedUsername,
      displayName: input.displayName,
      password: input.password,
      role: input.role,
      requiredHours: input.requiredHours,
    })

    await loadDashboardData()
    setFeedbackMessage('Usuário criado com sucesso.')
    setIsCreateUserModalOpen(false)
  }

  return (
    <div className="min-h-svh px-4 py-6 text-[#f8f8f2] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[22px] border border-[#4b4d62]/70 bg-[#282a36] shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
        <header className="flex flex-col gap-4 border-b border-[#4b4d62]/70 bg-[#1e1f29] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#4b4d62] bg-[#282a36] text-[#bd93f9]">
              <ClockIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-base font-medium tracking-[-0.02em]">dumb clock</p>
              <p className="text-xs text-[#6272a4]">Controle local de ponto</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">{getUserDisplayName(user)}</p>
              <p className="text-xs text-[#6272a4]">{user.username}</p>
            </div>
            <span className="badge border-[#bd93f9]/40 bg-[#bd93f9]/15 text-[#bd93f9]">
              {user.role === 'admin' ? 'admin' : 'funcionário'}
            </span>
            <button
              className="btn btn-sm border-[#4b4d62] bg-transparent text-[#6272a4] hover:border-red-300 hover:bg-red-300/10 hover:text-red-200"
              onClick={handleLogout}
              type="button"
            >
              Sair
            </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-[280px_1fr]">
          <aside className="flex flex-col gap-5 border-b border-[#4b4d62]/70 p-5 lg:border-b-0 lg:border-r">
            <section aria-labelledby="current-status-title" className="grid gap-2">
              <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-[#6272a4]" id="current-status-title">
                Estado atual
              </h2>
              <DashboardStatusCard status={currentStatus} />
            </section>

            <section aria-labelledby="clock-actions-title" className="grid gap-2">
              <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-[#6272a4]" id="clock-actions-title">
                Ações
              </h2>
              <div className="grid gap-2">
                {currentStatus.actions.map(action => (
                  <button
                    className={`btn justify-start border ${action.className}`}
                    key={action.status}
                    onClick={() => void handleClockAction(action.status)}
                    type="button"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </section>

            {isAdmin ? (
              <section aria-labelledby="admin-actions-title" className="grid gap-2">
                <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-[#6272a4]" id="admin-actions-title">
                  Administração
                </h2>
                <button
                  className="btn justify-start border-[#bd93f9]/40 bg-[#bd93f9]/10 text-[#bd93f9] hover:bg-[#bd93f9]/15"
                  onClick={() => {
                    setCreateUserModalVersion(currentVersion => currentVersion + 1)
                    setIsCreateUserModalOpen(true)
                  }}
                  type="button"
                >
                  Criar usuário
                </button>
              </section>
            ) : null}
          </aside>

          <main className="grid gap-5 p-5 sm:p-6">
            <section aria-labelledby="history-title" className="grid gap-4">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#6272a4]">
                    Dashboard {isAdmin ? 'admin' : 'funcionário'}
                  </p>
                  <h1 className="mt-1 text-xl font-medium tracking-[-0.02em]" id="history-title">
                    {isAdmin ? 'Histórico de pontos' : 'Meus pontos'}
                  </h1>
                </div>

                <form
                  aria-label="Filtros do histórico"
                  className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[220px_170px_170px]"
                  onSubmit={event => event.preventDefault()}
                >
                  {isAdmin ? (
                    <label className="form-control grid gap-1">
                      <span className="label-text text-xs text-[#6272a4]">Funcionário</span>
                      <select
                        className="select select-bordered border-[#4b4d62] bg-[#1e1f29] text-[#f8f8f2]"
                        onChange={event => setSelectedUserId(event.target.value)}
                        value={selectedUserId}
                      >
                        <option value="">Todos os usuários</option>
                        {visibleUsers.map(currentUser => (
                          <option key={currentUser.id} value={currentUser.id}>
                            {getUserDisplayName({
                              displayName: currentUser.displayName ?? null,
                              username: currentUser.username,
                            })}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : null}

                  <label className="form-control grid gap-1">
                    <span className="label-text text-xs text-[#6272a4]">De</span>
                    <input
                      className="input input-bordered border-[#4b4d62] bg-[#1e1f29] text-[#f8f8f2]"
                      onChange={event => setStartDate(event.target.value)}
                      type="date"
                      value={startDate}
                    />
                  </label>

                  <label className="form-control grid gap-1">
                    <span className="label-text text-xs text-[#6272a4]">Até</span>
                    <input
                      className="input input-bordered border-[#4b4d62] bg-[#1e1f29] text-[#f8f8f2]"
                      onChange={event => setEndDate(event.target.value)}
                      type="date"
                      value={endDate}
                    />
                  </label>
                </form>
              </div>

              {feedbackMessage ? (
                <p aria-live="polite" className="rounded-lg border border-yellow-300/30 bg-yellow-300/10 px-4 py-3 text-sm text-yellow-100">
                  {feedbackMessage}
                </p>
              ) : null}

              <DashboardHistoryTable isLoading={isLoading} rows={historyRows} />
            </section>
          </main>
        </div>
      </div>

      {isAdmin ? (
        <CreateUserModal
          key={createUserModalVersion}
          isOpen={isCreateUserModalOpen}
          onClose={() => setIsCreateUserModalOpen(false)}
          onCreate={handleCreateUser}
        />
      ) : null}
    </div>
  )
}
