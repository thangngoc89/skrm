import XLSX from "xlsx";
import treemHeaders from "./treem_headers.json";
import treemExporter from "./treem_exporter";

import maugiaoHeaders from "./maugiao_headers.json";
import maugiaoExporter from "./maugiao_exporter";

export const createWorkbook = (data, filename = "voser", kind = 0) => {
  let headers = kind === 0 ? treemHeaders : maugiaoHeaders;
  let formatter = kind === 0 ? treemExporter : maugiaoExporter;

  const formattedData = formatter(data);

  var wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([headers]);
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  XLSX.utils.sheet_add_json(ws, formattedData, {
    skipHeader: true,
    origin: "A2",
  });

  XLSX.writeFile(wb, filename + ".xlsx", { compression: true });
};
