export type UpdateUser = {
    id: string;
    username?: string;
    password?: string;
}

export interface UpdateUserUseCase {
    execute(user: UpdateUser) : Promise<void>;
}
