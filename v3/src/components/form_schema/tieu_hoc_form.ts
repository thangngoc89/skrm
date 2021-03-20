import { Field, Form } from "./schema";

const hanhChinh: Array<Field> = [
  {
    type: "date",
    name: "ngay_kham",
    label: "Ngày khám",
  },
  {
    type: "text",
    name: "so_ho_so",
    label: "Mã số hồ sơ",
    optional: true,
  },
  {
    type: "text",
    name: "nguoi_kham",
    label: "Người khám",
  },
  {
    type: "text",
    name: "ho_va_ten",
    label: "Họ và tên",
  },
  {
    type: "integer",
    name: "tuoi",
    label: "Tuổi",
  },
  {
    type: "text",
    name: "dan_toc",
    label: "Dân tộc",
  },
  {
    type: "select_one",
    name: "gioi_tinh",
    label: "Giới tính",
    choices: [
      { name: "1", label: "Nam" },
      { name: "2", label: "Nữ" },
    ],
  },
  {
    type: "text",
    name: "lop",
    label: "Lớp",
  },
  {
    type: "text",
    name: "truong",
    label: "Trường",
  },
  {
    type: "text",
    name: "dia_chi",
    label: "Địa chỉ",
  },
];

const tinhTrangNhuCau: Array<Field> = [
  {
    type: "note",
    label: "Note",
  },
];
const fields: Array<Field> = [
  {
    type: "group",
    name: "hanh_chinh",
    label: "Hành chính",
    fields: hanhChinh,
  },
  {
    type: "group",
    name: "tinh_trang_nhu_cau",
    label: "Tình trạng và nhu cầu",
    fields: tinhTrangNhuCau,
  },
];

const form: Form = {
  name: "tieu_hoc_form",
  label: "Phiếu điều tra sức khỏe răng miệng",
  labelSecondary: "(dành cho trẻ dưới 15 tuổi)",
  survey: fields,
};

export { form };
