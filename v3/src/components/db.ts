import Dexie from "dexie";
import { SurveyType } from "./types";

export { nanoid as makeId } from "nanoid";

export interface ISurveyList {
  surveyId: string;
  surveyType: SurveyType;
  createdAt: number;
}
export interface ISurveyData {
  surveyId: string;
  surveyForm: string;
  data: any;
}

class VoserDatabase extends Dexie {
  list: Dexie.Table<ISurveyList, string>;
  data: Dexie.Table<ISurveyData, string>;

  constructor() {
    super("Voser");
    this.version(3).stores({
      record_list: "surveyId, surveyType",
      record_data: "[surveyId+surveyForm]",
    });
    this.list = this.table("record_list");
    this.data = this.table("record_data");
  }
}

export const db = new VoserDatabase();
