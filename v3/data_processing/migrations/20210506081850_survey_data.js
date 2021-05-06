exports.up = function (knex) {
  return knex.schema.createTable("surveyData", function (table) {
    table.string("surveyDataId").primary();
    table.string("surveyId").references("surveyId").inTable("survey").notNullable();
    table.string("machineId").notNullable();
    table.string("surveyForm").notNullable();
    table.json("data").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("surveyData");
};
