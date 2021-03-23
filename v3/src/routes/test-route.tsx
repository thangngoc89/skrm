import { h } from "preact";
import style from "./test-route.css";
import { Spinner } from "../components/spinner";
// import List from "../components/form_schema/"

const Testroute: React.FC<{}> = () => {
  return (
    <div className="wrapper">
      <Spinner />
    </div>
  );
};

export default Testroute;
