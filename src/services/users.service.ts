import { ErrorType, ResponseObj, User } from "../@types";
import { CreateUser } from "../@types/dto";
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

export const register = async (newUser: CreateUser): Promise<ResponseObj<number>> => {
    try {
        const user: User | null = await usersRepository.getUserByEmail(newUser.email)

        if (user) {
            return {
                success: false,
                message: "user already exists",
                error: ErrorType.UserAlreadyExists
            }
        }

        const userId: number = await usersRepository.addUser(newUser)
        console.log(userId);
        return {
            success: true,
            data: userId
        }
    } catch (err) {
        throw err
    }
}


// module.exports.register = async (newUser) => {
//     try {
//         const user = await usersRepository.getUserByEmail(newUser.email)
//         if (user) {
//             return ResponseObject(responseCode.USER_EXISTS, null, responseStatus.USER_EXISTS)
//         }

//         const newId = await usersRepository.addUser(newUser)

//         return ResponseObject(responseCode.OK, newId, responseStatus.USER_CREATE)
//     } catch (err) {
//         throw err
//     }
// }