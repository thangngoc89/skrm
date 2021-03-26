import * as Yup from "yup";
import { Field, Form, List, Pair, SelectPairRef } from "./schema";

export const makeYupSchema = (form: Form) => {
  const { survey, lists = {} } = form;

  let temp: { [key: string]: any } = {};

  survey.forEach((field) => {
    makeFieldYupSchema(field, lists, form, temp);
  });

  return Yup.object(temp);
};
function optionalAwareness(optional: boolean | undefined, schema: any) {
  if (Boolean(optional)) {
    return schema;
  }
  return schema.required();
}

function makeFieldYupSchema(field: Field, lists: List, form: Form, result: { [key: string]: any }) {
  switch (field.type) {
    case "select_one":
      result[field.name] = optionalAwareness(field.optional, Yup.string().oneOf(field.choices.map(getNamesFromPair)));
      break;
    case "select_one_ref":
      if (!lists[field.list]) {
        throw new Error(`List ${field.list} isn't available in  <Form ${form.name}> -> <Field ${field.name}>`);
      }

      result[field.name] = optionalAwareness(
        field.optional,
        Yup.string().oneOf(lists[field.list].map(getNamesFromPair))
      );
      break;

    case "matrix_select_one":
      let temp3 = Yup.string().oneOf(field.choices.map(getNamesFromPair));
      field.subQuestions.forEach((q) => {
        result[q.id] = temp3;
      });

    case "select_many":
      result[field.name] = Yup.array(Yup.string()).of(Yup.string().oneOf(field.choices.map(getNamesFromPair)));
      break;
    case "select_many_ref":
      if (!lists[field.list]) {
        throw new Error(`List ${field.list} isn't available in  <Form ${form.name}> -> <Field ${field.name}>`);
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
      field.fields.forEach((groupField) => {
        makeFieldYupSchema(groupField, lists, form, result);
      });
      break;
    case "dental_arch_table":
      field.fields.forEach(({ name, list }: SelectPairRef) => {
        result[name] = Yup.string().oneOf(lists[list].map(getNamesFromPair)).required();
      });
      break;
    case "dental_arch_table_2_rows":
      field.firstRow.forEach(({ name, list }: SelectPairRef) => {
        result[name] = Yup.string().oneOf(lists[list].map(getNamesFromPair)).required();
      });
      field.secondRow.forEach(({ name, list }: SelectPairRef) => {
        result[name] = Yup.string().oneOf(lists[list].map(getNamesFromPair)).required();
      });
      break;
  }
}

function getNamesFromPair(pair: Pair) {
  return pair.name;
}
