import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { AppContainer } from "react-hot-loader";
import "./index.css";
import {setLocale} from "yup";

setLocale({
  mixed: {
    required: "${path} chưa được điền",
  },
  number: {
    min: "${path} phải có giá trị tối thiểu là ${min}",
    max: "${path} phải có giá trị tối thiểu là ${max}",
  },
});

// If you want your app to work offline and loadfaster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

// Wrap the rendering in a function:
const render = () => {
  ReactDOM.render(
    // Wrap App inside AppContainer
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById("root")
  );
};

render();

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./App", () => {
    render();
  });
}
