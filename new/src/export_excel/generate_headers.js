const XLSX = require("xlsx");
const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const workbook = XLSX.readFile(join(__dirname, "tre-em.xlsx"), {
  cellStyles: true,
});

const first_sheet_name = workbook.SheetNames[0];
const ws = workbook.Sheets[first_sheet_name];

const wsJson = XLSX.utils.sheet_to_json(ws, { header: 1, blankrows: false });

const headers = wsJson[0];

writeFileSync(
  join(__dirname, "tre-em-headers.json"),
  JSON.stringify(headers, null, 2)
);

console.log("Write header to tre-em-headers.json");
