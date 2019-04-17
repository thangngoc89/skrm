import React from "react";
import { Formik, Form, FastField } from "formik";
import { Box, Heading, Button, Select } from "../components";
import { Text, TextInput, FormField } from "grommet";
import AutosuggestTextInput from "../components/AutosuggestTextInput";

import { format } from "date-fns";

import {
  Tinh_trang_ham_tren_table,
  Tinh_trang_ham_duoi_table,
  OHIS_table,
  CPI_table,
  MocChenChuc_table,
  MIH_table,
  Tinh_trang_ham_tren_schema,
  Tinh_trang_ham_duoi_schema,
  OHIS_schema,
  CPI_schema,
  MocChenChuc_schema,
  MIH_schema,
} from "./PDT_TableSchema.gen";
import { make as PDT_TableRender } from "./PDT_TableRender.gen";

import * as yup from "yup";
import MountPortal from "../MountPortal";
import FormikAutosave from "../FormikAutosave";
import FormikNotify from "../FormikNotify";

const selectOneBinaryValue = [
  { label: "0 - Không", value: "0" },
  { label: "1 - Có", value: "1" },
];

const selectOneAngle = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "9", value: "9" },
];

const schema = {
  ngayKham: {
    label: "Ngày khám",
    type: "date",
    default: format(new Date(), "YYYY-MM-DD"),
  },
  soHoSo: {
    label: "Số hồ sơ",
    type: "string",
  },
  nguoiKham: {
    label: "Người khám",
    type: "string",
    suggest: true,
  },
  hoVaTen: {
    label: "Họ và tên",
    type: "string",
  },
  tuoi: {
    label: "Tuổi",
    type: "number",
    default: 1,
    validate: yup
      .number()
      .integer()
      .min(1)
      .required(),
  },
  danToc: {
    label: "Dân tộc",
    type: "string",
    suggest: true,
  },
  gioiTinh: {
    label: "Giới tính",
    type: "select_one",
    typeData: [
      { label: "1 - Nam", value: "1" },
      { label: "2 - Nữ", value: "2" },
    ],
    default: "",
  },
  lop: { label: "Lớp", type: "string", suggest: true },
  truong: { label: "Trường", type: "string", suggest: true },
  diaChi: { label: "Địa chỉ", type: "string", suggest: true },
  ttncHamTren: {
    label: "Hàm trên",
    type: "table",
    table: Tinh_trang_ham_tren_table,
    validate: Tinh_trang_ham_tren_schema,
    default: {},
  },
  ttncHamDuoi: {
    label: "Hàm dưới",
    type: "table",
    table: Tinh_trang_ham_duoi_table,
    validate: Tinh_trang_ham_duoi_schema,
    default: {},
  },
  pi: {
    label: "PI",
    type: "table",
    showLabel: true,
    default: {},
    table: OHIS_table,
    validate: OHIS_schema,
  },
  ci: {
    label: "CI",
    type: "table",
    showLabel: true,
    default: {},
    table: OHIS_table,
    validate: OHIS_schema,
  },
  cpi: {
    label: "CPI",
    type: "table",
    default: {},
    table: CPI_table,
    validate: CPI_schema,
  },
  canPhu: {
    label: "Độ cắn phủ",
    type: "number",
    validate: yup
      .number()
      .integer()
      .required(),
  },
  canChia: { label: "Độ cắn chìa", type: "number" },
  canNguocRangTruoc: {
    label: "Cắn ngược răng trước",
    type: "select_one",
    typeData: selectOneBinaryValue,
  },
  canNguocRangSau: {
    label: "Cắn ngược răng sau",
    type: "select_one",
    typeData: selectOneBinaryValue,
  },
  canHo: {
    label: "Cắn hở",
    type: "select_one",
    typeData: selectOneBinaryValue,
  },
  angleR3P: { label: "R3P", type: "select_one", typeData: selectOneAngle },
  angleR3T: { label: "R3T", type: "select_one", typeData: selectOneAngle },
  angleR6P: { label: "R6P", type: "select_one", typeData: selectOneAngle },
  angleR6T: { label: "R6T", type: "select_one", typeData: selectOneAngle },
  fluorMaSo: {
    label: "Mã số",
    type: "select_one",
    typeData: [
      { label: "0", value: "0" },
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "5", value: "5" },
    ],
  },
  fluorSoRang: {
    label: "Số răng",
    type: "number",
    validate: yup
      .number()
      .integer()
      .required(),
  },
  mocChenChuc: {
    label: "Mọc chen chúc",
    type: "table",
    default: {},
    table: MocChenChuc_table,
    validate: MocChenChuc_schema,
  },
  mih: {
    label: "MIH",
    type: "table",
    default: {},
    table: MIH_table,
    validate: MIH_schema,
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
    title: "Tình trạng vệ sinh răng miệng",
    items: [[{ id: "pi" }, { id: "ci" }]],
  },
  {
    title: "Tình trạng răng nhiễm Fluor",
    items: [[{ id: "fluorMaSo" }, { id: "fluorSoRang" }]],
  },
  {
    title: "Chỉ số CPI - Chỉ số chảu máu nướu",
    items: [[{ id: "cpi" }]],
  },
  {
    title: "Tình trạng khớp cắn",
    items: [
      [{ id: "canPhu" }, { id: "canChia" }],
      [{ id: "canNguocRangTruoc" }, { id: "canNguocRangSau" }, { id: "canHo" }],
    ],
  },
  {
    title: "Mọc chen chúc",
    items: [[{ id: "mocChenChuc" }]],
  },
  {
    title: "Phân loại Angle",
    items: [
      [
        { id: "angleR3P" },
        { id: "angleR3T" },
        { id: "angleR6P" },
        { id: "angleR6T" },
      ],
    ],
  },
  {
    title: "MIH",
    items: [[{ id: "mih" }]],
  },
];

