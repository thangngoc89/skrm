import React from "react";
import { StyledDottedLabel } from "./Render_question_styled";
import { Field, FieldArray } from "formik";
import Box from "./Box";

const RenderQuestionHeader = function({ id, question }) {
  return (
    <span>
      <strong className="uppercase text-brand">{id + ". "}</strong>
      <span>{question}</span>
    </span>
  );
};

const SelectOne = ({ setFieldValue, questionBag }) => {
  return (
    <Box direction="row-responsive" gap="xsmall">
      <Box basis="1/2">
        <RenderQuestionHeader
          id={questionBag.id}
          question={questionBag.question}
        />
      </Box>
      <Field
        name={questionBag.id}
        render={({ field }) => {
          return (
            <Box direction="column" basis="1/2" gap="xsmall">
              {questionBag.content.map(({ value, label }) => (
                <label key={label} className="flex items-center">
                  <input
                    type="radio"
                    name={field.name}
                    value={value}
                    checked={field.value === value}
                    onChange={event => {
                      setFieldValue(field.name, event.target.value);
                    }}
                  />
                  <StyledDottedLabel label={label} value={value} />
                </label>
              ))}
            </Box>
          );
        }}
      />
    </Box>
  );
};

const ControlledCheckBox = ({
  name,
  label,
  value,
  arrayValue,
  arrayHelpers,
}) => {
  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={arrayValue.indexOf(value) !== -1}
        onChange={event => {
          if (event.target.checked) {
            arrayHelpers.push(value);
          } else {
            const idx = arrayValue.indexOf(value);
            arrayHelpers.remove(idx);
          }
        }}
      />
      <StyledDottedLabel value={value} label={label} />
    </label>
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
        render={({ name, ...arrayHelpers }) => {
          return (
            <Box direction="column" basis="1/2" gap="xsmall">
              {questionBag.content.map(({ value, label }) => (
                <ControlledCheckBox
                  key={label}
                  name={name}
                  label={label}
                  value={value}
                  arrayValue={questionValue.values}
                  arrayHelpers={arrayHelpers}
                />
              ))}
              <ControlledCheckBox
                name={name}
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
                      <input placeholder="Ghi rõ câu trả lời" {...field} />
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

const GroupSelectOne = ({ setFieldValue, questionBag }) => {
  return (
    <Box direction="column" gap="xsmall">
      <RenderQuestionHeader
        id={questionBag.id}
        question={questionBag.question}
      />
      <table width="100%">
        <thead>
          <tr>
            <th size="large" />
            {questionBag.values.map(({ label, value }) => {
              return (
                <th key={value} scope="col" align="center" size="small">
                  {label} ({value})
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {questionBag.subQuestions.map(
            ({ label: subLabel, value: subValue }) => {
              return (
                <tr key={subValue}>
                  <th scope="row" align="start" size="large">
                    <span>
                      <strong>{subValue}.</strong> {subLabel}
                    </span>
                  </th>
                  <Field
                    name={`${questionBag.id}.${subValue}`}
                    render={({ field }) => {
                      return questionBag.values.map(({ label, value }) => {
                        return (
                          <td key={value} align="center" size="small">
                            <input
                              type="radio"
                              key={label}
                              name={label}
                              value={value}
                              checked={field.value === value}
                              onChange={event => {
                                setFieldValue(field.name, event.target.value);
                              }}
                            />
                          </td>
                        );
                      });
                    }}
                  />
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </Box>
  );
};

function RenderQuestion({ questionValue, setFieldValue, questionBag }) {
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
    case "group_select_one":
      return (
        <GroupSelectOne
          questionValue={questionValue}
          setFieldValue={setFieldValue}
          questionBag={questionBag}
        />
      );
    default:
      return <span color="status-critical">Unknown question type</span>;
  }
}

function areEqual(prevProps, nextProps) {
  return prevProps.questionValue === nextProps.questionValue;
}

export default React.memo(RenderQuestion, areEqual);
