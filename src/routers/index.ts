import { Router } from "express";
import usersRoute from "./users.router";

const routes = Router()

routes.get('/healthz', (req, res) => { return res.status(200).json('ok') })

routes.use(usersRoute)

export default routes