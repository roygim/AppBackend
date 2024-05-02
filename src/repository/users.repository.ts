import { User } from "../@types"

export const getAll = async (): Promise<User[]> => {
    try {
        const users = [{ id: 1, firstname: 'aaa' }, { id: 2, firstname: 'bbb' }]
        return users
    } catch (err) {
        throw err
    }
}