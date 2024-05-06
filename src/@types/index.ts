export enum ErrorType {
    InternalError = 'InternalError',
    UserAlreadyExists = 'UserAlreadyExists',
    InvalidPassword = 'InvalidPassword',
    UserNotFound = 'UserNotFound',
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