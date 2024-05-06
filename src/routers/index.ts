import { Router } from "express";
import usersRouter from "./users.router";

const routers = Router()

routers.get('/healthz', (req, res) => { return res.status(200).json('ok') })

routers.use(usersRouter)

export default routers