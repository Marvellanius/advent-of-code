import {AOCFileReader} from "../fileReader";
import {EMPTY, from, Observable, of, Subscription} from "rxjs";
import {map, mergeMap, pairwise, pluck, share, tap} from "rxjs/operators";

export class AOC2019DayThree {
    constructor() {};
    private reader = new AOCFileReader();
    private path = '/opt/project/2019/day_3/input.txt';
    private input = null;
    subscriptions: Subscription[] = [];

    test() {
        this.testAssignment();
        // this.testAssignment1();
        // this.testAssignment2();
    }

    run() {
        this.reader.readLines(this.path);
        this.subscriptions.push(
            this.assignment1(),
            // this.assignment2()
        );
    }

    testAssignment() {
        this.parsedWires$().subscribe(data => {
                const cw1 = data[0].points;
                const cw2 = data[1].points;
                const lw1 = this.parseCoordsToLines(cw1);
                const lw2 = this.parseCoordsToLines(cw2);
                const interLines = this.getIntersectingLines(lw1, lw2);
                const actualResult = this.getLowestManhattanDistance(interLines);
                console.log('Test Answer = ' + actualResult);
            }
        );
        this.reader.readLines('/opt/project/2019/day_3/input.test1.txt');
        this.reader.readLines('/opt/project/2019/day_3/input.test2.txt');
        this.reader.readLines('/opt/project/2019/day_3/input.test3.txt');
    }

    assignment1(){
        return this.parsedWires$().pipe()
            .subscribe(data => {
                const cw1 = data[0].points;
                const cw2 = data[1].points;
                const lw1 = this.parseCoordsToLines(cw1);
                const lw2 = this.parseCoordsToLines(cw2);
                const interLines = this.getIntersectingLines(lw1, lw2);
                const actualResult = this.getLowestManhattanDistance(interLines);
                console.log('Answer = ' + actualResult);
            });
    }
    assignment2(){}

    parseCoordsToLines(coords) {
        const output = [];
        for (let i = 1; i < coords.length; i++) {
            const line = [coords[i-1].x,coords[i-1].y,coords[i].x,coords[i].y];
            output.push(line);
        }
        return output;
    }

    getIntersectingLines(l1, l2) {
        const interLines = [];
        for (let i = 0; i < l1.length; i++) {
            for (let j = 0; j < l2.length; j++) {
                if (this.intersects(l1[i], l2[j])) {
                    interLines.push([l1[i],l2[j]]);
                }
            }
        }
        console.log(interLines);
        return interLines;
    }

    getLowestManhattanDistance(input) {
        const manhattanDistances = [];

        input.forEach(element => {
            const p2 = this.getIntersectCoords(element);
            manhattanDistances.push(this.calculateManhattanDistanceForPoints([0,0], p2));
        });
        console.log(manhattanDistances);

        return Math.min(...manhattanDistances);
    }

    getIntersectCoords(input) {
        let intersectX;
        let intersectY;
        if(Math.abs(input[0][0] - input[0][2]) < Math.abs(input[1][0] - input[1][2])) {
            intersectX = input[0][0];
        } else {
            intersectX = input[1][0];
        }
        if(Math.abs(input[0][1] - input[0][3]) < Math.abs(input[1][1] - input[1][3])) {
            intersectY = input[0][1];
        } else {
            intersectY = input[1][1];
        }
        return [intersectX, intersectY];
    }

