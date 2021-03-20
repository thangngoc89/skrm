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
    rowHeaders: ["17", "16", "15", "14", "13", "12", "11", "21", "22", "23", "24", "25", "26", "27"],
    alternativeRowHeaders: ["", "", "55", "54", "53", "52", "51", "61", "62", "63", "64", "65", "", ""],
    fields: [
      { type: "select_one_ref", name: "17_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "17_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "17_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "17_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "17_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "17_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "17_NC", list: "nhucau" },

      { type: "select_one_ref", name: "16_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "16_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "16_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "16_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "16_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "16_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "16_NC", list: "nhucau" },

      { type: "select_one_ref", name: "15_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "15_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "15_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "15_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "15_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "15_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "15_NC", list: "nhucau" },

      { type: "select_one_ref", name: "14_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "14_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "14_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "14_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "14_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "14_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "14_NC", list: "nhucau" },

      { type: "select_one_ref", name: "13_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "13_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "13_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "13_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "13_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "13_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "13_NC", list: "nhucau" },

      { type: "select_one_ref", name: "12_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "12_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "12_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "12_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "12_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "12_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "12_NC", list: "nhucau" },

      { type: "select_one_ref", name: "11_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "11_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "11_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "11_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "11_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "11_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "11_NC", list: "nhucau" },

      { type: "select_one_ref", name: "21_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "21_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "21_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "21_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "21_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "21_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "21_NC", list: "nhucau" },

      { type: "select_one_ref", name: "22_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "22_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "22_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "22_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "22_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "22_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "22_NC", list: "nhucau" },

      { type: "select_one_ref", name: "23_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "23_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "23_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "23_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "23_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "23_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "23_NC", list: "nhucau" },

      { type: "select_one_ref", name: "24_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "24_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "24_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "24_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "24_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "24_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "24_NC", list: "nhucau" },

      { type: "select_one_ref", name: "25_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "25_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "25_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "25_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "25_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "25_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "25_NC", list: "nhucau" },

      { type: "select_one_ref", name: "26_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "26_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "26_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "26_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "26_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "26_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "26_NC", list: "nhucau" },

      { type: "select_one_ref", name: "27_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "27_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "27_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "27_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "27_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "27_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "27_NC", list: "nhucau" },
    ],
  },
  {
    type: "dental_arch_table",
    name: "ham_duoi",
    label: "Hàm dưới",
    headers: ["", "Nhai", "N", "T", "G", "X", "TT", "NC", ""],
    rowHeaders: ["37", "36", "35", "34", "33", "32", "31", "41", "42", "43", "44", "45", "46", "47"],
    alternativeRowHeaders: ["", "", "75", "74", "73", "72", "71", "81", "82", "83", "84", "85", "", ""],
    fields: [
      { type: "select_one_ref", name: "37_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "37_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "37_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "37_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "37_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "37_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "37_NC", list: "nhucau" },

      { type: "select_one_ref", name: "36_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "36_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "36_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "36_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "36_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "36_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "36_NC", list: "nhucau" },

      { type: "select_one_ref", name: "35_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "35_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "35_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "35_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "35_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "35_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "35_NC", list: "nhucau" },

      { type: "select_one_ref", name: "34_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "34_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "34_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "34_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "34_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "34_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "34_NC", list: "nhucau" },

      { type: "select_one_ref", name: "33_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "33_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "33_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "33_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "33_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "33_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "33_NC", list: "nhucau" },

      { type: "select_one_ref", name: "32_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "32_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "32_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "32_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "32_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "32_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "32_NC", list: "nhucau" },

      { type: "select_one_ref", name: "31_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "31_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "31_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "31_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "31_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "31_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "31_NC", list: "nhucau" },

      { type: "select_one_ref", name: "41_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "41_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "41_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "41_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "41_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "41_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "41_NC", list: "nhucau" },

      { type: "select_one_ref", name: "42_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "42_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "42_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "42_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "42_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "42_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "42_NC", list: "nhucau" },

      { type: "select_one_ref", name: "43_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "43_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "43_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "43_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "43_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "43_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "43_NC", list: "nhucau" },

      { type: "select_one_ref", name: "44_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "44_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "44_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "44_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "44_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "44_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "44_NC", list: "nhucau" },

      { type: "select_one_ref", name: "45_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "45_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "45_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "45_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "45_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "45_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "45_NC", list: "nhucau" },

      { type: "select_one_ref", name: "46_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "46_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "46_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "46_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "46_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "46_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "46_NC", list: "nhucau" },

      { type: "select_one_ref", name: "47_Nhai", list: "tinhtrang" },
      { type: "select_one_ref", name: "47_N", list: "tinhtrang" },
      { type: "select_one_ref", name: "47_T", list: "tinhtrang" },
      { type: "select_one_ref", name: "47_G", list: "tinhtrang" },
      { type: "select_one_ref", name: "47_X", list: "tinhtrang" },
      { type: "select_one_ref", name: "47_TT", list: "tinhtrang" },
      { type: "select_one_ref", name: "47_NC", list: "nhucau" },
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
    fields: [],
  },
  {
    type: "group",
    name: "fluor",
    label: "Tình trạng răng nhiễm Fluor",
    fields: [
      {
        type: "select_one",
        name: "fluor_ma_so",
        label: "Mã số",
        choices: [
          { name: "0", label: "0 - Bình thường" },
          { name: "1", label: "1 - Nghi ngờ; vài đường, đốm trắng đục" },
          { name: "2", label: "2 - rất nhẹ: trắng đục <25%" },
          { name: "3", label: "3 - nhẹ: 25% < trắng đục < 50%" },
          { name: "4", label: "4 - trung bình: trắng đục toàn bộ" },
          { name: "5", label: "5 - nặng: khiếm khuyết" },
        ],
      },
      {
        type: "integer",
        name: "fluor_so_rang",
        label: "Fluor số răng",
      },
    ],
  },
  {
    type: "group",
    name: "khop_can",
    label: "Tình trạng khớp cắn",
    fields: [
      {
        type: "integer",
        name: "can_phu",
        label: "Độ cắn phủ",
      },
      {
        type: "integer",
        name: "can_chia",
        label: "Độ cắn chìa",
      },
      {
        type: "select_one",
        name: "can_nguoc_rang_truoc",
        label: "Cắn ngược răng trước",
        display: "radio",
        choices: [
          { name: "0", label: "0 - Không" },
          { name: "1", label: "1 - Có" },
        ],
      },
      {
        type: "select_one",
        name: "can_nguoc_rang_sau",
        label: "Cắn ngược răng sau",
        display: "radio",
        choices: [
          { name: "0", label: "0 - Không" },
          { name: "1", label: "1 - Có" },
        ],
      },
      {
        type: "select_one",
        name: "can_ho",
        label: "Cắn hở",
        display: "radio",
        choices: [
          { name: "0", label: "0 - Không" },
          { name: "1", label: "1 - Có" },
        ],
      },
    ],
  },
  {
    type: "group",
    name: "moc_chen_chuc",
    label: "Mọc chen chúc",
    fields: [],
  },
  {
    type: "group",
    name: "phan_loai_angle",
    label: "Phân loại khớp cắn Angle",
    fields: [
      {
        type: "select_one_ref",
        name: "angle_r3p",
        label: "R3P",
        display: "radio",
        list: "angle",
      },
      {
        type: "select_one_ref",
        name: "angle_r3t",
        label: "R3T",
        display: "radio",
        list: "angle",
      },
      {
        type: "select_one_ref",
        name: "angle_r6p",
        label: "R6P",
        display: "radio",
        list: "angle",
      },
      {
        type: "select_one_ref",
        name: "angle_r6t",
        label: "R6T",
        display: "radio",
        list: "angle",
      },
    ],
  },
  {
    type: "group",
    name: "mih",
    label: "MIH",
    fields: [],
  },
];

