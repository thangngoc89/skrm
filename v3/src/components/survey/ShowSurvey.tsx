import { h } from "preact";
import { ISurveyList } from "../db";
import { Tieuhoc } from "./tieu-hoc";
import { memo } from "react";

const ShowSurvey: React.FC<ISurveyList> = ({ surveyId, surveyType, createdAt }) => {
  switch (surveyType) {
    case "tieu_hoc":
      return <Tieuhoc key={surveyId} surveyId={surveyId} />;
    default:
      return (
        <div>
          <div>"Unknown how to handle this"</div>
          <div>"Unknown how to handle this"</div>
          <div>"Unknown how to handle this"</div>
          <div>"Unknown how to handle this"</div>
          <div>"Unknown how to handle this"</div>
          <div>"Unknown how to handle this"</div>
          <div>"Unknown how to handle this"</div>
          <div>"Unknown how to handle this"</div>
          <div>"Unknown how to handle this"</div>
          <div>"Unknown how to handle this"</div>
          <div>"Unknown how to handle this"</div>
          <div>"Unknown how to handle this"</div>
          <div>"Unknown how to handle this"</div>
        </div>
      );
  }
};

const MemoShowSurvey = memo(ShowSurvey);

export { MemoShowSurvey as ShowSurvey };
