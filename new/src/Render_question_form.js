import React from "react";
import { Formik, Form } from "formik";
import schema from "./data/Question_schema";
import RenderQuestion from "./Render_question";

import { Box, Heading, Button } from "./components";

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
        <Box
          direction="row"
          alignContent="center"
          justifyContent="center"
          className="mb-6 lg:mb-12"
        >
          <Heading level={2} textAlign="center">
            Bảng câu hỏi <br />
            Phỏng vấn kiến thức và thói quen chăm sóc sức khỏe răng miệng
          </Heading>
        </Box>
        <Box>
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
        <Button primary label="Submit" type="submit" />
      </Form>
    )}
  </Formik>
);

export default MyForm;
