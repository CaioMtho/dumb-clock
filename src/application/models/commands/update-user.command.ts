export type UpdateUserCommand = {
    id: string;
    username?: string;
    password?: string;
    requiredHours?: number;
}
