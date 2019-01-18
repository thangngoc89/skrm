import React from "react";
import { Formik, Form } from "formik";
import schema from "./data/Question_schema";
import blankInitialValues from "./data/Question_schema_initialValues";
import RenderQuestion from "./Render_question";
import { Box, Heading, Button } from "../components";
import MountPortal from "../MountPortal";
import FormikAutosave from "../FormikAutosave";

const RenderQuestionForm = ({ initialValues = blankInitialValues, onSave }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        onSave(values, false).then(() => setSubmitting(false));
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

          <MountPortal id="footerAction">
            <Box justifyContent="end" direction="row" alignItems="center">
              <FormikAutosave
                values={values}
                render={({ type }) => {
                  switch (type) {
                    case "INITIAL":
                      return null;
                    case "SAVING":
                      return "Đang lưu";
                    case "SUCCESS":
                      return "Đã lưu";
                    case "ERROR":
                      return "Có lỗi xảy ra khi lưu";
                  }
                }}
                onSave={value => onSave(value, true)}
              />
              <Button
                primary
                label="Kiểm tra"
                type="submit"
                size="small"
                className="font-bold"
                onClick={handleSubmit}
                disabled={isSubmitting}
                color="white"
                margin={{ left: "small" }}
              />
            </Box>
          </MountPortal>
        </Form>
      )}
    </Formik>
  );
};

export default RenderQuestionForm;
