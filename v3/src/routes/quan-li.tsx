import { h } from "preact";
import style from "./quan-li.css";
import { db } from "../components/db";
import { useAsync } from "react-async-hook";
import { Spinner } from "../components/spinner";
import { Error } from "../components/error";
import { notify } from "../components/notify";
import { SurveyDisplay } from "../components/sync/SurveyDisplay";

const fetchSurveys = async () => await db.list.orderBy("createdAt").limit(50).reverse().toArray();

const QuanLi: React.FC<{}> = () => {
  const dataLoader = useAsync(fetchSurveys, []);

  if (dataLoader.loading) {
    return (
      <div className="wrapper">
        <Spinner />
      </div>
    );
  } else if (dataLoader.error) {
    console.error(dataLoader.error);
    return (
      <div className="wrapper">
        <Error title="Có lỗi xảy ra" explain={dataLoader.error.message} />
      </div>
    );
  } else if (dataLoader.result) {
    const surveys = dataLoader.result;

    return <SurveyDisplay surveys={surveys} />;
  } else {
    return (
      <div className="wrapper">
        <Error title="Có lỗi xảy ra" explain="Trường hợp này không hiểu tại sao xảy ra. quan-li.tsx:63" />
      </div>
    );
  }
};

export default QuanLi;
