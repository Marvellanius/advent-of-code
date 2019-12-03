"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const rxjs_1 = require("rxjs");
const readline = require("readline");
class AOCFileReader {
    constructor() {
        this.lines$ = new rxjs_1.Subject();
    }
    readFile(path) {
        const lines = new Array();
        const rl = readline.createInterface({ input: fs.createReadStream(path), crlfDelay: Infinity });
        rl.on('line', (line) => lines.push(line));
        rl.on('close', () => this.lines$.next(lines));
    }
}
exports.AOCFileReader = AOCFileReader;
//# sourceMappingURL=fileReader.js.map