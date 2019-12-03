"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const fileReader_1 = require("../../2019/fileReader");
let count = 0;
const reader = new fileReader_1.AOCFileReader();
reader.readFile('/opt/project/2018/day_1/input.txt');
reader.lines$.pipe(operators_1.tap(data => console.log(data)), operators_1.map((data) => {
    let positive = new Array();
    let negative = new Array();
    data.forEach(expression => {
        let number = expression.split(/(\d+)/)[1];
        console.log(number);
        if (expression[0] === '-') {
            negative.push(+number);
        }
        else if (expression[0] === '+') {
            positive.push(+number);
        }
    });
    return { positive, negative };
}), operators_1.catchError((error) => {
    return rxjs_1.EMPTY;
})).subscribe((data) => {
    data.positive.forEach((number) => count += number);
    data.negative.forEach((number) => count -= number);
    console.log(count);
    return count;
});
//# sourceMappingURL=main.js.map