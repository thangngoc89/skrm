import React from "react";
import { Box } from "../components";
import { Heading, Text, Button } from "grommet";
import { make as SchemaRender } from "./PDT_SchemaRender.bs";
import {
  tieuhoc_layout,
  tieuhoc_yupSchema,
  tieuhoc_initialValues,
  tieuhoc_ids,
} from "./PDT_Schema.bs";
import { Formik, Form } from "formik";
import MountPortal from "../MountPortal";
import FormikAutosave from "../FormikAutosave";
import FormikNotify from "../FormikNotify";

const PDT_TieuhocForm = ({ initialValues = tieuhoc_initialValues, onSave }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, { setSubmitting }) => {
      onSave(values, false).then(() => setSubmitting(false));
    }}
    validationSchema={tieuhoc_yupSchema}
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
            layout={tieuhoc_layout}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
          />
          <FormikNotify
            isValidating={isValidating}
            errors={errors}
            ids={tieuhoc_ids}
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
          </MountPortal>
        </Form>
      );
    }}
  </Formik>
);

const PDT_Tieuhoc = ({ initialValues, onSave }) => {
  return (
    <div>
      <Box direction="column" alignItems="center">
        <Heading level={1} textAlign="center">
          Phiếu điều tra sức khỏe răng miệng
        </Heading>
        <Text size="large" color="dark-1">
          (dành cho trẻ dưới 15 tuổi)
        </Text>
      </Box>
      <PDT_TieuhocForm initialValues={initialValues} onSave={onSave} />
    </div>
  );
};

export default PDT_Tieuhoc;
