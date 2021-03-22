import { h } from "preact";
import { db, makeId } from "../components/db";
import { useAsync } from "react-async-hook";
import { SurveyType } from "src/components/types";
import { Spinner } from "../components/spinner";
import style from "./load-survey.css";

const createSurveyAsync = async (surveyType: SurveyType) => {
  return await db.list.add({
    surveyId: makeId(),
    surveyType: surveyType,
    createdAt: Date.now(),
  });
};

interface NewSurveyProps {
  surveyType: SurveyType;
}

const NewSurvey: React.FC<NewSurveyProps> = ({ surveyType }) => {
  const dataLoader = useAsync(createSurveyAsync, [surveyType]);

  console.log(dataLoader);
  return (
    <div className={style.wrapper}>
      {dataLoader.loading && <Spinner />}
      {dataLoader.error && <div>Error: {dataLoader.error.message}</div>}
      {dataLoader.result && (
        <div>
          <p>New record id: {dataLoader.result}</p>
          <p>Survey type: {surveyType}</p>
          <p>Redirecting...</p>
        </div>
      )}
    </div>
  );
};

const loadSurveyAsync = async (surveyId: string) => {
  return await db.list.get(surveyId);
};

interface LoadSurveyProps {
  surveyId: string;
}
const LoadSurvey: React.FC<LoadSurveyProps> = ({ surveyId }) => {
  const dataLoader = useAsync(loadSurveyAsync, [surveyId]);

  console.log(test);
  return (
    <div className={style.wrapper}>
      <Spinner />
    </div>
  );
};

interface Props {
  id?: string;
  surveyType?: SurveyType;
}

const MainSurveyRoute: React.FC<Props> = ({ surveyType, id }) => {
  if (!id && surveyType) {
    return <NewSurvey surveyType={surveyType} />;
  } else if (id) {
    return <LoadSurvey surveyId={id} />;
  } else {
    return null;
  }
};

export default MainSurveyRoute;
