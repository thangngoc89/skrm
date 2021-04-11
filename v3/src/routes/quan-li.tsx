import { h } from "preact";
import { db } from "../components/db/db";
import { useAsync } from "react-async-hook";
import { Spinner } from "../components/spinner";
import { Error } from "../components/error";
import { SurveyDisplay } from "../components/sync/SurveyDisplay";

const fetchSurveys = async (offset: number, limit: number) => {
  return await db.list.orderBy("createdAt").reverse().offset(offset).limit(limit).toArray();
};

interface QuanLiProps {
  skip: string;
  pageSize: string;
}

const QuanLi: React.FC<QuanLiProps> = ({ skip, pageSize }) => {
  const offset = parseInt(skip, 10) || 0;
  const limit = parseInt(pageSize, 10) || 50;

  const dataLoader = useAsync(fetchSurveys, [offset, limit]);

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

    return <SurveyDisplay surveys={surveys} offset={offset} limit={limit} />;
  } else {
    return (
      <div className="wrapper">
        <Error title="Có lỗi xảy ra" explain="Trường hợp này không hiểu tại sao xảy ra. quan-li.tsx:63" />
      </div>
    );
  }
};

export default QuanLi;
