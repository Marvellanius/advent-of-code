/*
Just a wrapper to call either all assignments, or just the assignments for a single day.
 */

import {AOC2019DayOne} from "./2019/day_1/main";
import {AOC2019DayTwo} from "./2019/day_2/main";

const arg = process.argv[3];

const days = {
    1: new AOC2019DayOne(),
    2: new AOC2019DayTwo()
};

export default function allDays() {
    Object.entries(days).forEach(
        ([key, value]) => {
            console.log(value);
            value.run();
        }
    );
}

export function day2() {
    days[2].run();
}

export function testDay() {
    days[arg].test();
}
