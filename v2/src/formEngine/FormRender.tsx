import * as React from "react";
import { SheetSchema } from "../model/Sheet";

interface Props {
  schema?: SheetSchema;
}

const testSchema: SheetSchema = [
  {
    type: "select_one",
    id: "co_kho_chiu",
    label: "co_kho_chiu",
    question:
      "Trong 3 tháng qua các em có thấy khó chịu hay đau ở vùng răng miệng của mình hay không?",
    params: [
      { value: "0", label: "Không" },
      { value: "1", label: "Có" },
    ],
  },
  {
    type: "group",
    id: "yes_branch",
    params: [
      {
        type: "select_multiple",
        id: "liet_ke",
        label: "Liệt kê khó chịu",
        question: "Liệt kê các khó chịu",
        params: [
          { value: "1", label: "Đau răng, nhức răng" },
          { value: "99", label: "Những khó chịu khác (ghi rõ)" },
        ],
      },
    ],
    relavent: 'select_one == "1"'
  },
];
const FormRender = ({schema=testSchema}: Props) => {
  console.log(schema)
  return <div> "hey" </div>;
};

export default FormRender;
