const XLSX = require("xlsx");
const { readFileSync, writeFileSync } = require("fs");
const workbook = XLSX.readFile("nguoi-truong-thanh-input.source.xlsx", {
  cellStyles: true,
});
const first_sheet_name = workbook.SheetNames[0];
const ws = workbook.Sheets[first_sheet_name];

const encode_col = XLSX.utils.encode_col;
const decode_col = XLSX.utils.decode_col;

const getNhuCauValue = (source, row, col) => {
  const cellData = source[row][col];
  const value = cellData.value;
  if (value === null) {
    return 9;
  }
  switch (value) {
    case "a":
    case "A":
      return 10;
      break;
    case "b":
    case "B":
      return 11;
      break;
    case "c":
    case "C":
      return 12;
      break;
    case "d":
    case "D":
      return 13;
      break;
    case "e":
    case "E":
      return 14;
      break;
    case "f":
    case "F":
      return 16;
      break;
    case "g":
    case "G":
      return 17;
      break;
    case "":
      return 9;
      break;
    default:
      let parseResult = parseInt(value, 10);
      return Number.isNaN(parseResult) ? 9 : parseResult;
      break;
  }
};
const toNumber = num => {
  if (num === "X" || num === "x") {
    return "X";
  }
  if (typeof num === null) {
    return "";
  }
  if (typeof num === "number") {
    return num;
  }
  const parsed = parseInt(num, 10);
  if (typeof parsed === "undefined") {
    return 0;
  }
  if (isNaN(parsed)) {
    return num;
  }
  return parsed;
};
const toNumberUndefined = num => {
  if (num === "X" || num === "x") {
    return "X";
  }
  if (typeof num === null) {
    return 9;
  }
  if (typeof num === "number") {
    return num;
  }
  const parsed = parseInt(num, 10);
  if (typeof parsed === "undefined") {
    return 9;
  }
  if (isNaN(parsed)) {
    return num;
  }
  return parsed;
};

let benhmantinhMap = [
  { label: "Cao huyết áp", value: "cao-huyet-ap" },
  { label: "Tiểu đường", value: "tieu-duong" },
  { label: "Tim mạch", value: "tim-mach" },
  { label: "Viêm khớp", value: "viem-khop" },
  { label: "Bệnh thận", value: "benh-than" },
  { label: "Bệnh dạ dày", value: "benh-da-day" },
  { label: "Bệnh viêm khớp dạng thấp", value: "benh-viem-khop-dang-thap" },
];

let getBenhmantinh = (arr = []) => {
  return arr.map(b => benhmantinhMap.find(lv => lv.value == b).label);
};

