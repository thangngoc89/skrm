import { field, form } from "./schema";

const fields: Array<field> = [
  {
    name: "b2",
    type: "select_one",
    label: "Nơi cư ngụ",
    choices: [
      { name: "1", label: "Nội thành" },
      { name: "2", label: "Ngoại thành" },
      { name: "3", label: "Tỉnh" },
    ],
  },
];

const form: form = {
  name: "tieu_hoc_questionare",
  label: "Phiếu điều tra sức khỏe răng miệng",
  labelSecondary: "(dành cho trẻ dưới 15 tuổi)",
  survey: fields,
};

export { form };
