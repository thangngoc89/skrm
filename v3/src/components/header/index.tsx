import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";
import style from "./style.css";

const Header: FunctionalComponent = () => {
  return (
    <header class={style.header}>
      <h1>VOSER</h1>
      <nav>
        <Link activeClassName={style.active} href="/">
          Home
        </Link>
        <Link activeClassName={style.active} href="/new/mau-giao">
          Mẫu giáo
        </Link>
        <Link activeClassName={style.active} href="/new/tieu-hoc">
          Tiểu học
        </Link>
        <Link activeClassName={style.active} href="/new/nguoi-lon">
          Người lớn
        </Link>
        <Link activeClassName={style.active} href="/quan-li">
          Quản lí
        </Link>
      </nav>
    </header>
  );
};

export default Header;
