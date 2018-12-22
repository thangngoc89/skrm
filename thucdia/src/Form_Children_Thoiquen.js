import React from "react";
import { withFormik, FastField } from "formik";
import { Form, Input, Button, Col, Row, Radio, Checkbox } from "antd";

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const data = [
  { id: "b2", name: "Cư ngụ", options: [1, 2, 3] },
  { id: "b4", name: "Tình trạng răng", options: [1, 2, 3, 4, 5, 6, 9] },
  { id: "b5", name: "Tình trạng nướu", options: [1, 2, 3, 4, 5, 6, 9] },
  { id: "b6", name: "12 tháng có đau hay khó chịu", options: [1, 2, 3, 4, 9] },
  { id: "b7", name: "Ngại cười do mặc cảm", options: [1, 2, 3, 4] },
  { id: "b8", name: "Hài lòng với răng", options: [1, 2, 3, 4, 5] },
  { id: "b9", name: "Năm vừa qua nghỉ học vì đau răng", options: [1, 2] },
  { id: "b10-1", name: "Chải răng kĩ hơn", options: [1, 0, 9] },
  { id: "b10-2", name: "Lấy cao răng", options: [1, 0, 9] },
  { id: "b10-3", name: "Trám", options: [1, 0, 9] },
  { id: "b10-4", name: "Nhổ", options: [1, 0, 9] },
  { id: "b10-5", name: "Chỉnh hình", options: [1, 0, 9] },
  { id: "b10-6", name: "Tốt", options: [1, 0, 9] },
  { id: "b11", name: "Đi nha sĩ mấy lần", options: [1, 2, 3, 4, 5, 6, 7] },
  { id: "b12", name: "Lý do tới nha sĩ gần đây nhất", options: [0, 1, 2, 3, 9] },
  {
    id: "b13",
    name: "Nha sĩ đã làm gì trong lần khám cuối",
    options: [1, 2, 3, 4, 5, 6, 7, 8],
    type: "checkbox",
  },
  { id: "b13-8", name: "Nha sĩ làm gì khác", type: "input" },
  { id: "b14", name: "Đi với ai", options: [0, 1, 2, 3, 4, 5, 6] },
  { id: "b15", name: "Đánh răng bao nhiêu lần", options: [1, 2, 3, 4, 5, 6] },
  { id: "b16-1", name: "Đánh răng = Bàn chải", options: [{ value: 1, label: "Có" }, { value: 2, label: "Không" }] },
  { id: "b16-2", name: "Đánh răng = Tăm tre", options: [{ value: 1, label: "Có" }, { value: 2, label: "Không" }] },
  { id: "b16-3", name: "Đánh răng = Tăm nhựa", options: [{ value: 1, label: "Có" }, { value: 2, label: "Không" }] },
  { id: "b16-4", name: "Đánh răng = Chỉ", options: [{ value: 1, label: "Có" }, { value: 2, label: "Không" }] },
  { id: "b16-5", name: "Đánh răng = Than", options: [{ value: 1, label: "Có" }, { value: 2, label: "Không" }] },
  { id: "b16-6", name: "Đánh răng = Vỏ cau", options: [{ value: 1, label: "Có" }, { value: 2, label: "Không" }] },
  { id: "b16-7", name: "Đánh răng = Khác (nhập vào nếu có)", type: "input" },
  { id: "b17", name: "Có dùng kem đánh răng không", options: [1, 2] },
  { id: "b18", name: "Kem đánh răng có flour", options: [1, 2, 9] },
  { id: "b19-1", name: "Trái cây tươi", options: [6, 5, 4, 3, 2, 1] },
  { id: "b19-2", name: "Bánh quy, bông lan, bánh kem", options: [6, 5, 4, 3, 2, 1] },
  { id: "b19-3", name: "Nước chanh", options: [6, 5, 4, 3, 2, 1] },
  { id: "b19-4", name: "Mứt, mật ong", options: [6, 5, 4, 3, 2, 1] },
  { id: "b19-5", name: "Kẹo cao su có đường", options: [6, 5, 4, 3, 2, 1] },
  { id: "b19-6", name: "Kẹo/ mè xửng", options: [6, 5, 4, 3, 2, 1] },
  { id: "b19-7", name: "Sữa có đường", options: [6, 5, 4, 3, 2, 1] },
  { id: "b19-8", name: "Trà có đường", options: [6, 5, 4, 3, 2, 1] },
  { id: "b19-9", name: "Cà phê có đường", options: [6, 5, 4, 3, 2, 1] },
  {
    id: "b20",
    name: "Ai bảo tự chăm sóc mình",
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    type: "checkbox",
  },
  { id: "b21", name: "Nghề của cha", options: [1, 2, 3, 4, 5, 6, 7] },
  { id: "b21-7", name: "Nghề của cha khác", type: "input" },
  { id: "b22", name: "Nghề của mẹ", options: [1, 2, 3, 4, 5, 6, 7] },
  { id: "b22-7", name: "Nghề của mẹ khác", type: "input" },
  { id: "b23", name: "Học vấn của cha", options: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  { id: "b24", name: "Học vấn của mẹ", options: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
];
const InnerForm = ({
  values,
  // errors,
  // touched,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  isSubmitting,
}) => (
  <Form layout="vertical" onSubmit={handleSubmit} className="Form_thoiquen_CSRM">
    <h1>Thói quen CSRM</h1>
    {data.map(({ name, id, options, type }) => (
      <FastField
        key={id}
        id={id}
        name={id}
        render={({ field, form }) => {
          // const { touched, errors } = form;
          return (
            <Row style={{ padding: ".25rem 0" }} className="row">
              <Col span={2}>{id.toUpperCase()}</Col>
              <Col span={8}>{name}</Col>
              <Col span={14}>
                {type === "input" && <Input {...field} size="small" />}
                {type === "checkbox" && (
                  <CheckboxGroup
                    options={options.map(op => ({
                      value: op,
                      label: op,
                    }))}
                    defaultValue={field.value || []}
                    onChange={e => {
                      setFieldValue(field.name, e);
                    }}
                  />
                )}
                {typeof type === "undefined" && (
                  <div>
                    <RadioGroup
                      value={field.value || null}
                      {...field}
                      onChange={e => {
                        setFieldValue(field.name, e.target.value);
                      }}
                    >
                      {options.map(option => {
                        if (typeof option === "number") {
                          return (
                            <Radio key={option} value={option}>
                              {option}
                            </Radio>
                          );
                        }
                        return (
                          <Radio key={option.value} value={option.value}>
                            {option.label}
                          </Radio>
                        );
                      })}
                    </RadioGroup>
                    <Button
                      onClick={e => {
                        setFieldValue(field.name, null);
                      }}
                    >
                      Bỏ chọn
                    </Button>
                  </div>
                )}
              </Col>
            </Row>
          );
        }}
      />
    ))}
    <Row type="flex" justify="end" style={{ marginTop: "1rem" }}>
      <Button
        disabled={isSubmitting}
        loading={isSubmitting ? { delay: 1 } : false}
        type="primary"
        size="large"
        htmlType="submit"
      >
        Tiếp theo
      </Button>
    </Row>
  </Form>
);
const FormChildren = withFormik({
  mapPropsToValues: props => ({
    b2: 3,
    "b13-8": "",
    "b16-7": "",
    "b21-7": "",
    "b22-7": "",
  }),
  handleSubmit: (values, { props, setSubmitting, setErrors, resetForm }) => {
    props.done(values);
    setSubmitting(false);
  },
})(InnerForm);

export default FormChildren;
