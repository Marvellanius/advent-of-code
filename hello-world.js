"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
rxjs_1.of(1, 2, 3).pipe(operators_1.map(function (x) { return x + 2; })).subscribe(function (data) { return console.log(data); });
