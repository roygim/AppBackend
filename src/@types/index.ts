export type ResponseObj<T> = {
    success: boolean;
    data: T | null;
    message?: string;
}