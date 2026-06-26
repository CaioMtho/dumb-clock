import type { ListClockHistoryQuery } from '@/application/models/queries/list-clock-history.query'
import type { Clock } from '@/domain/entities/clock.entity'
import type { ClockRepository } from '@/domain/repositories/clock.repository'

export interface ListClockHistoryQueryHandler {
  handle(query?: ListClockHistoryQuery): Promise<Clock[]>
}

export class ListClockHistoryQueryHandlerImpl implements ListClockHistoryQueryHandler {
  private readonly clockRepository: ClockRepository

  constructor(clockRepository: ClockRepository) {
    this.clockRepository = clockRepository
  }

  async handle(query: ListClockHistoryQuery = {}): Promise<Clock[]> {
    const clocks = await this.clockRepository.getAll()
    const startDate = query.startDate ? startOfDay(query.startDate) : null
    const endDate = query.endDate ? endOfDay(query.endDate) : null

    return clocks
      .filter(clock => {
        if (query.collaboratorId && clock.collaboratorId !== query.collaboratorId) {
          return false
        }

        if (startDate && clock.date < startDate) {
          return false
        }

        if (endDate && clock.date > endDate) {
          return false
        }

        return true
      })
      .sort((leftClock, rightClock) => rightClock.date.getTime() - leftClock.date.getTime())
  }
}

function startOfDay(date: Date): Date {
  const startDate = new Date(date)
  startDate.setHours(0, 0, 0, 0)
  return startDate
}

function endOfDay(date: Date): Date {
  const endDate = new Date(date)
  endDate.setHours(23, 59, 59, 999)
  return endDate
}
