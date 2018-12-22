const { writeFileSync } = require("fs")

const from = require("./single.nguoitruongthanh.json");

writeFileSync("./single.nguoitruongthanh.json", JSON.stringify(from, null, 2))
