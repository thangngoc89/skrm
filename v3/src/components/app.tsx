import { FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";

import Home from "../routes/home";
import TestRoute from "../routes/test-route";
import NotFoundPage from "../routes/notfound";
import Header from "./header/header";
import Tieuhoc from "../routes/tieu-hoc";
import LoadSurveyRoute from "../routes/load-survey";

const App: FunctionalComponent = () => {
  return (
    <div id="app">
      <Header />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/new/mau-giao" component={LoadSurveyRoute} surveyType="mau_giao" />
        <Route path="/new/tieu-hoc" component={LoadSurveyRoute} surveyType="tieu_hoc" />
        <Route path="/new/nguoi-lon" component={LoadSurveyRoute} surveyType="nguoi_lon" />
        <Route path="/tieu-hoc" component={Tieuhoc} />
        <Route path="/test" component={TestRoute} />
        <NotFoundPage default />
      </Router>
    </div>
  );
};

export default App;
