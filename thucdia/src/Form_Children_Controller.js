import React, { Component, Fragment } from "react";
import db from "./Database";
import history from "./history";
import FormChildrenKham from "./Form_Children_Kham";
import FormChildrenKhoChiu from "./Form_Children_Khochiu";
import FormChildrenThoiQuen from "./Form_Children_Thoiquen";
import { Steps, message, Spin } from "antd";

const Step = Steps.Step;

export default class FormChildrenController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      currentStep: 0,
      kham: null,
      thoiquen: null,
      khochiu: null,
    };
  }

  nextStep = () => {
    const currentStep = this.state.currentStep;
    if (currentStep < 2) {
      this.setState({ currentStep: currentStep + 1 });
    } else {
      this.handleSubmit();
    }
  };
  handleKham = value => {
    this.setState(
      {
        ...this.state,
        kham: value,
      },
      () => this.nextStep(),
    );
  };
  handleThoiQuen = value => {
    this.setState(
      {
        ...this.state,
        thoiquen: value,
      },
      () => this.nextStep(),
    );
  };
  handleKhoChiu = value => {
    this.setState(
      {
        ...this.state,
        khochiu: value,
      },
      () => this.nextStep(),
    );
  };
  handleSubmit = () => {
    const self = this;
    this.setState({ submitting: true });

    const { kham, thoiquen, khochiu } = this.state;
    const id = kham["so-ho-so"];
    db
      .collection(process.env.NODE_ENV + "--form_children" + (self.props.hogiadinh ? "__hogiadinh" : ""))
      .doc(id)
      .set({ kham, thoiquen, khochiu })
      .then(docRef => {
        self.setState({ submitting: false });
        message.success("Lưu thành công");
        history.push("/");
      })
      .catch(error => {
        console.error("Error adding document: ", error);
        message.error("Lỗi trong quá trình lưu");
        self.setState({ submitting: false });
      });
  };
  render() {
    const { submitting, currentStep } = this.state;
    return (
      <Fragment>
        {submitting && (
          <div className="loading-screen">
            <Spin size="large" />
          </div>
        )}
        <Steps current={currentStep} style={{ margin: "1rem 0 2rem 0" }}>
          <Step title="Khám" />
          <Step title="Thói quen CSRM" />
          <Step title="Khó chịu" />
        </Steps>
        {currentStep === 0 && <FormChildrenKham done={this.handleKham} hogiadinh={Boolean(this.props.hogiadinh)} />}
        {currentStep === 1 && <FormChildrenThoiQuen done={this.handleThoiQuen} />}
        {currentStep === 2 && <FormChildrenKhoChiu done={this.handleKhoChiu} />}
      </Fragment>
    );
  }
}
