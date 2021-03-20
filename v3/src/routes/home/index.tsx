import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import { Fieldset, Checkbox } from "@trussworks/react-uswds";

const Home: FunctionalComponent = () => {
  return (
    <div class={style.home}>
      <h1>Home</h1>
      <p>This is the Home component.</p>
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
