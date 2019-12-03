import * as fs from 'fs';
import {Subject} from "rxjs";
import * as readline from "readline";

export class AOCFileReader {

    constructor(){}

    public lines$: Subject<string[]> = new Subject<string[]>();

    public readFile(path: string) {
        const lines = new Array<string>();
        const rl = readline.createInterface({input: fs.createReadStream(path), crlfDelay: Infinity});
        rl.on('line', (line: string) => lines.push(line));
        rl.on('close', () => this.lines$.next(lines));
    }
}
