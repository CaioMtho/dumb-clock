export type UpdateUserCommand = {
    id: string;
    username?: string;
    displayName?: string | null;
    password?: string;
    requiredHours?: number;
}
