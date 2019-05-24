// var address_of_cell = 'A1';

// /* Get worksheet */

const XLSX = require("xlsx");
const workbook = XLSX.readFile("./spss-mau-giao.xlsx");
const first_sheet_name = workbook.SheetNames[0];
const worksheet = workbook.Sheets[first_sheet_name];

module.exports = XLSX.utils.sheet_to_json(worksheet);
