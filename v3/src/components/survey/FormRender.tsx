import { h } from "preact";
import { useMemo, useEffect } from "react";
import { Formik, Form, useFormikContext } from "formik";
import style from "./FormRender.css";
import { makeYupSchema } from "../form_schema/validate";

import { TextInput as ThemeTextInput, FormGroup, Label } from "@trussworks/react-uswds";
import { Form as FormSchema, Survey } from "../form_schema/schema";
import { notify, Msg } from "../notify";
import { useAsyncCallback } from "react-async-hook";
import { saveForm } from "../db/db_calls";
import { FormNavButton } from "./FormNavButton";
import { route } from "preact-router";
import { renderField } from "./renderField";

const ToastForValidation: React.FC<{ keys: Array<string> }> = ({ keys }) => {
  let finalKeys: string[] = [];
  if (keys.length > 10) {
    finalKeys = keys.slice(0, 10);
  }

  return (
    <div className={style.toast}>
      <p>
        <strong>Phiếu điều tra chưa hoàn tất.</strong>{" "}
      </p>
      <p>Vui lòng kiểm tra lại các mục sau:</p>

      {finalKeys.map((key) => {
        return (
          <a
            href={"#" + key}
            onClick={(e) => {
              setTimeout(function () {
                if (window.location.hash.length !== 0) {
                  window.scrollTo(window.scrollX, window.scrollY - 150);
                }
              }, 0);
            }}
          >
            {key}
          </a>
        );
      })}
      {keys.length > 10 && <p>(...{keys.length - 10} mục nữa)</p>}
    </div>
  );
};
const SubmitButton: React.FC<{}> = () => {
  const { handleSubmit, isValidating, errors } = useFormikContext();
  useEffect(() => {
    if (!isValidating) {
      const keys = Object.keys(errors);

      if (keys.length !== 0) {
        notify.error(<ToastForValidation keys={keys} />);
      }
    }
  }, [errors, isValidating]);
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
            <hr />
            <h3>Kết thúc</h3>
          </Form>
        </div>
      </div>
    </Formik>
  );
};
