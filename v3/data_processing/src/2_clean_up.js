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
const { survey } = require("./form_schema/tieu_hoc");
const XLSX = require("xlsx");

const mainSurveyMap = {
  tieu_hoc: require("./form_schema/tieu_hoc").survey,
  mau_giao: require("./form_schema/mau_giao").survey,
  nguoi_lon: require("./form_schema/nguoi_lon").survey,
};

const main = async () => {
  const count = await knex("survey").count("surveyId").first();
  const totalSurvey = count["count(`surveyId`)"];

  const data = await knex("survey").select("*").where("surveyType", "=", "tieu_hoc").first();

  const survey = data;

  const allForms = await knex("surveyData")
    .select("*")
    .where("surveyId", "=", survey.surveyId)
    .orderBy("surveyDataId", "DESC");

  // Filter out old versions
  const latestForms = allForms.reduce((acc, form) => {
    if (acc.find(({ surveyForm }) => surveyForm === form.surveyForm)) {
      return acc;
    } else {
      return [...acc, form];
    }
  }, []);

  const surveyType = survey.surveyType;

  let row = { voser_id: survey.surveyId };

  latestForms.forEach(({ surveyForm, data }) => {
    const formSchema = mainSurveyMap[surveyType].forms.find((f) => f.form.name === surveyForm);
    makeFormData(JSON.parse(data), formSchema, row);
  });

  console.log(row);

  const headers = ["voser_id", ...surveyHeaders(mainSurveyMap.tieu_hoc.forms)];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet([row], { header: headers });

  XLSX.utils.book_append_sheet(wb, ws, "tieu_hoc");

  XLSX.writeFile(wb, "out.xlsx");

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

function makeFormData(data, form, result) {
  const fields = form.form.survey;

  fields.forEach((field) => makeFieldData(result, field, data, form.form.lists));
}
function makeFieldData(result, field, data, lists) {
  switch (field.type) {
    case "group":
      field.fields.forEach((field) => makeFieldData(result, field, data, lists));
      break;
    case "date":
    case "text":
    case "integer":
    case "select_one":
    case "select_one_ref":
      result[field.name] = data[field.name] || null;
      break;
    case "select_many":
      field.choices.forEach(({ name }) => {
        const currentChoiceName = `${field.name}_${name}`;

        if (!data[field.name]) {
          result[currentChoiceName] = null;
        } else {
          result[currentChoiceName] = data[field.name].includes(name) ? true : false;
        }
      });
      break;
    case "select_many_ref":
      lists[field.list].forEach(({ name }) => {
        const currentChoiceName = `${field.name}_${name}`;
        if (!data[field.name]) {
          result[currentChoiceName] = null;
        } else {
          result[currentChoiceName] = data[field.name].includes(name) ? true : false;
        }
      });
      break;

    case "matrix_select_one":
      field.subQuestions.forEach((f) => {
        const currentChoiceName = f.id;
        result[currentChoiceName] = data[currentChoiceName] || null;
      });
      break;

    case "dental_arch_table":
      field.fields.forEach((f) => {
        const currentChoiceName = f.name;

        result[currentChoiceName] = data[currentChoiceName] || null;
      });

      break;
    case "dental_arch_table_2_rows":
      field.firstRow.forEach((f) => {
        const currentChoiceName = f.name;
        result[currentChoiceName] = data[currentChoiceName] || null;
      });

      field.secondRow.forEach((f) => {
        const currentChoiceName = f.name;
        result[currentChoiceName] = data[currentChoiceName] || null;
      });
      break;
    case "note":
      break;
    default:
      throw new Error(`Unhandled field type ${field.type}`);
  }
}
