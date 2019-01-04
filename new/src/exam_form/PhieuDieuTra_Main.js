import React from "react";
import { Formik, Form } from "formik";
import { Box, Heading, Button } from "../components";
import { TextInput, FormField } from "grommet";

const layout = [
  {
    title: "Hành chính",
    items: [
      [
        { size: "1", label: "ngayKham", type: "date" },
        { size: "1", label: "soHoSo", type: "string" },
        { size: "1", label: "nguoiKham", type: "string" },
      ],
      [{ size: "full", label: "HoVaTen", type: "string" }],
      [
        { size: "1", label: "Tuoi", type: "number" },
        { size: "1", label: "DanToc", type: "string" },
        { size: "1", label: "GioiTinh", type: "string" },
      ],
      [
        { size: "1", label: "Lop", type: "string" },
        { size: "2", label: "Truong", type: "string" },
      ],
      [{ size: "1", label: "DiaChi", type: "string" }],
    ],
  },
  {
    title: "Tình trạng và nhu cầu",
    items: [
      [
        { size: "1", label: "TtncHamTren", type: "custom" },
        { size: "1", label: "TtncHamDuoi", type: "custom" },
      ],
    ],
  },
];

const initialValues = {
  ngayKham: "",
  soHoSo: "",
  nguoiKham: "",
  hoVaTen: "",
  tuoi: 0,
  gioiTinh: "Nam",
  danToc: "",
  lop: "",
  truong: "",
  diaChi: "",
  ttncHamTren: {},
  ttncHamDuoi: {},
};

const RenderRow = ({ row }) => {
  console.log(row);
  return (
    <Box direction="row-responsive">
      {row.map(({ label, size, type }) => {
        return (
          <Box className={`flex-${size} mx-2`}>
            <FormField label={label} htmlFor={label}>
              <TextInput name={label} id={label} type={type} />
            </FormField>
          </Box>
        );
      })}
    </Box>
  );
};
const PhieuDieuTraForm = ({ initialValues = initialValues }) => (
  <Formik
    initialValues={initialValues}
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
        <Box direction="row" alignContent="center" justifyContent="center">
          <Heading level={2} textAlign="center">
            Bảng câu hỏi <br />
            Phỏng vấn kiến thức và thói quen chăm sóc sức khỏe răng miệng
          </Heading>
        </Box>
        <Box direction="column">
          {layout.map(group => {
            return (
              <Box>
                <Heading level={3}> {group.title} </Heading>
                {group.items.map(row => {
                  return <RenderRow row={row} />;
                })}
              </Box>
            );
          })}
        </Box>
        <Button primary label="Submit" type="submit" />
      </Form>
    )}
  </Formik>
);

export default PhieuDieuTraForm;
