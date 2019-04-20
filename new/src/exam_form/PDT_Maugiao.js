import React from "react";
import { Box } from "../components";
import { Heading, Text, Button } from "grommet";
import { make as SchemaRender } from "./PDT_SchemaRender.bs";
import {
  maugiao_layout,
  maugiao_yupSchema,
  maugiao_initialValues,
  maugiao_ids,
} from "./PDT_Schema.bs";
import { Formik, Form } from "formik";
import MountPortal from "../MountPortal";
import FormikAutosave from "../FormikAutosave";
import FormikNotify from "../FormikNotify";

const PDT_MaugiaoForm = ({ initialValues = maugiao_initialValues, onSave }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, { setSubmitting }) => {
      onSave(values, values.draft).then(() => setSubmitting(false));
    }}
    validationSchema={maugiao_yupSchema}
    validateOnBlur={true}
    validateOnChange={false}
  >
    {({
      values,
      handleSubmit,
      isSubmitting,
      setFieldValue,
      setFieldTouched,
      isValidating,
      errors,
    }) => {
      return (
        <Form>
          <SchemaRender
            layout={maugiao_layout}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
          />
          <FormikNotify
            isValidating={isValidating}
            errors={errors}
            ids={maugiao_ids}
          />
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
                disabled={isSubmitting || isValidating}
                color="white"
                margin={{ left: "small" }}
              />
            </Box>
            {values.hoVaTen && <strong>{values.hoVaTen}</strong>}
          </MountPortal>
        </Form>
      );
    }}
  </Formik>
);

const PDT_Maugiao = ({ initialValues, onSave }) => {
  return (
    <div>
      <Box direction="column" alignItems="center">
        <Heading level={1} textAlign="center">
          Phiếu điều tra sức khỏe răng miệng
        </Heading>
        <Text size="large" color="dark-1">
          (dành cho học sinh mẫu giáo)
        </Text>
      </Box>
      <PDT_MaugiaoForm initialValues={initialValues} onSave={onSave} />
    </div>
  );
};

export default PDT_Maugiao;
