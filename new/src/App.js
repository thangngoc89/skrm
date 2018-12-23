import { Grommet, Box, FormField, TextInput } from "grommet";
import React, { Component } from "react";
import RRApp from "./RR_App.gen";

class App extends Component {
  render() {
    return (
      <Grommet>
        <Box direction="row-responsive" gap="small">
          <Box basis="2/3">
            <FormField label="City">
              <TextInput value="foo" />
            </FormField>
          </Box>
          <Box basis="1/3">
            <FormField label="State">
              <TextInput value="bar" />
            </FormField>
          </Box>
        </Box>
        <RRApp />
      </Grommet>
    );
  }
}

export default App;
