import type { CreateClockCommand } from "@/application/models/commands/create-clock.command";
import type { ClockRepository } from "@/domain/repositories/clock.repository";

export interface CreateClockCommandHandler {
    handle(command: CreateClockCommand) : Promise<void>;
}

export class CreateClockCommandHandlerImpl implements CreateClockCommandHandler {
    clockRepository: ClockRepository;
    
    constructor(clockRepository: ClockRepository) {
        this.clockRepository = clockRepository;
    }
    
    handle(command : CreateClockCommand): Promise<void> {
        return this.clockRepository.create({
            collaboratorId : command.collaboratorId,
            adminId : command.adminId,
            date : command.date,
            status : command.status,
        })
    }
}
