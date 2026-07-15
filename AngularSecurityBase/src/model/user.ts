import { Role } from './authentication';

export interface User {
    id: string;
    username: string;
    password: string;
    role: Role;
}
