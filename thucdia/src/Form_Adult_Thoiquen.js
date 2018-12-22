import React from "react";
import { withFormik, FastField } from "formik";
import { Form, Input, Button, Col, Row, Radio, Checkbox } from "antd";

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const data = [
  { id: "a2", name: "Cư ngụ", options: [1, 2, 3] },
  { id: "a4", name: "Bao nhiêu răng thật", options: [0, 1, 2, 3] },
  { id: "a5", name: "Hài lòng với răng", options: [1, 2, 3, 4, 5] },
  { id: "a6", name: "12 tháng, đau răng/khó chịu răng miệng", options: [1, 2, 9, 0] },
  { type: "divider" },
  { id: "a7-1", name: "Triệu chứng - Cắn", options: [4, 3, 2, 1, 0] },
  { id: "a7-2", name: "Triệu chứng - Nhai", options: [4, 3, 2, 1, 0] },
  { id: "a7-3", name: "Triệu chứng - Giao tiếp, phát âm", options: [4, 3, 2, 1, 0] },
  { id: "a7-4", name: "Triệu chứng - Khô miệng", options: [4, 3, 2, 1, 0] },
  { id: "a7-5", name: "Triệu chứng - Bối rối hình dạng", options: [4, 3, 2, 1, 0] },
  { id: "a7-6", name: "Triệu chứng - Căng thẳng tình trạng răng miệng", options: [4, 3, 2, 1, 0] },
  { id: "a7-7", name: "Triệu chứng - Tránh cười do răng", options: [4, 3, 2, 1, 0] },
  { id: "a7-8", name: "Triệu chứng - Giấc ngủ gián đọn", options: [4, 3, 2, 1, 0] },
  { id: "a7-9", name: "Triệu chứng - Nghỉ làm", options: [4, 3, 2, 1, 0] },
  { id: "a7-10", name: "Triệu chứng - Khó khăn hoạt động hằng ngày", options: [4, 3, 2, 1, 0] },
  { id: "a7-11", name: "Triệu chứng - Khó chịu với mọi người xung quanh", options: [4, 3, 2, 1, 0] },
  { id: "a7-12", name: "Triệu chứng - Giảm tham gia hoạt động xã hội", options: [4, 3, 2, 1, 0] },
  { type: "divider" },
  { id: "a8", name: "Cảm nhận tình trạng răng", options: [1, 2, 3, 4, 5, 6, 9] },
  { id: "a9", name: "Cảm nhận tình trạng nướu", options: [1, 2, 3, 4, 5, 6, 9] },
  { type: "divider" },
  { id: "a10-1", name: "Nha sĩ - Chải răng", options: [1, 0, 9] },
  { id: "a10-2", name: "Nha sĩ - Lấy cao răng", options: [1, 0, 9] },
  { id: "a10-3", name: "Nha sĩ - Trám", options: [1, 0, 9] },
  { id: "a10-4", name: "Nha sĩ - Mão/cầu", options: [1, 0, 9] },
  { id: "a10-5", name: "Nha sĩ - Nhổ", options: [1, 0, 9] },
  { id: "a10-6", name: "Nha sĩ - Hàm giả", options: [1, 0, 9] },
  { id: "a10-7", name: "Nha sĩ - Tốt", options: [1, 0, 9] },
  { type: "divider" },
  { id: "a11", name: "Lần cuối đến nha sĩ", options: [1, 2, 3, 4, 5, 6] },
  { id: "a12", name: "Lý do đến khám nha sĩ gần nhất", options: [1, 2, 3, 4, 5] },
  { type: "divider" },
  { id: "a13-1", name: "Đánh răng = Bàn chải", options: [{ value: 1, label: "Có" }, { value: 2, label: "Không" }] },
  { id: "a13-2", name: "Đánh răng = Tăm tre", options: [{ value: 1, label: "Có" }, { value: 2, label: "Không" }] },
  { id: "a13-3", name: "Đánh răng = Tăm nhựa", options: [{ value: 1, label: "Có" }, { value: 2, label: "Không" }] },
  { id: "a13-4", name: "Đánh răng = Chỉ", options: [{ value: 1, label: "Có" }, { value: 2, label: "Không" }] },
  { id: "a13-5", name: "Đánh răng = Than", options: [{ value: 1, label: "Có" }, { value: 2, label: "Không" }] },
  { id: "a13-6", name: "Đánh răng = Vỏ cau", options: [{ value: 1, label: "Có" }, { value: 2, label: "Không" }] },
  { id: "a13-7", name: "Đánh răng = Khác (nhập vào nếu có)", type: "input" },
  { type: "divider" },
  { id: "a14", name: "Đánh răng bao nhiêu lần", options: [1, 2, 3, 4, 5, 6, 7] },
  { id: "a15", name: "Có dùng kem đánh răng không", options: [1, 2] },
  { id: "a16", name: "Kem đánh răng có flour", options: [1, 2, 9] },
  { type: "divider" },
  { id: "a17-1", name: "Hàm giả - bán hàm", options: [{ value: 1, label: "Có" }, { value: 2, label: "Không" }] },
  { id: "a17-2", name: "Hàm giả - toàn hàm trên", options: [{ value: 1, label: "Có" }, { value: 2, label: "Không" }] },
  { id: "a17-3", name: "Hàm giả - toàn hàm dưới", options: [{ value: 1, label: "Có" }, { value: 2, label: "Không" }] },
  { type: "divider" },
  {
    id: "a18-1",
    name: "Khó khăn đeo hàm giả - Phát âm",
    options: [{ value: 1, label: "Có" }, { value: 2, label: "Không" }],
  },
  {
    id: "a18-2",
    name: "Khó khăn đeo hàm giả - Ăn uống",
    options: [{ value: 1, label: "Có" }, { value: 2, label: "Không" }],
  },
  {
    id: "a18-3",
    name: "Khó khăn đeo hàm giả - Vững ổn",
    options: [{ value: 1, label: "Có" }, { value: 2, label: "Không" }],
  },
  {
    id: "a18-4",
    name: "Khó khăn đeo hàm giả - Đau",
    options: [{ value: 1, label: "Có" }, { value: 2, label: "Không" }],
  },
  {
    id: "a18-5",
    name: "Khó khăn đeo hàm giả - Thẩm mỹ",
    options: [{ value: 1, label: "Có" }, { value: 2, label: "Không" }],
  },
  { type: "divider" },
  { id: "a19-1", name: "Ăn - Trái cây tươi", options: [6, 5, 4, 3, 2, 1] },
  { id: "a19-2", name: "Ăn - Bánh quy, bông lan, bánh kem", options: [6, 5, 4, 3, 2, 1] },
  { id: "a19-3", name: "Ăn - Bánh ngọt khahc1", options: [6, 5, 4, 3, 2, 1] },
  { id: "a19-4", name: "Ăn - Mứt, mật ong", options: [6, 5, 4, 3, 2, 1] },
  { id: "a19-5", name: "Ăn - Kẹo cao su có đường", options: [6, 5, 4, 3, 2, 1] },
  { id: "a19-6", name: "Ăn - Kẹo/ mè xửng", options: [6, 5, 4, 3, 2, 1] },
  { id: "a19-7", name: "Ăn - Coca, nước ngọt có gas", options: [6, 5, 4, 3, 2, 1] },
  { id: "a19-8", name: "Ăn - Trà có đường", options: [6, 5, 4, 3, 2, 1] },
  { id: "a19-9", name: "Ăn - Cà phê có đường", options: [6, 5, 4, 3, 2, 1] },
  { type: "divider" },
  { id: "a20-1", name: "Thuốc - lá", options: [6, 5, 4, 3, 2, 1] },
  { id: "a20-2", name: "Thuốc - lào", options: [6, 5, 4, 3, 2, 1] },
  { id: "a20-3", name: "Thuốc - điếu", options: [6, 5, 4, 3, 2, 1] },
  { id: "a20-4", name: "Thuốc - lá nhai", options: [6, 5, 4, 3, 2, 1] },
  { id: "a20-5", name: "Thuốc - lá hít", options: [6, 5, 4, 3, 2, 1] },
  { id: "a20-6", name: "Thuốc - khác", options: [6, 5, 4, 3, 2, 1] },
  { id: "a20-6-input", name: "Nghề của cha khác", type: "input" },
  { type: "divider" },
  { id: "a21", name: "Uống bia, rượu", options: [0, 1, 2, 3, 4, 5, 9] },
  { type: "divider" },
  { id: "a22", name: "Phương tiện đi lại chính", options: [1, 2, 3, 4, 5, 6] },
  { id: "a22-6", name: "Xe khác (ghi rõ)", type: "input" },
  { type: "divider" },
  { id: "a23", name: "Nghề nghiệp", options: [1, 2, 3, 4, 5, 6, 7] },
  { id: "a23-7", name: "Nghề khác (ghi rõ)", type: "input" },
  { id: "a24", name: "Học vấn", options: [1, 2, 3, 4, 5, 6, 7] },
  { id: "a25", name: "Thu nhập", options: [1, 2, 3, 4, 5, 6, 9, 0] },
  { type: "divider" },
  { id: "a26-1", name: "Người", type: "input", inputType: "number" },
  { id: "a26-2", name: "Không biết", options: [9] },
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
    {data.map(({ name, id, options, type, inputType }, pos) => {
      if (type === "divider") {
        return <hr key={pos} />;
      }
      return (
        <FastField
          key={id}
          id={id}
          name={id}
          render={({ field, form }) => {
            return (
              <Row style={{ padding: ".25rem 0" }} className="row">
                <Col span={2}>{id.toUpperCase()}</Col>
                <Col span={8}>{name}</Col>
                <Col span={14}>
                  {type === "input" && <Input {...field} size="small" type={inputType || "text"} />}
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
      );
    })}
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
    a2: 3,
    "a13-7": "",
    "a20-6-input": "",
    "a22-6": "",
    "a23-7": "",
    "a26-1": "",
  }),
  handleSubmit: (values, { props, setSubmitting, setErrors, resetForm }) => {
    props.done(values);
    setSubmitting(false);
  },
})(InnerForm);

export default FormChildren;
