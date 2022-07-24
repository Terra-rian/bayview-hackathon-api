import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

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

        this.parser.on('data', (data) => {
            console.log('Data from Arduino: ', data);
        });
    }
}