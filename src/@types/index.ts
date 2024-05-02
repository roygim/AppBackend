export type ResponseObj<T> = {
    success: boolean;
    data: T | null;
    message?: string;
}

export interface User {
    id?: number,
    firstname?: string,
    lastname?: string,
    email?: string,
    password?: string
}