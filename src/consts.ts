import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 3000
const JWT_PUBLIC_CERT = process.env.JWT_PUBLIC_CERT || ''

export {
    PORT,
    JWT_PUBLIC_CERT
}