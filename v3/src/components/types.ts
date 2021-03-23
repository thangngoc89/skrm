export type AsyncAction<Success, Error> =
  | { type: "initial" }
  | { type: "loading" }
  | { type: "success"; payload: Success }
  | { type: "error"; payload: Error };

export type SurveyType = "mau_giao" | "tieu_hoc" | "nguoi_lon";

export type MaugiaoFormType = "mau_giao_form";
export type TieuhocFormType = "tieu_hoc_form" | "tieu_hoc_questionare" | "tieu_hoc_child_oidp";
export type NguoilonFormType = "nguoi_lon_form" | "nguoi_lon_questionare" | "nguoi_lon_ohip14";
