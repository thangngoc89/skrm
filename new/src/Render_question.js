import React from "react";
import { FastField, Field, FieldArray } from "formik";
import { Box, TextInput, CheckBox, RadioButton } from "./components";

const DottedLabel = ({ value, label }) => (
  <Box direction="row" alignContent="end" className="w-full">
    {label}
    <span className="flex-1 border-b border-dotted border-dark-3 mx-2 mb-1" />
    {value}
  </Box>
);

const RenderQuestionHeader = function({ id, question }) {
  return (
    <div className="flex-1">
      <strong className="uppercase text-brand">{id + ". "}</strong>
      <span>{question}</span>
    </div>
  );
};

const SelectOne = ({ setFieldValue, questionBag }) => {
  return (
    <Box direction="row-responsive" className="my-3">
      <RenderQuestionHeader
        id={questionBag.id}
        question={questionBag.question}
      />
      <Field
        name={questionBag.id}
        render={({ field }) => {
          return (
            <div className="flex-1">
              {questionBag.content.map(({ value, label }) => (
                <RadioButton
                  className="mb-2"
                  key={label}
                  name={field.name}
                  value={value}
                  checked={field.value === value}
                  onChange={event => {
                    setFieldValue(field.name, event.target.value);
                  }}
                  label={<DottedLabel label={label} value={value} />}
                />
              ))}
            </div>
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
    <CheckBox
      className="mb-2"
      name={name}
      value={value}
      checked={arrayValue.indexOf(value) !== -1}
      label={<DottedLabel value={value} label={label} />}
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
    <Box direction="row-responsive" className="my-3">
      <RenderQuestionHeader
        id={questionBag.id}
        question={questionBag.question}
      />
      <FieldArray
        name={`${questionBag.id}.values`}
        render={({ name, ...arrayHelpers }) => {
          return (
            <div className="flex-1">
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
                <FastField
                  name={`${questionBag.id}.customMessage`}
                  render={({ field }) => {
                    return (
                      <TextInput placeholder="Ghi rõ câu trả lời" {...field} />
                    );
                  }}
                />
              )}
            </div>
          );
        }}
      />
    </Box>
  );
};

const GroupSelectOne = ({ setFieldValue, questionBag }) => {
  return (
    <Box direction="column" className="my-3">
      <RenderQuestionHeader
        id={questionBag.id}
        question={questionBag.question}
      />
      <table className="w-full table-auto my-4">
        <thead>
          <tr className="h-12 border-b-2">
            <th size="large" />
            {questionBag.values.map(({ label, value }) => {
              return (
                <th key={value} scope="col" className="font-bold center">
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
                <tr
                  key={subValue}
                  className="h-10 border-b border-light-6 hover:bg-light-1"
                >
                  <td scope="row" className="text-left font-normal">
                    <strong>{subValue}.</strong> {subLabel}
                  </td>
                  <Field
                    name={`${questionBag.id}.${subValue}`}
                    render={({ field }) => {
                      return questionBag.values.map(({ label, value }) => {
                        return (
                          <td key={value}>
                            <div className="block w-6 h-6 m-auto">
                              <RadioButton
                                key={label}
                                name={`${subValue}.${value}`}
                                value={value}
                                checked={field.value === value}
                                onChange={event => {
                                  setFieldValue(field.name, event.target.value);
                                }}
                                block={false}
                              />
                            </div>
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
