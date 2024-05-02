

export const getAll = async () => {
    try {
        const users = [{ id: 1, name: 'aaa' }, { id: 2, name: 'bbb' }]
        return users
    } catch (err) {
        throw err
    }
}