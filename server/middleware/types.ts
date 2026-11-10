export type LoginErrors = Partial<Record<'email' | 'password', string>>;
export interface AuthUser {
    id?: number;
    name: string;
    email: string;
}

export interface LoginResult {
    token: string;
    user: AuthUser;
}