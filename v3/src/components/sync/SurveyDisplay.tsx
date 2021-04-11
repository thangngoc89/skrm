import { h } from "preact";
import style from "./SurveyDisplay.css";
import { useState } from "react";
import { Table, Button } from "@trussworks/react-uswds";
import { useAsyncCallback } from "react-async-hook";
import { Link } from "preact-router/match";
import { db, IDbSurvey, ISurveyData, SyncStatus } from "../db/db";
import { upsert, RemoteData } from "../db/firestore";
import { format } from "date-fns";
import { notify } from "../notify";
import { useMachineId } from "./useMachineId";
import { SurveyDisplayPagination } from "./SurveyDisplayPagination";

const formatDate = (epoch: number) => {
  return format(new Date(epoch), "dd-MM-yyyy hh:mm:ss");
};

interface SurveyDisplayProps {
  surveys: Array<IDbSurvey>;
  offset: number;
  limit: number;
}

enum SyncProcessStatus {
  Initial = 0,
  PrepareData = 1,
  Uploading = 2,
  Done = 3,
}

export const SurveyDisplay: React.FC<SurveyDisplayProps> = ({ surveys, offset, limit }) => {
  const [total, setTotal] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [syncProcessStatus, setStatus] = useState(SyncProcessStatus.Initial);
  const machineId = useMachineId();

  const syncData = useAsyncCallback(async () => {
    try {
      const changes: RemoteData[] = [];
      setStatus(SyncProcessStatus.PrepareData);

      await Promise.all([
        db.list.where({ syncStatus: SyncStatus.NotSync }).each((survey) => {
          changes.push({
            type: "survey",
            payload: survey,
          });
        }),
        db.data.where({ syncStatus: SyncStatus.NotSync }).each((survey) => {
          changes.push({
            type: "surveyData",
            payload: survey,
          });
        }),
        db.revision.where({ syncStatus: SyncStatus.NotSync }).each((survey) => {
          changes.push({
            type: "surveyRevision",
            payload: survey,
          });
        }),
      ]);

      setCount(0);
      setTotal(changes.length);
      setStatus(SyncProcessStatus.Uploading);

      for (let i = 0; i < changes.length; i++) {
        const change: RemoteData = changes[i];
        await upsert(change, machineId);

        await setDbSyncStatusToDone(change);
        setCount((count) => count + 1);
      }

      setStatus(SyncProcessStatus.Done);
      if (count === total) {
        notify.success("Đồng bộ dữ liệu thành công");
      } else {
        notify.warn(`Có lỗi xảy ra khi đồng bộ. Chỉ đồng bộ được ${count}/${total} hồ sơ`);
      }
    } catch (error) {
      console.error(error);
      notify.error("Có lỗi xảy ra khi đồng bộ dữ liệu");
    }
  });

  return (
    <div className={style.wrapper}>
      <header className={style.header}>
        <h1>Quản lí hồ sơ</h1>
        <Button type="button" secondary onClick={syncData.execute} disabled={syncData.loading}>
          Đồng bộ
        </Button>
      </header>

      {syncProcessStatus === SyncProcessStatus.PrepareData && (
        <div className={style.syncStatus}>"Đang tìm dữ liệu...."</div>
      )}
      {syncProcessStatus === SyncProcessStatus.Uploading && (
        <div className={style.syncStatus}>
          <span>
            Tải dữ liệu lên {count}/{total}
          </span>
        </div>
      )}
      {syncProcessStatus === SyncProcessStatus.Done && (
        <div className={style.syncStatus}>
          <span>Đồng bộ thành công</span>
        </div>
      )}
      <SurveyDisplayPagination offset={offset} limit={limit} />
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
      <SurveyDisplayPagination offset={offset} limit={limit} />
    </div>
  );
};

async function setDbSyncStatusToDone(change: RemoteData) {
  switch (change.type) {
    case "survey":
      await db.list.update(change.payload.surveyId, { syncStatus: SyncStatus.Synced });
      break;
    case "surveyData":
      await db.data.update([change.payload.surveyId, change.payload.surveyForm], {
        syncStatus: SyncStatus.Synced,
      });
      break;

    case "surveyRevision":
      await db.revision.update(change.payload.surveyDataId, {
        syncStatus: SyncStatus.Synced,
      });
      break;
  }
}
