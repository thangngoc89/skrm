import { Database } from "firebase-firestore-lite";
import { IDbSurvey, ISurveyData, ulid } from "../db";

const db = new Database({ projectId: "thucdia-e52ff" });
const db_prefix = process.env.NODE_ENV === "production" ? "prod" : "dev";

export const surveyUpsert = async (data: IDbSurvey) => {
  const ref = db.ref(db_prefix + `--survey/${data.surveyId}`);
  const doc = await ref.set(data);
  return doc;
};

export const dataUpsert = async (data: ISurveyData) => {
  console.log(data.id);
  
  const ref = db.ref(db_prefix + `--survey_data/${data.id}`);
  const doc = await ref.set(data);

  return doc;
};

// @ts-ignore
global.firebase = db;
// @ts-ignore
global.surveyUpsert = surveyUpsert;
