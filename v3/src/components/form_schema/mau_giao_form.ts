import { Field, Form } from "./schema";
import { format } from "date-fns";

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
      { name: "1", label: "1 - Nam" },
      { name: "2", label: "2 - Nữ" },
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
    type: "dental_arch_table",
    name: "ham_tren",
    label: "Hàm trên",
    headers: ["", "Nhai", "N", "T", "G", "X", "TT", "NC", ""],
    rowHeaders: ["15", "14", "13", "12", "11", "21", "22", "23", "24", "25"],
    alternativeRowHeaders: ["55", "54", "53", "52", "51", "61", "62", "63", "64", "65"],
    fields: [
      { name: "15_Nhai", list: "tinhtrang" },
      { name: "15_N", list: "tinhtrang" },
      { name: "15_T", list: "tinhtrang" },
      { name: "15_G", list: "tinhtrang" },
      { name: "15_X", list: "tinhtrang" },
      { name: "15_TT", list: "tinhtrang" },
      { name: "15_NC", list: "nhucau" },

      { name: "14_Nhai", list: "tinhtrang" },
      { name: "14_N", list: "tinhtrang" },
      { name: "14_T", list: "tinhtrang" },
      { name: "14_G", list: "tinhtrang" },
      { name: "14_X", list: "tinhtrang" },
      { name: "14_TT", list: "tinhtrang" },
      { name: "14_NC", list: "nhucau" },

      { name: "13_N", list: "tinhtrang" },
      { name: "13_T", list: "tinhtrang" },
      { name: "13_G", list: "tinhtrang" },
      { name: "13_X", list: "tinhtrang" },
      { name: "13_TT", list: "tinhtrang" },
      { name: "13_NC", list: "nhucau" },

      { name: "12_N", list: "tinhtrang" },
      { name: "12_T", list: "tinhtrang" },
      { name: "12_G", list: "tinhtrang" },
      { name: "12_X", list: "tinhtrang" },
      { name: "12_TT", list: "tinhtrang" },
      { name: "12_NC", list: "nhucau" },

      { name: "11_N", list: "tinhtrang" },
      { name: "11_T", list: "tinhtrang" },
      { name: "11_G", list: "tinhtrang" },
      { name: "11_X", list: "tinhtrang" },
      { name: "11_TT", list: "tinhtrang" },
      { name: "11_NC", list: "nhucau" },

      { name: "21_N", list: "tinhtrang" },
      { name: "21_T", list: "tinhtrang" },
      { name: "21_G", list: "tinhtrang" },
      { name: "21_X", list: "tinhtrang" },
      { name: "21_TT", list: "tinhtrang" },
      { name: "21_NC", list: "nhucau" },

      { name: "22_N", list: "tinhtrang" },
      { name: "22_T", list: "tinhtrang" },
      { name: "22_G", list: "tinhtrang" },
      { name: "22_X", list: "tinhtrang" },
      { name: "22_TT", list: "tinhtrang" },
      { name: "22_NC", list: "nhucau" },

      { name: "23_N", list: "tinhtrang" },
      { name: "23_T", list: "tinhtrang" },
      { name: "23_G", list: "tinhtrang" },
      { name: "23_X", list: "tinhtrang" },
      { name: "23_TT", list: "tinhtrang" },
      { name: "23_NC", list: "nhucau" },

      { name: "24_Nhai", list: "tinhtrang" },
      { name: "24_N", list: "tinhtrang" },
      { name: "24_T", list: "tinhtrang" },
      { name: "24_G", list: "tinhtrang" },
      { name: "24_X", list: "tinhtrang" },
      { name: "24_TT", list: "tinhtrang" },
      { name: "24_NC", list: "nhucau" },

      { name: "25_Nhai", list: "tinhtrang" },
      { name: "25_N", list: "tinhtrang" },
      { name: "25_T", list: "tinhtrang" },
      { name: "25_G", list: "tinhtrang" },
      { name: "25_X", list: "tinhtrang" },
      { name: "25_TT", list: "tinhtrang" },
      { name: "25_NC", list: "nhucau" },
    ],
  },
  {
    type: "dental_arch_table",
    name: "ham_duoi",
    label: "Hàm dưới",
    headers: ["", "Nhai", "N", "T", "G", "X", "TT", "NC", ""],
    rowHeaders: ["35", "34", "33", "32", "31", "41", "42", "43", "44", "45"],
    alternativeRowHeaders: ["75", "74", "73", "72", "71", "81", "82", "83", "84", "85"],
    fields: [
      { name: "35_Nhai", list: "tinhtrang" },
      { name: "35_N", list: "tinhtrang" },
      { name: "35_T", list: "tinhtrang" },
      { name: "35_G", list: "tinhtrang" },
      { name: "35_X", list: "tinhtrang" },
      { name: "35_TT", list: "tinhtrang" },
      { name: "35_NC", list: "nhucau" },

      { name: "34_Nhai", list: "tinhtrang" },
      { name: "34_N", list: "tinhtrang" },
      { name: "34_T", list: "tinhtrang" },
      { name: "34_G", list: "tinhtrang" },
      { name: "34_X", list: "tinhtrang" },
      { name: "34_TT", list: "tinhtrang" },
      { name: "34_NC", list: "nhucau" },

      { name: "33_N", list: "tinhtrang" },
      { name: "33_T", list: "tinhtrang" },
      { name: "33_G", list: "tinhtrang" },
      { name: "33_X", list: "tinhtrang" },
      { name: "33_TT", list: "tinhtrang" },
      { name: "33_NC", list: "nhucau" },

      { name: "32_N", list: "tinhtrang" },
      { name: "32_T", list: "tinhtrang" },
      { name: "32_G", list: "tinhtrang" },
      { name: "32_X", list: "tinhtrang" },
      { name: "32_TT", list: "tinhtrang" },
      { name: "32_NC", list: "nhucau" },

      { name: "31_N", list: "tinhtrang" },
      { name: "31_T", list: "tinhtrang" },
      { name: "31_G", list: "tinhtrang" },
      { name: "31_X", list: "tinhtrang" },
      { name: "31_TT", list: "tinhtrang" },
      { name: "31_NC", list: "nhucau" },

      { name: "41_N", list: "tinhtrang" },
      { name: "41_T", list: "tinhtrang" },
      { name: "41_G", list: "tinhtrang" },
      { name: "41_X", list: "tinhtrang" },
      { name: "41_TT", list: "tinhtrang" },
      { name: "41_NC", list: "nhucau" },

      { name: "42_N", list: "tinhtrang" },
      { name: "42_T", list: "tinhtrang" },
      { name: "42_G", list: "tinhtrang" },
      { name: "42_X", list: "tinhtrang" },
      { name: "42_TT", list: "tinhtrang" },
      { name: "42_NC", list: "nhucau" },

      { name: "43_N", list: "tinhtrang" },
      { name: "43_T", list: "tinhtrang" },
      { name: "43_G", list: "tinhtrang" },
      { name: "43_X", list: "tinhtrang" },
      { name: "43_TT", list: "tinhtrang" },
      { name: "43_NC", list: "nhucau" },

      { name: "44_Nhai", list: "tinhtrang" },
      { name: "44_N", list: "tinhtrang" },
      { name: "44_T", list: "tinhtrang" },
      { name: "44_G", list: "tinhtrang" },
      { name: "44_X", list: "tinhtrang" },
      { name: "44_TT", list: "tinhtrang" },
      { name: "44_NC", list: "nhucau" },

      { name: "45_Nhai", list: "tinhtrang" },
      { name: "45_N", list: "tinhtrang" },
      { name: "45_T", list: "tinhtrang" },
      { name: "45_G", list: "tinhtrang" },
      { name: "45_X", list: "tinhtrang" },
      { name: "45_TT", list: "tinhtrang" },
      { name: "45_NC", list: "nhucau" },
    ],
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
    label: "Tình trạng và nhu cầu (SMT)",
    fields: tinhTrangNhuCau,
  },
  {
    type: "group",
    name: "ohis",
    label: "Tình trạng vệ sinh răng miệng (OHIS)",
    fields: [
      {
        type: "dental_arch_table_2_rows",
        name: "pi",
        label: "PI",
        firstRow: [
          {
            name: "pi_55N",
            label: "55N",
            list: "pi",
          },
          {
            name: "pi_51N",
            label: "51N",
            list: "pi",
          },
          {
            name: "pi_65N",
            label: "65N",
            list: "pi",
          },
        ],
        secondRow: [
          {
            name: "pi_75T",
            label: "75(T)",
            list: "pi",
          },
          {
            name: "pi_71N",
            label: "71N",
            list: "pi",
          },
          {
            name: "pi_85T",
            label: "85(T)",
            list: "pi",
          },
        ],
      },
    ],
  },
];

