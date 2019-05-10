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
        console.log(rowData);
        if (typeof rowKhamData === "undefined") {
          return null;
        }
        const row = {
          A: rowKhamData["soHoSo"],
          B: withDefault(rowKhamData.hoVaTen, "", hoVaTen =>
            hoVaTen.toUpperCase()
          ),
          C: toNumber(rowKhamData["gioiTinh"]),

          D: rowKhamData["danToc"],
          E: rowKhamData["diaChi"],
          F: rowKhamData["truong"],
        };

        const ncLeft = rowKhamData.ttncHamTren;

        const ncLeftRow = [
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
        ];
        // nhuCauLeft
        let colCounter = 6;
        for (let i = 0; i < 10; i++) {
          /* Nhai */
          if (i < 2 || i > 7) {
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
        ];
        // nhuCauRight
        for (let i = 0; i < 10; i++) {
          /* Nhai */
          if (i < 2 || i > 7) {
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
        row.EE = getOhis(pi.ohis1);
        row.EF = getOhis(pi.ohis2);
        row.EG = getOhis(pi.ohis3);
        row.EH = getOhis(pi.ohis4);
        row.EI = getOhis(pi.ohis5);
        row.EJ = getOhis(pi.ohis6);
        return row;
      } catch (error) {
        console.error(error);
        console.log(rowData);
      }
    })
    .filter(row => row);

export default dataToSheet;
