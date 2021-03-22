import { FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";

import Home from "../routes/home";
import TestRoute from "../routes/test-route";
import NotFoundPage from "../routes/notfound";
import Header from "./header/header";
import MainSurveyRoute from "../routes/load-survey";
import { Tieuhoc } from "./survey/tieu-hoc";
import { ToastContainer } from "react-toastify";

const App: FunctionalComponent = () => {
  return (
    <div id="app">
      <ToastContainer autoClose={15000} />
      <Header />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/new/mau-giao" component={MainSurveyRoute} surveyType="mau_giao" />
        <Route path="/new/tieu-hoc" component={MainSurveyRoute} surveyType="tieu_hoc" />
        <Route path="/new/nguoi-lon" component={MainSurveyRoute} surveyType="nguoi_lon" />
        <Route path="/survey/:surveyId" component={MainSurveyRoute} />
        <Route path="/test" component={Tieuhoc} surveyId="123456" />
        <NotFoundPage default />
      </Router>
    </div>
  );
};

export default App;
