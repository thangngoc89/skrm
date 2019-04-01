import React, { Component } from "react";
import debounce from "lodash/debounce";
import isEqual from "lodash/isEqual";

class FormikAutosave extends Component {
  state = {
    type: "INITIAL",
  };

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.values, this.props.values)) {
      this.save();
    }
  }

  save = debounce(() => {
    this.setState({ type: "SAVING" });
    this.props
      .onSave(this.props.values)
      .then(
        () => this.setState({ type: "SUCCESS" }),
        () => this.setState({ type: "ERROR" })
      );
  }, 1000);

  render() {
    return this.props.render(this.state);
  }
}

export default FormikAutosave;
