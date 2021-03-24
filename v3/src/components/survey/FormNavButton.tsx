import { h } from "preact";
import { notify } from "../notify";

///////////////////////////////////////////////////////
type FormNavButtonProps = {
  name: string;
  label: string;
  surveyId: string;
};
export const FormNavButton: React.FC<FormNavButtonProps> = ({ name, label, surveyId }) => {
  return (
    <a
      href={`/survey/${surveyId}/${name}`}
      onClick={(e) => {
        console.log("a click");
        // dispatch({ type: "change_form", newForm: name });
        notify.info("Các bạn bấm Lưu -> Tiếp theo để sang bảng tiếp theo", { autoClose: 5000 });

        return false;
      }}
      // activeClassName={style.active}
      disabled
    >
      {label}
    </a>
  );
};
