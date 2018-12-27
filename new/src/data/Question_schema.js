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
    type: "select_one",
    id: "b5",
    question:
      "Theo cháu cảm nhận, thì cháu thấy tình trạng **nướu** của mình thế nào?",
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
    type: "select_one",
    id: "b6",
    question:
      "Trong suốt 12 tháng vừa qua, có khi nào cháu cảm thấy bị đau răng hay cảm thấy bị khó chịu vì răng miệng của mình không?",
    content: [
      { value: "1", label: "Thường xuyên" },
      { value: "2", label: "Thỉnh thoảng" },
      { value: "3", label: "Hiếm khi" },
      { value: "4", label: "Không bao giờ" },
      { value: "9", label: "Không biết" },
    ],
  },
  {
    type: "select_one",
    id: "b7",
    question:
      "Có bao giờ cháu ngại cười vì mặc cảm răng của mình không đẹp không?",
    content: [
      { value: "1", label: "Rất thường xuyên" },
      { value: "2", label: "Thường xuyên" },
      { value: "3", label: "Thỉnh thoảng" },
      { value: "4", label: "Chưa bao giờ" },
    ],
  },
  {
    type: "select_one",
    id: "b8",
    question: "Cháu có cảm thấy hài lòng với hàm răng của mình không?",
    content: [
      { value: "1", label: "Rất hài lòng" },
      { value: "2", label: "Hài lòng" },
      { value: "3", label: "Trung  bình" },
      { value: "4", label: "Không hài lòng lắm" },
      { value: "5", label: "Không hài lòng chút nào" },
    ],
  },
  {
    type: "select_one",
    id: "b9",
    question:
      "Trong năm vừa qua cháu có khi nào phải nghỉ học thường xuyên hay vài ngày vì bị đau răng không?",
    content: [{ value: "1", label: "Có" }, { value: "2", label: "Không" }],
  },
  {
    type: "group_select_one",
    id: "b10",
    question:
      "Nếu bây giờ cháu phải đến khám ở một phòng nha, thì cháu nghĩ nha sĩ sẽ nói với cháu điều gì? Nha sĩ sẽ nói với cháu rằng (đọc từng câu một):",
    values: [
      { value: "1", label: "Có" },
      { value: "0", label: "Không" },
      { value: "9", label: "Không biết" },
    ],
    subQuestions: [
      { value: "1", label: "Cháu phải chải răng kĩ hơn" },
      { value: "2", label: "Cháu phải thường đi lấy cao (vôi) răng" },
      { value: "3", label: "Cháu có răng cần trám" },
      { value: "4", label: "Cháu có răng cần nhổ" },
      { value: "5", label: "Răng của cháu cần chỉnh lại cho đều đặn" },
      { value: "6", label: "Răng của cháu tốt lắm" },
    ],
  },
  {
    type: "select_one",
    id: "b11",
    question: "Trong 12 tháng vừa qua, cháu đã đi nha sĩ khám răng mấy lần?",
    content: [
      { value: "1", label: "1 lần" },
      { value: "2", label: "2 lần" },
      { value: "3", label: "3 lần" },
      { value: "4", label: "4 lần" },
      { value: "5", label: "Nhiều hơn 4 lần" },
      { value: "6", label: "Không đến khám trong 12 tháng trước" },
      {
        value: "7",
        label:
          "Không nhận được sự chăm sóc răng miệng nào hoặc không gặp nha sĩ nào",
      },
    ],
  },
  {
    type: "select_one",
    id: "b12",
    question:
      "Lý do của lần đến khám nha sĩ gần đây nhất là gì? (chọn 1 ô duy nhất)",
    content: [
      { value: "1", label: "Đau, hay có vấn đề với răng, nướu và miệng" },
      { value: "2", label: "Điều trị/ tái khám" },
      { value: "3", label: "Kiểm tra định kỳ" },
      { value: "9", label: "Không biết/ không nhớ" },
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
  {
    type: "select_one",
    id: "b14",
    question: "Trong lần khám này, ai đã đi với cháu?",
    content: [
      { value: "1", label: "Không có ai" },
      { value: "2", label: "Mẹ cháu" },
      { value: "3", label: "Ba cháu" },
      { value: "4", label: "Anh/Chị của cháu" },
      { value: "5", label: "Một người lớn khác" },
      { value: "6", label: "Bạn cháu" },
    ],
  },
  {
    type: "select_one",
    id: "b15",
    question: "Cháu đánh răng bao nhiêu lần? (Chọn 1 ô duy nhất)",
    content: [
      { value: "1", label: "Không bao giờ" },
      { value: "2", label: "2-3 lần mỗi tháng" },
      { value: "3", label: "Mỗi tuần một lần" },
      { value: "4", label: "2-6 lần mỗi tuần" },
      { value: "5", label: "Mỗi ngày một lần" },
      { value: "6", label: "Mỗi ngày ít nhất là hai lần" },
    ],
  },
  {
    type: "select_many_or_custom",
    id: "b16",
    question:
      "Cháu sử dụng vật dụng nào dưới đây để đánh răng? (đọc tên từng vật dụng)",
    content: [
      { value: "1", label: "Bàn chải" },
      { value: "2", label: "Tăm tre" },
      { value: "3", label: "Tăm nhựa" },
      { value: "4", label: "Chỉ tơ nha khoa" },
      { value: "5", label: "Than" },
      { value: "6", label: "Vỏ cau" },
    ],
    custom: { value: "7", label: "Vật dụng khác (vui lòng ghi rõ)" },
  },
  {
    type: "select_one",
    id: "b17",
    question: "Cháu có sử dụng kem đánh răng để chải răng không?",
    content: [{ value: "1", label: "Có" }, { value: "2", label: "Không" }],
  },
  {
    type: "select_one",
    id: "b18",
    question: "Cháu có dùng kem đánh răng có Fluor không?",
    content: [
      { value: "1", label: "Có" },
      { value: "2", label: "Không" },
      { value: "9", label: "Không biết" },
    ],
  },
  {
    type: "group_select_one",
    id: "b19",
    question:
      "Cháu có thường ăn hay uống những thức ăn sau đây, dù là ăn/ uống rất ít không? (đọc từng thứ)",
    values: [
      { value: "6", label: "Vài lần/ngày" },
      { value: "5", label: "Mỗi ngày" },
      { value: "4", label: "Vài lần/tuần" },
      { value: "3", label: "1 lần/tuần" },
      { value: "2", label: "Vài lần/tháng" },
      { value: "1", label: "Không bao giờ" },
    ],
    subQuestions: [
      { value: "1", label: "Trái cây tươi" },
      {
        value: "2",
        label: "Bánh quy, bông lan, bánh kem, bánh ngọt",
      },
      {
        value: "3",
        label: "Nước chanh, nước ngọt có gas (Coca)",
      },
      { value: "4", label: "Mứt, mật ong" },
      { value: "5", label: "kẹo cao su có đường" },
      { value: "6", label: "Kẹo/mè xửng" },
      { value: "7", label: "Sữa có đường" },
      { value: "8", label: "Trà có đường" },
      { value: "9", label: "Cà phê có đường" },
    ],
  },
];