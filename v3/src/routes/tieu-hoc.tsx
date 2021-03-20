import { FunctionalComponent, h } from "preact";
import style from "./tieu-hoc.css";
import { FormRenderer } from "../components/form/form_render";
import {
  ButtonGroup,
  Button,
  GridContainer,
  Grid,
} from "@trussworks/react-uswds";
import { Link } from "preact-router/match";

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
      <div className={style.main}>
        <div className={style.intro}>
          <h1>Phiếu điều tra sức khỏe răng miệng</h1>
          <h2>(dành cho trẻ dưới 15 tuổi)</h2>
        </div>
        <FormRenderer />{" "}
      </div>
    </div>
  );
};

export default Tieuhoc;
