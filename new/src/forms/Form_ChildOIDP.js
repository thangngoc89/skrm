import React from "react";
import { Formik, Form, Field, FastField } from "formik";
import { Box, Heading, Text } from "grommet";
import { RadioGroup, SelectGroup, TextInput, DottedLabel } from "../components";

const blankInitialValues = {
  coKhoChiu: "1",
  lietke: ["99"],
  lietkeCustom: "",
  "1-mucdo": "0",
  "1-tansuat": "0",
  "1-nguyennhan": [],
  "2-mucdo": "0",
  "2-tansuat": "0",
  "2-nguyennhan": [],
  "3-mucdo": "0",
  "3-tansuat": "0",
  "3-nguyennhan": [],
  "4-mucdo": "0",
  "4-tansuat": "0",
  "4-nguyennhan": [],
  "5-mucdo": "0",
  "5-tansuat": "0",
  "5-nguyennhan": [],
  "6-mucdo": "0",
  "6-tansuat": "0",
  "6-nguyennhan": [],
  "7-mucdo": "0",
  "7-tansuat": "0",
  "7-nguyennhan": [],
  "8-mucdo": "0",
  "8-tansuat": "0",
  "8-nguyennhan": [],
};

const lietkeOptions = [
  { value: "1", label: "Đau răng, nhức răng" },
  { value: "2", label: "Ê buốt răng khi ăn kem, khi uống nước đá, nước nóng" },
  { value: "3", label: "Sâu răng, có lỗ trên răng" },
  { value: "4", label: "Răng sữa bị lung lay, sắp rụng" },
  {
    value: "5",
    label: "Trống răng (răng sữa rụng mà răng vĩnh viễn chưa mọc)",
  },
  { value: "6", label: "Răng vĩnh viễn bị gãy, vỡ lớn, mẻ" },
  { value: "7", label: "Màu răng xấu, răng bị lốm đốm trắng đục" },
  { value: "8", label: "Hình dạng răng không đẹp hay răng to hoặc nhỏ quá" },
  {
    value: "9",
    label: "Vị trí của răng (ví dụ như bị cong hoặc bị nhô ra, hay có khe hở)",
  },
  { value: "10", label: "Chảy máu nướu khi chải răng" },
  { value: "11", label: "Sưng nướu, đau nướu" },
  {
    value: "12",
    label: "Vôi răng, răng có vôi đen hay bựa thức ăn bám trên răng",
  },
  { value: "13", label: "Lở loét hay trầy xướt trong miệng" },
  { value: "14", label: "Hôi miệng hay hơi thở hôi" },
  { value: "15", label: "Có tật ở vùng miệng hay mặt (sứt môi, hở hàm ếch)" },
  { value: "16", label: "Răng đang mọc gây đau" },
  {
    value: "17",
    label:
      "Thiếu răng vĩnh viễn (răng vĩnh viễn không mọc) làm ăn nhai khó hay mặt không đẹp",
  },
  {
    value: "99",
    label: "Những khó chịu khác (ghi rõ)",
  },
];

const lietkeName = "lietke";
const lietkeCustomName = "lietkeCustom";

const Title = ({ title, subtitle }) => {
  return (
    <Box margin={{ bottom: "small" }}>
      <Heading level="2" color="brand">
        {title}
      </Heading>
      <Text size="large" level={2}>
        {subtitle}
      </Text>
    </Box>
  );
};

const Section = ({ children, ...props }) => {
  return (
    <Box as="section" margin={{ bottom: "large" }} {...props}>
      {children}
    </Box>
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

const hoatDong = [
  {
    value: "1",
    label: "Ăn nhai",
    secondaryLabel: "(trong các bữa ăn,ăn kem,...)",
  },
  { value: "2", label: "Nói, phát âm" },
  {
    value: "3",
    label: "Vệ sinh răng miệng",
    secondaryLabel: "(như súc miệng, chải răng,...)",
  },
  { value: "4", label: "Nghỉ ngơi", secondaryLabel: "(kể cả việc ngủ)" },
  {
    value: "5",
    label: "Tinh thần",
    secondaryLabel: "(vui, buồn, hờn giận, bực tức, chán,...)",
  },
  { value: "6", label: "Cười", secondaryLabel: "(không thấy ngại ngùng)" },
  {
    value: "7",
    label: "Học tập",
    secondaryLabel: "(đi học, học tại lớp, làm bài tập ở nhà)",
  },
  {
    value: "8",
    label: "Tiếp xúc mọi người",
    secondaryLabel: "(đi chơi với bạn bè, đến nhà bạn chơi)",
  },
];

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
                  <strong>{row.label}</strong>
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
                      if (mucdo === "0") {
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

                      if (mucdo === "0") {
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
      const selected = values.lietke;
      console.log(values);
      return (
        <Box pad="medium">
          <Form>
            <Section margin={{ bottom: "large" }}>
              <Heading level="1" textAlign="center">
                Bảng câu hỏi về những khó chịu từ răng miệng
              </Heading>
            </Section>

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
                <Part3
                  values={values}
                  selected={lietkeOptions.filter(
                    ({ value }) => selected.indexOf(value) !== -1
                  )}
                />
              </>
            )}
          </Form>
        </Box>
      );
    }}
  </Formik>
);

export default FormChildOIDP;
