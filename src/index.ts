import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet"
import { PORT } from "./consts";
import routers from "./routers"
import cookieParser from 'cookie-parser';

const app: Express = express();

const corsConfig = {
    origin: [
        'http://localhost:5173'
    ],
    credentials: true
}

app.use(cors(corsConfig))

app.use(helmet())

app.use(cookieParser());

app.use(bodyParser.json({ limit: '1mb' }))

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.use('/api', routers)

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});