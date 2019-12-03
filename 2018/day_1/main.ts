import {EMPTY} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {AOCFileReader} from "../../2019/fileReader";

let count = 0;

const reader = new AOCFileReader();

reader.readFile('/opt/project/2018/day_1/input.txt');
reader.lines$.pipe(
    tap(data => console.log(data)),
    map((data: any) => {
        let positive = new Array<number>();
        let negative = new Array<number>();
        data.forEach(expression => {
            let number = expression.split(/(\d+)/)[1];
            console.log(number);
            if (expression[0] === '-') {
                negative.push(+number);
            } else if (expression[0] === '+') {
                positive.push(+number);
            }
        });
        return {positive, negative};
    }),
    catchError((error: any) => {
        return EMPTY;
    })
).subscribe((data: any) => {
    data.positive.forEach((number: number) => count += number);
    data.negative.forEach((number: number) => count -= number);
    console.log(count);
    return count;
});
