import { h, FunctionComponent } from "preact";
import { Radio, FormGroup, Label, ErrorMessage } from "@trussworks/react-uswds";
import { FieldProps, FastField } from "formik";
import { Pair } from "../form_schema/schema";

interface SelectOneDropdownProps {
  name: string;
  label?: string;
  optional?: boolean;
  choices: Array<Pair>;
  labelVerbose?: boolean;
}

export const SelectOneRadio: React.FC<SelectOneDropdownProps> = ({
  label,
  name,
  optional,
  choices,
  labelVerbose = false,
}) => {
  return (
    <FastField name={name}>
      {({ field, form: { errors } }: FieldProps) => {
        const hasError = Boolean(errors[field.name]);
        return (
          <FormGroup error={hasError}>
            {label && (
              <Label htmlFor={name} error={hasError} hint={optional ? " (tuỳ chọn)" : ""}>
                {labelVerbose && <strong>{`${name.toUpperCase()}. `}</strong>} {label}
              </Label>
            )}
            {hasError && <ErrorMessage>{errors[field.name]}</ErrorMessage>}
            {choices.map(({ name, label }, i) => {
              const uniqueName = `${field.name}_${name}`;
              return (
                <Radio
                  key={uniqueName}
                  id={uniqueName}
                  value={name}
                  name={field.name}
                  label={label}
                  checked={name === field.value}
                  onClick={field.onChange}
                  onBlur={field.onBlur}
                ></Radio>
              );
            })}
          </FormGroup>
        );
      }}
    </FastField>
  );
};
