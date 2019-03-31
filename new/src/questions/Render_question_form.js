import React from "react";
import { Formik, Form } from "formik";
import schema from "./data/Question_schema";
import blankInitialValues from "./data/Question_schema_initialValues";
import RenderQuestion from "./Render_question";
import { Box, Heading, Button } from "../components";
import MountPortal from "../MountPortal";
import FormikAutosave from "../FormikAutosave";
import * as yup from "yup";

const makeOneOf = values => values.map(row => row.value);

const makeValidationSchema = questionSchema => {
  const shape = questionSchema.reduce((acc, questionBag) => {
    switch (questionBag.type) {
      case "select_one":
        acc[questionBag.id] = yup
          .string()
          .required()
          .oneOf(makeOneOf(questionBag.content));
        return acc;
      case "select_one_or_custom":
        acc[questionBag.id] = yup
          .string()
          .required()
          .oneOf([...makeOneOf(questionBag.content), questionBag.custom.value]);
        acc[`${questionBag.id}_customMessage`] = yup
          .string()
          .when(questionBag.id, {
            is: answer => answer === questionBag.custom.value,
            then: yup.string().required(),
            otherwisemakeValidationSchema: yup.string(),
          });
        return acc;
      case "select_makeValidationSchemamany":
        acc[questionBag.id] = yup
          .array()
          .required()
          .of(yup.oneOf(makeOneOf(questionBag.content)));
        return acc;
      case "select_many_or_custom":
        acc[questionBag.id] = yup
          .array()
          .required()
          .of(
            yup
              .string()
              .oneOf([
                ...makeOneOf(questionBag.content),
                questionBag.custom.value,
              ])
          );
        acc[`${questionBag.id}_customMessage`] = yup
          .string()
          .when(questionBag.id, {
            is: (arr = []) => arr.indexOf(questionBag.custom.value) !== -1,
            then: yup.string().required(),
            otherwise: yup.string(),
          });
        return acc;
      case "group_select_one":
        const oneOfValues = makeOneOf(questionBag.values);
        const objectShape = questionBag.subQuestions.reduce((acc2, q) => {
          acc2[q.value] = yup
            .string()
            .required()
            .oneOf(oneOfValues);
          return acc2;
        }, {});
        acc[questionBag.id] = yup.object(objectShape).required();
        return acc;
      default:
        return acc;
    }
  }, {});

  return yup.object(shape).required();
};

export const validationSchema = makeValidationSchema(schema);

const RenderQuestionForm = ({ initialValues = blankInitialValues, onSave }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        onSave(values, false).then(() => setSubmitting(false));
      }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={true}
    >
      {({ values, errors, handleSubmit, isSubmitting, setFieldValue }) => {
        return (
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
                    questionValue={values[questionBag.id]}
                    questionError={errors[questionBag.id]}
                    setFieldValue={setFieldValue}
                    questionBag={questionBag}
                    errors={errors}
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
        );
      }}
    </Formik>
  );
};

export default RenderQuestionForm;
