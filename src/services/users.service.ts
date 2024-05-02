import { ResponseObj } from "../@types";
import * as usersRepository from "../repository/users.repository";

export const getAll = async (): Promise<ResponseObj<any>> => {
    try {
        const users: any = await usersRepository.getAll()

        const res: ResponseObj<any> = {
            success: true,
            data: users
        };
        
        return res
    } catch (err) {
        throw err
    }
}