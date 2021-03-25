import { db } from "./db";

export const loadSurvey = async (surveyId: string, currentForm: string) => {
  const result = await db.data.get([surveyId, currentForm]);

  // DO NOT REMOVE. I was so stupid
  if (currentForm === "tieu_hoc_form" && typeof result === "undefined") {
    return await db.data.get([surveyId, "mau_giao_form"]);
  }
  return result;
};

export const saveForm = async (surveyId: string, formName: string, formData: any) => {
  return await db.data.put({ data: formData, surveyId, surveyForm: formName }, [surveyId, formName]);
};
