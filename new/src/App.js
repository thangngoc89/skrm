import { Grommet, Box, ResponsiveContext } from "grommet";
import React, { useState } from "react";
import RecordNew from "./RecordNew";
import Sidebar from "./Sidebar";

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
  const [showSidebar, setShowSidebar] = useState(false);
  const handleToggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <Grommet full>
      <ResponsiveContext.Consumer>
        {size => {
          return (
            <Box fill>
              <Box direction="row" flex>
                {size !== "small" && (
                  <Sidebar items={items} onChange={handleToggleSidebar} />
                )}
                {size === "small" && showSidebar && (
                  <Sidebar items={items} onChange={handleToggleSidebar} />
                )}

                <Box flex>
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
