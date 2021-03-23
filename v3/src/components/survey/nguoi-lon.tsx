import { h } from "preact";
import style from "./tieu-hoc.css";
import { useReducer } from "react";
import { useAsync, useAsyncCallback, UseAsyncReturn } from "react-async-hook";
import { db, SurveyDataKey, ISurveyData } from "../db";
import { route } from "preact-router";
import { FormRenderer } from "../form/FormRender";
import * as nguoi_lon_form from "../form_schema/nguoi_lon_form";
import * as nguoi_lon_questionare from "../form_schema/nguoi_lon_questionare";
import * as nguoi_lon_ohip14 from "../form_schema/nguoi_lon_ohip14";
import { NguoilonFormType, SurveyType } from "../types";
import { Spinner } from "../spinner";
import { notify } from "../notify";
const surveyType: SurveyType = "tieu_hoc";

type FormNavButtonProps = {
  name: NguoilonFormType;
  label: string;
  currentForm: NguoilonFormType;
  dispatch: (action: Action) => void;
};

// @todo: fix me
// const FormNavButton: React.FC<FormNavButtonProps> = ({ name, label, dispatch, currentForm }) => {
//   return (
//     <a
//       href="#"
//       onClick={(e) => {
//         e.preventDefault();
//         dispatch({ type: "change_form", newForm: name });
//       }}
//       disabled={currentForm === name}
//     >
//       {label}
//     </a>
//   );
// };

const FormNavButton: React.FC<FormNavButtonProps> = ({ name, label, dispatch, currentForm }) => {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        // dispatch({ type: "change_form", newForm: name });
        notify.info("Các bạn bấm Lưu -> Tiếp theo để sang bảng tiếp theo", { autoClose: 5000 });
      }}
      className={currentForm === name ? style.active : ""}
      disabled
    >
      {label}
    </a>
  );
};

const makeNextAction = (currentForm: NguoilonFormType, dispatch: (action: Action) => void) => {
  switch (currentForm) {
    case "nguoi_lon_form":
      return {
        nextAction: () => {
          dispatch({ type: "change_form", newForm: "nguoi_lon_questionare" });
          global.scrollTo(0, 0);
        },
        nextActionLabel: "Tiếp theo",
      };
    case "nguoi_lon_questionare":
      return {
        nextAction: () => {
          dispatch({ type: "change_form", newForm: "nguoi_lon_ohip14" });
          global.scrollTo(0, 0);
        },
        nextActionLabel: "Tiếp theo",
      };
    case "nguoi_lon_ohip14":
      return { nextAction: () => route("/new/" + surveyType), nextActionLabel: "Thêm hồ sơ mới" };
  }
};

type SelectFormToRenderProps = {
  surveyId: string;
  currentForm: NguoilonFormType;
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
    case "nguoi_lon_form":
      return <FormRenderer {...commonProps} {...nguoi_lon_form} />;
    case "nguoi_lon_questionare":
      return <FormRenderer {...commonProps} {...nguoi_lon_questionare} />;
    case "nguoi_lon_ohip14":
      return <FormRenderer {...commonProps} {...nguoi_lon_ohip14} />;
  }
};

type Props = {
  surveyId: string;
};

const loadForm = async (surveyId: string, currentForm: NguoilonFormType, dispatch: (action: Action) => void) => {
  return await db.data.get([surveyId, currentForm]).then((data) => {
    if (typeof data !== "undefined") {
      dispatch({ type: "update_form_data", formType: currentForm, data: data });
    }
  });
};

const saveForm = (surveyId: string, currentForm: NguoilonFormType, dispatch: (action: Action) => void) => {
  return async (formData: any) => {
    return await db.data.put({ data: formData, surveyId, surveyForm: currentForm }, [surveyId, currentForm]);
  };
};

type State = {
  currentForm: NguoilonFormType;
  formData: {
    nguoi_lon_form: ISurveyData | undefined;
    nguoi_lon_questionare: ISurveyData | undefined;
    nguoi_lon_ohip14: ISurveyData | undefined;
  };
};
type Action =
  | { type: "change_form"; newForm: NguoilonFormType }
  | { type: "update_form_data"; formType: NguoilonFormType; data: ISurveyData };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "change_form":
      return { ...state, currentForm: action.newForm };
    case "update_form_data": {
      return { ...state, formData: { ...state.formData, [action.formType]: action.data.data } };
    }
  }
}

export const Nguoilon: React.FC<Props> = ({ surveyId }) => {
  const [{ currentForm, formData }, dispatch] = useReducer(reducer, {
    currentForm: "nguoi_lon_form",
    formData: {
      nguoi_lon_form: undefined,
      nguoi_lon_questionare: undefined,
      nguoi_lon_ohip14: undefined,
    },
  });
  const dataLoader = useAsync(loadForm, [surveyId, currentForm, dispatch]);
  const saveData = useAsyncCallback(saveForm(surveyId, currentForm, dispatch));

  if (!dataLoader.loading && !dataLoader.error) {
    return (
      <div>
        <div className={style.sticky}>
          <nav className={style.left}>
            <FormNavButton name="nguoi_lon_form" label="Phiếu điều tra" currentForm={currentForm} dispatch={dispatch} />
            <FormNavButton
              name="nguoi_lon_questionare"
              label="Bảng câu hỏi"
              currentForm={currentForm}
              dispatch={dispatch}
            />
            <FormNavButton name="nguoi_lon_ohip14" label="OHIP-14" currentForm={currentForm} dispatch={dispatch} />
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
