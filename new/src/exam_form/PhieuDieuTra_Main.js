import React from "react";
import { Formik, Form, FastField } from "formik";
import { Box, Heading, Button, Select } from "../components";
import { TextInput, FormField } from "grommet";
import { format } from "date-fns";
import RenderTinhTrangNhuCauHamTren from "./PhieuDieuTra_RenderTinhTrangNhuCau.gen";
import RenderTinhTrangNhuCauHamDuoi from "./PhieuDieuTra_RenderTinhTrangNhuCauHamDuoi.gen";

const schema = {
  ngayKham: { label: "Ngày khám", type: "date" },
  soHoSo: { label: "Số hồ sơ", type: "string" },
  nguoiKham: { label: "Người khám", type: "string" },
  hoVaTen: { label: "Họ và tên", type: "string" },
  tuoi: { label: "Tuổi", type: "number" },
  danToc: { label: "Dân tộc", type: "string" },
  gioiTinh: {
    label: "Giới tính",
    type: "select_one",
    typeData: [{ label: "Nam", value: "1" }, { label: "Nữ", value: "2" }],
  },
  lop: { label: "Lớp", type: "string" },
  truong: { label: "Trường", type: "string" },
  diaChi: { label: "Địa chỉ", type: "string" },
  ttncHamTren: { label: "Hàm trên", type: "tinhTrangNhuCauHamTren" },
  ttncHamDuoi: { label: "Hàm dưới", type: "tinhTrangNhuCauHamDuoi" },
  canPhu: { label: "Độ cắn phủ", type: "number" },
  canChia: { label: "Độ cắn chìa", type: "number" },
  canNguocRangTruoc: {
    label: "Cắn ngược răng trước",
    type: "select_one",
    typeData: [{ label: "Có", value: "1" }, { label: "Không", value: "0" }],
  },
  canNguocRangSau: {
    label: "Cắn ngược răng sau",
    type: "select_one",
    typeData: [{ label: "Có", value: "1" }, { label: "Không", value: "0" }],
  },
  canHo: {
    label: "Cắn hở",
    type: "select_one",
    typeData: [{ label: "Có", value: "1" }, { label: "Không", value: "0" }],
  },
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
  {
    title: "Tình trạng khớp cắn",
    items: [
      [{ id: "canPhu" }, { id: "canChia" }],
      [{ id: "canNguocRangTruoc" }, { id: "canNguocRangSau" }, { id: "canHo" }],
      [{ id: "angle" }],
      [{ id: "mocChenChuc" }],
    ],
  },
];

const RenderRow = ({ row, setFieldValue }) => {
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
          const { label, type, ...schemaMetadata } = schemaOfField;

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
                    case "select_one":
                      return (
                        <FormField label={label} htmlFor={field.name}>
                          <Select
                            options={schemaMetadata.typeData}
                            name={field.name}
                            value={field.value}
                            onChange={value => setFieldValue(field.name, value)}
                            className="ml-1 lg:ml-2"
                          />
                        </FormField>
                      );
                    case "tinhTrangNhuCauHamTren":
                      return (
                        <Box className="my-2 lg:my-0">
                          <RenderTinhTrangNhuCauHamTren
                            value={field.value}
                            onChange={(cellLabel, value) => {
                              setFieldValue(field.name, {
                                ...field.value,
                                [cellLabel]: value,
                              });
                            }}
                          />
                        </Box>
                      );
                    case "tinhTrangNhuCauHamDuoi":
                      return (
                        <Box className="my-2 lg:my-0">
                          <RenderTinhTrangNhuCauHamDuoi
                            value={field.value}
                            onChange={(cellLabel, value) => {
                              setFieldValue(field.name, {
                                ...field.value,
                                [cellLabel]: value,
                              });
                            }}
                          />
                        </Box>
                      );
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
              <Box key={gI} className="my-4">
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
