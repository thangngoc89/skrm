import { Router } from "@reach/router";
import { Box, Grommet } from "grommet";
import React, { Suspense } from "react";
import { PouchDB } from "react-pouchdb";
import { AppHeader } from "./AppHeader";
import RecordList from "./RecordManage";
import RecordNew from "./RecordNew";
import RecordEdit from "./RecordEdit";
import Spinner from "./Spinner";

const items = [
  {
    label: "Home",
    path: "/",
    exact: true,
  },
  {
    label: "Servers",
    path: "/servers",
  },
  {
    label: "Users",
    path: "/users",
  },
  {
    label: "Settings",
    path: "/settings",
  },
];

const Homepage = () => <div>Homepage</div>;

const App = () => {
  return (
    <PouchDB name="hmong">
      <Grommet full>
        <Box fill direction="column" flex>
          <AppHeader appName="Quản lí dữ liệu SKRM" />
          <Box direction="row" flex>
            <Box
              flex
              overflow="auto"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <Suspense fallback={<Spinner />}>
                <Router>
                  <Homepage path="/" />
                  <RecordNew path="/new" />
                  <RecordList path="/manage" />
                  <RecordEdit path="/record/:recordId" />
                </Router>
              </Suspense>
            </Box>
          </Box>
        </Box>
      </Grommet>
    </PouchDB>
  );
};

export default App;
