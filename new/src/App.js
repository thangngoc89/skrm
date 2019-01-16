import { Box, Grommet, Button, Text, ResponsiveContext } from "grommet";
import React, { useState } from "react";
import RecordNew from "./RecordNew";
import Sidebar from "./Sidebar";
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
      <ResponsiveContext.Consumer>
        {size => {
          return (
            <Box fill direction="column" flex>
              <AppHeader appName="Quản lí dữ liệu SKRM" />
              <Box direction="row" flex>
                <Box
                  flex
                  overflow="auto"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  <RecordNew />
                </Box>
              </Box>
            </Box>
          );
        }}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
};

export default App;
