import { ResponseObj, User } from "../@types";
import * as usersRepository from "../repository/users.repository";

export const getAll = async (): Promise<ResponseObj<User[]>> => {
    try {
        const users: User[] = await usersRepository.getAll()

        const res: ResponseObj<User[]> = {
            success: true,
            data: users
        };

        return res
    } catch (err) {
        throw err
    }
}