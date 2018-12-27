import { Grommet, Box, FormField, TextInput } from "grommet";
import React, { Component } from "react";
import RenderQuestionForm from "./Render_question_form";

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
        <div className="m-4">
          <RenderQuestionForm />
        </div>
      </Grommet>
    );
  }
}

export default App;
