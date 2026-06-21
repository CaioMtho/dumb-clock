export interface User {
    id : string;
    username: string;
    password: string;
    role : UserRole;
}

export type UserRole = 
'admin'
| 'collaborator';





