import Dexie from "dexie";
import { SurveyType } from "../types";
import { ulid } from "ulid";

export const makeId = ulid;

export enum SyncStatus {
  NotSync = 0,
  Synced = 1,
}

export interface IDbSurvey {
  surveyId: string;
  surveyType: SurveyType;
  createdAt: number;
  syncStatus: SyncStatus;
}

export type SurveyDataKey = [string, string];
export interface ISurveyData {
  surveyDataId: string;
  surveyId: string;
  surveyForm: string;
  data: any;
  syncStatus: SyncStatus;
}

class VoserDatabase extends Dexie {
  list: Dexie.Table<IDbSurvey, string>;
  data: Dexie.Table<ISurveyData, SurveyDataKey>;
  revision: Dexie.Table<ISurveyData, SurveyDataKey>;

  constructor() {
    super("Voser");
    this.version(4).stores({
      record_list: "surveyId, surveyType, createdAt",
      record_data: "[surveyId+surveyForm]",
    });
    this.version(5)
      .stores({
        record_list: "surveyId, surveyType, createdAt, syncStatus",
        record_data: "[surveyId+surveyForm], syncStatus, surveyDataId",
        record_revisions: "surveyDataId, syncStatus, surveyDataId",
      })
      .upgrade((tx) => {
        // @ts-ignore
        return tx.record_list.toCollection().modify((survey: ISurvey) => {
          survey.syncStatus = SyncStatus.NotSync;
        });
      })
      .upgrade((tx) => {
        // @ts-ignore
        return tx.record_data.toCollection().modify((surveyData: ISurveyData) => {
          surveyData.syncStatus = SyncStatus.NotSync;
          if (typeof surveyData.surveyDataId === "undefined") {
            surveyData.surveyDataId = ulid();
          }
        });
      });
    this.list = this.table("record_list");
    this.data = this.table("record_data");
    this.revision = this.table("record_revisions");
  }
}

export const db = new VoserDatabase();

// @ts-ignore
// global.db = db;
