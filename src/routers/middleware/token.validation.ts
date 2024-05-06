import jwt from 'jsonwebtoken'

export const tokenValidation = async (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, 'ACCESS_TOKEN_SECRET', (err: any, payload: any) => {
        if (err) return res.sendStatus(403)
        req.userId = payload.userId
        next()
    })

    // if (req.cookies && req.cookies.userToken) {
    //     const token = req.cookies.userToken;

    //     jwt.verify(token, 'ACCESS_TOKEN_SECRET', (err: any, user: any) => {
    //         if (err) return res.sendStatus(403)
    //         req.user = user
    //         next()
    //     })
    // } else {
    //     return res.sendStatus(401)
    // }
}