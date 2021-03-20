import { FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";

import Home from "../routes/home";
import Profile from "../routes/profile";
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
        <NotFoundPage default />
      </Router>
    </div>
  );
};

export default App;
