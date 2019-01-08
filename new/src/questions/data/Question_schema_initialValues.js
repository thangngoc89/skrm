import schema from "./Question_schema";

const schemaToInitialValues = schema => {
  return schema.reduce((acc, questionBag) => {
    switch (questionBag.type) {
      case "select_one":
        acc[questionBag.id] = "";
        return acc;
      case "select_one_or_custom":
        acc[questionBag.id] = "";
        acc[questionBag.id + "_customMessage"] = "";
        return acc;
      case "select_many_or_custom":
        acc[questionBag.id] = [];
        acc[questionBag.id + "_customMessage"] = "";
        return acc;
      case "select_many":
        acc[questionBag.id] = [];
        return acc;
      case "group_select_one":
        const subInitialValues = {};
        questionBag.subQuestions.forEach(sub => {
          subInitialValues[sub.value] = "";
        });
        acc[questionBag.id] = subInitialValues;
        return acc;
      default:
        throw new Error("Unhandled questionType");
    }
  }, {});
};

export default schemaToInitialValues(schema);
