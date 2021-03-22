import { Field, Form } from "./schema";

const fields: Array<Field> = [
  {
    type: "group",
    name: "phan_1",
    label: "Phần 1",
    fields: [
      {
        type: "select_one",
        name: "co_kho_chiu",
        label: "Trong 3 tháng qua các em có thấy khó chịu hay đau ở vùng răng miệng của mình hay không?",
        choices: [
          { name: "0", label: "Không" },
          { name: "1", label: "Có" },
        ],
      },
    ],
  },
];

export const form: Form = {
  name: "tieu_hoc_child_oidp",
  label: "Bảng câu hỏi về những khó chịu từ răng miệng",
  survey: fields,
};

export const makeInitialValues = () => ({});
