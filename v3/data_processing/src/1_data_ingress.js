const knex = require("knex")(require("../knexfile").development);

const fs = require("fs");
const readline = require("readline");

const processSuryvey = async () => {
  const filePath = "/Users/khoa/dev/voser/v3/data_downloader/data/prod--survey";

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let i = 0;
  for await (const line of rl) {
    const data = JSON.parse(line);

    const newSurvey = {
      surveyId: data.surveyId,
      machineId: data.machineId,
      surveyType: data.surveyType,
      createdAt: new Date(data.createdAt),
    };

    await knex("survey").insert(newSurvey);
    console.log(++i);
  }
};

const processSurveyData = async () => {
  const filePath = "/Users/khoa/dev/voser/v3/data_downloader/data/prod--surveyData";

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let i = 0;
  for await (const line of rl) {
    const data = JSON.parse(line);

    const newData = {
      surveyDataId: data.surveyDataId,
      surveyId: data.surveyId,
      machineId: data.machineId,
      surveyForm: data.surveyForm,
      data: JSON.stringify(data.data),
    };

    await knex("surveyData").insert(newData);
    console.log(++i);
  }
};

const main = async () => {
  // await processSuryvey();
  await processSurveyData();

  knex.destroy();
};

main();
