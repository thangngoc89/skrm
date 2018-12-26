import { Grommet, Box, FormField, TextInput } from "grommet";
import React, { Component } from "react";
import RRApp from "./RR_App.gen";
import Render_Question from "./Render_Question";
import { grommet } from "grommet/themes";

const customTheme = {
  button: {
    extend: props => {
      return `font-weight: bold`;
    },
  },
};
class App extends Component {
  render() {
    return (
      <Grommet theme={customTheme}>
        <Render_Question />
        {/* <RRApp /> */}
      </Grommet>
    );
  }
}

export default App;
