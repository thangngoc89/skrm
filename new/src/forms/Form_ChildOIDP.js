import React from "react";
import { Formik, Form, Field, FastField } from "formik";
import { Box as GBox, Heading, Text, Button } from "grommet";
import {
  RadioGroup,
  SelectGroup,
  TextInput,
  DottedLabel,
  Box,
} from "../components";
import MountPortal from "../MountPortal";
import FormikAutosave from "../FormikAutosave";
import { hoatDong, lietkeOptions } from "./Form_ChildOIDP_data";
import {
  validate as handleValidation,
  REQUIRED,
} from "./Form_ChildOIDP_validate";
import * as notify from "../Notify";

export const blankInitialValues = {
  coKhoChiu: null,
  lietke: [],
  lietkeCustom: "",
  "1-mucdo": null,
  "1-tansuat": null,
  "1-nguyennhan": [],
  "2-mucdo": null,
  "2-tansuat": null,
  "2-nguyennhan": [],
  "3-mucdo": null,
  "3-tansuat": null,
  "3-nguyennhan": [],
  "4-mucdo": null,
  "4-tansuat": null,
  "4-nguyennhan": [],
  "5-mucdo": null,
  "5-tansuat": null,
  "5-nguyennhan": [],
  "6-mucdo": null,
  "6-tansuat": null,
  "6-nguyennhan": [],
  "7-mucdo": null,
  "7-tansuat": null,
  "7-nguyennhan": [],
  "8-mucdo": null,
  "8-tansuat": null,
  "8-nguyennhan": [],
};

const lietkeName = "lietke";
const lietkeCustomName = "lietkeCustom";

const Title = ({ title, subtitle }) => {
  return (
    <Box margin={{ bottom: "small" }}>
      <Heading level="2" color="brand">
        {title}
      </Heading>
      <Text size="medium" level={2}>
        {subtitle}
      </Text>
    </Box>
  );
};

const Section = ({ children, ...props }) => {
  return (
    <GBox as="section" margin={{ bottom: "large" }} {...props}>
      {children}
    </GBox>
  );
};
const Part2 = ({ setFieldValue, lietke, lietkeCustom }) => {
  return (
    <Section>
      <Title title="Phần 2" subtitle="Liệt kê các khó chịu" />
      <SelectGroup
        name={lietkeName}
        value={lietke}
        options={lietkeOptions}
        label={DottedLabel}
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
    </Section>
  );
};

