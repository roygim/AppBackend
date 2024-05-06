import { z } from "zod"
import { emailRegex } from "../../utils/regex"

const BodySchema = z.object({
    email: z
        .string()
        .nonempty()
        .refine((val) => emailRegex.test(val), { message: 'invalid email' }),
    firstname: z
        .string().min(2, { message: 'firstname is minimum 2 letters' })
        .optional(),
    lastname: z
        .string().min(2, { message: 'lastname is minimum 2 letters' })
        .optional(),
    password: z
        .string({ required_error: 'password is required' }).min(4, { message: 'password is minimum 4 letters' })
})

const registerValidation = async (req: any, res: any, next: any) => {
    try {
        await BodySchema.parseAsync(req.body)
        next()
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json(err.errors[0].message)
        } else {
            return res.status(400).json('error')
        }
    }
}

export default registerValidation