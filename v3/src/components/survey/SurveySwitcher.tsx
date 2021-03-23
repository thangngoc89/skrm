import { h } from "preact";
import { IDbSurvey } from "../db";
import { SurveyRender } from "./SurveyRender";

import { survey as maugiaoSurvey } from "../form_schema/mau_giao";
import { survey as tieuhocSurvey } from "../form_schema/tieu_hoc";
import { survey as nguoilonSurvey } from "../form_schema/nguoi_lon";

import { memo } from "react";
import { Error } from "../error";

interface Props {
  survey: IDbSurvey;
  currentForm?: string;
}
const SurveySwitcher: React.FC<Props> = ({ survey: { surveyId, surveyType }, currentForm }) => {
  switch (surveyType) {
    case "tieu_hoc":
      return <SurveyRender key={surveyId} surveySchema={tieuhocSurvey} surveyId={surveyId} currentForm={currentForm} />;
    case "mau_giao":
      return <SurveyRender key={surveyId} surveySchema={maugiaoSurvey} surveyId={surveyId} currentForm={currentForm} />;
    case "nguoi_lon":
      return (
        <SurveyRender key={surveyId} surveySchema={nguoilonSurvey} surveyId={surveyId} currentForm={currentForm} />
      );
    default:
      return (
        <div className="wrapper">
          <Error title="Chức năng này chưa làm xong nhé" explain="Các bạn đi ngủ sáng mai mở lên sẽ có" />
        </div>
      );
  }
};

const MemoSurveySwitcher = memo(SurveySwitcher);

export { MemoSurveySwitcher as SurveySwitcher };
