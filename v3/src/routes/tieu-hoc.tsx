import { h } from "preact";
import style from "./tieu-hoc.css";
import { FormRenderer } from "../components/form/FormRender";
// import { Link } from "preact-router/match";
import { useReducer } from "react";
import * as tieu_hoc_form from "../components/form_schema/tieu_hoc_form";
import * as tieu_hoc_questionare from "../components/form_schema/tieu_hoc_questionare";
import * as tieu_hoc_child_oidp from "../components/form_schema/tieu_hoc_child_oidp";

type FormType = "tieu_hoc_form" | "tieu_hoc_questionare" | "tieu_hoc_child_oidp";
type State = {
  currentForm: FormType;
};
type Action = { type: "change_form"; newForm: FormType };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "change_form":
      return { ...state, currentForm: action.newForm };
  }
}

type FormNavButtonProps = {
  name: FormType;
  label: string;
  currentForm: FormType;
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
  recordId: string;
};

const Tieuhoc: React.FC<{}> = () => {
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

export default Tieuhoc;
