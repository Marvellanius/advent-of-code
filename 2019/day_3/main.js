"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileReader_1 = require("../fileReader");
const operators_1 = require("rxjs/operators");
class AOC2019DayThree {
    constructor() {
        this.reader = new fileReader_1.AOCFileReader();
        this.path = '/opt/project/2019/day_3/input.txt';
        this.input = null;
        this.subscriptions = [];
    }
    ;
    test() {
        this.testAssignment1();
        // this.testAssignment2();
    }
    run() {
        this.reader.readFile(this.path);
        this.subscriptions.push(this.assignment1());
    }
    intersects(l1, l2) {
        let det, gamma, lambda;
        det = (l1[2] - l1[0]) * (l2[3] - l2[1]) - (l2[2] - l2[0]) * (l1[3] - l1[1]);
        if (det === 0) {
            return false;
        }
        else {
            lambda = ((l2[3] - l2[1]) * (l2[2] - l1[0]) + (l2[0] - l2[2]) * (l2[3] - l1[1])) / det;
            gamma = ((l1[1] - l1[3]) * (l2[1] - l1[0]) + (l1[2] - l1[0]) * (l2[3] - l1[1])) / det;
            return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
        }
    }
    testAssignment1() {
        this.reader.readFile('/opt/project/2019/day_3/input.test1.txt');
        const expectedResult = 159;
        this.parsedWires$().subscribe(data => {
            const cw1 = data.wireOne.points;
            const cw2 = data.wireTwo.points;
            const lw1 = [];
            const lw2 = [];
            // make function
            for (let i = 1; i < cw1.length; i++) {
                const line = [cw1[i - 1].x, cw1[i - 1].y, cw1[i].x, cw1[i].y];
                lw1.push(line);
            }
            for (let i = 1; i < cw2.length; i++) {
                const line = [cw2[i - 1].x, cw2[i - 1].y, cw2[i].x, cw2[i].y];
                lw2.push(line);
            }
            const interLines = [];
            for (let i = 0; i < lw1.length; i++) {
                for (let j = 0; j < lw2.length; j++) {
                    if (this.intersects(lw1[i], lw2[j])) {
                        interLines.push([lw1[i], lw2[j]]);
                    }
                }
            }
            console.log(interLines);
            const manhattanDistances = [];
            //make function
            interLines.forEach(element => {
                let intersectX;
                let intersectY;
                if (Math.abs(element[0][0] - element[0][2]) < Math.abs(element[1][0] - element[1][2])) {
                    intersectX = element[0][0];
                }
                else {
                    intersectX = element[1][0];
                }
                if (Math.abs(element[0][1] - element[0][3]) < Math.abs(element[1][1] - element[1][3])) {
                    intersectY = element[0][1];
                }
                else {
                    intersectY = element[1][1];
                }
                let p1 = [intersectX, intersectY];
                console.log(p1);
                let p2 = [0, 0];
                manhattanDistances.push(this.calculateManhattanDistanceForPoints(p1, p2));
            });
            const actualResult = Math.min(...manhattanDistances);
            console.log('Test 1: Answer = ' + actualResult + ' Expected Answer = ' + expectedResult);
        });
    }
    getCoordinatesForWire(wire) {
        console.log('Input for getCoordinatesForWire: ', wire);
        const parsedWire = this.parseWire(wire);
        const startCoord = { x: 0, y: 0 };
        const coordsForWire = [];
        coordsForWire.push(startCoord);
        parsedWire.forEach((element, index) => {
            const direction = element.direction;
            const amount = element.amount;
            let coord;
            const prevCoord = coordsForWire[index];
            switch (direction) {
                case 'R':
                    coord = { x: (prevCoord.x + amount), y: prevCoord.y };
                    coordsForWire.push(coord);
                    break;
                case 'L':
                    coord = { x: (prevCoord.x - amount), y: prevCoord.y };
                    coordsForWire.push(coord);
                    break;
                case 'U':
                    coord = { x: prevCoord.x, y: (prevCoord.y + amount) };
                    coordsForWire.push(coord);
                    break;
                case 'D':
                    coord = { x: prevCoord.x, y: (prevCoord.y - amount) };
                    coordsForWire.push(coord);
                    break;
                default:
                    break;
            }
        });
        return coordsForWire;
    }
    // CORRECT CALC - DONT TOUCH
    calculateManhattanDistanceForPoints(p1, p2) {
        let distance = 0;
        const dimensions = Math.max(p1.length, p2.length);
        for (let i = 0; i < dimensions; i++) {
            distance += Math.abs((p2[i] || 0) - (p1[i] || 0));
        }
        return distance;
    }
    parsedWires$() {
        return this.reader.lines$.pipe(operators_1.map(data => {
            console.log(data);
            let wireOne;
            wireOne = { points: this.getCoordinatesForWire(data[0]) };
            let wireTwo;
            wireTwo = { points: this.getCoordinatesForWire(data[1]) };
            return { wireOne, wireTwo };
        }));
    }
    parseWire(wireString) {
        const wireArray = wireString.split(',');
        let wireObject = [];
        wireArray.forEach((element, index) => {
            let object = {};
            object['direction'] = element[0];
            object['amount'] = +element.split(/(\d+)/)[1];
            wireObject.push(object);
        });
        return wireObject;
    }
    assignment1() {
        return this.parsedWires$().pipe()
            .subscribe(data => {
            console.log(data.wireOne);
            console.log(data.wireTwo);
        });
    }
    assignment2() { }
}
exports.AOC2019DayThree = AOC2019DayThree;
const self = new AOC2019DayThree();
self.test();
//# sourceMappingURL=main.js.map