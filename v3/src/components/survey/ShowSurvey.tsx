import { h } from "preact";
import { ISurveyList } from "../db";
import { Tieuhoc } from "./tieu-hoc";
import { memo } from "react";
import { Error } from "../error";

const ShowSurvey: React.FC<ISurveyList> = ({ surveyId, surveyType, createdAt }) => {
  switch (surveyType) {
    case "tieu_hoc":
      return <Tieuhoc key={surveyId} surveyId={surveyId} />;
    default:
      return (
        <div className="wrapper">
          <Error title="Chức năng này chưa làm xong nhé" explain="Các bạn đi ngủ sáng mai mở lên sẽ có" />
        </div>
      );
  }
};

const MemoShowSurvey = memo(ShowSurvey);

export { MemoShowSurvey as ShowSurvey };
