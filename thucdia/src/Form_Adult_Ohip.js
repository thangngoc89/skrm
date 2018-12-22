import React from "react";
import { withFormik, FastField } from "formik";
import { Form, Button, Row, Col, Radio, message } from "antd";

const RadioGroup = Radio.Group;

const questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const InnerForm = ({ values, handleSubmit, isSubmitting }) => (
  <Form layout="vertical" onSubmit={handleSubmit} className="Form_thoiquen_CSRM">
    <h1>OHIP14</h1>
    {questions.map(questionId => {
      return (
        <FastField
          key={questionId}
          name={String(questionId)}
          render={({ field, form: { setFieldValue } }) => {
            return (
              <Row style={{ margin: ".5rem 1rem" }}>
                <Col span={2}> Câu {questionId}</Col>
                <Col span={22}>
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
                    <Radio value={4}>4</Radio>
                  </RadioGroup>
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
        Lưu
      </Button>
    </Row>
  </Form>
);
const FormChildren = withFormik({
  mapPropsToValues: props =>
    questions.reduce((object, id) => {
      object[id] = null;
      return object;
    }, {}),
  handleSubmit: (values, { props, setSubmitting, setErrors, resetForm }) => {
    const notFinished = [];
    for (let id = 1; id <= 14; id++) {
      if (values[id] === null) {
        notFinished.push(id);
      }
    }
    if (notFinished.length) {
      message.error(`Câu ${notFinished.join(" , ")} chưa đánh`);
      setSubmitting(false);
      return;
    }
    props.done(values);
    setSubmitting(false);
  },
})(InnerForm);

export default FormChildren;
