import { Grommet, Heading } from "grommet";
import React, { Component } from "react";
import RRApp from "./RR_App.gen";
import { FormField, TextInput } from "grommet";

class App extends Component {
  render() {
    return (
      <Grommet>
        <RRApp />
      </Grommet>
    );
  }
}

export default App;
