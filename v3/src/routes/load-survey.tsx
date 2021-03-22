import { h } from "preact";
import { db, makeId } from "../components/db";
import { useAsync } from "react-async-hook";
import { SurveyType } from "src/components/types";

interface Props {
  id?: string;
  surveyType: SurveyType;
}

const createNewSurveyAsync = async (surveyType: SurveyType) => {
  return await db.records.add({
    id: makeId(),
    surveyType: surveyType,
  });
};

const NewSurvey: React.FC<Props> = ({ surveyType }) => {
  const test = useAsync(createNewSurveyAsync, [surveyType]);

  console.log(test);
  return (
    <div>
      <div>new</div>
      <div>new</div>
      <div>new</div>
      <div>new</div>
      <div>new</div>
      <div>new</div>
      <div>new</div>
      <div>new</div>
      <div>new</div>
    </div>
  );
};
const LoadSurveyRoute: React.FC<Props> = ({ surveyType, id }) => {
  console.log(surveyType);
  if (!id) {
    return <NewSurvey surveyType={surveyType} />;
  }

  return (
    <div>
      <div> "dsfsdftieuhocroute" </div>
      <div> "dsfsdftieuhocroute" </div>
      <div> "dsfsdftieuhocroute" </div>
      <div> "dsfsdftieuhocroute" </div>
      <div> "dsfsdftieuhocroute" </div>
      <div> "dsfsdftieuhocroute" </div>
      <div> "dsfsdftieuhocroute" </div>
      <div> "dsfsdftieuhocroute" </div>
      <div> "dsfsdftieuhocroute" </div>
      <div> "dsfsdftieuhocroute" </div>
      <div> "2dsfsdftieuhocroute" </div>
    </div>
  );
};

export default LoadSurveyRoute;
