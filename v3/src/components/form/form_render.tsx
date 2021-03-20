import { h, FunctionComponent } from "preact";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";

import { TextInput, Group, Button } from "./FormComponents";

export const FormRenderer: React.FC<{}> = () => {
  const initialValues = { firstName: "", lastName: "" };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      <Form className="usa-form">
        <Group name="Hành chính">
          <TextInput name="firstName" label="First name" />
          <TextInput name="lastName" label="Last name" />

          <Button type="submit">Submit</Button>
        </Group>
      </Form>
    </Formik>
  );
};
