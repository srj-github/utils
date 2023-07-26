"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCsv = void 0;
var generateCsv = function (data) {
    var csvData = '';
    var i = 1;
    function nthIndex(str, pat, n) {
        var L = str.length, i = -1;
        while (n-- && i++ < L) {
            i = str.indexOf(pat, i);
            if (i < 0)
                break;
        }
        return i;
    }
    var maxLength = 0;
    for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
        var _b = _a[_i], _ = _b[0], values = _b[1];
        if (values.length > maxLength)
            maxLength = values.length;
    }
    for (var _c = 0, _d = Object.entries(data); _c < _d.length; _c++) {
        var _e = _d[_c], title = _e[0], values = _e[1];
        if (values.length < maxLength) {
            var originalValuesLength = values.length;
            for (var n = 0; n <= (maxLength - originalValuesLength); n++) {
                values.push('');
            }
        }
        if (i === 1) {
            csvData += "\"".concat(title, "\"\n");
            values.forEach(function (value) {
                csvData += "\"".concat(value, "\"\n");
            });
            i++;
        }
        else {
            csvData = csvData.slice(0, nthIndex(csvData, '\n', 1)) + ",\"".concat(title, "\"") + csvData.slice(csvData.indexOf('\n'));
            values.forEach(function (value, index) {
                var newLineIndex = nthIndex(csvData, '\n', (index) + 2);
                csvData = csvData.slice(0, newLineIndex) + ",\"".concat(value, "\"") + csvData.slice(newLineIndex);
            });
            i++;
        }
    }
    return csvData;
};
exports.generateCsv = generateCsv;
