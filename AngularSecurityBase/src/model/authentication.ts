export interface LoginRequest {
    username: string;
    password: string;
}

export interface AuthenticationData extends LoginRequest {
    role: Role;
}

export enum Role {
    ROLE_USER = 'ROLE_USER',
    ROLE_ADMIN = 'ROLE_ADMIN',
}
