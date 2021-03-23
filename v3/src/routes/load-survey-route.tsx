import { h } from "preact";
import { AsyncAction } from "../components/types";
import { db, ISurveyList } from "../components/db";
import { Error } from "../components/error";
import { ShowSurvey } from "../components/survey/ShowSurvey";
import { useEffect, useState } from "react";
import { Spinner } from "../components/spinner";

type State = AsyncAction<ISurveyList | undefined, string>;

interface LoadSurveyProps {
  surveyId: string;
}

const LoadSurvey: React.FC<LoadSurveyProps> = ({ surveyId }) => {
  const [state, setState] = useState<State>({ type: "initial" });

  useEffect(() => {
    setState({ type: "loading" });
    db.list
      .get(surveyId)
      .then((survey) => {
        setState({ type: "success", payload: survey });
      })
      .catch((error) => {
        console.error(error);
        setState({ type: "error", payload: error.message });
      });
  }, [surveyId]);

  switch (state.type) {
    case "initial":
    case "loading":
      return (
        <div className="wrapper">
          <Spinner />
        </div>
      );
    case "success":
      const survey = state.payload;

      if (typeof survey === "undefined") {
        return (
          <Error title="Không tìm thấy hồ sơ này" explain="Chắc là có lỗi phần mềm xảy ra. Các bạn báo anh biết nhé" />
        );
      }
      return <ShowSurvey key={survey.surveyId} {...survey} />;
    case "error":
      return (
        <div className="wrapper">
          <Error title="Đã có lỗi xảy ra" explain={state.payload} />
        </div>
      );
  }
};

export default LoadSurvey;
