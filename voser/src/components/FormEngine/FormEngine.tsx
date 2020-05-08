import * as React from "react";
import { Formik } from "formik";
import * as Survey from "../../reason/Survey.gen";
import FormRender from "./FormRender";

const testSchema: Survey.field[] = [
  {
    tag: "Text",
    value: { id: "text", label: "A text field" },
  },
  {
    tag: "Text",
    value: { id: "text2", label: "More text" },
  },
  {
    tag: "Text",
    value: { id: "text3", label: "More more text" },
  },
  {
    tag: "SelectOne",
    value: {
      id: "select_one",
      label: "Select one",
      params: [
        { value: "0", label: "No" },
        { value: "1", label: "Yes" },
      ],
    },
  },
  {
    tag: "Group",
    value: {
      id: "group_with_brances",
      label: "Group for branching",
      params: [
        {
          tag: "SelectMultiple",
          value: {
            id: "select_multiple_with_or_other",
            label: "Select multiple with or other",
            params: [
              { value: "1", label: "One" },
              { value: "9", label: "Other (specify)" },
            ],
          },
        },
      ],
    },
  },
];

const testSchemaComplex: Survey.field[] = [
  {
    tag: "Date",
    value: { id: "date", label: "Pick a date"}

  },
  {
    tag: "Text",
    value: { id: "text", label: "A text field" },
  },
  {
    tag: "Group",
    value: {
      id: "group1",
      label: "Group1",
      params: [
        {
          tag: "Text",
          value: { id: "text2", label: "More text" },
        },
        {
          tag: "Text",
          value: { id: "text3", label: "More more text" },
        },
        {
          tag: "Text",
          value: { id: "text4", label: "More text" },
        },
        {
          tag: "Text",
          value: { id: "text5", label: "More more text" },
        },
      ],
    },
  },
  {
    tag: "SelectOne",
    value: {
      id: "select_one",
      label: "Select one",
      params: [
        { value: "0", label: "No" },
        { value: "1", label: "Yes" },
      ],
    },
  },
  {
    tag: "Group",
    value: {
      id: "group_with_brances",
      label: "Conditionally display group",
      params: [
        {
          tag: "SelectMultiple",
          value: {
            id: "select_multiple_with_or_other",
            label: "Select multiple with or other",
            params: [
              { value: "1", label: "One" },
              { value: "2", label: "Two" },
              { value: "3", label: "Three" },
              { value: "4", label: "Four" },
              { value: "9", label: "Other (specify)" },
            ],
          },
        },
        {
          tag: "Text",
          value: {
            id: "or_other",
            label: "Khó chịu khác",
            relavent: "'9' in select_multiple_with_or_other",
          },
        },
      ],
      relavent: 'select_one == "1"',
    },
  },
];

const testSurvey: Survey.t = {
  title: "Test survey",
  fields: testSchemaComplex,
};

function FormEngine() {
  return (
    <Formik
      initialValues={{} as any}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
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
      }) => (
        <form onSubmit={handleSubmit}>
          <FormRender survey={testSurvey} />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
}

export default FormEngine;
