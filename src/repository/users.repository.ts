import { PrismaClient } from '@prisma/client'
import { User } from "../@types"

const prisma = new PrismaClient()

export const getAll = async (): Promise<User[]> => {
    try {
        const users = await prisma.users.findMany()
        return users
    } catch (err) {
        throw err
    }
}