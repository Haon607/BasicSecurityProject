import { Role } from './authentication';

export interface User {
    id: string | undefined;
    username: string;
    password: string;
    role: Role;
}
