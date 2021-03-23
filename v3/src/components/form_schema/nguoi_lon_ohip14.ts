import { Field, Form } from "./schema";

const fields: Array<Field> = [
  {
    type: "select_one_ref",
    name: "ohip1",
    label:
      "Ông/Bà có từng gặp khó khăn khi phát âm một số từ nào đó vì có vấn đề với răng, miệng (hay hàm giả) của mình không?",
    display: "radio",
    list: "ohip",
  },
  {
    type: "select_one_ref",
    name: "ohip2",
    label:
      "Ông/Bà có từng cảm thấy rằng vị giác của mình bị kém đi vì vấn đề với răng, miệng, (hay hàm giả) của mình không?",
    display: "radio",
    list: "ohip",
  },
  {
    type: "select_one_ref",
    name: "ohip3",
    label: "Ông/bà có bao giờ bị đau hay khó chịu ở trong miệng vì vấn đề với răng, miệng, (hay hàm giả) không?",
    display: "radio",
    list: "ohip",
  },
  {
    type: "select_one_ref",
    name: "ohip4",
    label:
      "Ông/Bà có từng cảm thấy khó chịu khi ăn những loại thức ăn nào đó vì vấn đề với răng, miệng (hay hàm giả) của mình không?",
    display: "radio",
    list: "ohip",
  },
  {
    type: "select_one_ref",
    name: "ohip5",
    label: "Ông/Bà có bao giờ lo lắng vì vấn đề răng, miệng (hay hàm giả) của mình không?",
    display: "radio",
    list: "ohip",
  },
  {
    type: "select_one_ref",
    name: "ohip6",
    label: "Ông/Bà có bao giờ cảm thấy căng thẳng vì vấn đề về răng, miệng (hay hàm giả) của mình không?",
    display: "radio",
    list: "ohip",
  },
  {
    type: "select_one_ref",
    name: "ohip7",
    label:
      "Chế độ ăn của Ông/Bà có từng không đủ tốt hay không thể chấp nhận vì vấn đề với răng, miệng (hay hàm giả) của mình không?",
    display: "radio",
    list: "ohip",
  },
  {
    type: "select_one_ref",
    name: "ohip8",
    label: "Ông /Bà có từng bị tạm ngưng bữa ăn vì vấn đề với răng, miệng (hay hàm giả) của mình không?",
    display: "radio",
    list: "ohip",
  },
  {
    type: "select_one_ref",
    name: "ohip9",
    label: "Ông/Bà có từng cảm thấy khó thư giãn vì vấn đề với răng, miệng (hay hàm giả) của mình không?",
    display: "radio",
    list: "ohip",
  },
  {
    type: "select_one_ref",
    name: "ohip10",
    label: "Ông/Bà có từng cảm thấy bối rối vì vấn đề răng,miệng (hàm giả) của mình không?",
    display: "radio",
    list: "ohip",
  },
  {
    type: "select_one_ref",
    name: "ohip11",
    label:
      "Ông/Bà có từng dễ bị phiền lòng (dễ cáu gắt) với người khác vì vấn đề với răng, miệng (hay hàm giả) của mình không?",
    display: "radio",
    list: "ohip",
  },
  {
    type: "select_one_ref",
    name: "ohip12",
    label:
      "Ông/Bà có từng cảm thấy có khó khăn khi làm những công việc thông thường vì vấn đề với răng, miệng (hay hàm giả) của mình không?",
    display: "radio",
    list: "ohip",
  },
  {
    type: "select_one_ref",
    name: "ohip13",
    label:
      "Ông/Bà có từng cảm thấy rằng cuộc sống nói chung bị kém đi vì vấn đề với răng, miệng (hay hàm giả) của mình không?",
    display: "radio",
    list: "ohip",
  },
  {
    type: "select_one_ref",
    name: "ohip14",
    label:
      "Ông/Bà có từng hoàn toàn không thể làm việc được như mong muốn vì vấn đề với răng, miệng (hay hàm giả) của mình không?",
    display: "radio",
    list: "ohip",
  },
];

export const form: Form = {
  name: "nguoi_lon_ohip14",
  labelShort: "OHIP-14",
  label: "Phỏng vấn kiến thức và thói quen chăm sóc sức khỏe răng miệng",
  survey: fields,
  labelVerbose: true,
  lists: {
    ohip: [
      {
        name: "0",
        label: "không bao giờ",
      },
      {
        name: "1",
        label: "hiếm hoặc ít khi",
      },
      {
        name: "2",
        label: "thỉnh thoảng",
      },
      {
        name: "3",
        label: "thường xuyên",
      },
      {
        name: "4",
        label: "rất thường xuyên",
      },
    ],
  },
};

export const makeInitialValues = () => ({});
