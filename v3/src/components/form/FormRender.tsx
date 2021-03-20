import { h, FunctionComponent } from "preact";
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from "formik";
import style from "./FormRender.css";
import { TextInput, Group, Button, DatePicker, SelectOneDropdown } from "./FormComponents";
import { Form as FormSchema, Field as FieldSchema } from "../form_schema/schema";
import { List } from "../form_schema/schema";
interface FormRenderer {
  form: FormSchema;
}

const renderField = (field: FieldSchema, lists: List) => {
  switch (field.type) {
    case "group":
      return (
        <Group name={field.label} key={field.name}>
          {field.fields.map((field) => renderField(field, lists))}
        </Group>
    );
    case "date":
      return <DatePicker name={field.name} label={field.label || ""} optional={field.optional} />;
    case "text":
      return <TextInput name={field.name} label={field.label || ""} optional={field.optional} />;
    case "integer":
      return <TextInput type="number" name={field.name} label={field.label || ""} optional={field.optional} />;
    case "select_one":
      return <SelectOneDropdown name={field.name} label={field.label || ""} choices={field.choices} />;
    case "select_one_ref":
      return <SelectOneDropdown name={field.name} label={field.label || ""} choices={lists[field.list]} />;
    default:
      return null;
  }
};
export const FormRenderer: React.FC<FormRenderer> = ({ form }) => {
  return (
    <Formik
      initialValues={{ ngay_kham: "2021-03-20" }}
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
          {form.survey.map((field) => renderField(field, form.lists || {}))}
          <Button type="submit" secondary>
            Submit
          </Button>
        </Form>
      </div>
    </Formik>
  );
};
