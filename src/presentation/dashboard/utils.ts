import type { Clock, ClockStatus } from '@/domain/entities/clock.entity'
import type { User } from '@/domain/entities/user.entity'
import { getUserDisplayName } from '@/presentation/session'

export type HistoryRow = {
  key: string
  collaboratorId: string
  collaboratorName: string
  date: Date
  requiredHours?: number
  inClock?: Clock
  lunchClock?: Clock
  returnClock?: Clock
  outClock?: Clock
}

export type CurrentStatus = {
  label: string
  detail: string
  tone: 'idle' | 'working' | 'lunch' | 'done'
  elapsed: string
  actions: ClockAction[]
}

export type ClockAction = {
  label: string
  status: ClockStatus
  tone: 'success' | 'warning' | 'danger' | 'info'
}

const clockActionsByTone: Record<CurrentStatus['tone'], ClockAction[]> = {
  idle: [
    {
      label: 'Bater entrada',
      status: 'IN',
      tone: 'success',
    },
  ],
  working: [
    {
      label: 'Pausar',
      status: 'LUNCH',
      tone: 'warning',
    },
    {
      label: 'Bater saída',
      status: 'OUT',
      tone: 'danger',
    },
  ],
  lunch: [
    {
      label: 'Retornar da pausa',
      status: 'RETURN',
      tone: 'info',
    },
    {
      label: 'Bater saída',
      status: 'OUT',
      tone: 'danger',
    },
  ],
  done: [],
}

export function buildHistoryRows(clocks: Clock[], usersById: Map<string, User>): HistoryRow[] {
  const rowsByKey = new Map<string, HistoryRow>()

  for (const clock of clocks) {
    const dayKey = getDateInputValue(clock.date)
    const key = `${clock.collaboratorId}-${dayKey}`
    const user = usersById.get(clock.collaboratorId)
    const row = rowsByKey.get(key) ?? {
      key,
      collaboratorId: clock.collaboratorId,
      collaboratorName: user
        ? getUserDisplayName({
          displayName: user.displayName ?? null,
          username: user.username,
        })
        : 'Usuário removido',
      date: new Date(clock.date),
      requiredHours: user?.requiredHours,
    }

    if (clock.status === 'IN' && shouldReplaceEarliest(row.inClock, clock)) {
      row.inClock = clock
    }

    if (clock.status === 'LUNCH' && shouldReplaceEarliest(row.lunchClock, clock)) {
      row.lunchClock = clock
    }

    if (clock.status === 'RETURN' && shouldReplaceEarliest(row.returnClock, clock)) {
      row.returnClock = clock
    }

    if (clock.status === 'OUT' && shouldReplaceLatest(row.outClock, clock)) {
      row.outClock = clock
    }

    rowsByKey.set(key, row)
  }

  return Array.from(rowsByKey.values())
    .sort((leftRow, rightRow) => rightRow.date.getTime() - leftRow.date.getTime())
}

export function getCurrentStatus(clocks: Clock[], userId: string, requiredHours?: number): CurrentStatus {
  const today = getDateInputValue(new Date())
  const latestClock = clocks
    .filter(clock => clock.collaboratorId === userId && getDateInputValue(clock.date) === today)
    .sort((leftClock, rightClock) => rightClock.date.getTime() - leftClock.date.getTime())[0]

  if (!latestClock) {
    return {
      label: 'Sem ponto',
      detail: 'Nenhuma entrada registrada hoje',
      tone: 'idle',
      elapsed: '00:00',
      actions: clockActionsByTone.idle,
    }
  }

  if (latestClock.status === 'LUNCH') {
    return {
      label: 'Em pausa',
      detail: `Pausa desde ${formatClockTime(latestClock)} · hoje`,
      tone: 'lunch',
      elapsed: getElapsedTime(latestClock.date),
      actions: clockActionsByTone.lunch,
    }
  }

  if (latestClock.status === 'OUT') {
    const hasIncompleteWorkday = requiredHours !== undefined && getWorkedMinutesFromClocks(clocks) < requiredHours * 60

    if (hasIncompleteWorkday) {
      return {
        label: 'Incompleto',
        detail: `Saída às ${formatClockTime(latestClock)} · hoje`,
        tone: 'done',
        elapsed: '00:00',
        actions: clockActionsByTone.done,
      }
    }

    return {
      label: 'Expediente encerrado',
      detail: `Saída às ${formatClockTime(latestClock)} · hoje`,
      tone: 'done',
      elapsed: '00:00',
      actions: clockActionsByTone.done,
    }
  }

  return {
    label: 'Trabalhando',
    detail: `${latestClock.status === 'RETURN' ? 'Retorno' : 'Entrada'} às ${formatClockTime(latestClock)} · hoje`,
    tone: 'working',
    elapsed: getElapsedTime(latestClock.date),
    actions: clockActionsByTone.working,
  }
}

