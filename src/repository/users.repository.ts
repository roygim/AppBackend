import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { User } from "../types"
import { CreateUser, UpdateUser } from '../types/dto'


const prisma = new PrismaClient()

export const getAll = async (): Promise<User[]> => {
    try {
        const users = await prisma.users.findMany()
        return users
    } catch (err) {
        throw err
    }
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                email,
            },
        })
        return user ?? null
    } catch (err) {
        throw err
    }
}

export const getUserById = async (id: number): Promise<User | null> => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                id,
            },
        })
        return user ?? null
    } catch (err) {
        throw err
    }
}

export const addUser = async (newUser: CreateUser): Promise<User> => {
    try {
        const hashedPassword = await bcrypt.hash(newUser.password, 12)

        const createdUser = await prisma.users.create({
            data: {
                ...newUser,
                password: hashedPassword
            }
        })

        return createdUser
    } catch (err) {
        throw err
    }
}

export const updateUser = async (id: number, user: UpdateUser): Promise<User> => {
    try {
        const updatedUser = await prisma.users.update({
            where: {
                id: id
            },
            data: {
                ...user
            }
        })

        return updatedUser
    } catch (err) {
        throw err
    }
}

export const deleteUser = async (id: number): Promise<boolean> => {
    try {
        const deletedUser = await prisma.users.delete({
            where: {
                id: id
            }
        })

        return deletedUser ? true : false
    } catch (err) {
        throw err
    }
}