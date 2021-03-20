import { h, FunctionComponent } from "preact";
import {
  TextInput as ThemeTextInput,
  FormGroup,
  Label,
  ErrorMessage,
} from "@trussworks/react-uswds";
import { Field } from "formik";
interface TextInputProps {
  name: string;
  label: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, name }) => {
  return (
    <Field
      name={name}
      render={({ field, form: { touched, errors } }) => {
        const hasError = touched[field.name] && errors[field.name];
        return (
          <FormGroup error={hasError}>
            <Label htmlFor={name} error={hasError}>
              {label}
            </Label>
            {hasError && <ErrorMessage>{errors[field.name]}</ErrorMessage>}
            <ThemeTextInput
              {...field}
              type="text"
              error={hasError}
            />
          </FormGroup>
        );
      }}
    />
  );
};
