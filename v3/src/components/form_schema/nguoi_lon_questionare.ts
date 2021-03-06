import { Field, Form } from "./schema";

const fields: Array<Field> = [
  {
    type: "note",
    label:
      "Bảng câu hỏi này dùng để nghiên cứu mối liên quan giữa những hiểu biết về bệnh sâu răng, thói quen chăm sóc răng miệng và tình trạng bệnh sâu răng. Kính xin các Ông/Bà vui lòng dành thời gian trả lời chính xác các câu hỏi sau đây, bằng cách đánh dấu (X) vào ô mà Ông/Bà chọn là câu trả lời. Xin cảm ơn.",
  },
  {
    type: "select_one",
    name: "a1",
    label: "Giới tính",
    choices: [
      { name: "1", label: "Nam" },
      { name: "2", label: "Nữ" },
    ],
    display: "radio",
  },
  {
    type: "select_one",
    name: "a2",
    label: "Nơi cư ngụ",
    choices: [
      { name: "1", label: "Nội thành" },
      { name: "2", label: "Ngoại thành" },
      { name: "3", label: "Tỉnh" },
    ],
    display: "radio",
  },
  {
    type: "select_one",
    name: "a4",
    label: "Ông/bà có bao nhiêu răng thật?",
    choices: [
      { name: "0", label: "Không còn" },
      { name: "1", label: "1-9 răng" },
      { name: "2", label: "10-19 răng" },
      { name: "3", label: "20 răng hoặc hơn" },
    ],
    display: "radio",
  },
  {
    type: "select_one",
    name: "a5",
    label: "Ông/bà có cảm thấy hài lòng với hàm răng của mình không?",
    choices: [
      { name: "1", label: "Rất hài lòng" },
      { name: "2", label: "Hài lòng " },
      { name: "3", label: "Trung bình" },
      { name: "4", label: "Không hài lòng lắm" },
      { name: "5", label: "Không hài lòng chút nào" },
    ],
    display: "radio",
  },
  {
    type: "select_one",
    name: "a6",
    label:
      "Trong suốt 12 tháng vừa qua, có khi nào ông/bà cảm thấy bị đau răng hay cảm thấy bị khó chịu vì răng miệng của mình không?",
    choices: [
      { name: "1", label: "Có" },
      { name: "2", label: "Không" },
      { name: "9", label: "Không biết" },
      { name: "0", label: "Không trả lời" },
    ],
    display: "radio",
  },
  {
    name: "a7",
    type: "matrix_select_one",
    label:
      "Về tình trạng răng miệng, bao lâu thì ông/bà có bất kì triệu chứng nào dưới đây trong vòng 12 tháng trở lại đây?",
    choices: [
      { name: "4", label: "Rất thường" },
      { name: "3", label: "Thường" },
      { name: "2", label: "Thỉnh thoảng" },
      { name: "1", label: "Không" },
      { name: "0", label: "Không biết" },
    ],
    subQuestions: [
      { id: "a7_1", question: "Khó khăn khi cắn thức ăn" },
      { id: "a7_2", question: "Khó khăn khi nhai thức ăn" },
      { id: "a7_3", question: "Khó khăn khi giao tiếp, phát âm" },
      { id: "a7_4", question: "Khô miệng" },
      { id: "a7_5", question: "Cảm thấy bối rối vì hình dạng răng" },
      { id: "a7_6", question: "Cảm thấy căng thẳng do những vần đề về răng miệng" },
      { id: "a7_7", question: "Tránh cười do tình trạng răng của minh" },
      { id: "a7_8", question: "Giấc ngủ thường bị gián đoạn" },
      { id: "a7_9", question: "Nghỉ làm" },
      { id: "a7_10", question: "Khó khăn trong các hoạt đông hằng ngày" },
      { id: "a7_11", question: "Cảm thấy khó chịu với vợ/chồng hoặc những người xung quanh" },
      { id: "a7_12", question: "Giảm tham gia các hoạt động xã hội" },
    ],
  },
  {
    type: "note",
    label: "Nếu người được phỏng vấn còn răng thật thì hỏi tiếp câu hỏi số A8",
  },
  {
    type: "note",
    label: "Nếu người được phõng vấn không còn răng thật thì hỏi câu hỏi số A17 (Bỏ câu A9-A16)",
  },
  {
    name: "a8",
    type: "select_one",
    label: "Theo ông/bà cảm nhận, thì ông/bà thấy tình trạng **răng** của mình thế nào?",
    choices: [
      { name: "1", label: "Hoàn toàn lành mạnh" },
      { name: "2", label: "Rất tốt" },
      { name: "3", label: "Tốt" },
      { name: "4", label: "Trung bình" },
      { name: "5", label: "Không được tốt lắm" },
      { name: "6", label: "Hoàn toàn không tốt" },
      { name: "9", label: "Không biết" },
    ],
    display: "radio",
  },
  {
    name: "a9",
    type: "select_one",
    label: "Theo ông/bà cảm nhận, thì ông/bà thấy tình trạng **nướu** của mình thế nào?",
    choices: [
      { name: "1", label: "Hoàn toàn lành mạnh" },
      { name: "2", label: "Rất tốt" },
      { name: "3", label: "Tốt" },
      { name: "4", label: "Trung bình" },
      { name: "5", label: "Không được tốt lắm" },
      { name: "6", label: "Hoàn toàn không tốt" },
      { name: "9", label: "Không biết" },
    ],
    display: "radio",
  },
  {
    name: "a10",
    type: "matrix_select_one",
    label:
      "Nếu bây giờ ông/bà phải đến khám ở một phòng nha, thì ông/bà nghĩ nha sĩ sẽ nói với ông/bà điều gì? Nha sĩ sẽ nói với ông/bà rằng (đọc từng câu một):",
    choices: [
      { name: "1", label: "Có" },
      { name: "0", label: "Không" },
      { name: "9", label: "Không biết" },
    ],
    subQuestions: [
      { id: "a10_1", question: "“Anh/Chị phải chải răng kỹ hơn”" },
      { id: "a10_2", question: "“Anh/Chị phải thường đi lấy cao (vôi) răng”" },
      { id: "a10_3", question: "“Anh/Chị có răng cần trám”" },
      { id: "a10_4", question: "“Anh/Chị cần làm mão/cầu răng”" },
      { id: "a10_5", question: "“Anh/Chị có răng cần nhổ”" },
      { id: "a10_6", question: "“Anh/Chị cần làm hàm giả”" },
      { id: "a10_7", question: "“Răng của Anh/Chị tốt lắm”" },
    ],
  },
  {
    name: "a11",
    type: "select_one",
    label: "Lần cuối ông/bà đến nha khoa cách đây bao lâu?",
    choices: [
      { name: "1", label: "Ít hơn 6 tháng" },
      { name: "2", label: "6-12 tháng" },
      { name: "3", label: "1 năm đến ít hơn 2 năm" },
      { name: "4", label: "2 năm đến ít hơn 5 năm" },
      { name: "5", label: "5 năm hoặc hơn" },
      { name: "6", label: "Không bao giờ đi nha sĩ." },
    ],
    display: "radio",
  },
  {
    name: "a12",
    type: "select_one",
    label: "Lý do của lần đến khám nha sĩ gần đây nhất là gì?",
    choices: [
      { name: "1", label: "Sự tham khảo/lời khuyên" },
      { name: "2", label: "Đau, hay có vấn đề với răng nướu và miệng" },
      { name: "3", label: "Điều trị/ sau điều trị" },
      { name: "4", label: "Thói quen kiểm tra/điều trị" },
      { name: "5", label: "Không biết/không nhớ" },
    ],
    display: "radio",
  },
  {
    name: "a13",
    type: "select_many",
    label: "Ông/bà sử dụng vật dụng nào dưới đây để đánh răng? (đọc tên từng vật dụng)",
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
    name: "a13_custom",
    type: "text",
    label: "Vật dụng khác ghi tại đây",
    optional: true,
    condition: "a13 == 7",
  },
  {
    name: "a14",
    type: "select_one",
    label: "Ông/bà đánh răng bao nhiêu lần?",
    choices: [
      { name: "1", label: "Không bao giờ" },
      { name: "2", label: "Mỗi tháng một lần" },
      { name: "3", label: "2 -3 lần mỗi tháng" },
      { name: "4", label: "Mỗi tuần một lần" },
      { name: "5", label: "2 – 6 lần mỗi tuần" },
      { name: "6", label: "Mỗi ngày một lần." },
      { name: "7", label: "Mỗi ngày ít nhất là hai lần" },
    ],
    display: "radio",
  },
  {
    name: "a15",
    type: "select_one",
    label: "Ông/bà có sử dụng kem đánh răng để chải răng không?",
    choices: [
      { name: "1", label: "Có" },
      { name: "2", label: "Không" },
    ],
    display: "radio",
  },
  {
    name: "a16",
    type: "select_one",
    label: "Ông/bà có dùng kem đánh răng có Fluor không?",
    choices: [
      { name: "1", label: "Có" },
      { name: "2", label: "Không" },
      { name: "9", label: "Không biết" },
    ],
    display: "radio",
  },
  {
    name: "a17",
    type: "select_many",
    label: "Ông/bà có mang hàm giả tháo lắp nào không?",
    choices: [
      { name: "1", label: "Hàm tháo lắp bán phần" },
      { name: "2", label: "Hàm tháo lắp toàn hàm trên" },
      { name: "3", label: "Hàm tháo lắp toàn hàm dưới" },
    ],
  },
  {
    name: "a18",
    type: "select_many",
    label: "Ông/bà có gặp khó khăn gì trong việc đeo hàm giả không?",
    choices: [
      { name: "1", label: "Ông/bà có phát âm rõ ràng không (66, 100%)?" },
      { name: "2", label: "Ông/bà có ăn uống dễ dàng không?" },
      { name: "3", label: "Hàm giả có khít khao vững ổn không?" },
      { name: "4", label: "Hàm giả có làm đau không?" },
      { name: "5", label: "Ông/bà có thấy hàm giả đẹp và thẩm mỹ?" },
    ],
  },
  {
    name: "a19",
    type: "matrix_select_one",
    label: "Ông/bà thường ăn hay uống những thức ăn sau đây, dù là ăn/uống rất ít không? (đọc từng thứ)",
    choices: [
      { name: "6", label: "Vài lần/ngày" },
      { name: "5", label: "Mỗi ngày" },
      { name: "4", label: "Vài lần/tuần" },
      { name: "3", label: "1 lần/tuần" },
      { name: "2", label: "Vài lần/tháng" },
      { name: "1", label: "Không bao giờ" },
    ],
    subQuestions: [
      { id: "a19_1", question: "Trái cây tươi" },
      { id: "a19_2", question: "Bánh quy, bông lan, bánh kem, bánh ngọt" },
      { id: "a19_3", question: "Nước chanh, nước ngọt có gas (Coca)" },
      { id: "a19_4", question: "Mứt, mật ong" },
      { id: "a19_5", question: "Kẹo cao su có đường" },
      { id: "a19_6", question: "Kẹo/mè xửng" },
      { id: "a19_7", question: "Sữa có đường" },
      { id: "a19_8", question: "Trà có đường" },
      { id: "a19_9", question: "Cà phê có đường" },
    ],
  },
  {
    name: "a20",
    type: "matrix_select_one",
    label: "Ông/bà thường ăn hay uống những thức ăn sau đây, dù là ăn/uống rất ít không? (đọc từng thứ)",
    choices: [
      { name: "6", label: "Mỗi ngày" },
      { name: "5", label: "Vài lần/tuần" },
      { name: "4", label: "1 lần/tuần" },
      { name: "3", label: "Vài lần/tháng" },
      { name: "2", label: "Thỉnh thoảng" },
      { name: "1", label: "Không bao giờ" },
    ],
    subQuestions: [
      { id: "a20_1", question: "Thuốc lá" },
      { id: "a20_2", question: "Thuốc lào" },
      { id: "a20_3", question: "Thuốc điếu" },
      { id: "a20_4", question: "Thuốc lá nhai" },
      { id: "a20_5", question: "Thuốc lá hít" },
      { id: "a20_6", question: "Loại khác (ghi rõ)" },
    ],
  },
  {
    name: "a20_custom",
    type: "text",
    label: "Ghi rõ loại thuốc lá tại câu A20_6 (nếu có)",
    optional: true,
    condition: "a20_6 !== 1",
  },
  {
    name: "a21",
    type: "select_one",
    display: "radio",
    label: "Trong vòng 30 ngày qua, vào những ngày ông/bà uống rượu, bia đã uống bao nhiêu ly mỗi ngày?",
    choices: [
      { name: "0", label: "Ít hơn 1 ly" },
      { name: "1", label: "1 ly" },
      { name: "2", label: "2 ly" },
      { name: "3", label: "3 ly" },
      { name: "4", label: "4 ly" },
      { name: "5", label: "5 ly hoặc hơn" },
      { name: "9", label: "Không uống rượu trong vòng 30 ngày qua" },
    ],
  },
  {
    name: "a22",
    type: "select_many",
    label: "Phương tiện đi lại chính của ông/bà là? (có thể chọn nhiều câu trả lời)",
    choices: [
      { name: "1", label: "Xe hơi riêng" },
      { name: "2", label: "Xe gắn máy trên 20 triệu đồng" },
      { name: "3", label: "Xe gắn máy từ 10 - 20 triệu đồng" },
      { name: "4", label: "Xe gắn máy dưới 10 triệu đồng" },
      { name: "5", label: "Xe đạp" },
      { name: "9", label: "Xe khác (ghi rõ)" },
    ],
  },
  {
    name: "a22_custom",
    type: "text",
    label: "Ghi rõ loại xe khác tại A22 (nếu có)",
    optional: true,
    condition: 'a22.includes("9")',
  },
  {
    name: "a23",
    type: "select_one",
    display: "radio",
    label: "Ông/bà vui lòng cho biết nghề nghiệp của mình?",
    choices: [
      { name: "1", label: "Nông dân" },
      { name: "2", label: "Lao động tay chân" },
      { name: "3", label: "Nhân viên hành chánh" },
      { name: "4", label: "Chuyên viên (Kỹ sư/Bác sĩ)" },
      { name: "5", label: "Kinh doanh, buôn bán" },
      { name: "6", label: "Nội trợ" },
      { name: "7", label: "Nghề khác (ghi rõ)" },
    ],
  },
  {
    name: "a23_custom",
    type: "text",
    label: "Ghi rõ loại xe khác tại A22 (nếu có)",
    optional: true,
    condition: "a23 === 7",
  },
  {
    name: "a24",
    type: "select_one",
    label: "Cháu vui lòng cho biết trình độ học vấn của cha mình?",
    choices: [
      { name: "1", label: "Không có đi học" },
      { name: "2", label: "Chưa hết cấp 1" },
      { name: "3", label: "Hoàn tất cấp 1" },
      { name: "4", label: "Hoàn tất cấp 2" },
      { name: "5", label: "Hoàn tất cấp 3" },
      { name: "6", label: "Hoàn tất Cao đẳng/ Đại học" },
      { name: "7", label: "Bằng Sau đại học" },
    ],
    display: "radio",
  },
  {
    name: "a25",
    type: "select_one",
    label: "Cháu vui lòng cho biết trình độ học vấn của cha mình?",
    choices: [
      { name: "1", label: "<1,000,000 đồng" },
      { name: "2", label: "1,000,000 đến 3,000,000 đồng" },
      { name: "3", label: "3,000,000 đến 5,000,000 đồng" },
      { name: "4", label: "5,000,000 đến 8,000,000 đồng" },
      { name: "5", label: "8,000,000 đến 10,000,000 đồng " },
      { name: "6", label: "10,000,000 đồng hoặc hơn" },
      { name: "9", label: "KHÔNG BIẾT" },
      { name: "0", label: "TỪ CHỐI TRẢ LỜI" },
    ],
    display: "radio",
  },
  {
    name: "a26",
    type: "select_one",
    label: "Có bao nhiêu người trong gia đình của ông/bà sống dựa vào thu nhập này?",
    choices: [
      { name: "1", label: "Ghi rõ số người bên dưới" },
      { name: "9", label: "KHÔNG BIẾT" },
    ],
    display: "radio",
  },
  {
    name: "a26_so_nguoi",
    type: "integer",
    label: "Ghi rõ số người ở câu A26",
    optional: true,
    condition: "a26 == 1",
  },
];

export const form: Form = {
  name: "nguoi_lon_questionare",
  label: "Bảng câu hỏi phỏng vấn kiến thức và thói quen chăm sóc răng miệng",
  labelShort: "Bảng câu hỏi",
  labelSecondary: "(Dành cho người trường thành)",
  survey: fields,
  labelVerbose: true,
};

export const makeInitialValues = () => ({});
