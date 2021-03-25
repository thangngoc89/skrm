export type AsyncAction<Success, Error> =
  | { type: "initial" }
  | { type: "loading" }
  | { type: "success"; payload: Success }
  | { type: "error"; payload: Error };

export type SurveyType = "mau_giao" | "tieu_hoc" | "nguoi_lon";