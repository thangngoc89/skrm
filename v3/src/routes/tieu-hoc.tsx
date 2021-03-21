import { h } from "preact";
import style from "./tieu-hoc.css";
import { FormRenderer } from "../components/form/FormRender";
import { ButtonGroup, Button } from "@trussworks/react-uswds";
// import { Link } from "preact-router/match";
import { form as tieu_hoc_form } from "../components/form_schema/tieu_hoc_form";

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
      <FormRenderer form={tieu_hoc_form} />
    </div>
  );
};

export default Tieuhoc;
