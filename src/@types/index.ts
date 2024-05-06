export enum ErrorType {
    InternalError = 'InternalError',
    UserAlreadyExists = 'UserAlreadyExists'
}

export type ResponseObj<T> = {
    success: boolean;
    data?: T | null;
    message?: string;
    error?: ErrorType 
}

export interface User {
    id: number;
    firstname: string | null;
    lastname: string | null;
    email: string;
    password: string;
}