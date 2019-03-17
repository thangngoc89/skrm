const XLSX = require("xlsx");
const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const workbook = XLSX.readFile(join(__dirname, "tre-em.xlsx"), {
  cellStyles: true,
});

const first_sheet_name = workbook.SheetNames[0];
const ws = workbook.Sheets[first_sheet_name];

const encode_col = XLSX.utils.encode_col;
const decode_col = XLSX.utils.decode_col;

const getNhuCauValue = (source, col, row) => {
  const value = source[`${col}_${row}`];
  /* TODO: Show validation error instead */
  if (typeof value === "undefined") {
    return `${col}_${row}`;
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
    default:
      return parseInt(value, 10);
      break;
  }
};

const toNumber = num => {
  const parsed = parseInt(num, 10);
  /* TODO: validation error */
  if (isNaN(parsed)) {
    return "";
  }
  return parsed;
};

const toNumberUndefined = num => num;

const rows = readFileSync("./data.hmong").toString();

const dataToWrite = JSON.parse(rows)

  .map(rowData => {
    if (!rowData) {
      return null;
    }
    const rowKhamData = rowData.phieuDieuTra;

    const row = {
      A: rowKhamData["soHoSo"],
      B: rowKhamData["nguoiKham"],
      C: rowKhamData["hoVaTen"].toUpperCase(),
      D: toNumber(rowKhamData["gioiTinh"]),
      E: rowKhamData["tuoi"],
      F: rowKhamData["danToc"],
      G: rowKhamData["diaChi"],
      H: rowKhamData["truong"],
    };

    const ncLeft = rowKhamData.ttncHamTren;

    const ncLeftRow = [
      "17",
      "16",
      "15",
      "14",
      "13",
      "12",
      "11",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
    ];
    // nhuCauLeft
    let colCounter = 8;
    for (let i = 0; i <= 13; i++) {
      /* Nhai */
      if (i < 4 || i > 9) {
        row[encode_col(colCounter)] = getNhuCauValue(
          ncLeft,
          "Nhai",
          ncLeftRow[i]
        );
        colCounter = colCounter + 1;
      }
      /* Ng */
      row[encode_col(colCounter)] = getNhuCauValue(ncLeft, "N", ncLeftRow[i]);
      colCounter = colCounter + 1;
      /* Tr */
      row[encode_col(colCounter)] = getNhuCauValue(ncLeft, "T", ncLeftRow[i]);
      colCounter = colCounter + 1;
      /* G */
      row[encode_col(colCounter)] = getNhuCauValue(ncLeft, "G", ncLeftRow[i]);
      colCounter = colCounter + 1;
      /* X */
      row[encode_col(colCounter)] = getNhuCauValue(ncLeft, "X", ncLeftRow[i]);
      colCounter = colCounter + 1;
      /* TT */
      row[encode_col(colCounter)] = getNhuCauValue(ncLeft, "TT", ncLeftRow[i]);
      colCounter = colCounter + 1;
      /* NC */
      row[encode_col(colCounter)] = getNhuCauValue(ncLeft, "NC", ncLeftRow[i]);
      colCounter = colCounter + 1;
    }
    const ncRight = rowKhamData.ttncHamDuoi;

    const ncRightRow = [
      "37",
      "36",
      "35",
      "34",
      "33",
      "32",
      "31",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
    ];
    // nhuCauRight
    for (let i = 0; i < 14; i++) {
      /* Nhai */
      if (i < 4 || i > 9) {
        row[encode_col(colCounter)] = getNhuCauValue(
          ncRight,
          "Nhai",
          ncRightRow[i]
        );
        colCounter = colCounter + 1;
      }
      /* Ng */
      row[encode_col(colCounter)] = getNhuCauValue(ncRight, "N", ncRightRow[i]);
      colCounter = colCounter + 1;
      /* Tr */
      row[encode_col(colCounter)] = getNhuCauValue(ncRight, "T", ncRightRow[i]);
      colCounter = colCounter + 1;
      /* G */
      row[encode_col(colCounter)] = getNhuCauValue(ncRight, "G", ncRightRow[i]);
      colCounter = colCounter + 1;
      /* X */
      row[encode_col(colCounter)] = getNhuCauValue(ncRight, "X", ncRightRow[i]);
      colCounter = colCounter + 1;
      /* TT */
      row[encode_col(colCounter)] = getNhuCauValue(
        ncRight,
        "TT",
        ncRightRow[i]
      );
      colCounter = colCounter + 1;
      /* NC */
      row[encode_col(colCounter)] = getNhuCauValue(
        ncRight,
        "NC",
        ncRightRow[i]
      );
      colCounter = colCounter + 1;
    }

    // PI
    row.GK = rowKhamData["pi-16N"] || 9;
    row.GL = rowKhamData["pi-11N"] || 9;
    row.GM = rowKhamData["pi-26N"] || 9;
    row.GN = rowKhamData["pi-46T"] || 9;
    row.GO = rowKhamData["pi-31N"] || 9;
    row.GP = rowKhamData["pi-36T"] || 9;
    // CI
    row.GQ = rowKhamData["ci-16N"] || 9;
    row.GR = rowKhamData["ci-11N"] || 9;
    row.GS = rowKhamData["ci-26N"] || 9;
    row.GT = rowKhamData["ci-46T"] || 9;
    row.GU = rowKhamData["ci-31N"] || 9;
    row.GV = rowKhamData["ci-36T"] || 9;
    // CPI (blank)
    for (let i = decode_col("GW"); i <= decode_col("HX"); i++) {
      row[encode_col(i)] = 9;
    }
    // Flour
    row.HY = toNumber(rowKhamData["flour-ma-so"]) || 9;
    row.HZ = toNumber(rowKhamData["flour-so-rang"]) || 9;
    // chen chuc
    row.IA = rowKhamData["chenchuc-16N"] || 9;
    row.IB = rowKhamData["chenchuc-11N"] || 9;
    row.IC = rowKhamData["chenchuc-21N"] || 9;
    row.ID = rowKhamData["chenchuc-46T"] || 9;
    row.IE = rowKhamData["chenchuc-31N"] || 9;
    row.IF = rowKhamData["chenchuc-36T"] || 9;
    // Khop can
    row.IG = rowKhamData["can-nguoc-rang-truoc"] ? 1 : 0;
    row.IH = rowKhamData["can-nguoc-rang-sau"] ? 1 : 0;
    row.II = rowKhamData["can-ho"] ? 1 : 0;
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
    row.IJ = toNumberUndefined(angle(rowKhamData["can-phu"]));
    row.IK = toNumberUndefined(angle(rowKhamData["can-chia"]));
    row.IL = toNumberUndefined(angle(rowKhamData["angle-r3p"]));
    row.IM = toNumberUndefined(angle(rowKhamData["angle-r3t"]));
    row.IN = toNumberUndefined(angle(rowKhamData["angle-r6p"]));
    row.IO = toNumberUndefined(angle(rowKhamData["angle-r6t"]));
    // MIH
    row.IP = toNumber(rowKhamData["mih-16"]) || 9;
    row.IQ = toNumber(rowKhamData["mih-12"]) || 9;
    row.IR = toNumber(rowKhamData["mih-11"]) || 9;
    row.IS = toNumber(rowKhamData["mih-21"]) || 9;
    row.IT = toNumber(rowKhamData["mih-22"]) || 9;
    row.IU = toNumber(rowKhamData["mih-26"]) || 9;
    row.IV = toNumber(rowKhamData["mih-36"]) || 9;
    row.IW = toNumber(rowKhamData["mih-32"]) || 9;
    row.IX = toNumber(rowKhamData["mih-31"]) || 9;
    row.IY = toNumber(rowKhamData["mih-41"]) || 9;
    row.IZ = toNumber(rowKhamData["mih-42"]) || 9;
    row.JA = toNumber(rowKhamData["mih-46"]) || 9;

    // thoiquen
    const rowThoiQuenData = rowData.bangCauHoi;
    if (typeof rowThoiQuenData === "undefined") {
      console.log(`${rowData._id} khong co bang cau hoi`);
      return null;
    }
    row.JB = rowThoiQuenData["b2"];
    row.JC = rowThoiQuenData["b4"];
    row.JD = rowThoiQuenData["b5"];
    row.JE = rowThoiQuenData["b6"];
    row.JF = rowThoiQuenData["b7"];
    row.JG = rowThoiQuenData["b8"];
    row.JH = rowThoiQuenData["b9"];
    row.JI = rowThoiQuenData["b10-1"] || 0;
    row.JJ = rowThoiQuenData["b10-2"] || 0;
    row.JK = rowThoiQuenData["b10-3"] || 0;
    row.JL = rowThoiQuenData["b10-4"] || 0;
    row.JM = rowThoiQuenData["b10-5"] || 0;
    row.JN = rowThoiQuenData["b10-6"] || 0;
    // b11
    row.JO = rowThoiQuenData["b11"] || "";
    row.JP = rowThoiQuenData["b12"] || "";

    let b13 = rowThoiQuenData["b13"] || [];
    row.JQ = b13.indexOf(1) !== -1 ? 1 : 0;
    row.JR = b13.indexOf(2) !== -1 ? 1 : 0;
    row.JS = b13.indexOf(3) !== -1 ? 1 : 0;
    row.JT = b13.indexOf(4) !== -1 ? 1 : 0;
    row.JU = b13.indexOf(5) !== -1 ? 1 : 0;
    row.JV = b13.indexOf(6) !== -1 ? 1 : 0;
    row.JW = b13.indexOf(7) !== -1 ? 1 : 0;
    row.JX = rowThoiQuenData["b13-8"] || "";

    row.JY = rowThoiQuenData["b14"] || "";
    row.JZ = rowThoiQuenData["b15"];

    row.KA = rowThoiQuenData["b16-1"] || 2;
    row.KB = rowThoiQuenData["b16-2"] || 2;
    row.KC = rowThoiQuenData["b16-3"] || 2;
    row.KD = rowThoiQuenData["b16-4"] || 2;
    row.KE = rowThoiQuenData["b16-5"] || 2;
    row.KF = rowThoiQuenData["b16-6"] || 2;
    row.KG = rowThoiQuenData["b16-7"] || "";

    row.KH = rowThoiQuenData["b17"];
    row.KI = rowThoiQuenData["b18"];
    row.KI = rowThoiQuenData["b18"];

    row.KJ = rowThoiQuenData["b19-1"];
    row.KK = rowThoiQuenData["b19-2"];
    row.KL = rowThoiQuenData["b19-3"];
    row.KM = rowThoiQuenData["b19-4"];
    row.KN = rowThoiQuenData["b19-5"];
    row.KO = rowThoiQuenData["b19-6"];
    row.KP = rowThoiQuenData["b19-7"];
    row.KQ = rowThoiQuenData["b19-8"];
    row.KR = rowThoiQuenData["b19-9"];

    let b20 = rowThoiQuenData["b20"] || [];
    row.KS = b20.indexOf(1) !== -1 ? 1 : 0;
    row.KT = b20.indexOf(2) !== -1 ? 1 : 0;
    row.KU = b20.indexOf(3) !== -1 ? 1 : 0;
    row.KV = b20.indexOf(4) !== -1 ? 1 : 0;
    row.KW = b20.indexOf(5) !== -1 ? 1 : 0;
    row.KX = b20.indexOf(6) !== -1 ? 1 : 0;
    row.KY = b20.indexOf(7) !== -1 ? 1 : 0;
    row.KZ = b20.indexOf(8) !== -1 ? 1 : 0;
    row.LA = b20.indexOf(9) !== -1 ? 1 : 0;
    row.LB = b20.indexOf(10) !== -1 ? 1 : 0;
    row.LC = b20.indexOf(11) !== -1 ? 1 : 0;

    row.LD = rowThoiQuenData["b21"] || "";
    row.LE = rowThoiQuenData["b22"] || "";
    row.LF = rowThoiQuenData["b23"] || "";
    row.LG = rowThoiQuenData["b24"] || "";

    // kho chiu
    const rowKhoChiuData = rowData.childOIDP;
    let khoChiu = rowKhoChiuData["liet-ke-kho-chiu"] || [];
    row.LH = khoChiu.indexOf(1) !== -1 ? 1 : 0;
    row.LI = khoChiu.indexOf(2) !== -1 ? 1 : 0;
    row.LJ = khoChiu.indexOf(3) !== -1 ? 1 : 0;
    row.LK = khoChiu.indexOf(4) !== -1 ? 1 : 0;
    row.LL = khoChiu.indexOf(5) !== -1 ? 1 : 0;
    row.LM = khoChiu.indexOf(6) !== -1 ? 1 : 0;
    row.LN = khoChiu.indexOf(7) !== -1 ? 1 : 0;
    row.LO = khoChiu.indexOf(8) !== -1 ? 1 : 0;
    row.LP = khoChiu.indexOf(9) !== -1 ? 1 : 0;
    row.LQ = khoChiu.indexOf(10) !== -1 ? 1 : 0;
    row.LR = khoChiu.indexOf(11) !== -1 ? 1 : 0;
    row.LS = khoChiu.indexOf(12) !== -1 ? 1 : 0;
    row.LT = khoChiu.indexOf(13) !== -1 ? 1 : 0;
    row.LU = khoChiu.indexOf(14) !== -1 ? 1 : 0;
    row.LV = khoChiu.indexOf(15) !== -1 ? 1 : 0;
    row.LW = khoChiu.indexOf(16) !== -1 ? 1 : 0;
    row.LX = khoChiu.indexOf(17) !== -1 ? 1 : 0;
    row.LY = khoChiu.indexOf(99) !== -1 ? 1 : 0;

    // Child-OIDP
    colCounter = decode_col("LZ");
    for (let i = 1; i <= 8; i++) {
      row[encode_col(colCounter)] = rowKhoChiuData[`${i}-mucdo`];
      colCounter = colCounter + 1;
      row[encode_col(colCounter)] = rowKhoChiuData[`${i}-tansuat`];
      colCounter = colCounter + 1;

      let tatCaNguyenNhan = rowKhoChiuData[`${i}-nguyennhan`] || [];

      for (let nguyennhan = 1; nguyennhan <= 17; nguyennhan++) {
        row[encode_col(colCounter)] =
          tatCaNguyenNhan.indexOf(nguyennhan) !== -1 ? 1 : 0;
        colCounter = colCounter + 1;
      }
      row[encode_col(colCounter)] = tatCaNguyenNhan.indexOf(99) !== -1 ? 1 : 0;
      colCounter = colCounter + 1;
    }
    return row;
  })
  .filter(row => row);

XLSX.utils.sheet_add_json(ws, dataToWrite, { skipHeader: true, origin: "A2" });
XLSX.writeFile(workbook, "tre-em-finish.xlsx");
