import React from "react";
import { Formik, Form } from "formik";
import schema from "./data/Question_schema";
import initialValues from "./data/Question_schema_initialValues";
import RenderQuestion from "./Render_question";
import { Box, Heading, Button } from "../components";
import PhieuDieuTra from "../exam_form/PhieuDieuTra_Main";
import MountPortal from "../MountPortal";

const RenderQuestionForm = ({ onSaveDraft, onSave }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, { setSubmitting }) => {
      onSave(values);
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
        <MountPortal id="footerAction">
          <Box justifyContent="end" direction="row" className="-mx-2">
            <Button
              plain
              color="dark-3"
              label="Lưu nháp"
              type="submit"
              className="mx-2"
              onClick={_ => onSaveDraft(values)}
            />
            <Button
              primary
              label="Lưu"
              type="submit"
              className="mx-2"
              size="small"
            />
          </Box>
        </MountPortal>
      </Form>
    )}
  </Formik>
);

export default RenderQuestionForm;
