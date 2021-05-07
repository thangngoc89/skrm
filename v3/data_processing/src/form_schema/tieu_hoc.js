"use strict";
exports.__esModule = true;
exports.survey = void 0;
var form = require("./tieu_hoc_form");
var questionare = require("./tieu_hoc_questionare");
var childOidp = require("./tieu_hoc_child_oidp");
exports.survey = {
    name: "tieu_hoc",
    forms: [form, questionare, childOidp],
    headerColor: "pink"
};
