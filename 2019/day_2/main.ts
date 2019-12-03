import {AOCFileReader} from "../fileReader";
import {from, Subscription} from "rxjs";
import {map, mergeMap, skipWhile} from "rxjs/operators";


/*
*   Intcode program = [opcode, input_position 1, input_position 2, result_position]
*   Opcode 1 = add 2 integers and store in 3rd position [program[0], program[1] + program[2] (store in) = program[3]]
*   Opcode 2 = multiply 2 integers and store in 3rd position [2, 1 * 2 = 3]
*   Opcode 99 = immediate halt
*   Once finished with an opcode, skip forward 4 positions and rerun.
*   example intcode: [1,9,10,3,2,3,11,0,99,30,40,50]
*   split up:
*   [1,9,10,3] = opcode 1, addition: add integers stored in program[9] and program[10], store result in program[3]
*   [2,3,11,0]
*   [99,]
*   [30,40,50]
*   program[9] = 30, program[10] = 40, 30+40 = 70, so program[3] = 70
*
*   new program:
*   [1,9,10,70]
*   [2,3,11,0] = opcode 2, multiplication: multiply integers stored in program[3] and program[11], store result in program[0]
*   [99,]
*   [30,40,50]
*   program[3] = 70, program[11] = 50, 70 * 50 = 3500, store result in program[0]
*
*   new program:
*   [3500,9,10,70]
*   [2,3,11,0]
*   [99,]
*   [30,40,50]
 */

export class AOC2019DayTwo {
    constructor() {};
    private reader = new AOCFileReader();
    private path = '/opt/project/2019/day_2/input.txt';
    private input = null;
    subscriptions: Subscription[] = [];

    test() {
        this.testAssignment1();
        // this.testAssignment2();
    }

    run() {
        this.reader.readFile(this.path);
        this.subscriptions.push(
            this.assignment1(),
            this.assignment2()
        );
    }

    testAssignment1(): void{
        const testCases = [
            [1,9,10,3,2,3,11,0,99,30,40,50],
            [1,0,0,0,99],
            [2,3,0,3,99],
            [2,4,4,5,99,0],
            [1,1,1,4,99,5,6,0,99],
            [1,1,1,4,99,5,6,0,99,1,1,1,4,99,5,6,0,99,1,1,1,4,99,5,6,0,99]
        ];
        const expectedAnswers = [
            [3500,9,10,70,2,3,11,0,99,30,40,50],
            [2,0,0,0,99],
            [2,3,0,6,99],
            [2,4,4,5,99,9801],
            [30,1,1,4,2,5,6,0,99],
            [30,1,1,4,2,5,6,0,99,1,1,1,4,99,5,6,0,99,1,1,1,4,99,5,6,0,99]
        ];

        testCases.forEach((element, index) => {
            let answer = this.parseProgram(element);
            console.log('Case ' + index + ' test: ', answer, expectedAnswers[index])
        });
    }

    testAssignment2(): void{

    }

    assignment1() {
        console.log('Day 2, Assignment 1');
        return this.parsedInput$().pipe(
            map(data => this.parseProgram(data)[0])
        ).subscribe(data => console.log('Day 2, Assignment 1 answer = ' + data));
    }

    assignment2() {
        console.log('Day 2, Assignment 2');
        const options = [];
        for (let i = 0; i < 100; i++) {
            for (let j = 0; j < 100; j++) {
                options.push([i, j]);
            }
        }
        const options$ = from(options);
        return options$.pipe(
            mergeMap(option => {
                return this.parsedInput$().pipe(
                    map(data => {
                        data[1] = option[0];
                        data[2] = option[1];
                        return this.parseProgram(data);
                    }),
                    skipWhile(data => data[0] !== 19690720)
                );
            }),
        ).subscribe(data => {
            const positionOne = data[0];
            const noun = data[1];
            const verb = data[2];
            if(positionOne === 19690720) {
                const answer = 100 * noun + verb;
                console.log('Day 2, Assignment 2 answer = ' + answer);
            }
        });
    }

    parseProgram(inputProgram) {
        let outputProgram = inputProgram;
        const opcodeAmount = inputProgram.length / 4;

        for (let i = 0; i < opcodeAmount; i++) {
            if (!this.parseOpcode(i*4, inputProgram, outputProgram)) {
                break;
            }
        }
        return outputProgram;
    }

    parseOpcode(opcode, inputProgram, outputProgram) {
        switch (+inputProgram[opcode]) {
            case 1:
                outputProgram[inputProgram[opcode+3]] = inputProgram[inputProgram[opcode+1]] + inputProgram[inputProgram[opcode+2]];
                return true;
            case 2:
                outputProgram[inputProgram[opcode+3]] = inputProgram[inputProgram[opcode+1]] * inputProgram[inputProgram[opcode+2]];
                return true;
            case 99:
                return false;
            default:
                return false;
        }
    }

    parsedInput$() {
        return this.reader.lines$.pipe(
            map(data => data[0].split(',').map(Number))
        );
    }
}
let self = new AOC2019DayTwo();
self.run();