const flattenItems = items =>
  items.reduce((acc, row) => {
    return acc.concat(row.map(r => r.id));
  }, []);

const flattenLayout = layout.reduce((acc, group) => {
  return acc.concat(flattenItems(group.items));
}, []);

function RenderRow({ row, setFieldValue }) {
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
            <Box key={id} className={`flex-${size} lg:mx-2`}>
              <FastField
                name={id}
                render={({ field, form }) => {
                  const error = form.errors[field.name];
                  const isFieldTouched = form.touched[field.name];

                  switch (type) {
                    case "string":
                    case "date":
                    case "number":
                      const InputComponent = schemaMetadata.suggest
                        ? AutosuggestTextInput
                        : TextInput;
                      return (
                        <FormField
                          label={label}
                          htmlFor={field.name}
                          error={isFieldTouched ? error : undefined}
                        >
                          <InputComponent
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
                        <FormField
                          label={label}
                          htmlFor={field.name}
                          error={isFieldTouched ? error : undefined}
                        >
                          <Select
                            options={schemaMetadata.typeData}
                            name={field.name}
                            value={field.value}
                            onChange={value => setFieldValue(field.name, value)}
                            onBlur={field.onBlur}
                          />
                        </FormField>
                      );
                    case "table":
                      return (
                        <Box className="my-2 lg:my-0">
                          {schemaMetadata.showLabel && (
                            <Heading level={3} size="small">
                              {label}
                            </Heading>
                          )}
                          <PDT_TableRender
                            id={id}
                            table={schemaMetadata.table}
                            value={field.value}
                            onCellChange={(cellLabel, value) => {
                              setFieldValue(field.name, {
                                ...field.value,
                                [cellLabel]: value,
                              });
                            }}
                            error={error}
                          />
                        </Box>
                      );

                    default:
                      return (
                        <span className="text-status-critical">
                          {"Unknown type " + type}
                        </span>
                      );
                  }
                }}
              />
            </Box>
          );
        }
      })}
    </Box>
  );
}

const MemoRenderRow = React.memo(RenderRow, () => true);

const getInitialValues = schema => {
  return Object.keys(schema).reduce((acc, field) => {
    const fieldSchema = schema[field];
    if (typeof fieldSchema.default !== "undefined") {
      acc[field] = fieldSchema.default;
    } else {
      switch (fieldSchema.type) {
        case "string":
        case "select_one":
        case "number":
          acc[field] = "";
          break;
        default:
          console.warn("Unhandled initial value for field: " + field);
          break;
      }
    }

    return acc;
  }, {});
};

const getValidationSchema = schema => {
  const objectShape = Object.keys(schema).reduce((acc, field) => {
    const fieldSchema = schema[field];
    if (typeof fieldSchema.validate !== "undefined") {
      acc[field] = fieldSchema.validate.label(fieldSchema.label);
    } else {
      switch (fieldSchema.type) {
        case "string":
          acc[field] = yup
            .string()
            .required()
            .label(fieldSchema.label);
          break;
        case "select_one":
          acc[field] = yup
            .string()
            .oneOf(
              fieldSchema.typeData.map(({ value }) => value),
              "${path} chỉ chấp nhận các giá trị: " +
                fieldSchema.typeData.map(({ label }) => label).join(", ")
            )
            .required()
            .label(fieldSchema.label);
          break;
        case "number":
          acc[field] = yup
            .number()
            .required()
            .label(fieldSchema.label);
          break;
        default:
          acc[field] = yup
            .mixed()
            .required()
            .label(fieldSchema.label);
          break;
      }
    }
    return acc;
  }, {});
  return yup.object(objectShape);
};

export const blankInitialValues = () => getInitialValues(schema);

export const validationSchema = getValidationSchema(schema);

const PhieuDieuTraForm = ({ initialValues = blankInitialValues(), onSave }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, { setSubmitting }) => {
      onSave(values, values.draft).then(() => setSubmitting(false));
    }}
    validationSchema={validationSchema}
    validateOnBlur={true}
    validateOnChange={false}
  >
    {({
      values,
      handleSubmit,
      isSubmitting,
      setFieldValue,
      isValidating,
      errors,
    }) => {
      return (
        <Form>
          <Box direction="column">
            {layout.map((group, gI) => {
              return (
                <Box key={gI} className="my-4">
                  <Heading level={3}> {group.title} </Heading>
                  {group.items.map((row, i) => {
                    return (
                      <MemoRenderRow
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
          <FormikNotify
            isValidating={isValidating}
            errors={errors}
            ids={flattenLayout}
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

const PhieuDieuTra = ({ initialValues, onSave }) => {
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
      <PhieuDieuTraForm initialValues={initialValues} onSave={onSave} />
    </div>
  );
};

export default PhieuDieuTra;
