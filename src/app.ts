import express from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { plantModel } from './schemas/plant';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;

app.use(bodyparser.json());
app.use(cors());

app.use(expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
}));

app.use(expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
}));

app.get('/', (_req, res) => {
    res.status(200).send(`Server running at http://localhost:${port}`);
});

app.get('/plants', async (_req, res) => {
    const plants = await plantModel.find();
    console.log(JSON.stringify(plants));
    res.status(200).send(JSON.stringify(plants));
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});