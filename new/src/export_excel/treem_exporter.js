import {
  encode_col,
  decode_col,
  toNumber,
  toNumberWithDefault,
  getOhis,
  getNhuCauValue,
  withDefault,
} from "./exporter_common";

const dataToSheet = data =>
  data
    .map(rowData => {
      try {
        const rowKhamData = rowData.phieuDieuTra;
        if (typeof rowKhamData === "undefined") {
          return null;
        }
        const row = {
          A: rowKhamData["soHoSo"],
          B: rowKhamData["nguoiKham"],
          C: withDefault(rowKhamData.hoVaTen, "", hoVaTen =>
            hoVaTen.toUpperCase()
          ),
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
          row[encode_col(colCounter)] = getNhuCauValue(
            ncLeft,
            "N",
            ncLeftRow[i]
          );
          colCounter = colCounter + 1;
          /* Tr */
          row[encode_col(colCounter)] = getNhuCauValue(
            ncLeft,
            "T",
            ncLeftRow[i]
          );
          colCounter = colCounter + 1;
          /* G */
          row[encode_col(colCounter)] = getNhuCauValue(
            ncLeft,
            "G",
            ncLeftRow[i]
          );
          colCounter = colCounter + 1;
          /* X */
          row[encode_col(colCounter)] = getNhuCauValue(
            ncLeft,
            "X",
            ncLeftRow[i]
          );
          colCounter = colCounter + 1;
          /* TT */
          row[encode_col(colCounter)] = getNhuCauValue(
            ncLeft,
            "TT",
            ncLeftRow[i]
          );
          colCounter = colCounter + 1;
          /* NC */
          row[encode_col(colCounter)] = getNhuCauValue(
            ncLeft,
            "NC",
            ncLeftRow[i]
          );
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
          row[encode_col(colCounter)] = getNhuCauValue(
            ncRight,
            "N",
            ncRightRow[i]
          );
          colCounter = colCounter + 1;
          /* Tr */
          row[encode_col(colCounter)] = getNhuCauValue(
            ncRight,
            "T",
            ncRightRow[i]
          );
          colCounter = colCounter + 1;
          /* G */
          row[encode_col(colCounter)] = getNhuCauValue(
            ncRight,
            "G",
            ncRightRow[i]
          );
          colCounter = colCounter + 1;
          /* X */
          row[encode_col(colCounter)] = getNhuCauValue(
            ncRight,
            "X",
            ncRightRow[i]
          );
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
        const pi = rowKhamData.pi || {};
        row.GK = getOhis(pi.ohis16N);
        row.GL = getOhis(pi.ohis11N);
        row.GM = getOhis(pi.ohis26N);
        row.GN = getOhis(pi.ohis46T);
        row.GO = getOhis(pi.ohis31N);
        row.GP = getOhis(pi.ohis36N);
        // CI
        const ci = rowKhamData.ci || {};
        row.GQ = getOhis(ci.ohis16N);
        row.GR = getOhis(ci.ohis11N);
        row.GS = getOhis(ci.ohis26N);
        row.GT = getOhis(ci.ohis46T);
        row.GU = getOhis(ci.ohis31N);
        row.GV = getOhis(ci.ohis36N);

        // CPI (blank)
        const cpiRow = [
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
        const cpi = rowKhamData.cpi || {};
        for (let i = decode_col("GW"); i <= decode_col("HX"); i++) {
          row[encode_col(i)] = toNumberWithDefault(
            cpi["cpi" + cpiRow[i - decode_col("GW")]],
            9
          );
        }
        // Flour
        row.HY = toNumber(rowKhamData.fluorMaSo);
        row.HZ = toNumber(rowKhamData.fluorSoRang);
        // chen chuc
        const mocChenChuc = rowKhamData.mocChenChuc || {};
        row.IA = toNumber(mocChenChuc.mcc16);
        row.IB = toNumber(mocChenChuc.mcc11);
        row.IC = toNumber(mocChenChuc.mcc26);
        row.ID = toNumber(mocChenChuc.mcc31);
        row.IE = toNumber(mocChenChuc.mcc36);
        row.IF = toNumber(mocChenChuc.mcc46);
        // Khop can
        row.IG = toNumber(rowKhamData.canNguocRangTruoc);
        row.IH = toNumber(rowKhamData.canNguocRangSau);
        row.II = toNumber(rowKhamData.canHo);

        row.IJ = rowKhamData.canPhu;
        row.IK = rowKhamData.canChia;
        row.IL = toNumber(rowKhamData.angleR3P);
        row.IM = toNumber(rowKhamData.angleR3T);
        row.IN = toNumber(rowKhamData.angleR6P);
        row.IO = toNumber(rowKhamData.angleR3T);
        // MIH
        const mih = rowKhamData.mih || {};
        row.IP = toNumberWithDefault(mih.mih16, 9);
        row.IQ = toNumberWithDefault(mih.mih12, 9);
        row.IR = toNumberWithDefault(mih.mih11, 9);
        row.IS = toNumberWithDefault(mih.mih21, 9);
        row.IT = toNumberWithDefault(mih.mih22, 9);
        row.IU = toNumberWithDefault(mih.mih26, 9);
        row.IV = toNumberWithDefault(mih.mih36, 9);
        row.IW = toNumberWithDefault(mih.mih32, 9);
        row.IX = toNumberWithDefault(mih.mih31, 9);
        row.IY = toNumberWithDefault(mih.mih41, 9);
        row.IZ = toNumberWithDefault(mih.mih42, 9);
        row.JA = toNumberWithDefault(mih.mih46, 9);

        // thoiquen
        const rowBCH = rowData.bangCauHoi;
        if (typeof rowBCH === "undefined") {
          for (let i = decode_col("JB"); i <= decode_col("LG"); i++) {
            row[encode_col(i)] = "";
          }
        } else {
          row.JB = toNumber(rowBCH["b2"]);
          row.JC = toNumber(rowBCH["b4"]);
          row.JD = toNumber(rowBCH["b5"]);
          row.JE = toNumber(rowBCH["b6"]);
          row.JF = toNumber(rowBCH["b7"]);
          row.JG = toNumber(rowBCH["b8"]);
          row.JH = toNumber(rowBCH["b9"]);
          row.JI = toNumber(rowBCH.b10["1"]);
          row.JJ = toNumber(rowBCH.b10["2"]);
          row.JK = toNumber(rowBCH.b10["3"]);
          row.JL = toNumber(rowBCH.b10["4"]);
          row.JM = toNumber(rowBCH.b10["5"]);
          row.JN = toNumber(rowBCH.b10["6"]);
          // b11
          row.JO = toNumber(rowBCH["b11"]);
          row.JP = toNumber(rowBCH["b12"]);

          let b13 = rowBCH["b13"] || [];
          row.JQ = b13.indexOf("1") !== -1 ? 1 : 0;
          row.JR = b13.indexOf("2") !== -1 ? 1 : 0;
          row.JS = b13.indexOf("3") !== -1 ? 1 : 0;
          row.JT = b13.indexOf("4") !== -1 ? 1 : 0;
          row.JU = b13.indexOf("5") !== -1 ? 1 : 0;
          row.JV = b13.indexOf("6") !== -1 ? 1 : 0;
          row.JW = b13.indexOf("7") !== -1 ? 1 : 0;
          row.JX = rowBCH["b13_customMessage"] || "";

          row.JY = toNumber(rowBCH["b14"]);
          row.JZ = toNumber(rowBCH["b15"]);

          let b16 = rowBCH["b16"] || [];
          row.KA = b16.indexOf("1") !== -1 ? 1 : 2;
          row.KB = b16.indexOf("2") !== -1 ? 1 : 2;
          row.KC = b16.indexOf("3") !== -1 ? 1 : 2;
          row.KD = b16.indexOf("4") !== -1 ? 1 : 2;
          row.KE = b16.indexOf("5") !== -1 ? 1 : 2;
          row.KF = b16.indexOf("6") !== -1 ? 1 : 2;
          row.KG = rowBCH["b16_customMessage"] || 2;

          row.KH = toNumberWithDefault(rowBCH["b17"], 9);
          row.KI = toNumberWithDefault(rowBCH["b18"], 9);

          row.KJ = toNumber(rowBCH.b19["1"]);
          row.KK = toNumber(rowBCH.b19["2"]);
          row.KL = toNumber(rowBCH.b19["3"]);
          row.KM = toNumber(rowBCH.b19["4"]);
          row.KN = toNumber(rowBCH.b19["5"]);
          row.KO = toNumber(rowBCH.b19["6"]);
          row.KP = toNumber(rowBCH.b19["7"]);
          row.KQ = toNumber(rowBCH.b19["8"]);
          row.KR = toNumber(rowBCH.b19["9"]);

          let b20 = rowBCH["b20"] || [];
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

          row.LD =
            rowBCH.b21 === "7"
              ? rowBCH.b21_customMessage
              : toNumber(rowBCH.b21);
          row.LE =
            rowBCH.b22 === "7"
              ? rowBCH.b22_customMessage
              : toNumber(rowBCH.b22);
          row.LF = toNumber(rowBCH["b23"]);
          row.LG = toNumber(rowBCH["b24"]);
        }

        // kho chiu
        const rowKhoChiuData = rowData.childOIDP;
        if (typeof rowKhoChiuData === "undefined") {
          return row;
        }
        let khoChiu = rowKhoChiuData.lietke || [];
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
        /* TODO: toNumber all of this */
        colCounter = decode_col("LZ");
        for (let i = 1; i <= 8; i++) {
          row[encode_col(colCounter)] = rowKhoChiuData[`${i}-mucdo`] || 0;
          colCounter = colCounter + 1;
          row[encode_col(colCounter)] = rowKhoChiuData[`${i}-tansuat`] || 0;
          colCounter = colCounter + 1;

          let tatCaNguyenNhan = rowKhoChiuData[`${i}-nguyennhan`] || [];

          for (let nguyennhan = 1; nguyennhan <= 17; nguyennhan++) {
            row[encode_col(colCounter)] =
              tatCaNguyenNhan.indexOf(nguyennhan) !== -1 ? 1 : 0;
            colCounter = colCounter + 1;
          }
          row[encode_col(colCounter)] =
            tatCaNguyenNhan.indexOf(99) !== -1 ? 1 : 0;
          colCounter = colCounter + 1;
        }
        return row;
      } catch (error) {
        console.error(error);
        console.log(rowData);
      }
    })
    .filter(row => row);

export default dataToSheet;
