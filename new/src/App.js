import { Grommet, Box, FormField, TextInput } from "grommet";
import React, { Component } from "react";
import RRApp from "./RR_App.gen";
import RenderQuestionForm from "./Render_question_form";
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
        <RenderQuestionForm />
      </Grommet>
    );
  }
}

export default App;
