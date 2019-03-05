import React from "react";
import { Box } from "grommet";
import RadioButton from "./RadioButton.gen";

const RadioGroup = ({
  options,
  name,
  onChange,
  value: groupValue,
  ...props
}) => {
  return (
    <Box {...props}>
      {options.map(({ label, value }) => {
        return (
          <RadioButton
            key={value + label}
            name={name}
            label={label}
            value={value}
            checked={value === groupValue}
            onChange={event => onChange(event.target.value)}
          />
        );
      })}
    </Box>
  );
};

export default RadioGroup;