export function getHistoryRowStatus(row: HistoryRow): { label: string, className: string } {
  if (!row.inClock) {
    return {
      label: 'Ausente',
      className: 'border-red-300/30 bg-red-300/10 text-red-200',
    }
  }

  if (row.outClock && row.requiredHours !== undefined) {
    const workedMinutes = getWorkedMinutes(row)
    const requiredMinutes = row.requiredHours * 60

    if (workedMinutes !== null && workedMinutes < requiredMinutes) {
      return {
        label: 'Incompleto',
        className: 'border-amber-300/30 bg-amber-300/10 text-amber-200',
      }
    }
  }

  if (!row.outClock) {
    return {
      label: 'Em curso',
      className: 'border-emerald-300/30 bg-emerald-300/10 text-emerald-200',
    }
  }

  if (row.lunchClock && !row.returnClock) {
    return {
      label: 'Sem retorno',
      className: 'border-yellow-300/30 bg-yellow-300/10 text-yellow-200',
    }
  }

  if (!row.lunchClock) {
    return {
      label: 'Sem pausa',
      className: 'border-orange-300/30 bg-orange-300/10 text-orange-200',
    }
  }

  return {
    label: 'Completo',
    className: 'border-emerald-300/30 bg-emerald-300/10 text-emerald-200',
  }
}

function shouldReplaceEarliest(currentClock: Clock | undefined, nextClock: Clock): boolean {
  return !currentClock || nextClock.date < currentClock.date
}

function shouldReplaceLatest(currentClock: Clock | undefined, nextClock: Clock): boolean {
  return !currentClock || nextClock.date > currentClock.date
}

function getWorkedMinutes(row: HistoryRow): number | null {
  if (!row.inClock || !row.outClock) {
    return null
  }

  const totalMilliseconds = row.outClock.date.getTime() - row.inClock.date.getTime()

  if (totalMilliseconds <= 0) {
    return 0
  }

  const breakMilliseconds = row.lunchClock && row.returnClock
    ? Math.max(0, row.returnClock.date.getTime() - row.lunchClock.date.getTime())
    : 0

  return Math.max(0, totalMilliseconds - breakMilliseconds) / 60000
}

function getWorkedMinutesFromClocks(clocks: Clock[]): number {
  const latestInClock = clocks
    .filter(clock => clock.status === 'IN')
    .sort((leftClock, rightClock) => rightClock.date.getTime() - leftClock.date.getTime())[0]

  const latestOutClock = clocks
    .filter(clock => clock.status === 'OUT')
    .sort((leftClock, rightClock) => rightClock.date.getTime() - leftClock.date.getTime())[0]

  if (!latestInClock || !latestOutClock) {
    return 0
  }

  const totalMilliseconds = latestOutClock.date.getTime() - latestInClock.date.getTime()

  if (totalMilliseconds <= 0) {
    return 0
  }

  const latestLunchClock = clocks
    .filter(clock => clock.status === 'LUNCH')
    .sort((leftClock, rightClock) => rightClock.date.getTime() - leftClock.date.getTime())[0]

  const latestReturnClock = clocks
    .filter(clock => clock.status === 'RETURN')
    .sort((leftClock, rightClock) => rightClock.date.getTime() - leftClock.date.getTime())[0]

  const breakMilliseconds = latestLunchClock && latestReturnClock
    ? Math.max(0, latestReturnClock.date.getTime() - latestLunchClock.date.getTime())
    : 0

  return Math.max(0, totalMilliseconds - breakMilliseconds) / 60000
}

export function getDateInputValue(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getMonthStartValue(date: Date): string {
  const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
  return getDateInputValue(monthStart)
}

export function parseDateInput(value: string): Date {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function formatClockTime(clock: Clock | undefined): string {
  if (!clock) {
    return '—'
  }

  return clock.date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  })
}

export function getElapsedTime(startDate: Date): string {
  const elapsedMilliseconds = Math.max(0, Date.now() - startDate.getTime())
  const elapsedMinutes = Math.floor(elapsedMilliseconds / 60000)
  const hours = String(Math.floor(elapsedMinutes / 60)).padStart(2, '0')
  const minutes = String(elapsedMinutes % 60).padStart(2, '0')

  return `${hours}:${minutes}`
}
