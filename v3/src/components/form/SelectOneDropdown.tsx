import { h, FunctionComponent } from "preact";
import { useMemo } from "react";
import { Dropdown, FormGroup, Label, ErrorMessage } from "@trussworks/react-uswds";
import { Field, FieldProps, FastField } from "formik";
import { Pair } from "../form_schema/schema";

interface SelectOneDropdownProps {
  name: string;
  label?: string;
  optional?: boolean;
  choices: Array<Pair>;
  labelVerbose?: boolean;
}

type choiceValuesCache = { [key: string]: string };

export const SelectOneDropdown: React.FC<SelectOneDropdownProps> = ({
  label,
  name,
  optional,
  choices,
  labelVerbose = false,
}) => {
  let choiceValues: choiceValuesCache = useMemo(() => {
    let cache: choiceValuesCache = {};

    choices.forEach(({ name }) => {
      cache[name] = name;
      cache[name.toUpperCase()] = name;
    });
    return cache;
  }, [choices]);

  return (
    <FastField name={name}>
      {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => {
        const hasError = Boolean(touched[field.name] && errors[field.name]);
        return (
          <FormGroup error={hasError}>
            {label && (
              <Label htmlFor={name} error={hasError} hint={optional ? " (tuỳ chọn)" : ""}>
                {labelVerbose && <strong>{`${name.toUpperCase()}. `}</strong>} {label}
              </Label>
            )}
            {hasError && <ErrorMessage>{errors[field.name]}</ErrorMessage>}
            <Dropdown
              {...field}
              id={field.name}
              onKeyUp={(event) => {
                if (!event.altKey && event.key !== "Space" && event.key !== "Tab") {
                  event.preventDefault();
                  if (typeof choiceValues[event.key] !== "undefined") {
                    setFieldValue(field.name, choiceValues[event.key]);
                  }
                }
              }}
            >
              <option>--</option>
              {choices.map((pair) => (
                <option value={pair.name} key={pair.name}>
                  {pair.label}
                </option>
              ))}
            </Dropdown>
          </FormGroup>
        );
      }}
    </FastField>
  );
};
