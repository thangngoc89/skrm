import Dexie from "dexie";
import { SurveyType } from "./types";

export { nanoid as makeId } from "nanoid";
export { ulid } from "ulid";

export enum SyncStatus {
  NotSynced = 0,
  Synced = 1,
}
export interface IDbSurvey {
  surveyId: string;
  surveyType: SurveyType;
  createdAt: number;
  synced?: SyncStatus;
}

export type SurveyDataKey = [string, string];

export interface ISurveyData {
  surveyId: string;
  surveyForm: string;
  data: any;
  id?: string;
  synced?: SyncStatus;
}

class VoserDatabase extends Dexie {
  list: Dexie.Table<IDbSurvey, string>;
  data: Dexie.Table<ISurveyData, SurveyDataKey>;

  constructor() {
    super("Voser");
    this.version(6).stores({
      record_list: "surveyId, surveyType, createdAt, synced",
      record_data: "[surveyId+surveyForm], id, synced",
    });
    this.list = this.table("record_list");
    this.data = this.table("record_data");
  }
}

export const db = new VoserDatabase();

// @ts-ignore
global.db = db;