const form: Form = {
  name: "tieu_hoc_form",
  label: "Phiếu điều tra sức khỏe răng miệng",
  labelSecondary: "(dành cho học sinh Mẫu giáo)",
  survey: fields,
  lists: {
    tinhtrang: [
      { name: "0", label: "0" },
      { name: "1", label: "1" },
      { name: "2", label: "2" },
      { name: "3", label: "3" },
      { name: "4", label: "4" },
      { name: "5", label: "5" },
      { name: "6", label: "6" },
      { name: "7", label: "7" },
      { name: "8", label: "8" },
      { name: "9", label: "9" },
      { name: "a", label: "A" },
      { name: "b", label: "B" },
      { name: "c", label: "C" },
      { name: "d", label: "D" },
      { name: "e", label: "E" },
      { name: "f", label: "F" },
      { name: "g", label: "G" },
    ],
    nhucau: [
      { name: "0", label: "0" },
      { name: "1", label: "1" },
      { name: "2", label: "2" },
      { name: "3", label: "3" },
      { name: "4", label: "4" },
      { name: "5", label: "5" },
      { name: "6", label: "6" },
      { name: "f", label: "F" },
      { name: "p", label: "P" },
    ],
    pi: [
      { name: "0", label: "0 - Không có mảng bám" },
      { name: "1", label: "1 - Mảng bám 1/3 cổ răng/vết dính" },
      { name: "2", label: "2 - Mảng bám 2/3 răng" },
      { name: "3", label: "3 - mảng bám >2/3 răng" },
      { name: "x", label: "X - Không có răng" },
    ],
  },
};

const makeCurrentDate = () => format(new Date(), "dd-MM-yyyy");
const makeInitialValues = () => ({
  ngay_kham: makeCurrentDate(),
});

export { form, makeInitialValues };
