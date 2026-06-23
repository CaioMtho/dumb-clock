export interface Clock {
    id : string;
    collaboratorId : string;
    adminId : string;
    date : Date;
    status : ClockStatus;
}

export type ClockStatus =
"IN"
| "OUT"
| "LUNCH";
