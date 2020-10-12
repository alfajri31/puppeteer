// const XLSX = require('xlsx')
// var ws = XLSX.utils.json_to_sheet([{"name":"John"}, {"city":"Seattle"}]);

let init = require('../test/initialize')
var XLSX = require('xlsx')
let faker = require('faker')
let data = []
var wb = XLSX.utils.book_new();
let i = 1

CHAR_SETS = {
    A: '123456789',
    B: '01234',
    C: 'ab',
    D: 'AB',
    E: '.',
    F: '@!'
}
function mapString(s, func) {
    return Array.prototype.map.call(s, func).join('')
}
function randChar(charType) {
    var chars = CHAR_SETS[charType];
    if (chars) {
        return chars.charAt(parseInt(Math.random() * chars.length));
    } else {
        return charType;
    }
}

for (let step = 0; step < 500; step++) {
    // Runs 5 times, with values of step 0 through 4.
    data.push({
        "no": i, "name": faker.name.lastName(), "phone": mapString('08AAAAAAAAAA', randChar), "email" : Math.floor(Math.random() * 5)+faker.internet.email(), "nik" :  mapString('AAAAAA311293000A', randChar),"pob" : "Bandung","dob": '1993-12-31', gender: "M"
    })
    i = i + 1
}
  
if(typeof XLSX == 'undefined') XLSX = require('xlsx');

/* make the worksheet */
var ws = XLSX.utils.json_to_sheet(data);

/* add to workbook */
var wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

/* generate an XLSX file */
XLSX.writeFile(wb, "bri-bulk.xlsx");
