import { h, FunctionComponent } from "preact";
import { DatePicker as ThemeDatePicker, FormGroup, Label, ErrorMessage } from "@trussworks/react-uswds";
import { Field, FieldProps } from "formik";

interface DataPickerProps {
  name: string;
  label: string;
  optional?: boolean;
}

export const DatePicker: React.FC<DataPickerProps> = ({ label, name, optional }) => {
  console.log(name);
  return (
    <Field name={name}>
      {({ field, form: { touched, errors, setFieldValue, setTouched } }: FieldProps) => {
        const hasError = Boolean(touched[field.name] && errors[field.name]);

        return (
          <FormGroup error={hasError}>
            <Label htmlFor={name} error={hasError} hint={optional === true ? " (tuỳ chọn)" : ""}>
              {label}
            </Label>
            {hasError && <ErrorMessage>{errors[field.name]}</ErrorMessage>}
            <ThemeDatePicker
              id={field.id}
              name={field.name}
              // error={hasError}
              onChange={(value) => {
                setFieldValue(field.name, value);
              }}
              onBlur={(_) => {
                setTouched({ [field.name]: true });
              }}
            />
          </FormGroup>
        );
      }}
    </Field>
  );
};
