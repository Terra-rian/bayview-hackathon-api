import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

import { plantModel } from './schemas/plant';

export class ArduinoManager {
    port: SerialPort;
    parser: ReadlineParser;

    constructor() {
        this.port = new SerialPort({ path: 'COM3', baudRate: 115200 });
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
            const args = data.split(':');
            switch(args[0]) {
            case 'ml':
                await plantModel.findByIdAndUpdate('62dcd1da64ff026c8a845bf8', { $inc: { ml: Math.ceil(args[1]) } });
                break;
            }
        });
    }
}