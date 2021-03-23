import { h } from "preact";
import style from "./SurveyRender.css";
import { useState, useEffect, useMemo, memo } from "react";
import { db, ISurveyData } from "../db";
import { Link } from "preact-router/match";
import { route } from "preact-router";
import { AsyncAction } from "../types";

import { FormRenderer } from "../form/FormRender";
import { Spinner } from "../spinner";
import { notify } from "../notify";
import { useHeaderColor } from "../useHeaderColor";
import { Survey } from "../form_schema/schema";
import { Error } from "../error";

/////////////// DATABASE OPERATIONS ///////////////////
const loadForm = async (surveyId: string, currentForm: string) => {
  return await db.data.get([surveyId, currentForm]);
};
///////////////////////////////////////////////////////

type FormNavButtonProps = {
  name: string;
  label: string;
  surveyId: string;
};

const FormNavButton: React.FC<FormNavButtonProps> = ({ name, label, surveyId }) => {
  return (
    <Link
      href={`/survey/${surveyId}/${name}`}
      onClick={(e) => {
        e.preventDefault();
        // dispatch({ type: "change_form", newForm: name });
        notify.info("Các bạn bấm Lưu -> Tiếp theo để sang bảng tiếp theo", { autoClose: 5000 });
      }}
      activeClassName={style.active}
      disabled
    >
      {label}
    </Link>
  );
};

const makeNextAction = (surveySchema: Survey, surveyId: string, currentFormPosition: number) => {
  const maxPosition = surveySchema.forms.length - 1;
  if (maxPosition === currentFormPosition) {
    return { nextAction: () => route("/new/" + surveySchema.name), nextActionLabel: "Thêm hồ sơ mới" };
  }
  return {
    nextAction: () => {
      route(`/survey/${surveyId}/${surveySchema.forms[currentFormPosition + 1].form.name}`);
      global.scrollTo(0, 0);
    },
    nextActionLabel: "Tiếp theo",
  };
};

type Props = {
  surveyId: string;
  currentForm?: string;
  surveySchema: Survey;
};

const getCurrentForm = (surveySchema: Survey, routeCurrentForm?: string) => {
  const forms = surveySchema.forms;

  const routeCurrentFormIndex = forms.findIndex(({ form: { name } }) => name === routeCurrentForm);

  if (routeCurrentForm && routeCurrentFormIndex !== -1) {
    return {
      currentForm: routeCurrentForm,
      currentFormPosition: routeCurrentFormIndex,
    };
  }

  // Default (!routeCurrentForm || routeCurrentForm is invalid)
  return {
    currentForm: forms[0].form.name,
    currentFormPosition: 0,
  };
};

type State = AsyncAction<ISurveyData | undefined, string>;

export const SurveyRender: React.FC<Props> = ({ surveyId, currentForm: routeCurrentForm, surveySchema }) => {
  useHeaderColor(surveySchema.headerColor);

  const { currentForm, currentFormPosition } = useMemo(() => getCurrentForm(surveySchema, routeCurrentForm), [
    surveySchema,
    routeCurrentForm,
  ]);

  const [state, setState] = useState<State>({ type: "initial" });
  useEffect(() => {
    loadForm(surveyId, currentForm)
      .then((result) => setState({ type: "success", payload: result }))
      .catch((error) => {
        console.error(error);
        setState({ type: "error", payload: error.message });
      });
  }, [surveyId, currentForm]);

  const { nextAction, nextActionLabel } = makeNextAction(surveySchema, surveyId, currentFormPosition);

  switch (state.type) {
    case "initial":
    case "loading":
      return (
        <div className="wrapper">
          <Spinner />
        </div>
      );
    case "success":
      const result = state.payload;

      return (
        <div>
          <div className={style.sticky}>
            <nav className={style.left}>
              {surveySchema.forms.map(({ form }) => {
                return <FormNavButton key={form.name} name={form.name} label={form.labelShort} surveyId={surveyId} />;
              })}
            </nav>
            <div className={style.right} id="formActions"></div>
          </div>
          <FormRenderer
            form={surveySchema.forms[currentFormPosition].form}
            surveyId={surveyId}
            initialValues={result && result.data}
            makeInitialValues={surveySchema.forms[currentFormPosition].makeInitialValues}
            nextAction={nextAction}
            nextActionLabel={nextActionLabel}
          />
        </div>
      );

    case "error":
      return (
        <div className="wrapper">
          <Error title="Đã có lỗi xảy ra" explain={state.payload} />
        </div>
      );
  }
};
