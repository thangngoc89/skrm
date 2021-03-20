import { h, FunctionComponent } from "preact";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import style from "./FormRender.css";
import { TextInput, Group, Button } from "./FormComponents";
import { form } from "../form_schema/schema";

interface FormRenderer {
  form: form;
}

export const FormRenderer: React.FC<FormRenderer> = ({ form }) => {
  return (
    <Formik
      initialValues={{}}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      <div className={style.main}>
        <div className={style.intro}>
          <h1>{form.label}</h1>
          {form.labelSecondary && <h2>{form.labelSecondary}</h2>}
        </div>
        <Form className="usa-form">
          <Group name="Hành chính">
            <TextInput name="firstName" label="First name" />
            <TextInput name="lastName" label="Last name" />

            <Button type="submit">Submit</Button>
          </Group>
        </Form>
      </div>
    </Formik>
  );
};
