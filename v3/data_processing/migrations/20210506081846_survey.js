exports.up = function (knex) {
  return knex.schema.createTable("survey", function (table) {
    table.string("id").primary();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("survey");
};
