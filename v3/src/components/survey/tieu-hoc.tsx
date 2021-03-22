import { h } from "preact";
import style from "./tieu-hoc.css";
import { useReducer } from "react";
import { useAsync, useAsyncCallback, UseAsyncReturn } from "react-async-hook";
import { db, SurveyDataKey, ISurveyData } from "../db";
import { route } from "preact-router";
import { FormRenderer } from "../form/FormRender";
import * as tieu_hoc_form from "../form_schema/tieu_hoc_form";
import * as tieu_hoc_questionare from "../form_schema/tieu_hoc_questionare";
import * as tieu_hoc_child_oidp from "../form_schema/tieu_hoc_child_oidp";
import { TieuhocFormType, SurveyType } from "../types";
import { Spinner } from "../spinner";

const surveyType: SurveyType = "tieu_hoc";

type FormNavButtonProps = {
  name: TieuhocFormType;
  label: string;
  currentForm: TieuhocFormType;
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

const makeNextAction = (currentForm: TieuhocFormType, dispatch: (action: Action) => void) => {
  switch (currentForm) {
    case "tieu_hoc_form":
      return {
        nextAction: () => {
          dispatch({ type: "change_form", newForm: "tieu_hoc_questionare" });
          global.scrollTo(0, 0);
        },
        nextActionLabel: "Tiếp theo",
      };
    case "tieu_hoc_questionare":
      return {
        nextAction: () => {
          dispatch({ type: "change_form", newForm: "tieu_hoc_child_oidp" });
          global.scrollTo(0, 0);
        },
        nextActionLabel: "Tiếp theo",
      };
    case "tieu_hoc_child_oidp":
      return { nextAction: () => route("/new/" + surveyType), nextActionLabel: "Thêm hồ sơ mới" };
  }
};

type SelectFormToRenderProps = {
  surveyId: string;
  currentForm: TieuhocFormType;
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

  switch (currentForm) {
    case "tieu_hoc_form":
      return <FormRenderer {...commonProps} {...tieu_hoc_form} />;
    case "tieu_hoc_questionare":
      return <FormRenderer {...commonProps} {...tieu_hoc_questionare} />;
    case "tieu_hoc_child_oidp":
      return <FormRenderer {...commonProps} {...tieu_hoc_child_oidp} />;
  }
};

type Props = {
  surveyId: string;
};

const loadForm = async (surveyId: string, currentForm: TieuhocFormType, dispatch: (action: Action) => void) => {
  return await db.data.get([surveyId, currentForm]).then((data) => {
    if (typeof data !== "undefined") {
      dispatch({ type: "update_form_data", formType: currentForm, data: data });
    }
  });
};

const saveForm = (surveyId: string, currentForm: TieuhocFormType, dispatch: (action: Action) => void) => {
  return async (formData: any) => {
    return await db.data.put({ data: formData, surveyId, surveyForm: currentForm }, [surveyId, currentForm]);
  };
};

type State = {
  currentForm: TieuhocFormType;
  formData: {
    tieu_hoc_form: ISurveyData | undefined;
    tieu_hoc_questionare: ISurveyData | undefined;
    tieu_hoc_child_oidp: ISurveyData | undefined;
  };
};
type Action =
  | { type: "change_form"; newForm: TieuhocFormType }
  | { type: "update_form_data"; formType: TieuhocFormType; data: ISurveyData };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "change_form":
      return { ...state, currentForm: action.newForm };
    case "update_form_data": {
      return { ...state, formData: { ...state.formData, [action.formType]: action.data.data } };
    }
  }
}

export const Tieuhoc: React.FC<Props> = ({ surveyId }) => {
  const [{ currentForm, formData }, dispatch] = useReducer(reducer, {
    currentForm: "tieu_hoc_form",
    formData: {
      tieu_hoc_form: undefined,
      tieu_hoc_questionare: undefined,
      tieu_hoc_child_oidp: undefined,
    },
  });
  const dataLoader = useAsync(loadForm, [surveyId, currentForm, dispatch]);
  const saveData = useAsyncCallback(saveForm(surveyId, currentForm, dispatch));

  if (!dataLoader.loading && !dataLoader.error) {
    return (
      <div>
        <div className={style.sticky}>
          <nav className={style.left}>
            <FormNavButton name="tieu_hoc_form" label="Phiếu điều tra" currentForm={currentForm} dispatch={dispatch} />
            <FormNavButton
              name="tieu_hoc_questionare"
              label="Bảng câu hỏi"
              currentForm={currentForm}
              dispatch={dispatch}
            />
            <FormNavButton
              name="tieu_hoc_child_oidp"
              label="Child-OIDP"
              currentForm={currentForm}
              dispatch={dispatch}
            />
          </nav>
          <div className={style.right}>
            <button>Lưu</button>
          </div>
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
