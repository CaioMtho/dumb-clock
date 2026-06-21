export type AuthenticateUser = {
    username: string;
    password: string;
}

export interface AuthenticateUserUseCase {
    execute(user: AuthenticateUser) : Promise<boolean>;
}
