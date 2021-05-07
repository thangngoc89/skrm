"use strict";
exports.__esModule = true;
exports.survey = void 0;
var form = require("./nguoi_lon_form");
var questionare = require("./nguoi_lon_questionare");
var ohip14 = require("./nguoi_lon_ohip14");
exports.survey = {
    name: "nguoi_lon",
    forms: [form, questionare, ohip14],
    headerColor: "green"
};
