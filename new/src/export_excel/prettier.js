const { writeFileSync, readFileSync } = require("fs");

const from = readFileSync("./data.hmong").toString();

writeFileSync("./data.hmong", JSON.stringify(JSON.parse(from), null, 2));
