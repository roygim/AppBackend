import { Router } from "express";

const router = Router()

router.get('/healthz', (req, res) => { return res.status(200).json('ok') })

export default router