"use strict";
/*
Just a wrapper to call either all assignments, or just the assignments for a single day.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./2019/day_1/main");
const main_2 = require("./2019/day_2/main");
const arg = process.argv[3];
const days = {
    1: new main_1.AOC2019DayOne(),
    2: new main_2.AOC2019DayTwo()
};
function allDays() {
    Object.entries(days).forEach(([key, value]) => {
        console.log(value);
        value.run();
    });
}
exports.default = allDays;
function day2() {
    days[2].run();
}
exports.day2 = day2;
function testDay() {
    days[arg].test();
}
exports.testDay = testDay;
//# sourceMappingURL=index.js.map