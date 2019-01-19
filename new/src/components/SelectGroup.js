import React, { useState } from "react";
import { Box } from "grommet";
import CheckBox from "./Checkbox.gen";

const SelectGroup = ({
  options,
  name,
  onChange,

  value: groupValue = [],
  ...props
}) => {
  return (
    <Box {...props}>
      {options.map(({ label, value }) => {
        return (
          <CheckBox
            key={value + label}
            name={name}
            label={label}
            checked={groupValue.indexOf(value) !== -1}
            onChange={event => {
              if (event.target.checked) {
                onChange([...groupValue, value]);
              } else {
                const idx = groupValue.indexOf(value);
                onChange([
                  ...groupValue.slice(0, idx),
                  ...groupValue.slice(idx + 1),
                ]);
              }
            }}
          />
        );
      })}
    </Box>
  );
};

export default SelectGroup;
