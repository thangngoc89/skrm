import React from "react";
import { StyledDottedLabel } from "./Render_question_styled";
import { Box, Text, Markdown, RadioButton, CheckBox } from "grommet";
import { Field, FastField, FieldArray } from "formik";

const RenderQuestionHeader = React.memo(function({ id, question }) {
  return (
    <span>
      <Text color="brand" weight="bold">
        {id.toLocaleUpperCase() + ". "}
      </Text>
      <Markdown>{question}</Markdown>
    </span>
  );
});

const SelectOne = ({ setFieldValue, questionBag }) => {
  return (
    <Box direction="row-responsive" gap="xsmall">
      <Box basis="1/2">
        <RenderQuestionHeader
          id={questionBag.id}
          question={questionBag.question}
        />
      </Box>
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
                  label={<StyledDottedLabel label={label} value={value} />}
                  onChange={event => {
                    setFieldValue(questionBag.id, event.target.value);
                  }}
                />
              ))}
            </Box>
          );
        }}
      />
    </Box>
  );
};

const ControlledCheckBox = ({ label, value, arrayValue, arrayHelpers }) => {
  return (
    <CheckBox
      key={label}
      name={label}
      value={value}
      checked={arrayValue.indexOf(value) !== -1}
      label={<StyledDottedLabel value={value} label={label} />}
      onChange={event => {
        if (event.target.checked) {
          arrayHelpers.push(value);
        } else {
          const idx = arrayValue.indexOf(value);
          arrayHelpers.remove(idx);
        }
      }}
    />
  );
};
const SelectManyOrCustom = ({ questionValue, questionBag }) => {
  return (
    <Box direction="row-responsive" gap="xsmall">
      <Box basis="1/2">
        <RenderQuestionHeader
          id={questionBag.id}
          question={questionBag.question}
        />
      </Box>
      <FieldArray
        name={`${questionBag.id}.values`}
        render={arrayHelpers => {
          return (
            <Box direction="column" basis="1/2" gap="xsmall">
              {questionBag.content.map(({ value, label }) => (
                <ControlledCheckBox
                  key={value}
                  label={label}
                  value={value}
                  arrayValue={questionValue.values}
                  arrayHelpers={arrayHelpers}
                />
              ))}
              <ControlledCheckBox
                label={questionBag.custom.label}
                value={questionBag.custom.value}
                arrayValue={questionValue.values}
                arrayHelpers={arrayHelpers}
              />

              {questionValue.values.indexOf(questionBag.custom.value) !==
                -1 && (
                <Field
                  name={`${questionBag.id}.customMessage`}
                  render={({ field }) => {
                    return (
                      <TextInput placeholder="Ghi rõ câu trả lời" {...field} />
                    );
                  }}
                />
              )}
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default function({ questionValue, setFieldValue, questionBag }) {
  switch (questionBag.type) {
    case "select_one":
      return (
        <SelectOne
          questionValue={questionValue}
          setFieldValue={setFieldValue}
          questionBag={questionBag}
        />
      );
    case "select_many_or_custom":
      return (
        <SelectManyOrCustom
          questionValue={questionValue}
          setFieldValue={setFieldValue}
          questionBag={questionBag}
        />
      );
    default:
      return <Text color="status-critical">Unknown question type</Text>;
  }
}
