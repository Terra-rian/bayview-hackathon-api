import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

import { plantModel } from './schemas/plant';

export class ArduinoManager {
    port: SerialPort;
    parser: ReadlineParser;

    constructor() {
        this.port = new SerialPort({ path: 'COM3', baudRate: 9600 });
        this.parser = this.port.pipe(new ReadlineParser({ delimiter: '\n' }));
    }

    public run() {
        this.port.on('open', () => {
            console.log('Serial port open.');
        });

        this.port.on('close', () => {
            console.log('Serial port closed.');
        });

        this.port.on('error', (err) => {
            console.log(err);
        });

        this.parser.on('data', async (data) => {
            console.log('Data from Arduino: ', data);

            const formattedData: { id?: string | undefined, ml?: number | undefined, waterPercentage?: number | undefined, lastWatered?: Date | undefined } = JSON.parse(data);
            const plant = new plantModel(formattedData);

            await plant.save();
            console.log(plant._id);
        });
    }
}