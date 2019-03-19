import React from "react";

import { Anchor, Box, Menu, ResponsiveContext, Text } from "grommet";
import { navigate } from "@reach/router";

export const AppHeader = ({ appName }) => (
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
      pad={{ horizontal: "medium" }}
      direction="row"
      align="center"
      gap="small"
    >
      <Anchor
        pad="none"
        label={appName}
        href="/"
        onClick={e => {
          e.preventDefault();
          navigate("/");
        }}
        margin="small"
      />
    </Box>

    <ResponsiveContext.Consumer>
      {responsive =>
        responsive === "small" ? (
          <Menu
            dropAlign={{ right: "right", top: "top" }}
            label="Menu"
            items={[
              { label: "Thêm hồ sơ", onClick: () => navigate("/new") },
              { label: "Quản lí", onClick: () => navigate("/manage") },
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
            <Anchor
              label="Thêm hồ sơ"
              href="/new"
              onClick={e => {
                e.preventDefault();
                navigate("/new");
              }}
              margin="small"
            />
            <Anchor
              label="Quản lí"
              href="/manage"
              onClick={e => {
                e.preventDefault();
                navigate("/manage");
              }}
              margin="small"
            />
          </Box>
        )
      }
    </ResponsiveContext.Consumer>
  </Box>
);
