import { type ClockStatus } from "@/domain/entities/clock.entity";

export type CreateClockCommand = {
    collaboratorId : string;
    adminId : string;
    date : Date;
    status : ClockStatus;
}