const form: Form = {
  name: "tieu_hoc_form",
  label: "Phiếu điều tra sức khỏe răng miệng",
  labelSecondary: "(dành cho trẻ dưới 15 tuổi)",
  survey: fields,
  lists: {
    tinhtrang: [
      { name: "0", label: "0 - Bình thường" },
      { name: "1", label: "1 - Sâu" },
      { name: "2", label: "2 - Trám sâu lại" },
      { name: "3", label: "3 - Trám không sâu" },
      { name: "4", label: "4 - Mất do sâu" },
      { name: "5", label: "5 - Mất lí do khác" },
      { name: "6", label: "6 - Bít hố rãnh" },
      { name: "7", label: "7 - Trụ cầu" },
      { name: "8", label: "8 - Chưa mọc" },
      { name: "9", label: "9 - Không ghi nhận" },
      { name: "a", label: "A - Bình thường" },
      { name: "b", label: "B - Sâu" },
      { name: "c", label: "C - Trám sâu lại" },
      { name: "d", label: "D - Trám không sâu" },
      { name: "e", label: "E - Mất do sâu" },
      { name: "f", label: "F - Bít hố rãnh" },
      { name: "g", label: "G - Trụ cầu" },
    ],
    nhucau: [
      { name: "0", label: "0 - Không" },
      { name: "1", label: "1 - Trám 1 mặt" },
      { name: "2", label: "2 - Trám ≥ 2 mặt" },
      { name: "3", label: "3 - Mão" },
      { name: "4", label: "4 - Veneer, laminate" },
      { name: "5", label: "5 - Điều trị tuỷ" },
      { name: "6", label: "6 - Nhỗ răng" },
      { name: "f", label: "F - Bít hố rãnh" },
      { name: "p", label: "P - Trám phòng ngừa" },
    ],
    angle: [
      { name: "1", label: "1 - Hạng I" },
      { name: "2", label: "2 - Hạng II" },
      { name: "3", label: "3 - Hạng III" },
      { name: "9", label: "9 - Không xác định được" },
    ],
    mih: [
      { name: "0", label: "0 - Bình thường" },
      { name: "1", label: "1 - Đục men ranh giới rõ ràng" },
      { name: "2", label: "2 - Men răng vỡ sau mọc" },
      { name: "3", label: "3 - Đã có trám phục hồi" },
      { name: "4", label: "4 - Mất do nhổ vì MIH" },
      { name: "5", label: "5 - Răng chưa mọc" },
    ],
  },
};

export { form };
