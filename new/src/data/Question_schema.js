export default [
  {
    id: "b2",
    type: "select_one",
    question: "Nơi cư ngụ",
    content: [
      { value: "1", label: "Nội thành" },
      { value: "2", label: "Ngoại thành" },
      { value: "3", label: "Tỉnh" },
    ],
  },
  {
    id: "b4",
    type: "select_one",
    question:
      "Theo cháu cảm nhận, thì cháu thấy tình trạng **răng** của mình thế nào?",
    content: [
      { value: "1", label: "Hoàn toàn lành mạnh" },
      { value: "2", label: "Rất tốt" },
      { value: "3", label: "Tốt" },
      { value: "4", label: "Trung bình" },
      { value: "5", label: "Không được tốt lắm" },
      { value: "6", label: "Hoàn toàn không tốt" },
      { value: "9", label: "Không biết" },
    ],
  },
  {
    id: "b13",
    type: "select_many_or_custom",
    question:
      "Cháu hãy ráng nhớ xem nha sĩ đã làm gì cho cháu trong lần khám đó? Nha sĩ/ Y sĩ đã làm...",
    content: [
      { value: "1", label: "Trám răng" },
      { value: "2", label: "Cạo vôi răng" },
      { value: "3", label: "Nhổ răng" },
      { value: "4", label: "Khám răng" },
      { value: "5", label: "Chụp phim răng" },
      { value: "6", label: "Lấy tủy răng" },
      { value: "7", label: "HD VSRM" },
    ],
    custom: { value: "8", label: "Điều trị khác (ghi rõ)" },
  },
];
