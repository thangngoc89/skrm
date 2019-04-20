import React from "react";

import { Anchor, Box, Menu, ResponsiveContext, Text } from "grommet";
import { navigate } from "@reach/router";

const RouterAnchor = props => {
  const { href, ...rest } = props;
  return (
    <Anchor
      href={href}
      onClick={e => {
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    />
  );
};
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
      <RouterAnchor pad="none" label={appName} href="/" margin="small" />
    </Box>

    <ResponsiveContext.Consumer>
      {responsive =>
        responsive === "small" ? (
          <Menu
            dropAlign={{ right: "right", top: "top" }}
            label="Menu"
            items={[
              { label: "Thêm tiểu học", onClick: () => navigate("/new") },
              {
                label: "Thêm mẫu giáo",
                onClick: () => navigate("/new/maugiao"),
              },
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
            <RouterAnchor label="Thêm tiểu học" href="/new" margin="small" />
            <RouterAnchor
              label="Thêm mẫu giáo"
              href="/new/maugiao"
              margin="small"
            />
            <RouterAnchor label="Quản lí" href="/manage" margin="small" />
          </Box>
        )
      }
    </ResponsiveContext.Consumer>
  </Box>
);
