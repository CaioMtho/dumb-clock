import type { CreateClockCommand } from '@/application/models/commands/create-clock.command'
import { ValidationError } from '@/domain/errors/validation-error'
import type { ClockRepository } from '@/domain/repositories/clock.repository'

export interface CreateClockCommandHandler {
    handle(command: CreateClockCommand): Promise<void>
}

export class CreateClockCommandHandlerImpl implements CreateClockCommandHandler {
    private readonly clockRepository: ClockRepository

    constructor(clockRepository: ClockRepository) {
        this.clockRepository = clockRepository
    }

    async handle(command: CreateClockCommand): Promise<void> {
        if (command.status === 'IN') {
            const hasClockedInToday = await this.hasClockedInToday(command.collaboratorId, command.date)

            if (hasClockedInToday) {
                throw new ValidationError('duplicate-entry', 'Só é possível bater entrada uma vez por dia.')
            }
    }

        await this.clockRepository.create({
            collaboratorId: command.collaboratorId,
            adminId: command.adminId,
            date: command.date,
            status: command.status,
        })
    }

    private async hasClockedInToday(collaboratorId: string, date: Date): Promise<boolean> {
        const startOfDay = new Date(date)
        startOfDay.setHours(0, 0, 0, 0)
        const endOfDay = new Date(date)
        endOfDay.setHours(23, 59, 59, 999)

        const clocks = await this.clockRepository.getAll()

        return clocks.some(clock => (
            clock.collaboratorId === collaboratorId
            && clock.status === 'IN'
            && clock.date >= startOfDay
            && clock.date <= endOfDay
        ))
    }
}
