import { h } from "preact";
import { ISurveyList } from "../db";
import { Tieuhoc } from "./tieu-hoc";

export const ShowSurvey: React.FC<ISurveyList> = ({ surveyId, surveyType, createdAt }) => {
  switch (surveyType) {
    case "tieu_hoc":
      return <Tieuhoc surveyId={surveyId} />;
    default:
      return <div>"Unknown how to handle this"</div>;
  }
};
