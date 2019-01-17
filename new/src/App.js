import { Box, Grommet, Button, Text, ResponsiveContext } from "grommet";
import React, { useState } from "react";
import RecordNew from "./RecordNew";
import RecordList from "./RecordList";
import { AppHeader } from "./AppHeader";

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

const App = () => {
  return (
    <Grommet full>
      <Box fill direction="column" flex>
        <AppHeader appName="Quản lí dữ liệu SKRM" />
        <Box direction="row" flex>
          <Box
            flex
            overflow="auto"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {/* <RecordNew />  */}
            <RecordList />
          </Box>
        </Box>
      </Box>
    </Grommet>
  );
};

export default App;
