import { h } from "preact";
import style from "./notify.css";

interface Props {
  title: string;
  buttonLabel: string;
}

const Msg: React.FC<Props> = ({ title, buttonLabel }) => (
  <div>
    <p>{title}</p>
    <button className={style.button} type="button">
      {buttonLabel}
    </button>
  </div>
);

export { Msg };
export { toast as notify } from "react-toastify";
