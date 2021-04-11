import { h } from "preact";
import { useState, useEffect } from "react";
import { AsyncAction } from "../types";
import { db } from "../db/db";
import { Error } from "../error";
import { route } from "preact-router";
import style from "./SurveyDisplayPagination.css";

interface SurveyDisplayPaginationProps {
  offset: number;
  limit: number;
}

type State = AsyncAction<number, string>;

export const SurveyDisplayPagination: React.FC<SurveyDisplayPaginationProps> = ({ offset, limit }) => {
  const [state, setState] = useState<State>({ type: "initial" });

  useEffect(() => {
    db.list
      .count()
      .then((result) => setState({ type: "success", payload: result }))
      .catch((error) => {
        console.error(error);
        setState({ type: "error", payload: error.message });
      });
  }, []);

  switch (state.type) {
    case "initial":
    case "loading":
      return null;
    case "success":
      const total = state.payload;
      const totalPage = Math.ceil(total / limit);
      const currentPage = Math.floor(offset / limit) + 1;

      return (
        <div className={style.main}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              route(`/quan_li/${(currentPage - 2) * limit}/${limit}`);
            }}
            disabled={currentPage <= 1}
          >
            Trang trước ←
          </button>
          <span>
            Trang {currentPage}/{totalPage} ({total} hồ sơ tất cả)
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              route(`/quan_li/${currentPage * limit}/${limit}`);
            }}
            disabled={currentPage >= totalPage}
          >
            Trang tiếp →
          </button>
        </div>
      );

    case "error":
      return (
        <div className="wrapper">
          <Error title="Đã có lỗi xảy ra" explain={state.payload} />
        </div>
      );
  }
};
