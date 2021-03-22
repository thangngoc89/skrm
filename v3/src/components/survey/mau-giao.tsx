import { h } from "preact";
import style from "./tieu-hoc.css";
import { useReducer } from "react";
import { useAsync, useAsyncCallback, UseAsyncReturn } from "react-async-hook";
import { db, SurveyDataKey, ISurveyData } from "../db";
import { route } from "preact-router";
import { FormRenderer } from "../form/FormRender";
import * as mau_giao_form from "../form_schema/mau_giao_form";
import { MaugiaoFormType, SurveyType } from "../types";
import { Spinner } from "../spinner";

const surveyType: SurveyType = "mau_giao";

type FormNavButtonProps = {
  name: MaugiaoFormType;
  label: string;
  currentForm: MaugiaoFormType;
  dispatch: (action: Action) => void;
};

const FormNavButton: React.FC<FormNavButtonProps> = ({ name, label, dispatch, currentForm }) => {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        dispatch({ type: "change_form", newForm: name });
      }}
      disabled={currentForm === name}
    >
      {label}
    </a>
  );
};

const makeNextAction = (currentForm: MaugiaoFormType, dispatch: (action: Action) => void) => ({
  nextAction: () => route("/new/" + surveyType),
  nextActionLabel: "Thêm hồ sơ mới",
});

type SelectFormToRenderProps = {
  surveyId: string;
  currentForm: MaugiaoFormType;
  currentFormData: any;
  save: UseAsyncReturn<SurveyDataKey, [any]>;
  dispatch: (action: Action) => void;
};

const SelectFormToRender: React.FC<SelectFormToRenderProps> = ({
  surveyId,
  currentForm,
  currentFormData,
  save,
  dispatch,
}) => {
  const { nextAction, nextActionLabel } = makeNextAction(currentForm, dispatch);

  const commonProps = {
    surveyId,
    save,
    initialValues: currentFormData,
    nextAction,
    nextActionLabel,
  };

  return <FormRenderer {...commonProps} {...mau_giao_form} />;
};

type Props = {
  surveyId: string;
};

const loadForm = async (surveyId: string, currentForm: MaugiaoFormType, dispatch: (action: Action) => void) => {
  return await db.data.get([surveyId, currentForm]).then((data) => {
    if (typeof data !== "undefined") {
      dispatch({ type: "update_form_data", formType: currentForm, data: data });
    }
  });
};

const saveForm = (surveyId: string, currentForm: MaugiaoFormType, dispatch: (action: Action) => void) => {
  return async (formData: any) => {
    return await db.data.put({ data: formData, surveyId, surveyForm: currentForm }, [surveyId, currentForm]);
  };
};

type State = {
  currentForm: MaugiaoFormType;
  formData: {
    mau_giao_form: ISurveyData | undefined;
  };
};
type Action =
  | { type: "change_form"; newForm: MaugiaoFormType }
  | { type: "update_form_data"; formType: MaugiaoFormType; data: ISurveyData };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "change_form":
      return { ...state, currentForm: action.newForm };
    case "update_form_data": {
      return { ...state, formData: { ...state.formData, [action.formType]: action.data.data } };
    }
  }
}

export const Maugiao: React.FC<Props> = ({ surveyId }) => {
  const [{ currentForm, formData }, dispatch] = useReducer(reducer, {
    currentForm: "mau_giao_form",
    formData: {
      mau_giao_form: undefined,
    },
  });
  const dataLoader = useAsync(loadForm, [surveyId, currentForm, dispatch]);
  const saveData = useAsyncCallback(saveForm(surveyId, currentForm, dispatch));

  if (!dataLoader.loading && !dataLoader.error) {
    return (
      <div>
        <div className={style.sticky}>
          <nav className={style.left}>
            <FormNavButton name="mau_giao_form" label="Phiếu điều tra" currentForm={currentForm} dispatch={dispatch} />
          </nav>
          <div className={style.right} id="formActions"></div>
        </div>
        <SelectFormToRender
          currentForm={currentForm}
          surveyId={surveyId}
          currentFormData={formData[currentForm]}
          save={saveData}
          dispatch={dispatch}
        />
      </div>
    );
  } else {
    return <Spinner />;
  }
};
