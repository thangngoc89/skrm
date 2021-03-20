import { h, FunctionComponent } from "preact";
import { Dropdown, FormGroup, Label, ErrorMessage } from "@trussworks/react-uswds";
import { Field, FieldProps } from "formik";
import { Pair } from "../form_schema/schema";

interface SelectOneDropdownProps {
  type?: string;
  name: string;
  label: string;
  optional?: boolean;
  choices: Array<Pair>;
}

export const SelectOneDropdown: React.FC<SelectOneDropdownProps> = ({
  type = "text",
  label,
  name,
  optional,
  choices,
}) => {
  return (
    <Field name={name}>
      {({ field, form: { touched, errors } }: FieldProps) => {
        const hasError = Boolean(touched[field.name] && errors[field.name]);
        return (
          <FormGroup error={hasError}>
            <Label htmlFor={name} error={hasError} hint={optional === true ? " (tuỳ chọn)" : ""}>
              {label}
            </Label>
            {hasError && <ErrorMessage>{errors[field.name]}</ErrorMessage>}
            <Dropdown {...field} id={field.name} error={hasError}>
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
