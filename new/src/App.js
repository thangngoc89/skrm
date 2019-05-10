import React, { Suspense, lazy } from "react";
import { Router } from "@reach/router";
import { Box, Grommet } from "grommet";
import { PouchDB } from "react-pouchdb";
import { AppHeader } from "./AppHeader";
import Spinner from "./Spinner.bs";
import ButterToast, { POS_BOTTOM, POS_RIGHT } from "butter-toast";
import { make as StopWatch } from "./utility/StopWatch.bs";

const RecordNew = lazy(() => import("./RecordNew"));
const RecordEdit = lazy(() => import("./RecordEdit"));
const Homepage = lazy(() => import("./Homepage"));
const RecordNewMaugiao = lazy(() => import("./RecordNewMaugiao"));
const RecordManage = lazy(() => import("./RecordManage/RecordManage.bs"));

const App = () => {
  return (
    <PouchDB name="hmong" auto_compaction={true}>
      <Grommet full>
        <Box fill flex={false}>
          <AppHeader appName="VOSER" />
          <Suspense fallback={<Spinner />}>
            <Router style={{ height: "100%", overflow: "auto" }}>
              <Homepage path="/" />
              <RecordNew path="/new" />
              <RecordManage path="/manage" />
              <RecordEdit path="/record/:recordId" />
              <RecordNewMaugiao path="/new/maugiao" />
              <StopWatch path="/stopwatch" />
            </Router>
          </Suspense>
        </Box>
      </Grommet>
      <ButterToast position={{ vertical: POS_BOTTOM, horizontal: POS_RIGHT }} />
    </PouchDB>
  );
};

export default App;
