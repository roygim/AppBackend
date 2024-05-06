import { Router } from "express";
import usersRouter from "./users.router";

const routes = Router()

routes.get('/healthz', (req, res) => { return res.status(200).json('ok') })

routes.use(usersRouter)

export default routes