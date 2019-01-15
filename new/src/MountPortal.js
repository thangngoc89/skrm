import React from "react";
import ReactDOM from "react-dom";
export default class MountPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
    };
  }
  componentDidMount() {
    console.log(document.getElementById(this.props.id));
    this.setState({
      mounted: true,
    });
  }
  render() {
    return this.state.mounted
      ? ReactDOM.createPortal(
          this.props.children,
          document.getElementById(this.props.id)
        )
      : null;
  }
}
