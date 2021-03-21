import { h } from "preact";
import style from "./tieu-hoc.css";
import { FormRenderer } from "../components/form/FormRender";
// import { Link } from "preact-router/match";
import { form as tieu_hoc_form, makeInitialValues } from "../components/form_schema/tieu_hoc_form";
import { useState, useReducer } from "react";

type FormType = "form" | "questionare" | "child_oidp";
type State = {
  recordId: string;
  currentForm: string;
};
type Action = { type: "change_form" };

const Tieuhoc: React.FC<{}> = () => {
  return (
    <div>
      <div className={style.sticky}>
        <nav className={style.left}>
          <a href="#">Phiếu điều tra</a>
          <a href="#">Bảng câu hỏi</a>
          <a href="#">Child-OIDP</a>
        </nav>
        <div className={style.right}>
          <button>Lưu</button>
        </div>
      </div>
      <FormRenderer form={tieu_hoc_form} makeInitialValues={makeInitialValues} />
    </div>
  );
};

export default Tieuhoc;
