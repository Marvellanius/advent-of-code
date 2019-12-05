import {AOCFileReader} from "../fileReader";
import {EMPTY, from, Observable, of, Subscription} from "rxjs";
import {map, mergeMap, pairwise, pluck, tap, last, scan, every} from "rxjs/operators";

export class AOC2019DayThree {
    constructor() {};
    private reader = new AOCFileReader();
    private path = '/opt/project/2019/day_3/input.txt';
    private input = null;
    subscriptions: Subscription[] = [];
    directions = {
        R: [1,0],
        L: [-1,0],
        U: [0,1],
        D: [0,-1]
    };

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
        this.parsedWires$().pipe(
            tap(data => console.log(data)),
        ).subscribe(data => {
                // const cw1 = data;
                // const cw2 = data;
                // const interLines = this.getIntersectingLines(lw1, lw2);
                // const actualResult = this.getLowestManhattanDistance(interLines);
                // console.log('Test Answer = ' + actualResult);
            }
        );
        this.reader.readLines('/opt/project/2019/day_3/input.test1.txt');
        this.reader.readLines('/opt/project/2019/day_3/input.test2.txt');
        this.reader.readLines('/opt/project/2019/day_3/input.test3.txt');
    }

    assignment1(){
        return this.parsedWires$().pipe(
            tap(data => console.log(data))
        )
            .subscribe(data => {
                // const cw1 = data.wireOne.points;
                // const cw2 = data.wireTwo.points;
                // const lw1 = this.parseCoordsToLines(cw1);
                // const lw2 = this.parseCoordsToLines(cw2);
                // const interLines = this.getIntersectingLines(lw1, lw2);
                // const actualResult = this.getLowestManhattanDistance(interLines);
                // console.log('Answer = ' + actualResult);

                // console.log(data);
            });
    }
    assignment2(){}

    getIntersectingLines(l1, l2) {
        l2.forEach(point => {
            this.intersects(l1, point);
        });
        console.log(l1, l2);
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
        return l2.filter(coord => l1.includes(coord));
    }

    addArrays(arr1, instruction) {
        return arr1.map((num, index) => num + (this.directions[instruction.direction][index] * instruction.amount));
    }

    getCoordinatesForWire(wire): Array<number> {
        const parsedWire = this.parseWire(wire);
        const coordsForWire = [];
        parsedWire.forEach((instruction, index) => {
            let prevCoord = coordsForWire.length > 0 ? coordsForWire[index-1] : [0,0];
            prevCoord = this.addArrays(prevCoord, instruction);
            coordsForWire.push(prevCoord);
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
            // tap(data => console.log(data)),
            map(data => {
                return this.getCoordinatesForWire(data);
            }),
            // tap(data => console.log(data)),
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
// self.run();
self.test();
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
