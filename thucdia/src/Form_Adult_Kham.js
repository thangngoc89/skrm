import React from "react";
import { withFormik, FastField } from "formik";
import { Form, Input, Button, Col, Row, Select, Checkbox } from "antd";
import RenderTableOHIS from "./RenderTable_OHIS";
import RenderTableChenChuc from "./RenderTable_chenchuc";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const Item = ({ label, name, type = "text", render, required, ...props }) => {
  return (
    <FastField
      id={name}
      type={type}
      name={name}
      render={({ field, form }) => {
        const { touched, errors } = form;
        if (typeof render === "function") {
          return (
            <Form.Item label={label} help={touched[name] && errors[name] ? errors[name] : ""} {...props}>
              {render({ field, form })}
            </Form.Item>
          );
        }
        return (
          <Form.Item label={label} help={touched[name] && errors[name] ? errors[name] : ""} {...props}>
            <Input type={type} {...field} required={required} />
          </Form.Item>
        );
      }}
    />
  );
};

const oneThirdCol = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const oneCol = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  isSubmitting,
}) => (
  <Form layout="horizontal" onSubmit={handleSubmit}>
    <Row>
      <h1>PHIẾU ĐIỀU TRA SỨC KHỎE RĂNG MIỆNG (dành cho trẻ dưới 15 tuổi)</h1>
    </Row>
    <Row gutter={8}>
      <Col span={8}>
        <Item label="Ngày khám" name="ngay-kham" type="date" required {...oneThirdCol} />
      </Col>
      <Col span={8}>
        <Item label="Số hồ sơ" name="so-ho-so" required {...oneThirdCol} />
      </Col>
      <Col span={8}>
        <Item label="Người khám" name="nguoi-kham" required {...oneThirdCol} />
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Item label="Họ và tên" name="ho-va-ten" required {...oneCol} />
      </Col>
    </Row>
    <Row>
      <Col span={8}>
        <Item label="Tuổi" name="tuoi" type="number" min={0} required {...oneThirdCol} />
      </Col>
      <Col span={8}>
        <Item
          label="Giới"
          name="gioi"
          {...oneThirdCol}
          render={({ field, form: { setFieldValue } }) => {
            return (
              <Select
                defaultValue={field.value}
                {...field}
                onChange={value => {
                  setFieldValue(field.name, value);
                }}
              >
                <Option value={1}>Nam</Option>
                <Option value={2}>Nữ</Option>
              </Select>
            );
          }}
        />
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Item label="Nghề nghiệp" name="nghe-nghiep" {...oneCol} />
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Item label="Dân tộc" name="dan-toc" {...oneCol} />
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Item label="Quê quán" name="que-quan" {...oneCol} />
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Item label="Địa chỉ gia đình" name="dia-chi-gia-dinh" {...oneCol} />
      </Col>
    </Row>
    <Row>
      <h2>Bệnh mãn tính</h2>
      <Col span={24}>
        <Item
          name="benh-man-tinh"
          render={({ field, form: { setFieldValue } }) => (
            <CheckboxGroup
              options={[
                { label: "Cao huyết áp", value: "cao-huyet-ap" },
                { label: "Tiểu đường", value: "tieu-duong" },
                { label: "Tim mạch", value: "tim-mach" },
                { label: "Viêm khớp", value: "viem-khop" },
                { label: "Bệnh thận", value: "benh-than" },
                { label: "Bệnh dạ dày", value: "benh-da-day" },
                { label: "Bệnh viêm khớp dạng thấp", value: "benh-viem-khop-dang-thap" },
                { label: "Bệnh khác", value: "benh-khac" },
              ]}
              defaultValue={field.value || []}
              onChange={e => {
                setFieldValue(field.name, e);
              }}
            />
          )}
        />
      </Col>
      <Col span={24}>
        <Item label="Bệnh khác (nếu có)" name="benh-man-tinh-khac" />
      </Col>
    </Row>
    <hr />
    <Row gutter={16}>
      <h2>Tình trạng răng và nhu cầu điều trị</h2>
      <Col xs={{ span: 24 }} md={{ span: 12 }}>
        <ReactDataSheet
          data={values.nhucauLeft}
          valueRenderer={cell => cell.value}
          onCellsChanged={changes => {
            const grid = values.nhucauLeft.map(row => [...row]);
            changes.forEach(({ cell, row, col, value }) => {
              grid[row][col] = { ...grid[row][col], value };
            });
            setFieldValue("nhucauLeft", grid);
          }}
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 12 }}>
        <ReactDataSheet
          data={values.nhucauRight}
          valueRenderer={cell => cell.value}
          onCellsChanged={changes => {
            const grid = values.nhucauRight.map(row => [...row]);
            changes.forEach(({ cell, row, col, value }) => {
              grid[row][col] = { ...grid[row][col], value };
            });
            setFieldValue("nhucauRight", grid);
          }}
        />
      </Col>
    </Row>
    <hr />
    <Row>
      <h2>Tình trạng vệ sinh răng miệng (OHI-S)</h2>
      <Col span={24}>
        <Row gutter={16}>
          <Col span={10} offset={1}>
            <h2>PI</h2>
            <RenderTableOHIS prefix="pi" values={values} handleChange={handleChange} handleBlur={handleBlur} />
          </Col>
          <Col span={10} offset={2}>
            <h2>CI</h2>
            <RenderTableOHIS prefix="ci" values={values} handleChange={handleChange} handleBlur={handleBlur} />
          </Col>
        </Row>
      </Col>
    </Row>
    <hr />
    <Row gutter={16}>
      <Col span={12}>
        <Row gutter={16}>
          <h2>Tình trạng răng nhiễm flour</h2>
          <Col span={6}>
            <Item label="Mã số" name="flour-ma-so" required />
          </Col>
          <Col span={6}>
            <Item label="Số răng" name="flour-so-rang" required />
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row gutter={16}>
          <h2>Dental Erosion</h2>
          <Col span={6}>
            <Item label="Mã số" name="dental-erosion-ma-so" required />
          </Col>
          <Col span={6}>
            <Item label="Số răng" name="dental-erosion-so-rang" required />
          </Col>
        </Row>
      </Col>
    </Row>
    <hr />
    <Row gutter={16} type="flex">
      <Col span={8}>
        <h2>Tình trạng khớp cắn</h2>
      </Col>
      <Col span={4}>
        <Item label="Cắn phủ" name="can-phu" required labelCol={{ span: 8 }} wrapperCol={{ span: 4 }} />
      </Col>
      <Col span={4}>
        <Item label="Cắn chìa" name="can-chia" required labelCol={{ span: 8 }} wrapperCol={{ span: 4 }} />
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={4}>
        <h2>Mọc chen chúc</h2>
        <RenderTableChenChuc values={values} handleChange={handleChange} handleBlur={handleBlur} />
      </Col>
      <Col span={6}>
        <h2>Cắn ngược</h2>
        <Row>
          <Col span={12}>
            <Item
              label="Răng trước"
              colon={false}
              name="can-nguoc-rang-truoc"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 4 }}
              render={({ field, form: { setFieldValue } }) => (
                <Checkbox
                  onChange={e => {
                    setFieldValue(field.name, e.target.checked);
                  }}
                />
              )}
            />
          </Col>
          <Col span={12}>
            <Item
              label="Răng sau"
              name="can-nguoc-rang-sau"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 4 }}
              colon={false}
              render={({ field, form: { setFieldValue } }) => (
                <Checkbox
                  onChange={e => {
                    setFieldValue(field.name, e.target.checked);
                  }}
                />
              )}
            />
          </Col>
        </Row>
      </Col>
      <Col span={2}>
        <h2>Cắn hở</h2>
        <Item
          name="can-ho"
          wrapperCol={{ span: 4 }}
          render={({ field, form: { setFieldValue } }) => (
            <Checkbox
              onChange={e => {
                setFieldValue(field.name, e.target.checked);
              }}
            />
          )}
        />
      </Col>
      <Col span={8}>
        <h2>Phân loại Angle</h2>
        <Row>
          <Col span={6}>
            <Item label="R3P" name="angle-r3p" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }} colon={false} />
          </Col>
          <Col span={6}>
            <Item label="R3T" name="angle-r3t" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }} colon={false} />
          </Col>
          <Col span={6}>
            <Item label="R6P" name="angle-r6p" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }} colon={false} />
          </Col>
          <Col span={6}>
            <Item label="R6T" name="angle-r6t" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }} colon={false} />
          </Col>
        </Row>
      </Col>
    </Row>
    <hr />
    <Row gutter={16} type="flex">
      <Col span={8}>
        <h2>Tình trạng hàm giả tháo lắp</h2>
      </Col>
      <Col span={4}>
        <Item label="Trên" name="ham-gia-tren" required labelCol={{ span: 8 }} wrapperCol={{ span: 4 }} />
      </Col>
      <Col span={4}>
        <Item label="Dưới" name="ham-gia-duoi" required labelCol={{ span: 8 }} wrapperCol={{ span: 4 }} />
      </Col>
    </Row>
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
    "ngay-kham": "2018-04-10",
    "benh-man-tinh-khac": "",
    "so-ho-so": "BRVTĐĐ",
    "nguoi-kham": "",
    "ho-va-ten": "",
    "dia-chi-gia-dinh": "Đất Đỏ, Bà Rịa Vũng Tàu",
    "angle-r3p": null,
    "angle-r3t": null,
    "angle-r6p": null,
    "angle-r6t": null,
    truong: "phuoc-hoi",
    tuoi: "",
    gioi: 1,
    "dan-toc": "Kinh",
    "can-nguoc-rang-truoc": false,
    "can-nguoc-rang-sau": false,
    "can-ho": false,
    nhucauLeft: [
      [
        { value: null, readOnly: true },
        { value: "NC", readOnly: true },
        { value: "TT", readOnly: true },
        { value: "Nhai", readOnly: true },
        { value: "N", readOnly: true },
        { value: "T", readOnly: true },
        { value: "G", readOnly: true },
        { value: "X", readOnly: true },
        { value: "CR", readOnly: true },
      ],
      [
        { value: "18", readOnly: true },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
      ],
      [
        { value: "17", readOnly: true },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
      ],
      [
        { value: "16", readOnly: true },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
      ],
      [
        { value: "15", readOnly: true },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
      ],
      [
        { value: "14", readOnly: true },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
      ],
      [
        { value: "13", readOnly: true },
        { value: null },
        { value: null },
        { value: null, readOnly: true },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
      ],
      [
        { value: "12", readOnly: true },
        { value: null },
        { value: null },
        { value: null, readOnly: true },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
      ],
      [
        { value: "11", readOnly: true },
        { value: null },
        { value: null },
        { value: null, readOnly: true },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
      ],
      [
        { value: "21", readOnly: true },
        { value: null },
        { value: null },
        { value: null, readOnly: true },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
      ],
      [
        { value: "22", readOnly: true },
        { value: null },
        { value: null },
        { value: null, readOnly: true },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
      ],
      [
        { value: "23", readOnly: true },
        { value: null },
        { value: null },
        { value: null, readOnly: true },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
      ],
      [
        { value: "24", readOnly: true },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
      ],
      [
        { value: "25", readOnly: true },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
      ],
      [
        { value: "26", readOnly: true },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
      ],
      [
        { value: "27", readOnly: true },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
      ],
      [
        { value: "28", readOnly: true },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
      ],
    ],
    nhucauRight: [
      [
        { value: "CR", readOnly: true },
        { value: "X", readOnly: true },
        { value: "G", readOnly: true },
        { value: "T", readOnly: true },
        { value: "N", readOnly: true },
        { value: "Nhai", readOnly: true },
        { value: "TT", readOnly: true },
        { value: "NC", readOnly: true },
        { value: null, readOnly: true },
      ],
      [
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: "38", readOnly: true },
      ],
      [
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: "37", readOnly: true },
      ],
      [
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: "36", readOnly: true },
      ],
      [
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: "35", readOnly: true },
      ],
      [
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: "34", readOnly: true },
      ],
      [
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null, readOnly: true },
        { value: null },
        { value: null },
        { value: "33", readOnly: true },
      ],
      [
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null, readOnly: true },
        { value: null },
        { value: null },
        { value: "32", readOnly: true },
      ],
      [
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null, readOnly: true },
        { value: null },
        { value: null },
        { value: "31", readOnly: true },
      ],
      [
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null, readOnly: true },
        { value: null },
        { value: null },
        { value: "41", readOnly: true },
      ],
      [
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null, readOnly: true },
        { value: null },
        { value: null },
        { value: "42", readOnly: true },
      ],
      [
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null, readOnly: true },
        { value: null },
        { value: null },
        { value: "43", readOnly: true },
      ],
      [
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: "44", readOnly: true },
      ],
      [
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: "45", readOnly: true },
      ],
      [
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: "46", readOnly: true },
      ],
      [
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: "47", readOnly: true },
      ],
      [
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: null },
        { value: "48", readOnly: true },
      ],
    ],
  }),
  handleSubmit: (values, { props, setSubmitting, setErrors, resetForm }) => {
    const processedValues = {
      ...values,
      nhucauLeft: JSON.stringify(values.nhucauLeft),
      nhucauRight: JSON.stringify(values.nhucauRight),
    };
    props.done(processedValues);
    setSubmitting(false);
  },
})(InnerForm);

export default FormChildren;
