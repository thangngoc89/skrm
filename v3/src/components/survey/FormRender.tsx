import { h } from "preact";
import { useMemo } from "react";
import { Formik, Form, useFormikContext } from "formik";
import style from "./FormRender.css";
import { makeYupSchema } from "../form_schema/validate";
import {
  TextInput,
  Group,
  Button,
  DatePicker,
  SelectOneDropdown,
  SelectOneRadio,
  SelectMany,
  MatrixSelectOne,
  DentalArchTable,
  DentalArchTable2Rows,
} from "../form/FormComponents";

import { TextInput as ThemeTextInput, FormGroup, Label } from "@trussworks/react-uswds";
import { Form as FormSchema, Field as FieldSchema, Survey } from "../form_schema/schema";
import { List } from "../form_schema/schema";
import { notify, Msg } from "../notify";
import { useAsyncCallback } from "react-async-hook";
import { saveForm } from "../db/db_calls";
import { FormNavButton } from "./FormNavButton";
import { route } from "preact-router";

const renderField = (field: FieldSchema, lists: List, labelVerbose = false) => {
  switch (field.type) {
    case "group":
      return (
        <Group key={field.name} name={field.label} className={style.group}>
          {field.fields.map((field) => renderField(field, lists))}
        </Group>
      );
    case "date":
      return (
        <DatePicker
          key={field.name}
          name={field.name}
          label={field.label || ""}
          optional={field.optional}
          labelVerbose={labelVerbose}
        />
      );
    case "text":
      return (
        <TextInput
          key={field.name}
          name={field.name}
          label={field.label || ""}
          optional={field.optional}
          labelVerbose={labelVerbose}
        />
      );
    case "integer":
      return (
        <TextInput
          key={field.name}
          type="number"
          name={field.name}
          label={field.label || ""}
          optional={field.optional}
          labelVerbose={labelVerbose}
        />
      );
    case "select_one":
      if (field.display === "radio") {
        return (
          <SelectOneRadio
            key={field.name}
            name={field.name}
            label={field.label || ""}
            choices={field.choices}
            labelVerbose={labelVerbose}
          />
        );
      }
      return (
        <SelectOneDropdown
          key={field.name}
          name={field.name}
          label={field.label || ""}
          choices={field.choices}
          labelVerbose={labelVerbose}
        />
      );
    case "select_one_ref":
      if (field.display === "radio") {
        return (
          <SelectOneRadio
            key={field.name}
            name={field.name}
            label={field.label || ""}
            choices={lists[field.list]}
            labelVerbose={labelVerbose}
          />
        );
      }
      return (
        <SelectOneDropdown
          key={field.name}
          name={field.name}
          label={field.label || ""}
          choices={lists[field.list]}
          labelVerbose={labelVerbose}
        />
      );
    case "select_many":
      return (
        <SelectMany
          key={field.name}
          name={field.name}
          label={field.label || ""}
          choices={field.choices}
          labelVerbose={labelVerbose}
        />
      );
    case "select_many_ref":
      return (
        <SelectMany
          name={field.name}
          key={field.name}
          label={field.label || ""}
          choices={lists[field.list]}
          labelVerbose={labelVerbose}
        />
      );
    case "matrix_select_one":
      return (
        <MatrixSelectOne
          key={field.name}
          name={field.name}
          label={field.label || ""}
          choices={field.choices}
          labelVerbose={labelVerbose}
          subQuestions={field.subQuestions}
        />
      );
    case "dental_arch_table":
      return <DentalArchTable key={field.name} lists={lists} label={field.label} {...field} />;
    case "dental_arch_table_2_rows":
      return <DentalArchTable2Rows key={field.name} lists={lists} label={field.label} {...field} />;
    case "note":
      return <p>{field.label}</p>;
  }
};

const SubmitButton: React.FC<{}> = () => {
  const { handleSubmit, isValidating, errors } = useFormikContext();
  console.log(errors);

  return (
    <button type="submit" onClick={handleSubmit}>
      Lưu
    </button>
  );
};

interface FormRenderer {
  surveyId: string;
  form: FormSchema;
  initialValues?: any;
  makeInitialValues: () => any;
  nextAction: () => void;
  nextActionLabel: string;
  surveySchema: Survey;
}

export const FormRenderer: React.FC<FormRenderer> = ({
  surveySchema,
  form,
  initialValues,
  makeInitialValues,
  surveyId,
  nextAction,
  nextActionLabel,
}) => {
  const currentForm = form.name;
  const save = useAsyncCallback(saveForm);
  const validationSchema = useMemo(() => makeYupSchema(form), [form]);
  return (
    // @ts-ignore: broken formik definition
    <Formik
      initialValues={initialValues || makeInitialValues()}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={(values, actions) => {
        const { __internal_redirect, ...formData } = values;

        const shouldRedirect = typeof __internal_redirect === "string";

        return save.execute(surveyId, form.name, formData).then(() => {
          notify.success(
            shouldRedirect ? (
              "Lưu dữ liệu thành công."
            ) : (
              <Msg title="Lưu dữ liệu thành công." buttonLabel={nextActionLabel} buttonOnClick={nextAction} />
            ),
            {
              pauseOnFocusLoss: true,
            }
          );

          if (shouldRedirect) {
            route(__internal_redirect, true);
          }

          actions.setSubmitting(false);
        });
      }}
    >
      <div>
        <div className={style.sticky}>
          <nav className={style.left}>
            {surveySchema.forms.map(({ form }) => {
              return (
                <FormNavButton
                  key={form.name}
                  name={form.name}
                  label={form.labelShort}
                  currentForm={currentForm}
                  surveyId={surveyId}
                  activeClassName={style.active}
                />
              );
            })}
          </nav>
          <div className={style.right}>
            <SubmitButton />
          </div>
        </div>
        <div className={style.main}>
          <div className={style.intro}>
            <h1>{form.label}</h1>
            {form.labelSecondary && <h2>{form.labelSecondary}</h2>}
          </div>
          <Form className="usa-form" id="form">
            <FormGroup>
              <Label htmlFor={surveyId} hint=" (không sửa được)">
                Mã số hồ sơ VOSER
              </Label>
              <ThemeTextInput id="surveyId" type="text" name="surveyId" value={surveyId} disabled />
            </FormGroup>
            {form.survey.map((field) => renderField(field, form.lists || {}, form.labelVerbose))}
            <Button type="submit" secondary>
              Lưu
            </Button>
          </Form>
        </div>
      </div>
    </Formik>
  );
};
