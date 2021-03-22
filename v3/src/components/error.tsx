import { h } from "preact";
import { Link } from "preact-router/match";
import style from "./error.css";

interface Props {
  title: string;
  explain?: string;
}
const Error: React.FC<Props> = ({ title, explain }) => {
  return (
    <div class={style.notfound}>
      <h1>{title}</h1>
      {explain && <p>{explain}</p>}
      <Link href="/">
        <h4>Quay lại trang chủ</h4>
      </Link>
    </div>
  );
};

export { Error };
