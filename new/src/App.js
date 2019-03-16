import { Router } from "@reach/router";
import { Box, Grommet } from "grommet";
import React, { Suspense } from "react";
import { PouchDB } from "react-pouchdb";
import { AppHeader } from "./AppHeader";
import Spinner from "./Spinner";
import ButterToast, { POS_BOTTOM, POS_RIGHT } from "butter-toast";

import RecordList from "./RecordManage";
import RecordNew from "./RecordNew";
import RecordEdit from "./RecordEdit";
import Homepage from "./Homepage";

const App = () => {
  return (
    <PouchDB name="hmong" auto_compaction={true}>
      <Grommet full>
        <Box fill flex={false}>
          <AppHeader appName="Quản lí dữ liệu SKRM" />
          <Suspense fallback={<Spinner />}>
            <Router style={{ height: "100%", overflow: "auto" }}>
              <Homepage path="/" />
              <RecordNew path="/new" />
              <RecordList path="/manage" />
              <RecordEdit path="/record/:recordId" />
            </Router>
          </Suspense>
        </Box>
      </Grommet>
      <ButterToast position={{ vertical: POS_BOTTOM, horizontal: POS_RIGHT }} />
    </PouchDB>
  );
};

export default App;
