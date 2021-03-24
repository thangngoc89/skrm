import { h } from "preact";
import { useMemo } from "react";
import { route } from "preact-router";
import { useFormikContext } from "formik";
import objStr from "obj-str";

type FormNavButtonProps = {
  name: string;
  label: string;
  surveyId: string;
  currentForm: string;
  activeClassName: string;
};

export const FormNavButton: React.FC<FormNavButtonProps> = ({
  name: formName,
  currentForm,
  label,
  surveyId,
  activeClassName,
}) => {
  const { setFieldValue, dirty, handleSubmit } = useFormikContext();
  const formRoute = useMemo(() => `/survey/${surveyId}/${formName}`, [surveyId, formName]);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        if (dirty) {
          // @todo: change to set state instead
          setFieldValue("__internal_redirect", formRoute, false);
          handleSubmit(e);
        } else {
          route(formRoute, true);
        }
      }}
      className={objStr({
        [activeClassName]: formName === currentForm,
      })}
      disabled={formName === currentForm}
    >
      {label}
    </button>
  );
};
