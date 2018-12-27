import React from "react";
import Box from "./components/Box.gen";

// const DottedLine = styled.div`
//   flex: 1;
//   border-bottom: 1px dotted #000;
//   margin: 0 4px 6px 4px;
// `;

export const StyledDottedLabel = ({ value, label }) => (
  <Box direction="row" alignContent="end_" className="w-full">
    {label}
    <span className="flex-1 border-b border-dotted border-dark-3 mx-2 mb-1" />
    {value}
  </Box>
);
