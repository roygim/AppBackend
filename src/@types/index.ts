export type ResponseObj<T> = {
    success: boolean;
    data: T | null;
    message?: string;
}

export interface User {
    id: number;
    firstname: string | null;
    lastname: string | null;
    email: string | null;
    password: string | null;
}