import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div className="HomePage_buttonEntry">
        <Link to="/tieu-hoc">Nhập trường tiểu học</Link>
      </div>
      <div className="HomePage_buttonEntry">
        <Link to="/gia-dinh/nguoi-lon">Hộ gia đình (người lớn)</Link>
      </div>
      <div className="HomePage_buttonEntry">
        <Link to="/gia-dinh/tre-em">Hộ gia đình (trẻ em)</Link>
      </div>
    </div>
  );
};

export default HomePage;
