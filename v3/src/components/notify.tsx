import { h } from "preact";
import style from "./notify.css";

interface Props {
  title: string;
  buttonLabel: string;
  buttonOnClick: () => void;
}

const Msg: React.FC<Props> = ({ title, buttonLabel, buttonOnClick }) => (
  <div className={style.wrapper}>
    <p>{title}</p>
    <button type="button" onClick={buttonOnClick}>
      {buttonLabel}
    </button>
  </div>
);

export { Msg };
export { toast as notify } from "react-toastify";
