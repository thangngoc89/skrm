import { h } from "preact";
import style from "./tieu-hoc.css";
import { useReducer } from "react";

import { FormRenderer } from "../form/FormRender";
import * as tieu_hoc_form from "../form_schema/tieu_hoc_form";
import * as tieu_hoc_questionare from "../form_schema/tieu_hoc_questionare";
import * as tieu_hoc_child_oidp from "../form_schema/tieu_hoc_child_oidp";
import { TieuhocFormType } from "../types";
type State = {
  currentForm: TieuhocFormType;
};
type Action = { type: "change_form"; newForm: TieuhocFormType };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "change_form":
      return { ...state, currentForm: action.newForm };
  }
}

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

type SelectFormToRenderProps = {
  surveyId: string;
  currentForm: TieuhocFormType;
};
const SelectFormToRender: React.FC<SelectFormToRenderProps> = ({ surveyId, currentForm }) => {
  switch (currentForm) {
    case "tieu_hoc_form":
      return <FormRenderer surveyId={surveyId} {...tieu_hoc_form} />;
    case "tieu_hoc_questionare":
      return <FormRenderer surveyId={surveyId} {...tieu_hoc_questionare} />;
    case "tieu_hoc_child_oidp":
      return <FormRenderer surveyId={surveyId} {...tieu_hoc_child_oidp} />;
  }
};

type Props = {
  surveyId: string;
};

export const Tieuhoc: React.FC<Props> = ({ surveyId }) => {
  const [{ currentForm }, dispatch] = useReducer(reducer, { currentForm: "tieu_hoc_form" });
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
          <FormNavButton name="tieu_hoc_child_oidp" label="Child-OIDP" currentForm={currentForm} dispatch={dispatch} />
        </nav>
        <div className={style.right}>
          <button>Lưu</button>
        </div>
      </div>
      <SelectFormToRender currentForm={currentForm} surveyId={surveyId} />
    </div>
  );
};
