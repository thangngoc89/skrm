import React from "react";
import { Formik, Form } from "formik";
import schema from "./data/Question_schema";
import RenderQuestion from "./Render_question";

// import { Box, Button } from "grommet";

import Box from "./Box";

const MyForm = () => (
  <Formik
    initialValues={{
      b10: {},
      b13: { values: [], customMessage: "" },
      b16: { values: [], customMessage: "" },
      b19: {},
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
              <RenderQuestion
                key={questionBag.id}
                values={values}
                questionBag={questionBag}
                questionValue={values[questionBag.id]}
                setFieldValue={setFieldValue}
              />
            );
          })}
        </Box>
        <Box direction="column" align="center" pad="large">
          <button label="Submit" type="submit">
            Submit
          </button>
        </Box>
      </Form>
    )}
  </Formik>
);

export default MyForm;
