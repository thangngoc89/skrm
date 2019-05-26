// var address_of_cell = 'A1';

// /* Get worksheet */

const XLSX = require("xlsx");

module.exports = fileName => {
  const workbook = XLSX.readFile(fileName);
  const first_sheet_name = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[first_sheet_name];

  return XLSX.utils.sheet_to_json(worksheet);
};

