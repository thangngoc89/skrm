/**
 * Plan
 - Delete empty surveyData
    DELETE FROM "surveyData" WHERE data = "{}";
 - Delete survey without data
    DELETE FROM survey 
    WHERE surveyId NOT IN 
      (
        SELECT survey.surveyId FROM "survey"
        JOIN surveyData ON survey.surveyId = surveyData.surveyId
        GROUP BY survey.surveyId
      )
 */

const knex = require("knex")(require("../knexfile").development);

const fs = require("fs");
const readline = require("readline");

const mainSurveyMap = {
  tieu_hoc: require("./form_schema/tieu_hoc").survey,
  mau_giao: require("./form_schema/mau_giao").survey,
  nguoi_lon: require("./form_schema/nguoi_lon").survey,
};

const main = async () => {
  const count = await knex("survey").count("surveyId").first();
  const totalSurvey = count["count(`surveyId`)"];
  console.log("Total survey", totalSurvey);

  const headers = surveyHeaders(mainSurveyMap.tieu_hoc.forms);
  console.log(headers.reverse());
  console.log(headers.length);
  knex.destroy();
};

main();

function surveyHeaders(forms) {
  const acc = forms.map(formHeaders);
  return [].concat(...acc);
}

function formHeaders(form) {
  const fields = form.form.survey;

  let result = fields.reduce((acc, field) => pluckFieldHeader(acc, field, form.form.lists), []);
  return result;
}

function pluckFieldHeader(acc, field, lists) {
  switch (field.type) {
    case "group":
      const groupFields = field.fields.reduce((acc, field) => pluckFieldHeader(acc, field, lists), []);
      return typeof groupFields !== "undefined" ? [...acc, ...groupFields] : acc;
    case "date":
    case "text":
    case "integer":
    case "select_one":
    case "select_one_ref":
      return [...acc, field.name];

    case "select_many":
      return [...acc, ...field.choices.map(({ name }) => `${field.name}_${name}`)];
    case "select_many_ref":
      return [...acc, ...lists[field.list].map(({ name }) => `${field.name}_${name}`)];

    case "matrix_select_one":
      return [...acc, ...field.subQuestions.map((f) => f.id)];

    case "dental_arch_table":
      return [...acc, ...field.fields.map((f) => f.name)];
    case "dental_arch_table_2_rows":
      return [...acc, ...field.firstRow.map((f) => f.name), ...field.secondRow.map((f) => f.name)];
    case "note":
      return acc;
  }
}
