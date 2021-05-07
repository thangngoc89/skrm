"use strict";
exports.__esModule = true;
exports.makeYupSchema = void 0;
var Yup = require("yup");
exports.makeYupSchema = function (form) {
    var survey = form.survey, _a = form.lists, lists = _a === void 0 ? {} : _a;
    var temp = {};
    survey.forEach(function (field) {
        makeFieldYupSchema(field, lists, form, temp);
    });
    return Yup.object(temp);
};
function optionalAwareness(optional, schema) {
    if (Boolean(optional)) {
        return schema;
    }
    return schema.required();
}
function makeFieldYupSchema(field, lists, form, result) {
    switch (field.type) {
        case "select_one":
            result[field.name] = optionalAwareness(field.optional, Yup.string().oneOf(field.choices.map(getNamesFromPair)));
            break;
        case "select_one_ref":
            if (!lists[field.list]) {
                throw new Error("List " + field.list + " isn't available in  <Form " + form.name + "> -> <Field " + field.name + ">");
            }
            result[field.name] = optionalAwareness(field.optional, Yup.string().oneOf(lists[field.list].map(getNamesFromPair)));
            break;
        case "matrix_select_one":
            var temp3_1 = Yup.string().oneOf(field.choices.map(getNamesFromPair));
            field.subQuestions.forEach(function (q) {
                result[q.id] = temp3_1;
            });
        case "select_many":
            result[field.name] = Yup.array(Yup.string()).of(Yup.string().oneOf(field.choices.map(getNamesFromPair)));
            break;
        case "select_many_ref":
            if (!lists[field.list]) {
                throw new Error("List " + field.list + " isn't available in  <Form " + form.name + "> -> <Field " + field.name + ">");
            }
            result[field.name] = Yup.array(Yup.string()).of(Yup.string().oneOf(lists[field.list].map(getNamesFromPair)));
            break;
        case "text":
            result[field.name] = optionalAwareness(field.optional, Yup.string());
            break;
        case "date":
            result[field.name] = optionalAwareness(field.optional, Yup.string());
            break;
        case "integer":
            result[field.name] = optionalAwareness(field.optional, Yup.number().integer());
            break;
        case "group":
            field.fields.forEach(function (groupField) {
                makeFieldYupSchema(groupField, lists, form, result);
            });
            break;
        case "dental_arch_table":
            field.fields.forEach(function (_a) {
                var name = _a.name, list = _a.list;
                result[name] = Yup.string().oneOf(lists[list].map(getNamesFromPair)).required();
            });
            break;
        case "dental_arch_table_2_rows":
            field.firstRow.forEach(function (_a) {
                var name = _a.name, list = _a.list;
                result[name] = Yup.string().oneOf(lists[list].map(getNamesFromPair)).required();
            });
            field.secondRow.forEach(function (_a) {
                var name = _a.name, list = _a.list;
                result[name] = Yup.string().oneOf(lists[list].map(getNamesFromPair)).required();
            });
            break;
    }
}
function getNamesFromPair(pair) {
    return pair.name;
}
