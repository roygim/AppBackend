import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ErrorType, ResponseObj, User } from "../@types";
import { CreateUser } from "../@types/dto";
import * as usersRepository from "../repository/users.repository";
import { JWT_PUBLIC_CERT } from '../consts';

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

            delete (user as { password?: string }).password

            const accessToken = jwt.sign({ userId: user.id }, JWT_PUBLIC_CERT)

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

export const getUserById = async (id: number): Promise<ResponseObj<User>> => {
    try {
        const user: User | null = await usersRepository.getUserById(id)

        if (user) {
            delete (user as { password?: string }).password

            return {
                success: true,
                data: user
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