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

export const getCpi = value => {
  switch (value) {
    case "0":
      return 0;
    case "1":
      return 1;
    case "9":
      return 9;
    case "X":
      return "X";
    default:
      return null;
  }
};

export const getNhuCauValue = (source = {}, col, row) => {
  const value = source[`${col}_${row}`];
  /* TODO: Show validation error instead */
  if (value == null) {
    return "";
  }
  switch (value) {
    case "A":
      return 10;
    case "B":
      return 11;
    case "C":
      return 12;
    case "D":
      return 13;
    case "E":
      return 14;
    case "F":
      return 16;
    case "P":
      return "P";
    case "F":
      return "F";
    default:
      return toNumber(value);
  }
};

export const withDefault = (value, def, cb) => {
  if (value == null) {
    if (cb) {
      return cb(value);
    } else {
      return value;
    }
  } else {
    return def;
  }
};
