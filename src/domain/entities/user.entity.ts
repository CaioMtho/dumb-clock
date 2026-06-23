export interface User {
    id : string;
    username: string;
    password: string;
    role : UserRole;
    requiredHours?: number;
}

export type UserRole = 
'admin'
| 'collaborator';




