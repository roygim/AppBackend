import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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

export const login = async (email: string, password: string): Promise<ResponseObj<any>> => {
    try {
        const user: User | null = await usersRepository.getUserByEmail(email)

        if (user) {
            const isPasswordCorrect = await bcrypt.compare(password, user.password)
            if (!isPasswordCorrect) {
                return {
                    success: false,
                    message: "invalid password",
                    error: ErrorType.InvalidPassword
                }
            }

            const accessToken = jwt.sign(user, 'ACCESS_TOKEN_SECRET')

            return {
                success: true,
                data: { user, accessToken }
            }
        } else {
            return {
                success: false,
                message: "user not found",
                error: ErrorType.UserNotFound
            }
        }
    } catch (err) {
        throw err
    }
}

module.exports.login = async (email, password) => {
    try {
        const user = await usersRepository.getUserByEmail(email)
        if (user) {
            const isPasswordCorrect = await bcrypt.compare(password, user.password)
            if (!isPasswordCorrect) {
                return ResponseObject(responseCode.INVALID_PASSWORD, null, responseStatus.INVALID_PASSWORD)
            }

            delete user.password;
            
            const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET)
            
            return ResponseObject(responseCode.OK, { user, accessToken }, responseStatus.LOGIN_SUCCESS)
        } else {
            return ResponseObject(responseCode.USER_NOT_FOUND, null, responseStatus.USER_NOT_FOUND)
        }
    } catch (err) {
        throw err
    }
}