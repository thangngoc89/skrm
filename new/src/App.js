import { Grommet, Box, FormField, TextInput } from "grommet";
import React, { Component } from "react";
import RenderQuestionForm from "./Render_question_form";
import RRApp from "./RRApp.gen";

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
        <div className="m-4 text-lg">
          {/* <RenderQuestionForm /> */}
          <RRApp />
        </div>
      </Grommet>
    );
  }
}

export default App;
