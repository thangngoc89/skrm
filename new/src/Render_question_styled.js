import React from "react";
import { Box } from "grommet";
import styled from "styled-components";

const DottedLine = styled.div`
  flex: 1;
  border-bottom: 1px dotted #000;
  margin: 0 4px 6px 4px;
`;

export const StyledDottedLabel = ({ value, label }) => (
  <Box direction="row" flex>
    {label}
    <DottedLine />
    {value}
  </Box>
);
