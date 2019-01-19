import React from "react";
import { Formik, Form, FastField, Field } from "formik";
import { Box, Heading, Text } from "grommet";
import { RadioGroup, SelectGroup, TextInput } from "../components";

const blankInitialValues = {
  coKhoChiu: "1",
  lietke: ["99"],
  lietkeCustom: "",
};

const lietkeOptions = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  99,
].map(a => ({ label: `${a}. lorem ipsum`, value: String(a) }));

const lietkeName = "lietke";
const lietkeCustomName = "lietkeCustom";
const Part2 = ({ setFieldValue, lietke, lietkeCustom }) => {
  return (
    <Box>
      <Heading level="2" color="brand">
        Phần 2
      </Heading>
      <Text size="large" level={2}>
        Liệt kê các khó chịu
      </Text>

      <SelectGroup
        name={lietkeName}
        value={lietke}
        options={lietkeOptions}
        onChange={value => setFieldValue(lietkeName, value)}
        gap="small"
        margin={{ vertical: "small" }}
      />

      {lietke.indexOf("99") !== -1 && (
        <TextInput
          value={lietkeCustom}
          className="p-2"
          onChange={event => {
            setFieldValue(lietkeCustomName, event.target.value);
          }}
        />
      )}
    </Box>
  );
};
const FormChildOIDP = ({ initialValues = blankInitialValues, onSave }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, { setSubmitting }) => {
      onSave(values, values.draft).then(() => setSubmitting(false));
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
    }) => {
      console.log(values);
      return (
        <Box pad="medium">
          <Form>
            <Box align="center" margin={{ bottom: "large" }}>
              <Heading level="1" textAlign="center">
                Bảng câu hỏi về những khó chịu từ răng miệng
              </Heading>
            </Box>

            <Box margin={{ bottom: "large" }}>
              <Heading level="2" color="brand">
                Phần 1
              </Heading>
              <Text size="large" level={2}>
                Trong 3 tháng qua các em có thấy khó chịu hay đau ở vùng răng
                miệng của mình hay không?
              </Text>
              <FastField
                name="coKhoChiu"
                render={({ field }) => {
                  return (
                    <RadioGroup
                      name={field.name}
                      value={field.value}
                      options={[
                        { label: "Có", value: "1" },
                        { label: "Không", value: "0" },
                      ]}
                      onChange={value => setFieldValue(field.name, value)}
                      direction="row"
                      gap="medium"
                      margin={{ vertical: "small" }}
                    />
                  );
                }}
              />
            </Box>

            {values.coKhoChiu === "1" && (
              <Part2
                setFieldValue={setFieldValue}
                lietke={values.lietke}
                lietkeCustom={values.lietkeCustom}
              />
            )}
          </Form>
        </Box>
      );
    }}
  </Formik>
);

export default FormChildOIDP;
