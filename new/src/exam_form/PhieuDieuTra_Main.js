import React from "react";
import { Formik, Form, FastField } from "formik";
import { Box, Heading, Button } from "../components";
import { TextInput, FormField } from "grommet";
import { format } from "date-fns";

const schema = {
  ngayKham: { label: "Ngày khám", type: "date" },
  soHoSo: { label: "Số hồ sơ", type: "string" },
  nguoiKham: { label: "Người khám", type: "string" },
  hoVaTen: { label: "Họ và tên", type: "string" },
  tuoi: { label: "Tuổi", type: "number" },
  danToc: { label: "Dân tộc", type: "string" },
  gioiTinh: { label: "Giới tính", type: "string" },
  lop: { label: "Lớp", type: "string" },
  truong: { label: "Trường", type: "string" },
  diaChi: { label: "Địa chỉ", type: "string" },
  ttncHamTren: { label: "Hàm trên", type: "custom" },
  ttncHamDuoi: { label: "Hàm dưới", type: "custom" },
};
const layout = [
  {
    title: "Hành chính",
    items: [
      [{ id: "ngayKham" }, { id: "soHoSo" }, { id: "nguoiKham" }],
      [{ id: "hoVaTen" }],
      [{ id: "tuoi" }, { id: "danToc" }, { id: "gioiTinh" }],
      [
        { id: "lop", type: "string" },
        { id: "truong", type: "string", size: "2" },
      ],
      [{ id: "diaChi", type: "string" }],
    ],
  },
  {
    title: "Tình trạng và nhu cầu",
    items: [[{ id: "ttncHamTren" }, { id: "ttncHamDuoi" }]],
  },
];

const RenderRow = ({ row }) => {
  return (
    <Box direction="row-responsive">
      {row.map(({ id, size = "1" }) => {
        const schemaOfField = schema[id];

        if (!schemaOfField) {
          return (
            <span key={id} className="text-status-critical">
              {"Không có mục " + id}
            </span>
          );
        } else {
          const { label, type } = schemaOfField;
          return (
            <Box key={id} className={`flex-${size} mx-2`}>
              <FastField
                name={id}
                render={({ field }) => {
                  switch (type) {
                    case "string":
                    case "date":
                    case "number":
                      return (
                        <FormField label={label} htmlFor={field.name}>
                          <TextInput
                            name={field.name}
                            id={field.name}
                            type={type}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                          />
                        </FormField>
                      );
                    case "custom":
                      return "Custom type";
                    default:
                      return "Unknown type " + type;
                  }
                }}
              />
            </Box>
          );
        }
      })}
    </Box>
  );
};

const currentInitialValues = {
  ngayKham: format(new Date(), "YYYY-MM-DD"),
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

const PhieuDieuTraForm = ({ initialValues = currentInitialValues }) => (
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
            Phiếu điều tra sức khỏe răng miệng <br />
            <span className="text-lg lg:text-2xl">
              (dành cho trẻ dưới 15 tuổi)
            </span>
          </Heading>
        </Box>
        <Box direction="column">
          {layout.map((group, gI) => {
            return (
              <Box key={gI}>
                <Heading level={3}> {group.title} </Heading>
                {group.items.map((row, i) => {
                  return (
                    <RenderRow
                      key={i}
                      row={row}
                      setFieldValue={setFieldValue}
                    />
                  );
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
