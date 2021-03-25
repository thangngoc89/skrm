import { SurveyType } from "../types";
import { db, makeId, SyncStatus } from "./db";

export const loadSurvey = async (surveyId: string, currentForm: string) => {
  const result = await db.data.get([surveyId, currentForm]);

  // DO NOT REMOVE. I was so stupid
  if (currentForm === "tieu_hoc_form" && typeof result === "undefined") {
    return await db.data.get([surveyId, "mau_giao_form"]);
  }
  return result;
};

export const saveForm = async (surveyId: string, formName: string, formData: any) => {
  return await db.transaction("rw", ["record_data", "record_revisions"], async () => {
    const surveyData = {
      surveyDataId: makeId(),
      surveyId,
      surveyForm: formName,
      data: formData,
      syncStatus: SyncStatus.NotSync,
    };

    await db.data.put(surveyData, [surveyId, formName]);
    await db.revision.add(surveyData, surveyData.surveyDataId);
  });
};

export const createSurvey = async (surveyType: SurveyType) => {
  return await db.list.add({
    surveyId: makeId(),
    surveyType: surveyType,
    createdAt: Date.now(),
    syncStatus: SyncStatus.NotSync,
  });
};
