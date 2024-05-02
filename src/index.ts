import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PORT } from "./consts";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

const corsConfig = {
    origin: [
        'http://localhost:5173'
    ],
    credentials: true
}

app.use(cors(corsConfig))

app.use(bodyParser.json({ limit: '1mb' }))

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});