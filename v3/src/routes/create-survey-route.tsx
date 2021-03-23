import { h } from "preact";
import { useEffect, useState } from "react";
import { db, makeId } from "../components/db";
import { SurveyType } from "src/components/types";
import { route } from "preact-router";
import { Spinner } from "../components/spinner";
import { Error } from "../components/error";

interface CreateSurveyProps {
  surveyType: SurveyType;
}

type State = { type: "error"; payload: string } | { type: "initial" };

const CreateSurvey: React.FC<CreateSurveyProps> = ({ surveyType }) => {
  const [state, setState] = useState<State>({ type: "initial" });
  useEffect(() => {
    db.list
      .add({
        surveyId: makeId(),
        surveyType: surveyType,
        createdAt: Date.now(),
      })
      .then((surveyId) => {
        route(`/survey/${surveyId}`, true);
      })
      .catch((error) => {
        console.error(error);
        setState({ type: "error", payload: error.message });
      });
  }, [surveyType]);

  switch (state.type) {
    case "initial":
      return <div className="wrapper">{<Spinner />}</div>;
    case "error":
      return (
        <div className="wrapper">
          <Error title="Đã có lỗi xảy ra" explain={state.payload} />
        </div>
      );
  }
};

export default CreateSurvey;
