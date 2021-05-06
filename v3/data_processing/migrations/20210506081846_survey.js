exports.up = function (knex) {
  return knex.schema.createTable("survey", function (table) {
    table.string("surveyId").primary();
    table.string("machineId").notNullable();
    table.string("surveyType").notNullable();
    table.timestamp("createdAt").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("survey");
};
