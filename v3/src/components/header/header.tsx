import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";
import style from "./header.css";
import { useState } from "react";

import { PrimaryNav } from "@trussworks/react-uswds";

const menuItems = [
  <Link className="usa-nav__link" activeClassName="usa-current" href="/" key="home">
    Home
  </Link>,
  <Link className="usa-nav__link" activeClassName="usa-current" href="/new/mau-giao" key="mau-giao">
    Mẫu giáo
  </Link>,
  <Link className="usa-nav__link" activeClassName="usa-current" href="/new/tieu-hoc" key="tieu-hoc">
    Tiểu học
  </Link>,
  <Link className="usa-nav__link" activeClassName="usa-current" href="/new/nguoi-lon" key="nguoi-lon">
    Người lớn
  </Link>,
  <Link className="usa-nav__link" activeClassName="usa-current" href="/quan-li" key="quan-li">
    Quản lí
  </Link>,
];
const Header: FunctionalComponent = () => {
  const [expanded, setExpanded] = useState(false);
  const onClick = (): void => setExpanded((prvExpanded) => !prvExpanded);
  return (
    <header class={style.header}>
      <h1>
        <Link href="/">VOSER</Link>
      </h1>

      <nav className={style.laptop}>
        <Link activeClassName={style.active} href="/new/mau-giao" title="Tạo hồ sơ mẫu giáo">
          Mẫu giáo
        </Link>
        <Link activeClassName={style.active} href="/new/tieu-hoc" title="Tạo hồ sơ tiểu học">
          Tiểu học
        </Link>
        <Link activeClassName={style.active} href="/new/nguoi-lon" title="Tạo hồ sơ người lớn">
          Người lớn
        </Link>
        <Link activeClassName={style.active} href="/quan-li">
          Quản lí
        </Link>
      </nav>
      <nav className={style.mobile}>
        <a
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
          href="#"
        >
          Menu
        </a>
        <PrimaryNav
          className={style.primaryNav}
          items={menuItems}
          mobileExpanded={expanded}
          onToggleMobileNav={onClick}
        ></PrimaryNav>
      </nav>
      <div className={`usa-overlay${expanded ? " is-visible" : ""}`}></div>
    </header>
  );
};

export default Header;
