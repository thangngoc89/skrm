import XLSX from "xlsx";
import headers from "./treem_headers.json";
import treemExporter from "./treem_exporter";

export const createWorkbook = data => {
  const formattedData = treemExporter(data);

  var wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([headers]);
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  XLSX.utils.sheet_add_json(ws, formattedData, {
    skipHeader: true,
    origin: "A2",
  });

  XLSX.writeFile(wb, "du-lieu-thuc-dia.xlsx", { compression: true });
};
