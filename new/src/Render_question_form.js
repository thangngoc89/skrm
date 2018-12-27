import React from "react";
import { Formik, Form, FastField, FieldArray, Field } from "formik";
import schema from "./data/Question_schema";
import RenderQuestion from "./Render_question";

import { Box, Button } from "grommet";

const MyForm = () => (
  <Formik
    initialValues={{
      b13: { values: [], customMessage: "" },
      b16: { values: [], customMessage: "" },
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
                questionBag={questionBag}
                questionValue={values[questionBag.id]}
                setFieldValue={setFieldValue}
              />
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