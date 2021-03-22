import { h } from "preact";
import { Formik, Form, useFormikContext } from "formik";
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
import { TextInput as ThemeTextInput, FormGroup, Label } from "@trussworks/react-uswds";
import { UseAsyncReturn } from "react-async-hook";
import { Form as FormSchema, Field as FieldSchema } from "../form_schema/schema";
import { List } from "../form_schema/schema";
import { SurveyDataKey } from "../db";
import { notify, Msg } from "../notify";
import MountPortal from "../MountPortal";

const renderField = (field: FieldSchema, lists: List, labelVerbose = false) => {
  switch (field.type) {
    case "group":
      return (
        <Group name={field.label} key={field.name} className={style.group}>
          {field.fields.map((field) => renderField(field, lists))}
        </Group>
      );
    case "date":
      return (
        <DatePicker name={field.name} label={field.label || ""} optional={field.optional} labelVerbose={labelVerbose} />
      );
    case "text":
      return (
        <TextInput name={field.name} label={field.label || ""} optional={field.optional} labelVerbose={labelVerbose} />
      );
    case "integer":
      return (
        <TextInput
          type="number"
          name={field.name}
          label={field.label || ""}
          optional={field.optional}
          labelVerbose={labelVerbose}
        />
      );
    case "select_one":
      return (
        <SelectOneDropdown
          name={field.name}
          label={field.label || ""}
          choices={field.choices}
          labelVerbose={labelVerbose}
        />
      );
    case "select_one_ref":
      return (
        <SelectOneDropdown
          name={field.name}
          label={field.label || ""}
          choices={lists[field.list]}
          labelVerbose={labelVerbose}
        />
      );
    case "dental_arch_table":
      return <DentalArchTable lists={lists} label={field.label} {...field} />;
    case "dental_arch_table_2_rows":
      return <DentalArchTable2Rows lists={lists} label={field.label} {...field} />;
    default:
      return null;
  }
};

interface FormRenderer {
  surveyId: string;
  form: FormSchema;
  initialValues?: any;
  makeInitialValues: () => any;
  save: UseAsyncReturn<SurveyDataKey, [any]>;
  nextAction: () => void;
  nextActionLabel: string;
}

const SubmitButton: React.FC<{}> = () => {
  const { handleSubmit } = useFormikContext();
  return (
    <button type="submit" onClick={handleSubmit}>
      Lưu
    </button>
  );
};
export const FormRenderer: React.FC<FormRenderer> = ({
  form,
  initialValues,
  makeInitialValues,
  surveyId,
  save,
  nextAction,
  nextActionLabel,
}) => {
  return (
    // @ts-ignore: broken formik definition
    <Formik
      initialValues={initialValues || makeInitialValues()}
      onSubmit={(values, actions) => {
        return save.execute(values).then(() => {
          notify.success(
            <Msg title="Lưu dữ liệu thành công." buttonLabel={nextActionLabel} buttonOnClick={nextAction} />,
            {
              position: notify.POSITION.BOTTOM_RIGHT,
              pauseOnFocusLoss: true,
            }
          );
          actions.setSubmitting(false);
        });
      }}
    >
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
          <MountPortal id="formActions">
            <SubmitButton />
          </MountPortal>
        </Form>
      </div>
    </Formik>
  );
};
