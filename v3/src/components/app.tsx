import { FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";

import Home from "../routes/home";
import NotFoundPage from "../routes/notfound";
import Header from "./header/header";
import CreateSurvey from "../routes/create-survey-route";
import LoadSurvey from "../routes/load-survey-route";
import { ToastContainer, toast } from "react-toastify";
import QuanLi from "../routes/quan-li";
import Testroute from "../routes/test-route";

const App: FunctionalComponent = () => {
  return (
    <div id="app">
      <ToastContainer autoClose={7000} position={toast.POSITION.BOTTOM_RIGHT} />
      <Header />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/new/mau_giao" component={CreateSurvey} surveyType="mau_giao" />
        <Route path="/new/tieu_hoc" component={CreateSurvey} surveyType="tieu_hoc" />
        <Route path="/new/nguoi_lon" component={CreateSurvey} surveyType="nguoi_lon" />
        <Route path="/survey/:surveyId" component={LoadSurvey} />
        <Route path="/quan_li" component={QuanLi} />
        <Route path="/test" component={Testroute} />
        <NotFoundPage default />
      </Router>
    </div>
  );
};

export default App;
