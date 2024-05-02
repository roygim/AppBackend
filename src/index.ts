import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet"
import { PORT } from "./consts";
import routes from "./routes"

const app: Express = express();

const corsConfig = {
    origin: [
        'http://localhost:5173'
    ],
    credentials: true
}

app.use(cors(corsConfig))

app.use(helmet())

app.use(bodyParser.json({ limit: '1mb' }))

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});