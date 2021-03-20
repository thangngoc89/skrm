import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import { Fieldset, Checkbox } from "@trussworks/react-uswds";
import { FormRenderer } from "../../components/form/form_render";

const Home: FunctionalComponent = () => {
  return (
    <div class={style.home}>
      <div class={style.intro}>
        <h1>VOSER - Quản lí dữ liệu khám Sức Khoẻ Răng Miệng</h1>
        <h2>Bộ môn Nha Khoa Công Cộng - Đại học Y Dược TP.HCM</h2>
      </div>

      <FormRenderer />
      <Fieldset legend="Historical figures 1" legendSrOnly>
        <Checkbox
          id="truth"
          name="historical-figures-1"
          value="truth"
          defaultChecked
          label="Sojourner Truth"
        />
        <Checkbox
          id="douglass"
          name="historical-figures-1"
          value="douglass"
          label="Frederick Douglass"
        />
        <Checkbox
          id="washington"
          name="historical-figures-1"
          value="washington"
          label="Booker T. Washington"
        />
        <Checkbox
          id="carver"
          name="historical-figures-1"
          label="George Washington Carver"
          disabled
        />
      </Fieldset>
    </div>
  );
};

export default Home;