const levelOptions = [
  { label: "0", value: "0" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
];

const Part3 = ({ values, selected }) => {
  return (
    <Section>
      <Title title="Phần 3" subtitle="Phiếu ghi nhận chỉ số Child-OIDP" />

      <table className="w-full table-fixed my-4">
        <thead>
          <tr className="h-12 border-b-2">
            <th scope="col" className="font-bold center">
              Các hoạt động
            </th>
            <th scope="col" className="font-bold center">
              Mức trầm trọng
            </th>
            <th scope="col" className="font-bold center">
              Tần suất
            </th>
            <th scope="col" className="font-bold center">
              Nguyên nhân
            </th>
          </tr>
        </thead>
        <tbody>
          {hoatDong.map(row => {
            return (
              <tr
                key={row.value}
                className="border-b border-light-6 hover:bg-light-1"
              >
                <td scope="row" className="py-4">
                  <strong>
                    {row.value}. {row.label}
                  </strong>
                  <br /> {row.secondaryLabel}
                </td>
                <td>
                  <Field
                    name={`${row.value}-mucdo`}
                    render={({ field, form: { setFieldValue } }) => {
                      return (
                        <RadioGroup
                          name={field.name}
                          onChange={value => {
                            setFieldValue(field.name, value);
                          }}
                          options={levelOptions}
                          value={field.value}
                          direction="row"
                          justify="center"
                          flex
                          gap="small"
                        />
                      );
                    }}
                  />
                </td>
                <td>
                  <Field
                    name={`${row.value}-tansuat`}
                    render={({ field, form: { setFieldValue } }) => {
                      const mucdo = values[`${row.value}-mucdo`];
                      if (["1", "2", "3"].indexOf(mucdo) === -1) {
                        return null;
                      }
                      return (
                        <RadioGroup
                          name={field.name}
                          onChange={value => {
                            setFieldValue(field.name, value);
                          }}
                          options={levelOptions}
                          value={field.value}
                          direction="row"
                          justify="center"
                          flex
                          gap="small"
                        />
                      );
                    }}
                  />
                </td>
                <td className="max-w-xs">
                  <Field
                    name={`${row.value}-nguyennhan`}
                    render={({ field, form: { setFieldValue } }) => {
                      const mucdo = values[`${row.value}-mucdo`];

                      if (["1", "2", "3"].indexOf(mucdo) === -1) {
                        return null;
                      }
                      return (
                        <SelectGroup
                          name={field.name}
                          options={selected}
                          value={field.value}
                          onChange={value => setFieldValue(field.name, value)}
                          gap="small"
                          margin={{ vertical: "small" }}
                        />
                      );
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Section>
  );
};

const findLabelFromId = id => {
  const row = hoatDong.find(row => row.value === id);
  return row.label;
};

const noop = function() {
  return new Promise(resolve => resolve());
};

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

const itemIdToName = id => {
  switch (id) {
    case "coKhoChiu":
      return "Có khó chịu hay không - Phần 1";
    case "lietke":
      return "Liệt kê các khó chịu - Phần 2";
    case "lietkeCustom":
      return "Khó chịu khác - Phần 2";
    default:
      const value = hoatDong.find(row => row.value === id.slice(0, 1));

      if (/^[1-8]-mucdo$/.test(id)) {
        return `Mức độ ${id.slice(0, 1)} - ${value && value.label}`;
      } else if (/^[1-8]-nguyennhan$/.test(id)) {
        return `Nguyên nhân ${id.slice(0, 1)} - ${value && value.label}`;
      } else if (/^[1-8]-tansuat$/.test(id)) {
        return `Tần suất ${id.slice(0, 1)} - ${value && value.label}`;
      }
      return id;
  }
};
const FormChildOIDP = ({
  initialValues = blankInitialValues,
  onSave = noop,
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, { setSubmitting }) => {
      new Promise((resolve, reject) => {
        const validateResult = handleValidation(values);
        if (validateResult.type === "SUCCESS") {
          notify.success("Kiểm tra hoàn tất");
          resolve(values);
        } else if (validateResult.type === "REQUIRED") {
          notify.error("Các mục dưới đây chưa hoàn tất", () => (
            <ul>
              {validateResult.value.map(item => (
                <li key={item} className="py-2">
                  {itemIdToName(item)}
                </li>
              ))}
            </ul>
          ));
          reject(validateResult);
        } else if (validateResult.type === "EXHAUSTIVE_CHECK") {
          console.log(validateResult.value);
          notify.error("Chưa chọn đủ các nguyên nhân khó chịu", () => (
            <div>
              Các khó chịu dưới đây phải nguyên nhân gây khó chịu của ít nhất
              một hoạt động
              <ul>
                {validateResult.value.map(item => (
                  <li key={item} className="py-2">
                    {lietkeOptions.find(row => row.value === item).label}
                  </li>
                ))}
              </ul>
            </div>
          ));
          reject(validateResult);
        } else {
          notify.error("Có lỗi xảy ra", () =>
            JSON.stringify(validateResult, null, 2)
          );
          reject(validateResult);
        }
      })
        .then(values => onSave(values, values.draft))
        .then(() => setSubmitting(false))
        .catch(err => {
          setSubmitting(false);
          console.log(err);
        });
    }}
    validateOnChange={false}
    validateOnBlur={false}
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
      const selected = values.lietke;
      return (
        <Box>
          <Form>
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

            <Box
              direction="row"
              justifyContent="center"
              className="mb-6 lg:mb-12"
            >
              <Heading level={2} textAlign="center" size="medium">
                Bảng câu hỏi về những khó chịu từ răng miệng
              </Heading>
            </Box>

            <Section>
              <Title
                title="Phần 1"
                subtitle="Trong 3 tháng qua các em có thấy khó chịu hay đau ở vùng răng miệng của mình hay không?"
              />
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
            </Section>

            {values.coKhoChiu === "1" && (
              <>
                <Part2
                  setFieldValue={setFieldValue}
                  lietke={values.lietke}
                  lietkeCustom={values.lietkeCustom}
                />
                {Boolean(values.lietke.length) && (
                  <Part3
                    values={values}
                    selected={lietkeOptions.filter(
                      ({ value }) => selected.indexOf(value) !== -1
                    )}
                  />
                )}
              </>
            )}
          </Form>
        </Box>
      );
    }}
  </Formik>
);

export default FormChildOIDP;
