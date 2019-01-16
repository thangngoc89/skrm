import React from "react";

import {
  Anchor,
  Box,
  DropButton,
  Menu,
  ResponsiveContext,
  Text,
} from "grommet";
import { Down } from "grommet-icons";

export const AppHeader = ({ appName, appIcon, userSession, open }) => (
  <Box
    flex={false}
    as="header"
    direction="row"
    background="white"
    align="center"
    justify="between"
    responsive={false}
    elevation="xsmall"
  >
    <Box
      pad={{ horizontal: "medium", vertical: "small" }}
      responsive={false}
      direction="row"
      align="center"
      gap="small"
    >
      <Text color="brand">{appName}</Text>
    </Box>

    <ResponsiveContext.Consumer>
      {responsive =>
        responsive === "small" ? (
          <Menu
            dropAlign={{ right: "right", top: "top" }}
            label="Menu"
            items={[
              { label: "Nhập mới", href: "#" },
              { label: "Quản lí", href: "#" },
            ]}
          />
        ) : (
          <Box
            margin={{ left: "medium" }}
            round="xsmall"
            direction="row"
            align="center"
            pad={{ horizontal: "small" }}
          >
            <Anchor href="" label="Nhập mới" margin="small" />
            <Anchor href="" label="Quản lí" margin="small" />
          </Box>
        )
      }
    </ResponsiveContext.Consumer>
  </Box>
);
