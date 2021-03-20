import { field, form } from "./schema";

const fields: Array<field> = [
  {
    name: "b2",
    type: "select_one",
    question: "Nơi cư ngụ",
    content: [
      { value: "1", label: "Nội thành" },
      { value: "2", label: "Ngoại thành" },
      { value: "3", label: "Tỉnh" },
    ],
  },
  {
    type: "select_one",
    name: "b4",
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
    name: "b5",
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
    name: "b6",
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
    name: "b7",
    type: "select_one",
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
    name: "b8",
    type: "select_one",
    question: "Cháu có cảm thấy hài lòng với hàm răng của mình không?",
    content: [
      { value: "1", label: "Rất hài lòng" },
      { value: "2", label: "Hài lòng" },
      { value: "3", label: "Trung bình" },
      { value: "4", label: "Không hài lòng lắm" },
      { value: "5", label: "Không hài lòng chút nào" },
    ],
  },
  {
    name: "b9",
    type: "select_one",
    question:
      "Trong năm vừa qua cháu có khi nào phải nghỉ học thường xuyên hay vài ngày vì bị đau răng không?",
    content: [
      { value: "1", label: "Có" },
      { value: "2", label: "Không" },
    ],
  },
  {
    name: "b10",
    type: "matrix_select_one",
    question:
      "Nếu bây giờ cháu phải đến khám ở một phòng nha, thì cháu nghĩ nha sĩ sẽ nói với cháu điều gì? Nha sĩ sẽ nói với cháu rằng (đọc từng câu một):",
    values: [
      { value: "1", label: "Có" },
      { value: "0", label: "Không" },
      { value: "9", label: "Không biết" },
    ],
    subQuestions: [
      { id: "b10_1", question: "Cháu phải chải răng kĩ hơn" },
      { id: "b10_2", question: "Cháu phải thường đi lấy cao (vôi) răng" },
      { id: "b10_3", question: "Cháu có răng cần trám" },
      { id: "b10_4", question: "Cháu có răng cần nhổ" },
      { id: "b10_5", question: "Răng của cháu cần chỉnh lại cho đều đặn" },
      { id: "b10_6", question: "Răng của cháu tốt lắm" },
    ],
  },
  {
    name: "b11",
    type: "select_one",
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
    name: "b12",
    type: "select_one",
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
    name: "b13",
    type: "select_many",
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
      { value: "8", label: "Điều trị khác (ghi rõ)" },
    ],
  },
  {
    name: "b13_custom",
    type: "text",
    condition: "b13 == 8",
  },
  {
    name: "b14",
    type: "select_one",
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
    name: "b15",
    type: "select_one",
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
    name: "b16",
    type: "select_many",
    question:
      "Cháu sử dụng vật dụng nào dưới đây để đánh răng? (đọc tên từng vật dụng)",
    content: [
      { value: "1", label: "Bàn chải" },
      { value: "2", label: "Tăm tre" },
      { value: "3", label: "Tăm nhựa" },
      { value: "4", label: "Chỉ tơ nha khoa" },
      { value: "5", label: "Than" },
      { value: "6", label: "Vỏ cau" },
      { value: "7", label: "Vật dụng khác (vui lòng ghi rõ)" },
    ],
  },
  {
    name: "b16_custom",
    type: "text",
    condition: "b16 == 7",
  },
  {
    name: "b17",
    type: "select_one",
    question: "Cháu có sử dụng kem đánh răng để chải răng không?",
    content: [
      { value: "1", label: "Có" },
      { value: "2", label: "Không" },
    ],
  },
  {
    name: "b18",
    type: "select_one",
    question: "Cháu có dùng kem đánh răng có Fluor không?",
    content: [
      { value: "1", label: "Có" },
      { value: "2", label: "Không" },
      { value: "9", label: "Không biết" },
    ],
  },
  {
    name: "b19",
    type: "matrix_select_one",
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
      { id: "b19_1", question: "Trái cây tươi" },
      { id: "b19_2", question: "Bánh quy, bông lan, bánh kem, bánh ngọt" },
      { id: "b19_3", question: "Nước chanh, nước ngọt có gas (Coca)" },
      { id: "b19_4", question: "Mứt, mật ong" },
      { id: "b19_5", question: "Kẹo cao su có đường" },
      { id: "b19_6", question: "Kẹo/mè xửng" },
      { id: "b19_7", question: "Sữa có đường" },
      { id: "b19_8", question: "Trà có đường" },
      { id: "b19_9", question: "Cà phê có đường" },
    ],
  },
  {
    name: "b20",
    type: "select_many",
    question: "Ai là người bảo cháu phải tự chăm sóc răng của mình?",
    content: [
      { value: "1", label: "Nha sĩ" },
      { value: "2", label: "Bác sĩ y khoa" },
      { value: "3", label: "Thầy cô giáo" },
      { value: "4", label: "Sách" },
      { value: "5", label: "Tivi" },
      { value: "6", label: "Đài phát thanh" },
      { value: "7", label: "Báo, tạp chí" },
      { value: "8", label: "Bạn của cháu" },
      { value: "9", label: "Cha của cháu" },
      { value: "10", label: "Mẹ của cháu" },
      { value: "11", label: "Người khác" },
    ],
  },
  {
    name: "b21",
    type: "select_one",
    question: "Cháu vui lòng cho biết nghề nghiệp của cha mình?",
    content: [
      { value: "1", label: "Nông dân" },
      { value: "2", label: "Lao động tay chân" },
      { value: "3", label: "Nhân viên hành chánh" },
      { value: "4", label: "Chuyên viên (Kỹ sư/Bác sĩ)" },
      { value: "5", label: "Kinh doanh, buôn bán" },
      { value: "6", label: "Nội trợ" },
      { value: "7", label: "Nghề khác (ghi rõ)" },
    ],
  },
  {
    name: "b21_custom",
    type: "text",
    condition: "b21 == 7",
  },
  {
    name: "b22",
    type: "select_one",
    question: "Cháu vui lòng cho biết nghề nghiệp của mẹ mình?",
    content: [
      { value: "1", label: "Nông dân" },
      { value: "2", label: "Lao động tay chân" },
      { value: "3", label: "Nhân viên hành chánh" },
      { value: "4", label: "Chuyên viên (Kỹ sư/Bác sĩ)" },
      { value: "5", label: "Kinh doanh, buôn bán" },
      { value: "6", label: "Nội trợ" },
      { value: "7", label: "Nghề khác (ghi rõ)" },
    ],
  },
  {
    name: "b22_custom",
    type: "text",
    condition: "b22 == 7",
  },
  {
    name: "b23",
    type: "select_one",
    question: "Cháu vui lòng cho biết trình độ học vấn của cha mình?",
    content: [
      { value: "1", label: "Không có đi học" },
      { value: "2", label: "Chưa hết cấp 1" },
      { value: "3", label: "Hoàn tất cấp 1" },
      { value: "4", label: "Hoàn tất cấp 2" },
      { value: "5", label: "Hoàn tất cấp 3" },
      { value: "6", label: "Hoàn tất Cao đẳng/ Đại học" },
      {
        value: "7",
        label: "Không có người trưởng thành là nam trong gia đình",
      },
      { value: "9", label: "Không biết" },
    ],
  },
  {
    name: "b24",
    type: "select_one",
    question: "Cháu vui lòng cho biết trình độ học vấn của mẹ mình?",
    content: [
      { value: "1", label: "Không có đi học" },
      { value: "2", label: "Chưa hết cấp 1" },
      { value: "3", label: "Hoàn tất cấp 1" },
      { value: "4", label: "Hoàn tất cấp 2" },
      { value: "5", label: "Hoàn tất cấp 3" },
      { value: "6", label: "Hoàn tất Cao đẳng/ Đại học" },
      { value: "7", label: "Không có người trưởng thành là nữ trong gia đình" },
      { value: "9", label: "Không biết" },
    ],
  },
];

const form: form = {
  name: "tieu_hoc_questionare",
  fields: fields,
};

export { form };
