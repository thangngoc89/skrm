import { Field, Form } from "./schema";

const fields: Array<Field> = [
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
  {
    type: "select_one",
    name: "b4",
    label:
      "Theo cháu cảm nhận, thì cháu thấy tình trạng **răng** của mình thế nào?",
    choices: [
      { name: "1", label: "Hoàn toàn lành mạnh" },
      { name: "2", label: "Rất tốt" },
      { name: "3", label: "Tốt" },
      { name: "4", label: "Trung bình" },
      { name: "5", label: "Không được tốt lắm" },
      { name: "6", label: "Hoàn toàn không tốt" },
      { name: "9", label: "Không biết" },
    ],
  },
  {
    type: "select_one",
    name: "b5",
    label:
      "Theo cháu cảm nhận, thì cháu thấy tình trạng **nướu** của mình thế nào?",
    choices: [
      { name: "1", label: "Hoàn toàn lành mạnh" },
      { name: "2", label: "Rất tốt" },
      { name: "3", label: "Tốt" },
      { name: "4", label: "Trung bình" },
      { name: "5", label: "Không được tốt lắm" },
      { name: "6", label: "Hoàn toàn không tốt" },
      { name: "9", label: "Không biết" },
    ],
  },
  {
    type: "select_one",
    name: "b6",
    label:
      "Trong suốt 12 tháng vừa qua, có khi nào cháu cảm thấy bị đau răng hay cảm thấy bị khó chịu vì răng miệng của mình không?",
    choices: [
      { name: "1", label: "Thường xuyên" },
      { name: "2", label: "Thỉnh thoảng" },
      { name: "3", label: "Hiếm khi" },
      { name: "4", label: "Không bao giờ" },
      { name: "9", label: "Không biết" },
    ],
  },
  {
    name: "b7",
    type: "select_one",
    label:
      "Có bao giờ cháu ngại cười vì mặc cảm răng của mình không đẹp không?",
    choices: [
      { name: "1", label: "Rất thường xuyên" },
      { name: "2", label: "Thường xuyên" },
      { name: "3", label: "Thỉnh thoảng" },
      { name: "4", label: "Chưa bao giờ" },
    ],
  },
  {
    name: "b8",
    type: "select_one",
    label: "Cháu có cảm thấy hài lòng với hàm răng của mình không?",
    choices: [
      { name: "1", label: "Rất hài lòng" },
      { name: "2", label: "Hài lòng" },
      { name: "3", label: "Trung bình" },
      { name: "4", label: "Không hài lòng lắm" },
      { name: "5", label: "Không hài lòng chút nào" },
    ],
  },
  {
    name: "b9",
    type: "select_one",
    label:
      "Trong năm vừa qua cháu có khi nào phải nghỉ học thường xuyên hay vài ngày vì bị đau răng không?",
    choices: [
      { name: "1", label: "Có" },
      { name: "2", label: "Không" },
    ],
  },
  {
    name: "b10",
    type: "matrix_select_one",
    label:
      "Nếu bây giờ cháu phải đến khám ở một phòng nha, thì cháu nghĩ nha sĩ sẽ nói với cháu điều gì? Nha sĩ sẽ nói với cháu rằng (đọc từng câu một):",
    choices: [
      { name: "1", label: "Có" },
      { name: "0", label: "Không" },
      { name: "9", label: "Không biết" },
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
    label: "Trong 12 tháng vừa qua, cháu đã đi nha sĩ khám răng mấy lần?",
    choices: [
      { name: "1", label: "1 lần" },
      { name: "2", label: "2 lần" },
      { name: "3", label: "3 lần" },
      { name: "4", label: "4 lần" },
      { name: "5", label: "Nhiều hơn 4 lần" },
      { name: "6", label: "Không đến khám trong 12 tháng trước" },
      {
        name: "7",
        label:
          "Không nhận được sự chăm sóc răng miệng nào hoặc không gặp nha sĩ nào",
      },
    ],
  },
  {
    name: "b12",
    type: "select_one",
    label:
      "Lý do của lần đến khám nha sĩ gần đây nhất là gì? (chọn 1 ô duy nhất)",
    choices: [
      { name: "1", label: "Đau, hay có vấn đề với răng, nướu và miệng" },
      { name: "2", label: "Điều trị/ tái khám" },
      { name: "3", label: "Kiểm tra định kỳ" },
      { name: "9", label: "Không biết/ không nhớ" },
    ],
  },
  {
    name: "b13",
    type: "select_many",
    label:
      "Cháu hãy ráng nhớ xem nha sĩ đã làm gì cho cháu trong lần khám đó? Nha sĩ/ Y sĩ đã làm...",
    choices: [
      { name: "1", label: "Trám răng" },
      { name: "2", label: "Cạo vôi răng" },
      { name: "3", label: "Nhổ răng" },
      { name: "4", label: "Khám răng" },
      { name: "5", label: "Chụp phim răng" },
      { name: "6", label: "Lấy tủy răng" },
      { name: "7", label: "HD VSRM" },
      { name: "8", label: "Điều trị khác (ghi rõ)" },
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
    label: "Trong lần khám này, ai đã đi với cháu?",
    choices: [
      { name: "1", label: "Không có ai" },
      { name: "2", label: "Mẹ cháu" },
      { name: "3", label: "Ba cháu" },
      { name: "4", label: "Anh/Chị của cháu" },
      { name: "5", label: "Một người lớn khác" },
      { name: "6", label: "Bạn cháu" },
    ],
  },
  {
    name: "b15",
    type: "select_one",
    label: "Cháu đánh răng bao nhiêu lần? (Chọn 1 ô duy nhất)",
    choices: [
      { name: "1", label: "Không bao giờ" },
      { name: "2", label: "2-3 lần mỗi tháng" },
      { name: "3", label: "Mỗi tuần một lần" },
      { name: "4", label: "2-6 lần mỗi tuần" },
      { name: "5", label: "Mỗi ngày một lần" },
      { name: "6", label: "Mỗi ngày ít nhất là hai lần" },
    ],
  },
  {
    name: "b16",
    type: "select_many",
    label:
      "Cháu sử dụng vật dụng nào dưới đây để đánh răng? (đọc tên từng vật dụng)",
    choices: [
      { name: "1", label: "Bàn chải" },
      { name: "2", label: "Tăm tre" },
      { name: "3", label: "Tăm nhựa" },
      { name: "4", label: "Chỉ tơ nha khoa" },
      { name: "5", label: "Than" },
      { name: "6", label: "Vỏ cau" },
      { name: "7", label: "Vật dụng khác (vui lòng ghi rõ)" },
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
    label: "Cháu có sử dụng kem đánh răng để chải răng không?",
    choices: [
      { name: "1", label: "Có" },
      { name: "2", label: "Không" },
    ],
  },
  {
    name: "b18",
    type: "select_one",
    label: "Cháu có dùng kem đánh răng có Fluor không?",
    choices: [
      { name: "1", label: "Có" },
      { name: "2", label: "Không" },
      { name: "9", label: "Không biết" },
    ],
  },
  {
    name: "b19",
    type: "matrix_select_one",
    label:
      "Cháu có thường ăn hay uống những thức ăn sau đây, dù là ăn/ uống rất ít không? (đọc từng thứ)",
    choices: [
      { name: "6", label: "Vài lần/ngày" },
      { name: "5", label: "Mỗi ngày" },
      { name: "4", label: "Vài lần/tuần" },
      { name: "3", label: "1 lần/tuần" },
      { name: "2", label: "Vài lần/tháng" },
      { name: "1", label: "Không bao giờ" },
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
    label: "Ai là người bảo cháu phải tự chăm sóc răng của mình?",
    choices: [
      { name: "1", label: "Nha sĩ" },
      { name: "2", label: "Bác sĩ y khoa" },
      { name: "3", label: "Thầy cô giáo" },
      { name: "4", label: "Sách" },
      { name: "5", label: "Tivi" },
      { name: "6", label: "Đài phát thanh" },
      { name: "7", label: "Báo, tạp chí" },
      { name: "8", label: "Bạn của cháu" },
      { name: "9", label: "Cha của cháu" },
      { name: "10", label: "Mẹ của cháu" },
      { name: "11", label: "Người khác" },
    ],
  },
  {
    name: "b21",
    type: "select_one",
    label: "Cháu vui lòng cho biết nghề nghiệp của cha mình?",
    choices: [
      { name: "1", label: "Nông dân" },
      { name: "2", label: "Lao động tay chân" },
      { name: "3", label: "Nhân viên hành chánh" },
      { name: "4", label: "Chuyên viên (Kỹ sư/Bác sĩ)" },
      { name: "5", label: "Kinh doanh, buôn bán" },
      { name: "6", label: "Nội trợ" },
      { name: "7", label: "Nghề khác (ghi rõ)" },
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
    label: "Cháu vui lòng cho biết nghề nghiệp của mẹ mình?",
    choices: [
      { name: "1", label: "Nông dân" },
      { name: "2", label: "Lao động tay chân" },
      { name: "3", label: "Nhân viên hành chánh" },
      { name: "4", label: "Chuyên viên (Kỹ sư/Bác sĩ)" },
      { name: "5", label: "Kinh doanh, buôn bán" },
      { name: "6", label: "Nội trợ" },
      { name: "7", label: "Nghề khác (ghi rõ)" },
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
    label: "Cháu vui lòng cho biết trình độ học vấn của cha mình?",
    choices: [
      { name: "1", label: "Không có đi học" },
      { name: "2", label: "Chưa hết cấp 1" },
      { name: "3", label: "Hoàn tất cấp 1" },
      { name: "4", label: "Hoàn tất cấp 2" },
      { name: "5", label: "Hoàn tất cấp 3" },
      { name: "6", label: "Hoàn tất Cao đẳng/ Đại học" },
      {
        name: "7",
        label: "Không có người trưởng thành là nam trong gia đình",
      },
      { name: "9", label: "Không biết" },
    ],
  },
  {
    name: "b24",
    type: "select_one",
    label: "Cháu vui lòng cho biết trình độ học vấn của mẹ mình?",
    choices: [
      { name: "1", label: "Không có đi học" },
      { name: "2", label: "Chưa hết cấp 1" },
      { name: "3", label: "Hoàn tất cấp 1" },
      { name: "4", label: "Hoàn tất cấp 2" },
      { name: "5", label: "Hoàn tất cấp 3" },
      { name: "6", label: "Hoàn tất Cao đẳng/ Đại học" },
      { name: "7", label: "Không có người trưởng thành là nữ trong gia đình" },
      { name: "9", label: "Không biết" },
    ],
  },
];

const form: Form = {
  name: "tieu_hoc_questionare",
  label: "Phỏng vấn kiến thức và thói quen chăm sóc sức khỏe răng miệng",
  survey: fields,
};

export { form };
