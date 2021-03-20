import { FunctionalComponent, h } from "preact";
import style from "./tieu-hoc.css";
import { FormRenderer } from "../components/form/FormRender";
import { ButtonGroup, Button, GridContainer, Grid } from "@trussworks/react-uswds";
// import { Link } from "preact-router/match";
import { form as tieu_hoc_form } from "../components/form_schema/tieu_hoc_form";

const Tieuhoc: FunctionalComponent = () => {
  return (
    <div>
      <div className={style.sticky}>
        <div className={style.left}>
          <ButtonGroup type="segmented">
            <Button type="button">Phiếu điều tra</Button>
            <Button type="button" outline>
              Bảng câu hỏi
            </Button>
            <Button type="button" outline>
              Child-OIDP
            </Button>
          </ButtonGroup>
        </div>
        <div className={style.right}>
          <Button type="button" secondary>
            Lưu
          </Button>
        </div>
      </div>
      <FormRenderer form={tieu_hoc_form} />
    </div>
  );
};

export default Tieuhoc;
