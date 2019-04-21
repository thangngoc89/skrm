import XLSX from "xlsx";

export const encode_col = XLSX.utils.encode_col;
export const decode_col = XLSX.utils.decode_col;

export const toNumber = num => {
  const parsed = parseInt(num, 10);
  /* TODO: validation error */
  if (isNaN(parsed)) {
    return "";
  }
  return parsed;
};

export const toNumberWithDefault = (num, def) => {
  const parsed = toNumber(num);
  return parsed === "" ? def : parsed;
};

export const getOhis = value => {
  switch (value) {
    case "0":
      return 0;
    case "1":
      return 1;
    case "2":
      return 2;
    case "3":
      return 3;
    case "X":
      return "X";
    default:
      return null;
  }
};

export const getNhuCauValue = (source = {}, col, row) => {
  const value = source[`${col}_${row}`];
  /* TODO: Show validation error instead */
  if (typeof value === "undefined") {
    return "";
  }
  switch (value) {
    case "A":
      return 10;
      break;
    case "B":
      return 11;
      break;
    case "C":
      return 12;
      break;
    case "D":
      return 13;
      break;
    case "E":
      return 14;
      break;
    case "F":
      return 16;
      break;
    case "P":
      return "P";
    case "F":
      return "F";
    default:
      return toNumber(value);
      break;
  }
};

export const withDefault = (value, def, cb) => {
  if (typeof value !== "undefined") {
    if (cb) {
      return cb(value);
    } else {
      return value;
    }
  } else {
    return def;
  }
};
