import React, { Fragment } from "react";
import { withFormik, FastField } from "formik";
import { Form, Input, Button, Row, Radio, Checkbox, Tag, message } from "antd";

const CheckableTag = Tag.CheckableTag;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const data = [
  { id: 1, label: "Ăn nhai" },
  { id: 2, label: "Nói, phát âm" },
  { id: 3, label: "Vệ sinh răng miệng" },
  { id: 4, label: "Nghỉ ngơi" },
  { id: 5, label: "Tinh thần" },
  { id: 6, label: "Cười" },
  { id: 7, label: "Học tập" },
  { id: 8, label: "Tiếp xúc mọi người" },
];
const findLabelFromId = id => {
  const row = data.find(row => row.id === id);
  return row.label;
};
const InnerForm = ({ values, handleSubmit, isSubmitting }) => (
  <Form
    layout="vertical"
    onSubmit={handleSubmit}
    className="Form_thoiquen_CSRM"
  >
    <h1>Khó chịu từ răng miệng CSRM</h1>
    <FastField
      id="kho-chiu"
      name="kho-chiu"
      render={({ field, form: { setFieldValue } }) => {
        return (
          <Form.Item label="Có khó chịu không?">
            <RadioGroup
              value={field.value || null}
              {...field}
              onChange={e => {
                setFieldValue(field.name, e.target.value);
              }}
            >
              <Radio value={1}>Có</Radio>
              <Radio value={0}>Không</Radio>
            </RadioGroup>
          </Form.Item>
        );
      }}
    />
    {values["kho-chiu"] === 1 && (
      <Fragment>
        <FastField
          name={"liet-ke-kho-chiu"}
          render={({ field, form: { setFieldValue } }) => {
            return (
              <Form.Item label="Khó chịu gì?">
                <CheckboxGroup
                  options={[
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
                  ].map(op => ({
                    value: op,
                    label: op,
                  }))}
                  defaultValue={field.value || []}
                  onChange={e => {
                    setFieldValue(field.name, e);
                  }}
                />
              </Form.Item>
            );
          }}
        />
        <FastField
          name={"liet-ke-99"}
          render={({ field, form: { setFieldValue } }) => {
            return (
              <Form.Item label="Khó chịu khác (nếu có)">
                <Input {...field} />
              </Form.Item>
            );
          }}
        />
        <table className="Form-table Form-table-khochiu">
          <thead>
            <tr>
              <th>Các hoạt động</th>
              <th>Mức trầm trọng</th>
              <th>Tần suất</th>
              <th>Nguyên nhân</th>
            </tr>
          </thead>
          <tbody>
            {data.map(chiso => {
              return (
                <tr key={chiso.id}>
                  <td>{chiso.label}</td>
                  <td>
                    <FastField
                      name={`${chiso.id}-mucdo`}
                      render={({ field, form: { setFieldValue } }) => {
                        return (
                          <RadioGroup
                            onChange={e => {
                              setFieldValue(field.name, e.target.value);
                            }}
                            value={field.value}
                          >
                            <Radio value={0}>0</Radio>
                            <Radio value={1}>1</Radio>
                            <Radio value={2}>2</Radio>
                            <Radio value={3}>3</Radio>
                          </RadioGroup>
                        );
                      }}
                    />
                  </td>
                  <td>
                    <FastField
                      name={`${chiso.id}-tansuat`}
                      render={({ field, form: { setFieldValue } }) => {
                        const mucdo = values[`${chiso.id}-mucdo`];
                        if (mucdo === 0) {
                          return null;
                        }
                        return (
                          <RadioGroup
                            onChange={e => {
                              setFieldValue(field.name, e.target.value);
                            }}
                            value={field.value}
                          >
                            <Radio value={0}>0</Radio>
                            <Radio value={1}>1</Radio>
                            <Radio value={2}>2</Radio>
                            <Radio value={3}>3</Radio>
                          </RadioGroup>
                        );
                      }}
                    />
                  </td>
                  <td>
                    <FastField
                      name={`${chiso.id}-nguyennhan`}
                      render={({ field, form: { setFieldValue } }) => {
                        const mucdo = values[`${chiso.id}-mucdo`];
                        const tanso = values[`${chiso.id}-tansuat`];
                        const selectedTags = values[`${chiso.id}-nguyennhan`];
                        if (!(mucdo !== 0 && tanso !== 0)) {
                          return null;
                        }
                        return (
                          <Fragment>
                            {values["liet-ke-kho-chiu"].map(tag => (
                              <CheckableTag
                                key={tag}
                                checked={selectedTags.indexOf(tag) > -1}
                                onChange={checked => {
                                  const selectedTags =
                                    values[`${chiso.id}-nguyennhan`];
                                  const nextSelectedTags = checked
                                    ? [...selectedTags, tag]
                                    : selectedTags.filter(t => t !== tag);
                                  setFieldValue(field.name, nextSelectedTags);
                                }}
                              >
                                {tag}
                              </CheckableTag>
                            ))}
                          </Fragment>
                        );
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Fragment>
    )}
    <Row type="flex" justify="end" style={{ marginTop: "1rem" }}>
      <Button
        disabled={isSubmitting}
        loading={isSubmitting ? { delay: 1 } : false}
        type="primary"
        size="large"
        htmlType="submit"
      >
        Lưu
      </Button>
    </Row>
  </Form>
);
const FormChildOIDP = withFormik({
  mapPropsToValues: props => {
    const initialProps = {
      "kho-chiu": null,
      "liet-ke-kho-chiu": [],
    };
    [1, 2, 3, 4, 5, 6, 7, 8].forEach(value => {
      initialProps[value + "-mucdo"] = 0;
      initialProps[value + "-tansuat"] = 0;
      initialProps[value + "-nguyennhan"] = [];
    });
    return initialProps;
  },
  handleSubmit: (values, { props, setSubmitting, setErrors, resetForm }) => {
    if (values["kho-chiu"] === null) {
      message.error(`Chọn có khó chịu hay không`);
      setSubmitting(false);
      return;
    }
    const processedValues = {
      ...values,
    };
    const cacKhoChiu = processedValues["liet-ke-kho-chiu"];
    const khoChiu_tuBangNguyenNhan = new Set();
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
        const label = findLabelFromId(i);
        message.error(`${label} chưa chọn tần suất`);
        setSubmitting(false);
        return;
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
        const label = findLabelFromId(i);
        message.error(`${label} chưa chọn nguyên nhân`);
        setSubmitting(false);
        return;
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
        message.error(
          `Khó chịu số ${khochiu} chưa được chọn ở mục nguyên nhân`
        );
        setSubmitting(false);
        return;
      }
    }
    props.done(processedValues);
    setSubmitting(false);
  },
})(InnerForm);

export default FormChildOIDP;
