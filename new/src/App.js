import React, { Suspense, lazy } from "react";
import { Router } from "@reach/router";
import { Box, Grommet } from "grommet";
import { PouchDB } from "react-pouchdb";
import { AppHeader } from "./AppHeader";
import Spinner from "./Spinner";
import ButterToast, { POS_BOTTOM, POS_RIGHT } from "butter-toast";

const RecordList = lazy(() => import("./RecordManage"));
const RecordNew = lazy(() => import("./RecordNew"));
const RecordEdit = lazy(() => import("./RecordEdit"));
const Homepage = lazy(() => import("./Homepage"));
const PDT_Maugiao = lazy(() => import("./exam_form/PDT_Maugiao"));

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
              <RecordList path="/manage" />
              <RecordEdit path="/record/:recordId" />
              <PDT_Maugiao path="/maugiao" />
            </Router>
          </Suspense>
        </Box>
      </Grommet>
      <ButterToast position={{ vertical: POS_BOTTOM, horizontal: POS_RIGHT }} />
    </PouchDB>
  );
};

export default App;
