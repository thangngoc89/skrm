import React from "react";
import { FastField } from "formik";
import {
  Box,
  TextInput,
  CheckBox,
  RadioButton,
  DottedLabel,
} from "../components";
import objStr from "obj-str";

const RenderQuestionHeader = function({ id, question }) {
  return (
    <div className="flex-1 mb-3 lg:mb-0">
      <strong className="uppercase text-brand">{id + ". "}</strong>
      <span>{question}</span>
    </div>
  );
};

const SelectOne = ({
  setFieldValue,
  questionBag,
  questionValue,
  hasError,
  errors,
}) => {
  const hasCustom = questionBag.hasOwnProperty("custom");
  const fieldName = questionBag.id;
  const fieldValue = questionValue;

  return (
    <Box
      id={questionBag.id}
      direction="row-responsive"
      className={objStr({
        "my-3": true,
        "bg-error-bg py-3": hasError,
      })}
    >
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
          {hasCustom && questionValue.indexOf(questionBag.custom.value) !== -1 && (
            <FastField
              name={`${questionBag.id}_customMessage`}
              render={({ field }) => {
                const hasCustomError =
                  typeof errors[field.name] !== "undefined";

                return (
                  <TextInput
                    className={objStr({
                      "mt-2 py-2": true,
                      "bg-error-bg": hasCustomError,
                    })}
                    placeholder="Ghi rõ câu trả lời"
                    id={field.name}
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

const SelectManyOrCustom = ({
  questionValue,
  questionBag,
  setFieldValue,
  hasError,
  errors,
}) => {
  const hasCustom = questionBag.hasOwnProperty("custom");
  const fieldName = questionBag.id;

  return (
    <Box
      id={questionBag.id}
      direction="row-responsive"
      className={objStr({
        "my-3": true,
        "bg-error-bg py-3": hasError,
      })}
    >
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
                const hasCustomError =
                  typeof errors[field.name] !== "undefined";

                return (
                  <TextInput
                    className={objStr({
                      "mt-2 py-2": true,
                      "bg-error-bg": hasCustomError,
                    })}
                    placeholder="Ghi rõ câu trả lời"
                    id={field.name}
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

const GroupSelectOne = ({
  setFieldValue,
  questionBag,
  questionValue,
  errors,
}) => {
  return (
    <Box direction="column" className="my-3" id={questionBag.id}>
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

              const hasError =
                errors && typeof errors[subValue] !== "undefined";

              return (
                <tr
                  key={subValue}
                  className={objStr({
                    "h-10 border-b border-light-6 hover:bg-light-1": true,
                    "bg-error-bg": hasError,
                  })}
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

function RenderQuestion({
  questionValue,
  questionError,
  setFieldValue,
  questionBag,
  errors,
}) {
  switch (questionBag.type) {
    case "select_one":
    case "select_one_or_custom":
      return (
        <SelectOne
          hasError={typeof questionError !== "undefined"}
          questionValue={questionValue}
          setFieldValue={setFieldValue}
          questionBag={questionBag}
          errors={errors}
        />
      );
    case "select_many_or_custom":
    case "select_many":
      return (
        <SelectManyOrCustom
          hasError={typeof questionError !== "undefined"}
          questionValue={questionValue}
          setFieldValue={setFieldValue}
          questionBag={questionBag}
          errors={errors}
        />
      );
    case "group_select_one":
      return (
        <GroupSelectOne
          errors={questionError}
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

/* 
// Not working because of required access to bx_customMessage
function areEqual(prevProps, nextProps) {
  return (
    prevProps.questionValue === nextProps.questionValue &&
    prevProps.questionError === nextProps.questionError
  );
}

export default React.memo(RenderQuestion, areEqual);
*/

export default RenderQuestion;
