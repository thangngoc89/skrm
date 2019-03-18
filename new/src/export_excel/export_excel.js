import XLSX from "xlsx";
import headers from "./treem_headers.json";
import treemExporter from "./treem_exporter";

export const createWorkbook = data => {
  /* Generate Workbook */
  const formattedData = treemExporter(data);

  var wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([headers]);
  XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
  XLSX.utils.sheet_add_json(ws, formattedData, {
    skipHeader: true,
    origin: "A2",
  });

  /* Trigger Download with `writeFile` */
  XLSX.writeFile(wb, "SheetJS.xlsx", { compression: true });

  // const formattedData = treemExporter(data);
  // console.log(formattedData);

  // const wb = XLSX.utils.book_new();
  // const ws = XLSX.utils.json_to_sheet(formattedData, { header: headers });

  // XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // return wb;
};

export const saveWorkbook = (wb, filename = "hmong") => {
  XLSX.writeFile(wb, filename + ".xlsx", { compression: true });
};
