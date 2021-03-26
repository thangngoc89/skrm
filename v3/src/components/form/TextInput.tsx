import { h, FunctionComponent } from "preact";
import { TextInput as ThemeTextInput, FormGroup, Label, ErrorMessage } from "@trussworks/react-uswds";
import { FastField, FieldProps } from "formik";

interface TextInputProps {
  type?: "text" | "number";
  name: string;
  label: string;
  optional?: boolean;
  labelVerbose?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({ type = "text", label, name, optional, labelVerbose = false }) => {
  return (
    <FastField name={name}>
      {({ field, form: { touched, errors } }: FieldProps) => {
        const hasError = Boolean(errors[field.name]);
        return (
          <FormGroup error={hasError}>
            <Label htmlFor={name} error={hasError} hint={optional === true ? " (tuỳ chọn)" : ""}>
              {labelVerbose && <strong>{`${name.toUpperCase()}. `}</strong>} {label}
            </Label>
            {hasError && <ErrorMessage>{errors[field.name]}</ErrorMessage>}
            <ThemeTextInput id={field.name} type={type} error={hasError} {...field} />
          </FormGroup>
        );
      }}
    </FastField>
  );
};
