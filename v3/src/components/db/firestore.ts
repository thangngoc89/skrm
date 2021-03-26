import { Database } from "firebase-firestore-lite";
import { IDbSurvey, ISurveyData } from "./db";

const db = new Database({ projectId: "thucdia-e52ff" });
const db_prefix = process.env.NODE_ENV === "production" ? "prod" : "dev";

export type RemoteData =
  | { type: "survey"; payload: IDbSurvey }
  | { type: "surveyData"; payload: ISurveyData }
  | { type: "surveyRevision"; payload: ISurveyData };

const upsertSurvey = async (type: "survey", payload: IDbSurvey) => {
  const ref = db.ref(`${db_prefix}--${type}/${payload.surveyId}`);

  const { syncStatus, ...content } = payload;

  const doc = await ref.set(content);
  return doc;
};

const upsertData = async (type: "surveyData" | "surveyRevision", payload: ISurveyData) => {
  const ref = db.ref(`${db_prefix}--${type}/${payload.surveyDataId}`);

  const { syncStatus, ...content } = payload;

  const doc = await ref.set(content);
  return doc;
};

export const upsert = async (data: RemoteData) => {
  switch (data.type) {
    case "survey":
      return await upsertSurvey(data.type, data.payload);
    case "surveyData":
    case "surveyRevision":
      return await upsertData(data.type, data.payload);
  }
};
