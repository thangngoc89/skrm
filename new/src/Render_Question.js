import React from "react";
import { Formik, Form, FastField, FieldArray, Field } from "formik";
import schema from "./data/Question_schema";

import {
  Box,
  RadioButton,
  Text,
  Markdown,
  Button,
  CheckBox,
  TextInput,
} from "grommet";

const RenderQuestionHeader = ({ id, question }) => (
  <span>
    <Text color="brand" weight="bold">
      {id.toLocaleUpperCase() + ". "}
    </Text>
    <Markdown>{question}</Markdown>
  </span>
);

const RenderQuestionBody = ({ values, setFieldValue, questionBag }) => {
  switch (questionBag.type) {
    case "select_one":
      return (
        <FastField
          name={questionBag.id}
          render={({ field, form }) => {
            return (
              <Box direction="column" basis="1/2" gap="xsmall">
                {questionBag.content.map(({ value, label }) => (
                  <RadioButton
                    key={label}
                    name={label}
                    value={value}
                    checked={field.value === value}
                    label={
                      <Box direction="row" style={{ flex: 1 }}>
                        {label}
                        <div
                          style={{
                            flex: 1,
                            borderBottom: "1px dotted #000",
                            margin: "0 4px 6px 4px",
                          }}
                        />
                        {value}
                      </Box>
                    }
                    onChange={event => {
                      setFieldValue(questionBag.id, event.target.value);
                    }}
                  />
                ))}
              </Box>
            );
          }}
        />
      );
    case "select_many_or_custom":
      return (
        <FieldArray
          name={`${questionBag.id}.values`}
          render={arrayHelpers => {
            return (
              <Box direction="column" basis="1/2" gap="xsmall">
                {questionBag.content.map(({ value, label }) => (
                  <CheckBox
                    key={label}
                    name={label}
                    value={value}
                    checked={values[questionBag.id].values.indexOf(value) !== -1}
                    label={
                      <Box direction="row" style={{ flex: 1 }}>
                        {label}
                        <div
                          style={{
                            flex: 1,
                            borderBottom: "1px dotted #000",
                            margin: "0 4px 6px 4px",
                          }}
                        />
                        {value}
                      </Box>
                    }
                    onChange={event => {
                      if (event.target.checked) {
                        arrayHelpers.push(value);
                      } else {
                        const idx = values[questionBag.id].values.indexOf(
                          value
                        );
                        arrayHelpers.remove(idx);
                      }
                    }}
                  />
                ))}

                <CheckBox
                  key={questionBag.custom.label}
                  name={questionBag.custom.label}
                  value={questionBag.custom.value}
                  checked={
                    values[questionBag.id].values.indexOf(
                      questionBag.custom.value
                    ) !== -1
                  }
                  label={
                    <Box direction="row" style={{ flex: 1 }}>
                      {questionBag.custom.label}
                      <div
                        style={{
                          flex: 1,
                          borderBottom: "1px dotted #000",
                          margin: "0 4px 6px 4px",
                        }}
                      />
                      {questionBag.custom.value}
                    </Box>
                  }
                  onChange={event => {
                    if (event.target.checked) {
                      arrayHelpers.push(questionBag.custom.value);
                    } else {
                      const idx = values[questionBag.id].values.indexOf(
                        questionBag.custom.value
                      );
                      arrayHelpers.remove(idx);
                      setFieldValue(`${questionBag.id}.customMessage`, "");
                    }
                  }}
                />
                {values[questionBag.id].values.indexOf(
                  questionBag.custom.value
                ) !== -1 && (
                  <Field
                    name={`${questionBag.id}.customMessage`}
                    render={({ field }) => {
                      return (
                        <TextInput
                          placeholder="Ghi rõ câu trả lời"
                          {...field}
                        />
                      );
                    }}
                  />
                )}
              </Box>
            );
          }}
        />
      );
    default:
      return null;
  }
};

const MyForm = () => (
  <Formik
    initialValues={{
      b13: { values: [], customMessage: "" },
    }}
    onSubmit={(values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
    }}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      setFieldValue,
    }) => (
      <Form>
        <Box gap="medium">
          {schema.map(questionBag => {
            return (
              <Box key={questionBag.id} direction="row-responsive" gap="xsmall">
                <Box basis="1/2">
                  <RenderQuestionHeader
                    id={questionBag.id}
                    question={questionBag.question}
                  />
                </Box>
                <RenderQuestionBody
                  setFieldValue={setFieldValue}
                  questionBag={questionBag}
                  values={values}
                />
              </Box>
            );
          })}
        </Box>
        <Box align="center" pad="large">
          <Button label="Submit" type="submit" primary hoverIndicator />
        </Box>
      </Form>
    )}
  </Formik>
);

export default MyForm;
