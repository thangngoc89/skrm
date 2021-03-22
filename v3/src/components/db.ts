import Dexie from "dexie";
import { SurveyType } from "./types";

export { nanoid as makeId } from "nanoid";

export interface ISurveyList {
  id: string;
  surveyType: SurveyType;
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
    this.version(2).stores({
      record_list: "id, surveyType",
      record_data: "id",
    });
    this.records = this.table("record_list");
    this.data = this.table("record_data");
  }
}

export const db = new VoserDatabase();
