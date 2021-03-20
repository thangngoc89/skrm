import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import { FormRenderer } from "../../components/form/FormRender";
import { SideNav } from "@trussworks/react-uswds";
import { Link } from "preact-router/match";

const navItems = [
  <Link activeClassName="usa-current" href="/" key="home">
    Home
  </Link>,
  <Link activeClassName="usa-current" href="/new/mau-giao" key="mau-giao">
    Thêm hồ sơ Mẫu giáo
  </Link>,
  <Link activeClassName="usa-current" href="/new/tieu-hoc" key="tieu-hoc">
    Thêm hồ sơ Trẻ em dưới 15 tuổi
  </Link>,
  <Link activeClassName="usa-current" href="/new/nguoi-lon" key="nguoi-lon">
    Thêm hồ sơ Người lớn
  </Link>,
  <Link activeClassName="usa-current" href="/quan-li" key="quan-li">
    Quản lí hồ sơ
  </Link>,
];
const Home: FunctionalComponent = () => {
  return (
    <div class={style.home}>
      <div class={style.intro}>
        <h1>VOSER - Quản lí dữ liệu khám Sức Khoẻ Răng Miệng</h1>
        <h2>Bộ môn Nha Khoa Công Cộng - Đại học Y Dược TP.HCM</h2>
      </div>

      <h1>Khám hồ sơ mới cho</h1>
      <SideNav items={navItems} />
    </div>
  );
};

export default Home;