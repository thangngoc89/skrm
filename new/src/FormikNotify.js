import React, { Component } from "react";
import debounce from "lodash/debounce";
import isEqual from "lodash/isEqual";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

const scroll = node => {
  scrollIntoView(node, {
    scrollMode: "if-needed",
    block: "center",
    inline: "nearest",
  });
};

export default class FormikNotify extends Component {
  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.isValidating, this.props.isValidating)) {
      this.notify(nextProps.errors);
    }
  }

  notify = debounce(
    errorContent => {
      const ids = this.props.ids;
      const errorIds = Object.keys(errorContent);
      const firstId = ids.find(value => errorIds.indexOf(value) !== -1);

      const firstElement = document.getElementById(firstId);
      if (firstElement) {
        scroll(firstElement);
      }
    },
    1000,
    { leading: true }
  );

  render() {
    console.log(this.props);
    return null;
  }
}
