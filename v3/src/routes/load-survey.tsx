import { h } from "preact";
import { useEffect, memo } from "react";
import { db, makeId } from "../components/db";
import { useAsync } from "react-async-hook";
import { SurveyType } from "src/components/types";
import { Spinner } from "../components/spinner";
import style from "./load-survey.css";
import { route } from "preact-router";
import { Error } from "../components/error";
import { ShowSurvey } from "../components/survey/ShowSurvey";

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
  useEffect(() => {
    if (dataLoader.result) {
      route(`/survey/${dataLoader.result}`, true);
    }
  }, [dataLoader]);

  if (dataLoader.error) {
    console.error(dataLoader.error);
  }

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

const NonMemoLoadSurvey: React.FC<LoadSurveyProps> = ({ surveyId }) => {
  const dataLoader = useAsync(loadSurveyAsync, [surveyId]);

  if (dataLoader.loading) {
    return null;
  } else if (dataLoader.error) {
    return <div className={style.wrapper}>Error: {dataLoader.error.message}</div>;
  } else if (typeof dataLoader.result === "undefined") {
    return (
      <Error title="Không tìm thấy hồ sơ này" explain="Chắc là có lỗi phần mềm xảy ra. Các bạn báo anh biết nhé" />
    );
  } else return <ShowSurvey key={dataLoader.result.surveyId} {...dataLoader.result} />;
};

const LoadSurvey = memo(NonMemoLoadSurvey);

interface Props {
  surveyId?: string;
  surveyType?: SurveyType;
}

const MainSurveyRoute: React.FC<Props> = ({ surveyType, surveyId }) => {
  if (!surveyId && surveyType) {
    return <NewSurvey surveyType={surveyType} />;
  } else if (surveyId) {
    return <LoadSurvey surveyId={surveyId} />;
  } else {
    return <div className={style.wrapper}>Invalid MainSurveyRoute handler</div>;
  }
};

const memoziedMainSurveyRoute = memo(MainSurveyRoute);
export default memoziedMainSurveyRoute;
