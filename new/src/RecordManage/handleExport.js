import * as Notify from "../Notify";

export const handleExport = async (data, filename, kind) => {
  try {
    const { createWorkbook } = await import("../export_excel/export_excel");
    createWorkbook(data, filename, kind);
  } catch (error) {
    console.error(error);
    Notify.error(
      "Có lỗi xảy ra khi tạo file Excel",
      "Lỗi này thường do xuất các bộ hồ sơ chưa hoàn tất. Vui lòng hoàn thành các bộ hồ sơ trước khi xuất"
    );
  }
};
