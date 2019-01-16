import React from "react";

import { Formik, Form, FastField } from "formik";
import {
  Box,
  Heading,
  Button,
  Select,
  FormField,
  TextInput,
  CheckBox,
} from "../components";
import { format } from "date-fns";
import {
  HamTren as TTNCHamTren,
  HamDuoi as TTNCHamDuoi,
} from "./PDT_RenderTinhTrangNhuCau.gen";
import * as yup from "yup";
import MountPortal from "../MountPortal";
import { CheckBox as GCheckBox } from "grommet";

yup.setLocale({
  mixed: {
    required: "${path} chưa được điền",
  },
  number: {
    min: "${path} phải có giá trị tối thiểu là ${min}",
    max: "${path} phải có giá trị tối thiểu là ${max}",
  },
});

const selectOneBinaryValue = [
  { label: "Có", value: "1" },
  { label: "Không", value: "0" },
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
  },
  gioiTinh: {
    label: "Giới tính",
    type: "select_one",
    typeData: [{ label: "Nam", value: "1" }, { label: "Nữ", value: "2" }],
    default: "",
  },
  lop: { label: "Lớp", type: "string" },
  truong: { label: "Trường", type: "string" },
  diaChi: { label: "Địa chỉ", type: "string" },
  ttncHamTren: {
    label: "Hàm trên",
    type: "tinhTrangNhuCauHamTren",
    default: {},
  },
  ttncHamDuoi: {
    label: "Hàm dưới",
    type: "tinhTrangNhuCauHamDuoi",
    default: {},
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
    title: "Chỉ số CPI - Chỉ số chảu máu nướu",
    items: [[{ id: "chiSoCPI" }]],
  },
  {
    title: "Tình trạng khớp cắn",
    items: [
      [{ id: "canPhu" }, { id: "canChia" }],
      [{ id: "canNguocRangTruoc" }, { id: "canNguocRangSau" }, { id: "canHo" }],

      [{ id: "mocChenChuc" }],
    ],
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
    title: "Tình trạng mảng bám răng",
    items: [[{ id: "mangBamTruocChaiRang" }], [{ id: "mangBamSauChaiRang" }]],
  },
  {
    title: "MIH",
    items: [[{ id: "mih" }]],
  },
];

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
                      return (
                        <FormField
                          label={label}
                          htmlFor={field.name}
                          error={isFieldTouched ? error : undefined}
                        >
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
                    case "tinhTrangNhuCauHamTren":
                      return (
                        <Box className="my-2 lg:my-0">
                          <TTNCHamTren
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
                          <TTNCHamDuoi
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
  const yupSchema = yup.object().shape(objectShape);
  return yupSchema;
};

export const emptyInitialValues = () => ({
  ...getInitialValues(schema),
  draft: false,
});

const validationSchema = getValidationSchema(schema);

const PhieuDieuTraForm = ({ initialValues = emptyInitialValues(), onSave }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, { setSubmitting }) => {
      onSave(values, values.draft).then(() => setSubmitting(false));
    }}
    validate={values => {
      if (Boolean(values.draft)) {
        return {};
      } else {
        return validationSchema
          .validate(values, { abortEarly: false })
          .catch(error => {
            let messages = error.inner.reduce((acc, innerBag) => {
              return {
                ...acc,
                [innerBag.path]: innerBag.message,
              };
            }, {});
            throw messages;
          });
      }
    }}
    validateOnBlur={true}
    validateOnChange={false}
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

          <MountPortal id="footerAction">
            <Box justifyContent="end" direction="row" alignItems="center">
              <CheckBox
                value="draft"
                label={"Lưu nháp"}
                checked={values.draft}
                onChange={e => setFieldValue("draft", e.target.checked)}
                inverse={true}
              />
              <Button
                primary
                label="Lưu"
                type="submit"
                className="mx-2"
                size="small"
                onClick={handleSubmit}
                disabled={isSubmitting}
                color="white"
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
      <Box direction="row" alignContent="center" justifyContent="center">
        <Heading level={2} textAlign="center">
          Phiếu điều tra sức khỏe răng miệng <br />
          <span className="text-lg lg:text-2xl">
            (dành cho trẻ dưới 15 tuổi)
          </span>
        </Heading>
      </Box>
      <PhieuDieuTraForm initialValues={initialValues} onSave={onSave} />
      <div style={{ height: "64px" }} />
    </div>
  );
};

export default PhieuDieuTra;
