const registerValidation = (req: any, res: any, next: any) => {
    // return res.status(400).json('error')
    console.log(req.body)
    next()
}

export default registerValidation