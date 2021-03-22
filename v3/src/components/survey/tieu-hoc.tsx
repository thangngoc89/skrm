import { h } from "preact";
import style from "./tieu-hoc.css";
import { FormRenderer } from "../form/FormRender";
import { useReducer } from "react";
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
      {currentForm === "tieu_hoc_form" && <FormRenderer {...tieu_hoc_form} />}
      {currentForm === "tieu_hoc_questionare" && <FormRenderer {...tieu_hoc_questionare} />}
      {currentForm === "tieu_hoc_child_oidp" && <FormRenderer {...tieu_hoc_child_oidp} />}
    </div>
  );
};
