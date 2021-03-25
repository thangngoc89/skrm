import { h } from "preact";
import style from "./SurveyDisplay.css";
import { useState } from "react";
import { Table, Button } from "@trussworks/react-uswds";
import { useAsyncCallback } from "react-async-hook";
import { Link } from "preact-router/match";
import { db, IDbSurvey, ISurveyData, SyncStatus } from "../db";
import { dataUpsert, surveyUpsert } from "./firebase";
import { format } from "date-fns";
import { AsyncAction } from "../types";

const formatDate = (epoch: number) => {
  return format(new Date(epoch), "dd-MM-yyyy hh:mm:ss");
};

type State = AsyncAction<{ total: number; surveys: IDbSurvey[]; surveyData: ISurveyData[] }, string>;

interface SurveyDisplayProps {
  surveys: Array<IDbSurvey>;
}
export const SurveyDisplay: React.FC<SurveyDisplayProps> = ({ surveys }) => {
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

// const syncData = useAsyncCallback(async () => {
//   try {
//     const surveys = await db.list.where("synced").notEqual(SyncStatus.Synced).toArray();

//     setCount((state) => ({
//       ...state,
//       countSurveys: surveys.length,
//     }));

//     for (let i = 0; i < surveys.length; i++) {
//       const survey = surveys[i];
//       await surveyUpsert(survey);
//       await db.list.update(survey.surveyId, { synced: SyncStatus.Synced });
//       setCount((state) => ({
//         ...state,
//         countSurveys: state.countSurveys - 1,
//       }));
//     }

//     const surveyData = await db.data.where("synced").notEqual(SyncStatus.Synced).toArray();
//     setCount((state) => ({
//       ...state,
//       countSurveyData: surveyData.length,
//     }));

//     for (let i = 0; i < surveyData.length; i++) {
//       const form = surveyData[i];
//       await dataUpsert(form);
//       await db.data.update([form.surveyId, form.surveyForm], { synced: SyncStatus.Synced });
//       setCount((state) => ({
//         ...state,
//         countSurveyData: state.countSurveyData - 1,
//       }));
//     }

//     return surveys;
//   } catch (error) {
//     console.error(error);
//   }
// });
