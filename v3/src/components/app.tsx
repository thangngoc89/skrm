import { FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";

import Home from "../routes/home";
import TestRoute from "../routes/test-route";
import NotFoundPage from "../routes/notfound";
import Header from "./header/header";
import Tieuhoc from "../routes/tieu-hoc";

const App: FunctionalComponent = () => {
  return (
    <div id="app">
      <Header />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/new/tieu-hoc" component={Tieuhoc} />
        <Route path="/test" component={TestRoute} />
        <NotFoundPage default />
      </Router>
    </div>
  );
};

export default App;
