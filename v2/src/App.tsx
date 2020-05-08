import React from "react";
import FormEngine from "./components/FormEngine/FormEngine";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import pink from "@material-ui/core/colors/pink";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2979ff",
    },
    secondary: pink,
    text: {
      primary: "#000000",
      secondary: "#333",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormEngine />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
