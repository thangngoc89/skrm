import { h } from "preact";
import style from "./quan-li.css";
import { Table, Button } from "@trussworks/react-uswds";
import { db } from "../components/db";
import { useAsync, useAsyncCallback } from "react-async-hook";
import { Spinner } from "../components/spinner";
import { Error } from "../components/error";
import { format } from "date-fns";
import { Link } from "preact-router/match";
import { notify } from "../components/notify";
import { IDbSurvey, SyncStatus } from "../components/db";
import { dataUpsert, surveyUpsert } from "../components/data/firebase";

const formatDate = (epoch: number) => {
  return format(new Date(epoch), "dd-MM-yyyy hh:mm:ss");
};

interface SurveyDisplayProps {
  surveys: Array<IDbSurvey>;
}

const SurveyDisplay: React.FC<SurveyDisplayProps> = ({ surveys }) => {
  const syncData = useAsyncCallback(async () => {
    try {
      const surveys = await db.list.where("synced").notEqual(SyncStatus.Synced).toArray();
      console.log("surveys", surveys.length);

      for (let i = 0; i < surveys.length; i++) {
        const survey = surveys[i];
        await surveyUpsert(survey);
        await db.list.update(survey.surveyId, { synced: SyncStatus.Synced });
      }

      const surveyData = await db.data.where("synced").notEqual(SyncStatus.Synced).toArray();
      console.log("surveyData", surveyData.length);

      for (let i = 0; i < surveyData.length; i++) {
        const form = surveyData[i];
        await dataUpsert(form);
        await db.data.update([form.surveyId, form.surveyForm], { synced: SyncStatus.Synced });
      }

      return surveys;
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div className={style.wrapper}>
      <header className={style.header}>
        <h1>Quản lí hồ sơ</h1>
        <Button type="button" secondary onClick={syncData.execute} disabled={syncData.loading}>
          {syncData.loading ? "Đang đồng bộ..." : "Đồng bộ"}
        </Button>
      </header>
      <Table bordered fullWidth>
        <thead>
          <tr>
            <th scope="col">Mã số</th>
            <th scope="col">Loại hồ sơ</th>
            <th scope="col">Thời gian tạo</th>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {surveys.map(({ surveyId, surveyType, createdAt }) => (
            <tr key={surveyId}>
              <td>{surveyId}</td>
              <td>{surveyType}</td>
              <td>{formatDate(createdAt)}</td>
              <td>
                <Link href={`/survey/${surveyId}`}>
                  <Button type="button">Xem</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const fetchSurveys = async () => await db.list.orderBy("createdAt").limit(50).reverse().toArray();

const QuanLi: React.FC<{}> = () => {
  const dataLoader = useAsync(fetchSurveys, []);

  if (dataLoader.loading) {
    return (
      <div className={style.wrapper}>
        <Spinner />
      </div>
    );
  } else if (dataLoader.error) {
    console.error(dataLoader.error);
    return (
      <div className={style.wrapper}>
        <Error title="Có lỗi xảy ra" explain={dataLoader.error.message} />
      </div>
    );
  } else if (dataLoader.result) {
    const surveys = dataLoader.result;

    return <SurveyDisplay surveys={surveys} />;
  } else {
    return (
      <div className={style.wrapper}>
        <Error title="Có lỗi xảy ra" explain="Trường hợp này không hiểu tại sao xảy ra. quan-li.tsx:63" />
      </div>
    );
  }
};

export default QuanLi;
