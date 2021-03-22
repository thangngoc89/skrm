import { h } from "preact";
import { Checkbox, FormGroup, Label, ErrorMessage } from "@trussworks/react-uswds";
import { FieldProps, FastField } from "formik";
import { Pair } from "../form_schema/schema";

interface SelectOneDropdownProps {
  name: string;
  label?: string;
  optional?: boolean;
  choices: Array<Pair>;
  labelVerbose?: boolean;
}

export const SelectMany: React.FC<SelectOneDropdownProps> = ({
  label,
  name,
  optional,
  choices,
  labelVerbose = false,
}) => {
  return (
    <FastField name={name}>
      {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => {
        const fieldValue = field.value || [];
        const hasError = Boolean(touched[field.name] && errors[field.name]);
        return (
          <FormGroup error={hasError}>
            {label && (
              <Label htmlFor={name} error={hasError} hint={optional ? " (tuỳ chọn)" : ""}>
                {labelVerbose && <strong>{`${name.toUpperCase()}. `}</strong>} {label}
              </Label>
            )}
            {hasError && <ErrorMessage>{errors[field.name]}</ErrorMessage>}
            {choices.map(({ name, label }) => {
              const uniqueName = `${field.name}_${name}`;
              return (
                <Checkbox
                  id={uniqueName}
                  name={name}
                  checked={fieldValue.indexOf(name) !== -1}
                  label={label}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setFieldValue(field.name, [...fieldValue, name]);
                    } else {
                      const idx = field.value.indexOf(name);
                      setFieldValue(field.name, [...fieldValue.slice(0, idx), ...fieldValue.slice(idx + 1)]);
                    }
                  }}
                  onBlur={field.onBlur}
                />
              );
            })}
          </FormGroup>
        );
      }}
    </FastField>
  );
};
