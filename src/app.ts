import express from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { plantModel } from './schemas/plant';
import mongodb from './mongodb';
import { ArduinoManager } from './arduino';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3007;

app.use(bodyparser.json());
app.use(cors());
const mongo = mongodb();
const ard = new ArduinoManager();
ard.run();
mongo.then(() => {
    server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});

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

app.post('/water/:id', async (req, res) => {
    const { on } = req.body;
    if(on) {
        ard.port.write('1');
        await plantModel.findByIdAndUpdate('62dcd1da64ff026c8a845bf8', { lastWatered: Date.now() }); 

    } else {
        ard.port.write('0');
    }
    res.sendStatus(200);
});
