import { h, FunctionComponent } from "preact";
import { TextInput as ThemeTextInput, FormGroup, Label, ErrorMessage } from "@trussworks/react-uswds";
import { Field } from "formik";

interface TextInputProps {
  type?: string;
  name: string;
  label: string;
  optional?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({ type = "text", label, name, optional }) => {
  return (
    <Field
      name={name}
      render={({ field, form: { touched, errors } }) => {
        const hasError = touched[field.name] && errors[field.name];
        return (
          <FormGroup error={hasError}>
            <Label htmlFor={name} error={hasError} hint={optional === true ? " (tuỳ chọn)" : ""}>
              {label}
            </Label>
            {hasError && <ErrorMessage>{errors[field.name]}</ErrorMessage>}
            <ThemeTextInput {...field} type={type} error={hasError} />
          </FormGroup>
        );
      }}
    />
  );
};
