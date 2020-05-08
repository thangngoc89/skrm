import * as React from "react";
import * as Survey from "../../reason/Survey.gen";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import { Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";

import { FieldsRender } from "./FormRender";

import { useField } from "formik";

let calculateRequired = (field: Survey.metadata) =>
  typeof field.required !== "undefined" ? field.required : true;

interface GroupProps {
  field: Survey.group;
}

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: "1.2rem",
    paddingTop: theme.spacing(1.5),
  },
  groupHeader: {
    fontWeight: 700,
    display: "block",
  },
}));

export const Group = ({ field }: GroupProps) => {
  const classes = useStyles();
  return (
    <Box mt={3} mb={2}>
      <Typography
        variant="h4"
        component="h2"
        color="textSecondary"
        className={classes.groupHeader}
      >
        {field.label}
      </Typography>
      <FieldsRender fields={field.params} />
    </Box>
  );
};

interface SelectOneProps {
  field: Survey.select;
}

export const SelectOne = ({ field }: SelectOneProps) => {
  const [_, meta, helpers] = useField(field.id);

  const { value = "" } = meta;
  const { setValue } = helpers;

  const classes = useStyles();
  return (
    <FormControl component="fieldset">
      <FormLabel
        component="legend"
        className={classes.label}
        required={calculateRequired(field)}
      >
        {field.label}
      </FormLabel>
      <RadioGroup
        aria-label={field.label || field.id}
        name={field.id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {field.params.map((pair) => (
          <FormControlLabel
            key={pair.value}
            value={pair.value}
            control={<Radio />}
            label={pair.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

interface TextProps {
  field: Survey.text;
}

export const Text = ({ field }: TextProps) => {
  const [formikField, _meta, _helpers] = useField(field.id);

  const classes = useStyles();

  return (
    <TextField
      {...formikField}
      value={formikField.value || ""}
      name={field.id}
      variant="outlined"
      label={field.label}
      required={calculateRequired(field)}
      fullWidth
    />
  );
};

const isChecked = (needle: string, haystack: string[]) =>
  haystack.indexOf(needle) !== -1;

const toggleCheckboxItem = (currentValue: string, arrayValue: string[]) => {
  const idx = arrayValue.indexOf(currentValue);
  if (idx === -1) {
    return [...arrayValue, currentValue];
  } else {
    return [...arrayValue.slice(0, idx), ...arrayValue.slice(idx + 1)];
  }
};

interface SelectMultipleProps {
  field: Survey.select;
}

export const SelectMultiple = ({ field }: SelectMultipleProps) => {
  const [_, meta, helpers] = useField(field.id);

  const { value = "" } = meta;
  const { setValue } = helpers;

  const classes = useStyles();

  return (
    <FormControl component="fieldset">
      <FormLabel
        component="legend"
        required={calculateRequired(field)}
        className={classes.label}
      >
        {field.label}
      </FormLabel>
      <FormGroup>
        {field.params.map((pair) => (
          <FormControlLabel
            key={pair.value}
            value={pair.value}
            label={pair.label}
            control={
              <Checkbox
                checked={isChecked(pair.value, value)}
                onChange={(_) => {
                  setValue(toggleCheckboxItem(pair.value, value));
                }}
                name={pair.value}
              />
            }
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

interface DateProps {
  field: Survey.dateTime;
}

export const DatePicker = ({ field }: DateProps) => {
  const [_, meta, helpers] = useField(field.id);
  let current: Date = new Date();
  const { value = current } = meta;
  const { setValue, setTouched } = helpers;

  return (
    <KeyboardDatePicker
      fullWidth
      value={value}
      inputVariant="outlined"
      label={field.label}
      onChange={(date) => setValue(date)}
      onBlur={(e) => {
        console.log(e);
        setTouched(false);
      }}
      format={field.format || "dd/MM/yyyy"}
    />
  );
};
