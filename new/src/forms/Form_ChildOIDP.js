import React from "react";
import { Formik, Form, Field, FastField } from "formik";
import { Box, Heading, Text, Button } from "grommet";
import { RadioGroup, SelectGroup, TextInput, DottedLabel } from "../components";
import ButterToast, { Cinnamon } from "butter-toast";
import MountPortal from "../MountPortal";
import FormikAutosave from "../FormikAutosave";

const blankInitialValues = {
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

const raiseError = (title, content) => {
  ButterToast.raise({
    sticky: true,
    content: (
      <Cinnamon.Crunch
        title={title}
        content={content}
        scheme={Cinnamon.Crunch.SCHEME_RED}
      />
    ),
  });
};

const findLabelFromId = id => {
  const row = lietkeOptions.find(row => row.value === id);
  console.log(id);
  return row.label;
};

const handleValidation = values =>
  new Promise((resolve, reject) => {
    if (values.coKhoChiu !== "1" && values.coKhoChiu !== "0") {
      raiseError("Phần 1", `Chưa chọn có khó chịu hay không`);
      return reject();
    }

    const processedValues = {
      ...values,
    };
    const cacKhoChiu = processedValues.lietke;
    const khoChiu_tuBangNguyenNhan = new Set();

    if (Array.isArray(cacKhoChiu) && cacKhoChiu.length === 0) {
      raiseError("Phần 2", "Phải chọn ít nhất 1 nguyên nhân");
      return reject();
    }

    for (let i = 1; i <= 8; i++) {
      const keyMucdo = i + "-mucdo";
      const keyTansuat = i + "-tansuat";
      const keyNguyenNhan = i + "-nguyennhan";

      const valueMucdo = processedValues[keyMucdo];
      const valueTansuat = processedValues[keyTansuat];
      const valueNguyenNhan = processedValues[keyNguyenNhan];

      /*
       * Nguyen nhan
       */
      // Có mức độ mà chưa đánh tần suất
      if (valueMucdo !== 0 && valueTansuat === 0) {
        const label = findLabelFromId(String(i));
        raiseError("Thiếu tần suất", label);
        return reject();
      }
      // Reset tần suất về 0 khi mức độ về 0
      else if (valueMucdo === 0 && valueTansuat !== 0) {
        processedValues[keyTansuat] = 0;
      }
      // Có mức độ và tần số mà chưa đánh nguyên nhân
      else if (
        valueMucdo !== 0 &&
        valueTansuat !== 0 &&
        valueNguyenNhan.length === 0
      ) {
        const label = findLabelFromId(String(i));
        raiseError("Thiếu nguyên nhân", label);
        return reject();
      } else {
        const newNguyenNhan = valueNguyenNhan.filter(
          nguyennhan => cacKhoChiu.indexOf(nguyennhan) !== -1
        );
        processedValues[keyNguyenNhan] = newNguyenNhan;
        newNguyenNhan.forEach(nguyennhan => {
          khoChiu_tuBangNguyenNhan.add(nguyennhan);
        });
      }
    }

    /* Các khó chịu đã chọn ở trên mà chưa được đánh vào mục nguyên nhân */
    for (let i = 0; i < cacKhoChiu.length; i++) {
      const khochiu = cacKhoChiu[i];
      if (!khoChiu_tuBangNguyenNhan.has(khochiu)) {
        raiseError(`Khó chịu số ${khochiu} chưa được chọn ở mục nguyên nhân`);
        return reject();
      }
    }
    return resolve(processedValues);
  });

const noop = function() {
  return new Promise(resolve => resolve());
};
const FormChildOIDP = ({
  initialValues = blankInitialValues,
  onSave = noop,
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, { setSubmitting }) => {
      handleValidation(values)
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
        <Box pad="medium">
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
