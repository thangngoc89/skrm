import { h } from "preact";
import { Formik, Form } from "formik";
import style from "./FormRender.css";
import {
  TextInput,
  Group,
  Button,
  DatePicker,
  SelectOneDropdown,
  DentalArchTable,
  DentalArchTable2Rows,
} from "./FormComponents";
import { Form as FormSchema, Field as FieldSchema } from "../form_schema/schema";
import { List } from "../form_schema/schema";
import { format } from "date-fns";

const renderField = (field: FieldSchema, lists: List) => {
  switch (field.type) {
    case "group":
      return (
        <Group name={field.label} key={field.name} className={style.group}>
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
    case "dental_arch_table":
      return <DentalArchTable lists={lists} label={field.label} {...field} />;
    case "dental_arch_table_2_rows":
      return <DentalArchTable2Rows lists={lists} label={field.label} {...field} />;
    default:
      return null;
  }
};

interface FormRenderer {
  form: FormSchema;
  initialValues?: any;
  makeInitialValues: () => any;
}

export const FormRenderer: React.FC<FormRenderer> = ({ form, initialValues, makeInitialValues }) => {
  return (
    // @ts-ignore: broken formik definition
    <Formik
      initialValues={initialValues || makeInitialValues()}
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
            Lưu
          </Button>
        </Form>
      </div>
    </Formik>
  );
};