    intersects(l1, l2) {
        // if l1.x1 < l2.x1 < l1.x2 && l2.x1 == l2.x2 ---- intersectX = l2.x1
        // if l1.y1 < l2.y1 < l1.y2 && l2.y1 == l2.y2 ---- intersectY = l2.y1
        const x1 = l1[0];
        const x2 = l1[2];
        const y1 = l1[1];
        const y2 = l1[3];
        const x3 = l2[0];
        const x4 = l2[2];
        const y3 = l2[1];
        const y4 = l2[3];

        // if ((x1 === x2 && x3 !== x4) && (((x1 > x3 && x1 < x4) || (x1 < x3 && x1 > x4)) && (y3 > y1 && y3 < y2) || (y3 < y1 && y3 > y2))) {
        //     return true;
        // } else if ((y1 === y2 && y3 !== y4) && (((y1 > y3 && y1 < y4) || (y1 < y3 && y1 > y4)) && ((x3 > x1 && x3 < x2) || (x3 < x1 && x3 > x2)))) {
        //     return true;
        // }

        if (x1 === x2 && x3 !== x4) {
            if ((x1 > x3 && x1 < x4) || (x1 < x3 && x1 > x4)) {
                if ((y3 > y1 && y3 < y2) || (y3 < y1 && y3 > y2)) {
                    console.log('Passed via X: ', [x1, y1, x2, y2], [x3, y3, x4, y4]);
                    return true;
                }
            }
        } else if (y1 === y2 && y3 !== y4) {
            if ((y1 > y3 && y1 < y4) || (y1 < y3 && y1 > y4)) {
                if ((x3 > x1 && x3 < x2) || (x3 < x1 && x3 > x2)) {
                    console.log('Passed via Y: ', [x1, y1, x2, y2], [x3, y3, x4, y4]);
                    return true;
                }
            }
        } else if (y3 === y4 && y1 !== y2) {
            if ((y3 > y1 && y3 < y2) || (y3 < y1 && y3 > y2)) {
                if ((x1 > x3 && x1 < x4) || (x1 < x3 && x1 > x4)) {
                    console.log('Passed via Y2: ', [x1, y1, x2, y2], [x3, y3, x4, y4]);
                    return true;
                }
            }
        } else if (x3 === x4 && x1 !== x2) {
            if ((x3 > x1 && x3 < x2) || (x3 < x1 && x3 > x2)) {
                if ((y1 > y3 && y1 < y4) || (y1 < y3 && y1 > y4)) {
                    console.log('Passed via X2: ', [x1, y1, x2, y2], [x3, y3, x4, y4]);
                    return true;
                }
            }
        }
        return false;

        // let det, gamma, lambda;
        // det = (l1[2] - l1[0]) * (l2[3] - l2[1]) - (l2[2] - l2[0]) * (l1[3] - l1[1]);
        // if (det === 0) {
        //     return false;
        // } else {
        //     lambda = ((l2[3] - l2[1]) * (l2[2] - l1[0]) + (l2[0] - l2[2]) * (l2[3] - l1[1])) / det;
        //     gamma = ((l1[1] - l1[3]) * (l2[1] - l1[0]) + (l1[2] - l1[0]) * (l2[3] - l1[1])) / det;
        //     console.log('Lambda: ' + lambda);
        //     console.log('Gamma: ' + gamma);
        //     console.log('Determinant: ' + det);
        //     return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
        // }
    }

    getCoordinatesForWire(wire): Point2D[] {
        const parsedWire = this.parseWire(wire);
        const coordsForWire = [];
        parsedWire.forEach((element, index) => {
            const direction = element.direction;
            const amount = element.amount;
            let coord: Point2D;
            const prevCoord: Point2D = coordsForWire.length > 0 ? coordsForWire[index-1] : {x:0, y:0};
            switch (direction) {
                case 'R':
                    coord = {x:(prevCoord.x + amount), y:prevCoord.y};
                    coordsForWire.push(coord);
                    break;
                case 'L':
                    coord = {x:(prevCoord.x - amount), y:prevCoord.y};
                    coordsForWire.push(coord);
                    break;
                case 'U':
                    coord = {x:prevCoord.x, y:(prevCoord.y + amount)};
                    coordsForWire.push(coord);
                    break;
                case 'D':
                    coord = {x:prevCoord.x, y:(prevCoord.y - amount)};
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
        return this.reader.line$.pipe(
            map(data => {
                let wire: Wire = {points: this.getCoordinatesForWire(data)};
                return wire;
            }),
            pairwise()
        )
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
}
const self = new AOC2019DayThree();
self.run();
// self.test();
// console.log(self.intersects([3,5,3,2],[6,3,2,3]));
// console.log(self.intersects([3,5,3,2],[0,7,6,7]));
// console.log(self.intersects([8,5,3,5],[6,7,6,3]));

// Guesses:
// 690 -- WRONG
//


interface Wire {
    input?: string;
    instructions?: string;
    points?: Point2D[];
    lines?: Line[];
}

interface Point2D {
    x: number;
    y: number;
}

interface Line {
    p1: Point2D;
    p2: Point2D;
}
