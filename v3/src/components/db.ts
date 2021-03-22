import Dexie from "dexie";

export type SurveyType = "mau_giao" | "tieu_hoc" | "nguoi_lon";

export interface ISurveyList {
  id: string;
  type: SurveyType;
}
export interface ISurveyData {
  id: string;
  data: any;
}

class VoserDatabase extends Dexie {
  records: Dexie.Table<ISurveyList, string>;
  data: Dexie.Table<ISurveyData, string>;

  constructor() {
    super("VoserDatabase");
    this.version(1).stores({
      records: "++id, first, last",
    });
    this.records = this.table("record_list");
    this.data = this.table("record_data");
  }
}

export const db = new VoserDatabase();
