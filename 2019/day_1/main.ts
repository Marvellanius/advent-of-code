import {AOCFileReader} from "../fileReader";
import {Subscription} from "rxjs";

export class AOC2019DayOne {
    constructor() {};
    private reader = new AOCFileReader();
    subscriptions: Subscription[] = [];

    test() {
        this.testAssignment1();
        this.testAssignment2();
    }

    run() {
        this.reader.readFile('/opt/project/2019/day_1/input.txt');
        this.subscriptions.push(
            this.day1Assignment1(),
            this.day1Assignment2()
        );
    }

    testAssignment1(): void{
        const testCases = [12, 14, 1969, 100756];
        const expectedAnswers = [2, 2, 654, 33583];
        let actualAnswers = [];
        testCases.forEach(input => {
            let output = this.convertMassToFuel(input);
            actualAnswers.push(output);
        });
        console.log('Assignment 1 Test: ', actualAnswers, expectedAnswers);
    }

    testAssignment2(): void{
        const testCases = [14, 1969, 100756], expectedAnswers = [2, 966, 50346];
        let actualAnswers = [];
        testCases.forEach(input => {
            let output = this.convertMassToFuelPart2(input);
            actualAnswers.push(output);
        });
        console.log('Assignment 2 Test: ', actualAnswers, expectedAnswers);
    }

    day1Assignment1() {
        let fuel = 0;
        return this.reader.lines$.subscribe(data => {
            data.forEach(mass => {
                fuel += this.convertMassToFuel(+mass);
            });
            console.log('Answer to Assignment 1: ' + fuel);
        });
    }

    day1Assignment2() {
        let fuel = 0;
        return this.reader.lines$.subscribe(data => {
            data.forEach(mass => {
                fuel += this.convertMassToFuelPart2(+mass);
            });
            console.log('Answer to Assignment 2: ' + fuel);
        });
    }


    private convertMassToFuel(mass: number): number {
        return Math.floor(mass / 3) - 2;
    }

    private convertMassToFuelPart2(mass: number): number {
        let totalFuel = 0;
        while (this.checkFuelIsNegative(mass)) {
            let fuelMass = this.convertMassToFuel(mass);
            totalFuel += fuelMass;
            mass = fuelMass;
        }
        return totalFuel;
    }

    private checkFuelIsNegative(fuel: number): boolean {
        let rounded = Math.floor(fuel / 3) - 2;
        return (rounded > 0);
    }
}
