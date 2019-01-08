import React from "react";
import { FastField } from "formik";
import { Box, TextInput, CheckBox, RadioButton } from "../components";

const DottedLabel = ({ value, label }) => (
  <Box direction="row" alignContent="end" className="w-full">
    {label}
    <span className="flex-1 border-b border-dotted border-dark-3 mx-2 mb-1" />
    {value}
  </Box>
);

const RenderQuestionHeader = function({ id, question }) {
  return (
    <div className="flex-1 mb-3 lg:mb-0">
      <strong className="uppercase text-brand">{id + ". "}</strong>
      <span>{question}</span>
    </div>
  );
};

const SelectOne = ({ setFieldValue, questionBag, questionValue }) => {
  const hasCustom = questionBag.hasOwnProperty("custom");
  const fieldName = questionBag.id;
  const fieldValue = questionValue;

  return (
    <Box direction="row-responsive" className="my-3">
      <RenderQuestionHeader
        id={questionBag.id}
        question={questionBag.question}
      />

      <Box className="flex-1">
        {questionBag.content.map(({ value, label }) => (
          <RadioButton
            className="mb-2"
            key={label}
            name={fieldName}
            value={value}
            checked={fieldValue === value}
            onChange={event => {
              setFieldValue(fieldName, event.target.value);
            }}
            label={<DottedLabel label={label} value={value} />}
          />
        ))}
        <Box direction="column">
          {hasCustom && (
            <RadioButton
              className="mb-2"
              key={questionBag.custom.label}
              name={fieldName}
              value={questionBag.custom.value}
              checked={fieldValue === questionBag.custom.value}
              onChange={event => {
                setFieldValue(fieldName, event.target.value);
              }}
              label={
                <DottedLabel
                  label={questionBag.custom.label}
                  value={questionBag.custom.value}
                />
              }
            />
          )}
          {hasCustom && questionValue === questionBag.custom.value && (
            <FastField
              name={`${questionBag.id}_customMessage`}
              render={({ field }) => {
                return (
                  <TextInput
                    className="mt-2"
                    placeholder="Ghi rõ câu trả lời"
                    {...field}
                  />
                );
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

const ControlledCheckBox = ({
  name,
  label,
  value,
  arrayValue,
  setFieldValue,
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
          setFieldValue(name, [...arrayValue, value]);
        } else {
          const idx = arrayValue.indexOf(value);
          setFieldValue(name, [
            ...arrayValue.slice(0, idx - 1),
            ...arrayValue.slice(idx + 1),
          ]);
        }
      }}
    />
  );
};

const SelectManyOrCustom = ({ questionValue, questionBag, setFieldValue }) => {
  const hasCustom = questionBag.hasOwnProperty("custom");
  const fieldName = questionBag.id;

  return (
    <Box direction="row-responsive" className="my-3">
      <RenderQuestionHeader
        id={questionBag.id}
        question={questionBag.question}
      />
      <Box className="flex-1">
        {questionBag.content.map(({ value, label }) => (
          <ControlledCheckBox
            key={label}
            name={fieldName}
            label={label}
            value={value}
            arrayValue={questionValue}
            setFieldValue={setFieldValue}
          />
        ))}
        <Box direction="column">
          {hasCustom && (
            <ControlledCheckBox
              name={fieldName}
              label={questionBag.custom.label}
              value={questionBag.custom.value}
              arrayValue={questionValue}
              setFieldValue={setFieldValue}
            />
          )}
          {hasCustom && questionValue.indexOf(questionBag.custom.value) !== -1 && (
            <FastField
              name={`${questionBag.id}_customMessage`}
              render={({ field }) => {
                return (
                  <TextInput
                    className="mt-2"
                    placeholder="Ghi rõ câu trả lời"
                    {...field}
                  />
                );
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

const GroupSelectOne = ({ setFieldValue, questionBag, questionValue }) => {
  return (
    <Box direction="column" className="my-3">
      <RenderQuestionHeader
        id={questionBag.id}
        question={questionBag.question}
      />
      <table className="w-full table-auto my-4">
        <thead>
          <tr className="h-12 border-b-2">
            <th />
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
              const fieldName = `${questionBag.id}.${subValue}`;
              const fieldValue = questionValue[subValue];

              return (
                <tr
                  key={subValue}
                  className="h-10 border-b border-light-6 hover:bg-light-1"
                >
                  <td scope="row" className="text-left font-normal">
                    <strong>{subValue}.</strong> {subLabel}
                  </td>
                  {questionBag.values.map(({ label, value }) => {
                    return (
                      <td key={value}>
                        <div className="w-6 h-6 m-auto">
                          <RadioButton
                            key={label}
                            name={fieldName}
                            value={value}
                            checked={fieldValue === value}
                            onChange={event => {
                              setFieldValue(fieldName, event.target.value);
                            }}
                          />
                        </div>
                      </td>
                    );
                  })}
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
    case "select_one_or_custom":
      return (
        <SelectOne
          questionValue={questionValue}
          setFieldValue={setFieldValue}
          questionBag={questionBag}
        />
      );
    case "select_many_or_custom":
    case "select_many":
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
      return (
        <span color="status-critical">
          Unknown question type {questionBag.type}
        </span>
      );
  }
}

function areEqual(prevProps, nextProps) {
  return prevProps.questionValue === nextProps.questionValue;
}

export default React.memo(RenderQuestion, areEqual);