const rows = readFileSync("./data.nguoitruongthanh.json").toString();
const dataToWrite = rows
  .split("\n")
  .map(a => a && JSON.parse(a))
  // .filter(r => {
  //   return r && r.kham["so-ho-so"] === "BRVTĐĐPHM301";
  // })
  .map(rowData => {
    if (!rowData) {
      return null;
    }
    const rowKhamData = rowData.kham;
    const ncLeft = JSON.parse(rowKhamData["nhucauLeft"]);
    const ncRight = JSON.parse(rowKhamData["nhucauRight"]);

    const row = {
      A: rowKhamData["so-ho-so"],
      B: rowKhamData["nguoi-kham"],
      C: rowKhamData["ho-va-ten"].toUpperCase(),
      D: rowKhamData["gioi"],
      E: rowKhamData["tuoi"],
      F: rowKhamData["dia-chi-gia-dinh"],
      G: getBenhmantinh(rowKhamData["benh-man-tinh"])
        .concat(
          rowKhamData["benh-man-tinh-khac"] === ""
            ? []
            : rowKhamData["benh-man-tinh-khac"]
        )
        .join(",")
        .toUpperCase(),
    };
    // nhuCauLeft
    let colCounter = 7;
    for (let i = 1; i <= 16; i++) {
      if (i < 6 || i > 11) {
        row[encode_col(colCounter)] = getNhuCauValue(ncLeft, i, 3);
        colCounter = colCounter + 1;
      }
      row[encode_col(colCounter)] = getNhuCauValue(ncLeft, i, 4);
      colCounter = colCounter + 1;
      row[encode_col(colCounter)] = getNhuCauValue(ncLeft, i, 5);
      colCounter = colCounter + 1;
      row[encode_col(colCounter)] = getNhuCauValue(ncLeft, i, 6);
      colCounter = colCounter + 1;
      row[encode_col(colCounter)] = getNhuCauValue(ncLeft, i, 7);
      colCounter = colCounter + 1;
      row[encode_col(colCounter)] = getNhuCauValue(ncLeft, i, 8);
      colCounter = colCounter + 1;
      row[encode_col(colCounter)] = getNhuCauValue(ncLeft, i, 2);
      colCounter = colCounter + 1;
      row[encode_col(colCounter)] = getNhuCauValue(ncLeft, i, 1);
      colCounter = colCounter + 1;
    }
    // nhuCauRight
    for (let i = 1; i <= 16; i++) {
      if (i < 6 || i > 11) {
        row[encode_col(colCounter)] = getNhuCauValue(ncRight, i, 5);
        colCounter = colCounter + 1;
      }
      row[encode_col(colCounter)] = getNhuCauValue(ncRight, i, 4);
      colCounter = colCounter + 1;
      row[encode_col(colCounter)] = getNhuCauValue(ncRight, i, 3);
      colCounter = colCounter + 1;
      row[encode_col(colCounter)] = getNhuCauValue(ncRight, i, 2);
      colCounter = colCounter + 1;
      row[encode_col(colCounter)] = getNhuCauValue(ncRight, i, 1);
      colCounter = colCounter + 1;
      row[encode_col(colCounter)] = getNhuCauValue(ncRight, i, 0);
      colCounter = colCounter + 1;
      row[encode_col(colCounter)] = getNhuCauValue(ncRight, i, 6);
      colCounter = colCounter + 1;
      row[encode_col(colCounter)] = getNhuCauValue(ncRight, i, 7);
      colCounter = colCounter + 1;
    }

    // PI
    row.IR = rowKhamData["pi-16N"] || 9;
    row.IS = rowKhamData["pi-11N"] || 9;
    row.IT = rowKhamData["pi-26N"] || 9;
    row.IU = rowKhamData["pi-46T"] || 9;
    row.IV = rowKhamData["pi-31N"] || 9;
    row.IW = rowKhamData["pi-36T"] || 9;
    // // CI
    row.IX = rowKhamData["ci-16N"] || 9;
    row.IY = rowKhamData["ci-11N"] || 9;
    row.IZ = rowKhamData["ci-26N"] || 9;
    row.JA = rowKhamData["ci-46T"] || 9;
    row.JB = rowKhamData["ci-31N"] || 9;
    row.JC = rowKhamData["ci-36T"] || 9;
    // CPI (blank)
    for (let i = decode_col("JD"); i <= decode_col("LU"); i++) {
      row[encode_col(i)] = 9;
    }
    // Flour
    row.LV = toNumber(rowKhamData["flour-ma-so"]) || 9;
    row.LW = toNumber(rowKhamData["flour-so-rang"]) || 9;
    // Erosion
    row.LX = toNumber(rowKhamData["dental-erosion-ma-so"]) || 9;
    row.LY = toNumber(rowKhamData["dental-erosion-so-rang"]) || 9;
    // // chen chuc
    row.LZ = rowKhamData["chenchuc-16N"] || 9;
    row.MA = rowKhamData["chenchuc-11N"] || 9;
    row.MB = rowKhamData["chenchuc-21N"] || 9;
    row.MC = rowKhamData["chenchuc-46T"] || 9;
    row.MD = rowKhamData["chenchuc-31N"] || 9;
    row.ME = rowKhamData["chenchuc-36T"] || 9;
    // Khop can
    row.MF = rowKhamData["can-nguoc-rang-truoc"] ? 1 : 0;
    row.MG = rowKhamData["can-nguoc-rang-sau"] ? 1 : 0;
    row.MH = rowKhamData["can-ho"] ? 1 : 0;
    row.MI = toNumberUndefined(rowKhamData["can-phu"]);
    row.MJ = toNumberUndefined(rowKhamData["can-chia"]);

    let angle = value => {
      switch (value) {
        case "I":
        case "i":
          return 1;
          break;
        case "II":
        case "ii":
          return 2;
          break;
        case "III":
        case "iii":
          return 3;
          break;
        default:
          return value;
          break;
      }
    };
    row.MK = toNumberUndefined(angle(rowKhamData["angle-r3p"]));
    row.ML = toNumberUndefined(angle(rowKhamData["angle-r3t"]));
    row.MM = toNumberUndefined(angle(rowKhamData["angle-r6p"]));
    row.MN = toNumberUndefined(angle(rowKhamData["angle-r6t"]));

    // Ham gia
    row.MO = toNumberUndefined(rowKhamData["ham-gia-tren"]);
    row.MP = toNumberUndefined(rowKhamData["ham-gia-duoi"]);

    // thoiquen
    const rowThoiQuenData = rowData.thoiquen;
    row.MQ = rowThoiQuenData["a2"] || 9;
    row.MR = rowThoiQuenData["a4"] || 9;
    row.MS = rowThoiQuenData["a5"] || 9;
    row.MT = rowThoiQuenData["a6"] || 9;
    row.MU = rowThoiQuenData["a7-1"] || 9;
    row.MV = rowThoiQuenData["a7-2"] || 9;
    row.MW = rowThoiQuenData["a7-3"] || 9;
    row.MX = rowThoiQuenData["a7-4"] || 9;
    row.MY = rowThoiQuenData["a7-5"] || 9;
    row.MZ = rowThoiQuenData["a7-6"] || 9;
    row.NA = rowThoiQuenData["a7-7"] || 9;
    row.NB = rowThoiQuenData["a7-8"] || 9;
    row.NC = rowThoiQuenData["a7-9"] || 9;
    row.ND = rowThoiQuenData["a7-10"] || 9;
    row.NE = rowThoiQuenData["a7-11"] || 9;
    row.NF = rowThoiQuenData["a7-12"] || 9;
    row.NG = rowThoiQuenData["a8"] || 9;
    row.NH = rowThoiQuenData["a9"] || 9;
    row.NI = rowThoiQuenData["a10-1"] || 0;
    row.NJ = rowThoiQuenData["a10-2"] || 0;
    row.NK = rowThoiQuenData["a10-3"] || 0;
    row.NL = rowThoiQuenData["a10-4"] || 0;
    row.NM = rowThoiQuenData["a10-5"] || 0;
    row.NN = rowThoiQuenData["a10-6"] || 0;
    // a11
    row.NO = rowThoiQuenData["a11"] || 9;
    // a12
    row.NP = rowThoiQuenData["a12"] || 9;

    /// a13
    row.NQ = rowThoiQuenData["a13-1"] || 2;
    row.NR = rowThoiQuenData["a13-2"] || 2;
    row.NS = rowThoiQuenData["a13-3"] || 2;
    row.NT = rowThoiQuenData["a13-4"] || 2;
    row.NU = rowThoiQuenData["a13-5"] || 2;
    row.NV = rowThoiQuenData["a13-6"] || 2;
    row.NW = rowThoiQuenData["a13-7"] || "";

    // a14
    row.NX = rowThoiQuenData["a14"] || 1;
    row.NY = rowThoiQuenData["a15"] || 9;
    row.NZ = rowThoiQuenData["a16"] || 9;

    // a17
    row.OA = rowThoiQuenData["a17-1"] || 2;
    row.OB = rowThoiQuenData["a17-2"] || 2;
    row.OC = rowThoiQuenData["a17-3"] || 2;

    // a18
    row.OD = rowThoiQuenData["a18-1"] || 2;
    row.OE = rowThoiQuenData["a18-2"] || 2;
    row.OF = rowThoiQuenData["a18-3"] || 2;
    row.OG = rowThoiQuenData["a18-4"] || 2;
    row.OH = rowThoiQuenData["a18-5"] || 2;

    // a19
    row.OI = rowThoiQuenData["a19-1"] || 1;
    row.OJ = rowThoiQuenData["a19-2"] || 1;
    row.OK = rowThoiQuenData["a19-3"] || 1;
    row.OL = rowThoiQuenData["a19-4"] || 1;
    row.OM = rowThoiQuenData["a19-5"] || 1;
    row.ON = rowThoiQuenData["a19-6"] || 1;
    row.OO = rowThoiQuenData["a19-7"] || 1;
    row.OP = rowThoiQuenData["a19-8"] || 1;
    row.OQ = rowThoiQuenData["a19-9"] || 1;

    // a20
    row.OR = rowThoiQuenData["a20-1"] || 1;
    row.OS = rowThoiQuenData["a20-2"] || 1;
    row.OT = rowThoiQuenData["a20-3"] || 1;
    row.OU = rowThoiQuenData["a20-4"] || 1;
    row.OV = rowThoiQuenData["a20-5"] || 1;
    row.OW = rowThoiQuenData["a20-6"] || 1;

    // a21
    row.OX = rowThoiQuenData["a21"] || 0;

    // a22
    row.OY = rowThoiQuenData["a22"] == 1 ? 1 : 0;
    row.OZ = rowThoiQuenData["a22"] == 2 ? 1 : 0;
    row.PA = rowThoiQuenData["a22"] == 3 ? 1 : 0;
    row.PB = rowThoiQuenData["a22"] == 4 ? 1 : 0;
    row.PC = rowThoiQuenData["a22"] == 5 ? 1 : 0;
    row.PD = rowThoiQuenData["a22-6"];

    // a23
    row.PE =
      rowThoiQuenData["a23"] == 7
        ? rowThoiQuenData["a23-7"]
        : rowThoiQuenData["a23"];

    // a24
    row.PF = rowThoiQuenData["a24"];
    row.PG = rowThoiQuenData["a25"];
    row.PH = toNumber(rowThoiQuenData["a26-1"]) || 9;

    // OHIP 14
    const rowOhip = rowData.ohip;
    let colStart = decode_col("PH");
    for (let i = 1; i <= 14; i++) {
      row[encode_col(colStart + i)] = rowOhip[i];
    }

    return row;
  })
  .filter(row => row);

XLSX.utils.sheet_add_json(ws, dataToWrite, { skipHeader: true, origin: "A2" });
XLSX.writeFile(workbook, "nguoitruongthanh.hogiadinh.xlsx");
