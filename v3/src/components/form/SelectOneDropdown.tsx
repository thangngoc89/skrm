import { h, FunctionComponent } from "preact";
import { useMemo } from "react";
import { Dropdown, FormGroup, Label, ErrorMessage } from "@trussworks/react-uswds";
import { Field, FieldProps } from "formik";
import { Pair } from "../form_schema/schema";

interface SelectOneDropdownProps {
  name: string;
  label?: string;
  optional?: boolean;
  choices: Array<Pair>;
}

export const SelectOneDropdown: React.FC<SelectOneDropdownProps> = ({ label, name, optional, choices }) => {
  let choiceValues: Array<string> = useMemo(() => choices.map(({ name }) => name), [choices]);

  return (
    <Field name={name}>
      {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => {
        const hasError = Boolean(touched[field.name] && errors[field.name]);
        return (
          <FormGroup error={hasError}>
            {label && (
              <Label htmlFor={name} error={hasError} hint={optional ? " (tuỳ chọn)" : ""}>
                {label}
              </Label>
            )}
            {hasError && <ErrorMessage>{errors[field.name]}</ErrorMessage>}
            <Dropdown
              {...field}
              id={field.name}
              onKeyUp={(event) => {
                if (!event.altKey && event.key !== "Space" && event.key !== "Tab") {
                  event.preventDefault();
                  if (choiceValues.indexOf(event.key) !== -1) {
                    setFieldValue(field.name, event.key);
                  } else if (choiceValues.indexOf(event.key.toLowerCase()) !== -1) {
                    setFieldValue(field.name, event.key.toLowerCase());
                  }
                }
              }}
            >
              <option>--</option>
              {choices.map((pair) => (
                <option value={pair.name}>{pair.label}</option>
              ))}
            </Dropdown>
          </FormGroup>
        );
      }}
    </Field>
  );
};
