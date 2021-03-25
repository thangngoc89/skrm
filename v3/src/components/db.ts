import Dexie from "dexie";
import { SurveyType } from "./types";

export { nanoid as makeId } from "nanoid";
import { ulid } from "ulid";
export { ulid };

export enum SyncStatus {
  NotSynced = 0,
  Synced = 1,
}
export interface IDbSurvey {
  surveyId: string;
  surveyType: SurveyType;
  createdAt: number;
  synced: SyncStatus;
}

export type SurveyDataKey = [string, string];

export interface ISurveyData {
  surveyId: string;
  surveyForm: string;
  data: any;
  id: string;
  synced: SyncStatus;
}

class VoserDatabase extends Dexie {
  list: Dexie.Table<IDbSurvey, string>;
  data: Dexie.Table<ISurveyData, SurveyDataKey>;

  constructor() {
    super("Voser");
    // this.version(6).stores({
    //   record_list: "surveyId, surveyType, createdAt, synced",
    //   record_data: "[surveyId+surveyForm], id, synced",
    // });

    // this.version(7)
    //   .stores({
    //     record_list: "surveyId, surveyType, createdAt, synced",
    //     record_data: "[surveyId+surveyForm], id, synced",
    //   })
    //   .upgrade((trans) => {
    //     // @ts-ignore
    //     return trans.record_list.toCollection().modify((survey) => {
    //       survey.synced = SyncStatus.NotSynced;
    //     });
    //   });

    this.version(10)
      .stores({
        record_list: "surveyId, surveyType, createdAt, synced",
        record_data: "[surveyId+surveyForm], id, synced",
      })
      .upgrade((trans) => {
        // @ts-ignore
        return trans.record_data.toCollection().modify((survey) => {
          survey.synced = SyncStatus.NotSynced;
          survey.id = ulid();
        });
      });
    this.list = this.table("record_list");
    this.data = this.table("record_data");
  }
}

export const db = new VoserDatabase();

// @ts-ignore
global.db = db;
