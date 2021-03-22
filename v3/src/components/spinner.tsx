import { h } from "preact";
import style from "./spinner.css";

export const Spinner: React.FC<{}> = () => {
  return <div className={style.loader}></div>;
};
