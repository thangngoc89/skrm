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

const main = async () => {
  const count = await knex("survey").where("surveyType", "=", "tieu_hoc").count("surveyId").first();
  const totalSurvey = count["count(`surveyId`)"];
  console.log("Total survey", totalSurvey);

  knex.destroy();
};

main();
