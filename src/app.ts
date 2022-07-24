import express from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { plantModel } from './schemas/plant';
import mongodb from './mongodb';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;

app.use(bodyparser.json());
app.use(cors());
const mongo = mongodb();

mongo.then(() => {
    server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
        plantModel.updateMany({}, { image: 'https://www.pngmart.com/files/22/Plant-PNG-Photo.png' });
    });
});

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
    const data = plants.map((plant) => ({ id: plant._id, name: plant.name, image: plant.image }));
    res.status(200).json(data);
});

app.get('/plant/:id', async (req, res) => {
    const { id } = req.params;
    let plant;
    try {
        plant = await plantModel.findOne({ _id: id });
    } catch {
        res.sendStatus(404);
        return;
    }
    res.status(200).json(plant);
});
