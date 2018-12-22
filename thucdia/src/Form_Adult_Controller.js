import React, { Component, Fragment } from "react";
import db from "./Database";
import history from "./history";
import FormAdultKham from "./Form_Adult_Kham";
import FormAdultOhip from "./Form_Adult_Ohip";
import FormAdultThoiQuen from "./Form_Adult_Thoiquen";
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
      ohip: null,
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
  handleOhip = value => {
    this.setState(
      {
        ...this.state,
        ohip: value,
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
  handleSubmit = () => {
    const self = this;
    this.setState({ submitting: true });
    const { kham, thoiquen, ohip } = this.state;
    const id = kham["so-ho-so"];
    db
      .collection(process.env.NODE_ENV + "--form_adult")
      .doc(id)
      .set({ kham, thoiquen, ohip })
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
          <Step title="OHIP14" />
        </Steps>
        {currentStep === 0 && <FormAdultKham done={this.handleKham} />}
        {currentStep === 1 && <FormAdultThoiQuen done={this.handleThoiQuen} />}
        {currentStep === 2 && <FormAdultOhip done={this.handleOhip} />}
      </Fragment>
    );
  }
}
