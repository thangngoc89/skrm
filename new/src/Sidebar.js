import React, { Component } from "react";

import { Box, Button, Layer, ResponsiveContext } from "grommet";
import { FormClose } from "grommet-icons";

class Sidebar extends Component {
  static contextType = ResponsiveContext;
  render() {
    const { items = [], onChange, ...rest } = this.props;
    const size = this.context;
    const SidebarComponent = size === "small" ? Layer : Box;
    const sidebarProps =
      size === "small"
        ? { full: true }
        : {
            fill: "vertical",
            width: "small",
            background: "light-2",
            elevation: "xsmall",
          };
    return (
      <SidebarComponent {...sidebarProps} {...rest}>
        {size === "small" && (
          <Box align="end">
            <Button icon={<FormClose />} onClick={onChange} />
          </Box>
        )}
        {items.map(({ active, exact, label, path }) => (
          <Button label={label} />
        ))}
      </SidebarComponent>
    );
  }
}

export default Sidebar;
