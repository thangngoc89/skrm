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

const formatDate = (epoch: number) => {
  return format(new Date(epoch), "dd-MM-yyyy hh:mm:ss");
};

const fetchSurveys = async () => await db.list.orderBy("createdAt").limit(50).reverse().toArray();

const SyncButton: React.FC<{}> = ({ children }) => {
  const asyncOnClick = useAsyncCallback(() =>
    new Promise((resolve) => {
      setTimeout(resolve, 2000);
    }).then(() => {
      notify.success("Đã đồng bộ thành công");
    })
  );
  return (
    <Button type="button" secondary onClick={asyncOnClick.execute} disabled={asyncOnClick.loading}>
      {asyncOnClick.loading ? "Đang đồng bộ..." : children}
    </Button>
  );
};
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

    return (
      <div className={style.wrapper}>
        <header className={style.header}>
          <h1>Quản lí hồ sơ</h1>
          <SyncButton>Đồng bộ</SyncButton>
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
  } else {
    return (
      <div className={style.wrapper}>
        <Error title="Có lỗi xảy ra" explain="Trường hợp này không hiểu tại sao xảy ra. quan-li.tsx:63" />
      </div>
    );
  }
};

export default QuanLi;
