import { Field, Form } from "./schema";

const mkHoatDongFields = (id: string): Array<Field> => {
  return [
    {
      type: "select_one",
      name: id + "_muc_do",
      display: "radio",
      label: "Mức trầm trọng",
      choices: [
        { name: "0", label: "0 - Không ảnh hưởng" },
        { name: "1", label: "1 - Ít ảnh hưởng" },
        { name: "2", label: "2 - Ảnh hưởng vừa phải" },
        { name: "3", label: "3 - Ảnh hưởng rất nhiều " },
      ],
    },
    {
      type: "select_one",
      name: id + "_tan_suat",
      display: "radio",
      label: "Tần suất",
      choices: [
        { name: "0", label: "0 - Không ảnh hưởng" },
        { name: "1", label: "1 - 1-2 lần/tháng" },
        { name: "2", label: "2 - ≥ 3 lần/tháng hoặc 1-2 lần/tuần" },
        { name: "3", label: "3 - ≥ 3 lần/tuần" },
      ],
    },
    {
      type: "select_many_ref",
      name: id + "_nguyen_nhan",
      label: "Nguyên nhân",
      list: "khochiu",
    },
  ];
};
const fields: Array<Field> = [
  {
    type: "select_one",
    name: "co_kho_chiu",
    display: "radio",
    label: "Trong 3 tháng qua các em có thấy khó chịu hay đau ở vùng răng miệng của mình hay không?",
    choices: [
      { name: "0", label: "Không" },
      { name: "1", label: "Có" },
    ],
  },
  {
    type: "select_many_ref",
    name: "liet_ke_kho_chiu",
    label: "Nếu có thì những khó chịu đó là gì? (đánh dấu chéo vào các ô mà các em nghĩ là đúng với bản thân mình)",
    list: "khochiu",
  },
  {
    type: "text",
    name: "99_custom",
    label: "Liệt kê khó chịu khác tại đây",
  },
  {
    type: "group",
    name: "ghi_nhan",
    label: "Các khó chịu nêu trên ảnh hưởng đến hoạt động nào?",
    fields: [
      {
        type: "group",
        name: "group_1",
        label: "1. Ăn nhai (trong các bữa ăn, ăn kem,...)",
        fields: mkHoatDongFields("1"),
      },
      {
        type: "group",
        name: "group_2",
        label: "2. Nói, phát âm",
        fields: mkHoatDongFields("2"),
      },
      {
        type: "group",
        name: "group_3",
        label: "3. Vệ sinh răng miệng (như súc miệng, chải răng,...)",
        fields: mkHoatDongFields("3"),
      },
      {
        type: "group",
        name: "group_4",
        label: "4. Nghỉ ngơi (kể cả việc ngủ)",
        fields: mkHoatDongFields("4"),
      },
      {
        type: "group",
        name: "group_5",
        label: "5. Trạng thái tinh thần (vui, buồn, hờn giận, bực tức, chán,...) ",
        fields: mkHoatDongFields("5"),
      },
      {
        type: "group",
        name: "group_6",
        label: "6. Cười, cười hở răng (không thấy ngại ngùng)",
        fields: mkHoatDongFields("6"),
      },
      {
        type: "group",
        name: "group_7",
        label: "7. Học tập (đi học, học tại lớp, làm bài tập ở nhà)",
        fields: mkHoatDongFields("7"),
      },
      {
        type: "group",
        name: "group_8",
        label: "8. Tiếp xúc với mọi người (đi chơi với bạn bè, đến nhà bạn chơi)",
        fields: mkHoatDongFields("8"),
      },
    ],
  },
];

export const form: Form = {
  name: "tieu_hoc_child_oidp",
  label: "Bảng câu hỏi về những khó chịu từ răng miệng",
  labelShort: "Child-OIDP",
  survey: fields,
  lists: {
    khochiu: [
      { name: "1", label: "Đau răng, nhức răng" },
      { name: "2", label: "Ê buốt răng khi ăn kem, khi uống nước đá, nước nóng..." },
      { name: "3", label: "Sâu răng, có lỗ trên răng" },
      { name: "4", label: "Răng sữa bị lung lay, sắp rụng" },
      {
        name: "5",
        label: "Trống răng (răng sữa rụng mà răng vĩnh viễn chưa mọc)",
      },
      { name: "6", label: "Răng vĩnh viễn bị gãy, vỡ lớn, mẻ" },
      { name: "7", label: "Màu răng xấu, răng bị lốm đốm trắng đục" },
      { name: "8", label: "Hình dạng răng không đẹp hay răng to hoặc nhỏ quá" },
      {
        name: "9",
        label: "Vị trí của răng (ví dụ như bị cong hoặc bị nhô ra, hay có khe hở)",
      },
      { name: "10", label: "Chảy máu nướu khi chải răng" },
      { name: "11", label: "Sưng nướu, đau nướu" },
      {
        name: "12",
        label: "Vôi răng, răng có vôi đen hay bựa thức ăn bám trên răng",
      },
      { name: "13", label: "Lở loét hay trầy xướt trong miệng" },
      { name: "14", label: "Hôi miệng hay hơi thở hôi" },
      { name: "15", label: "Có tật ở vùng miệng hay mặt (sứt môi, hở hàm ếch)" },
      { name: "16", label: "Răng đang mọc gây đau" },
      {
        name: "17",
        label: "Thiếu răng vĩnh viễn (răng vĩnh viễn không mọc) làm ăn nhai khó hay mặt không đẹp",
      },
      {
        name: "99",
        label: "Những khó chịu khác (ghi rõ)",
      },
    ],
  },
};

export const makeInitialValues = () => ({});
