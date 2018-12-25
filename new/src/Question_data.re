open Types_questions;

let data = [|
  Select_one({
    q_id: Id.make("b2"),
    q_display: {j|Nơi cư ngụ|j},
    q_content: [|
      A_Predefined((1, {j|Nội thành|j})),
      A_Predefined((2, {j|Ngoại thành|j})),
      A_Predefined((3, {j|Tỉnh|j})),
    |],
  }),
  Select_one({
    q_id: Id.make("b4"),
    q_display: {j|Theo cháu cảm nhận, thì cháu thấy tình trạng **răng** của mình thế nào?|j},
    q_content: [|
      A_Predefined((1, {j|Hoàn toàn lành mạnh|j})),
      A_Predefined((2, {j|Rất tốt|j})),
      A_Predefined((3, {j|Tốt|j})),
      A_Predefined((4, {j|Trung bình|j})),
      A_Predefined((5, {j|Không được tốt lắm|j})),
      A_Predefined((6, {j|Hoàn toàn không tốt|j})),
      A_Predefined((9, {j|Không biết|j})),
    |],
  }),
  Select_one({
    q_id: Id.make("b5"),
    q_display: {j|Theo cháu cảm nhận, thì cháu thấy tình trạng **nướu** của mình thế nào?|j},
    q_content: [|
      A_Predefined((1, {j|Hoàn toàn lành mạnh|j})),
      A_Predefined((2, {j|Rất tốt|j})),
      A_Predefined((3, {j|Tốt|j})),
      A_Predefined((4, {j|Trung bình|j})),
      A_Predefined((5, {j|Không được tốt lắm|j})),
      A_Predefined((6, {j|Hoàn toàn không tốt|j})),
      A_Predefined((9, {j|Không biết|j})),
    |],
  }),
  Select_one({
    q_id: Id.make("b6"),
    q_display: {j|Trong suốt 12 tháng vừa qua, có khi nào cháu cảm thấy bị đau răng hay cảm thấy bị khó chịu vì răng miệng của mình không?|j},
    q_content: [|
      A_Predefined((1, {j|Thường xuyên|j})),
      A_Predefined((2, {j|Thỉnh thoảng|j})),
      A_Predefined((3, {j|Hiếm khi|j})),
      A_Predefined((4, {j|Không bao giờ|j})),
      A_Predefined((9, {j|Không biết|j})),
    |],
  }),
  Select_one({
    q_id: Id.make("b7"),
    q_display: {j|Có bao giờ cháu ngại cười vì mặc cảm răng của mình không đẹp không?|j},
    q_content: [|
      A_Predefined((1, {j|Rất thường xuyên|j})),
      A_Predefined((2, {j|Thường xuyên|j})),
      A_Predefined((3, {j|Thỉnh thoảng|j})),
      A_Predefined((4, {j|Chưa bao giờ|j})),
    |],
  }),
  Select_one({
    q_id: Id.make("b8"),
    q_display: {j|Cháu có cảm thấy hài lòng với hàm răng của mình không?|j},
    q_content: [|
      A_Predefined((1, {j|Rất hài lòng|j})),
      A_Predefined((2, {j|Hài lòng|j})),
      A_Predefined((3, {j|Trung  bình|j})),
      A_Predefined((4, {j|Không hài lòng lắm|j})),
      A_Predefined((5, {j|Không hài lòng chút nào|j})),
    |],
  }),
  Select_one({
    q_id: Id.make("b9"),
    q_display: {j|Trong năm vừa qua cháu có khi nào phải nghỉ học thường xuyên hay vài ngày vì bị đau răng không?|j},
    q_content: [|
      A_Predefined((1, {j|Có|j})),
      A_Predefined((2, {j|Không|j})),
    |],
  }),
  Group({
    q_id: Id.make("b10"),
    q_display: {j|Nếu bây giờ cháu phải đến khám ở một phòng nha, thì cháu nghĩ nha sĩ sẽ nói với cháu điều gì? Nha sĩ sẽ nói với cháu rằng (đọc từng câu một):|j},
    q_content: {
      values: [|
        (1, {j|Có|j}),
        (0, {j|Không|j}),
        (9, {j|Không biết|j}),
      |],
      sub_questions: [|
        (Id.make_sub("b10", 1), {j|Cháu phải chải răng kĩ hơn|j}),
        (
          Id.make_sub("b10", 2),
          {j|Cháu phải thường đi lấy cao (vôi) răng|j},
        ),
        (Id.make_sub("b10", 3), {j|Cháu có răng cần trám|j}),
        (Id.make_sub("b10", 4), {j|Cháu có răng cần nhổ|j}),
        (
          Id.make_sub("b10", 5),
          {j|Răng của cháu cần chỉnh lại cho đều đặn|j},
        ),
        (Id.make_sub("b10", 6), {j|Răng của cháu tốt lắm|j}),
      |],
    },
  }),
  Select_one({
    q_id: Id.make("b11"),
    q_display: {j|Trong 12 tháng vừa qua, cháu đã đi nha sĩ khám răng mấy lần?|j},
    q_content: [|
      A_Predefined((1, {j|1 lần|j})),
      A_Predefined((2, {j|2 lần|j})),
      A_Predefined((3, {j|3 lần|j})),
      A_Predefined((4, {j|4 lần|j})),
      A_Predefined((5, {j|Nhiều hơn 4 lần|j})),
      A_Predefined((6, {j|Không đến khám trong 12 tháng trước|j})),
      A_Predefined((
        7,
        {j|Không nhận được sự chăm sóc răng miệng nào hoặc không gặp nha sĩ nào|j},
      )),
    |],
  }),
  Select_one({
    q_id: Id.make("b12"),
    q_display: {j|Lý do của lần đến khám nha sĩ gần đây nhất là gì? (chọn 1 ô duy nhất)|j},
    q_content: [|
      A_Predefined((
        1,
        {j|Đau, hay có vấn đề với răng, nướu và miệng|j},
      )),
      A_Predefined((2, {j|Điều trị/ tái khám|j})),
      A_Predefined((3, {j|Kiểm tra định kỳ|j})),
      A_Predefined((9, {j|Không biết/ không nhớ|j})),
    |],
  }),
  Select_many({
    q_id: Id.make("b13"),
    q_display: {j|Cháu hãy ráng nhớ xem nha sĩ đã làm gì cho cháu trong lần khám đó? Nha sĩ/ Y sĩ đã làm...|j},
    q_content: [|
      A_Predefined((1, {j|Trám răng|j})),
      A_Predefined((2, {j|Cạo vôi răng|j})),
      A_Predefined((3, {j|Nhổ răng|j})),
      A_Predefined((4, {j|Khám răng|j})),
      A_Predefined((5, {j|Chụp phim răng|j})),
      A_Predefined((6, {j|Lấy tủy răng|j})),
      A_Predefined((7, {j|HD VSRM|j})),
      A_Custom((8, {j|Điều trị khác (ghi rõ)|j})),
    |],
  }),
  Select_one({
    q_id: Id.make("b14"),
    q_display: {j|Trong lần khám này, ai đã đi với cháu?|j},
    q_content: [|
      A_Predefined((1, {j|Không có ai|j})),
      A_Predefined((2, {j|Mẹ cháu|j})),
      A_Predefined((3, {j|Ba cháu|j})),
      A_Predefined((4, {j|Anh/Chị của cháu|j})),
      A_Predefined((5, {j|Một người lớn khác|j})),
      A_Predefined((6, {j|Bạn cháu|j})),
    |],
  }),
  Select_one({
    q_id: Id.make("b15"),
    q_display: {j|Cháu đánh răng bao nhiêu lần? (Chọn 1 ô duy nhất)|j},
    q_content: [|
      A_Predefined((1, {j|Không bao giờ|j})),
      A_Predefined((2, {j|2-3 lần mỗi tháng|j})),
      A_Predefined((3, {j|Mỗi tuần một lần|j})),
      A_Predefined((4, {j|2-6 lần mỗi tuần|j})),
      A_Predefined((5, {j|Mỗi ngày một lần|j})),
      A_Predefined((6, {j|Mỗi ngày ít nhất là hai lần|j})),
    |],
  }),
  Select_many({
    q_id: Id.make("b16"),
    q_display: {j|Cháu sử dụng vật dụng nào dưới đây để đánh răng? (đọc tên từng vật dụng)|j},
    q_content: [|
      A_Predefined((1, {j|Bàn chải|j})),
      A_Predefined((2, {j|Tăm tre|j})),
      A_Predefined((3, {j|Tăm nhựa|j})),
      A_Predefined((4, {j|Chỉ tơ nha khoa|j})),
      A_Predefined((5, {j|Than|j})),
      A_Predefined((6, {j|Vỏ cau|j})),
      A_Custom((7, {j|Vật dụng khác (vui lòng ghi rõ)|j})),
    |],
  }),
  Select_one({
    q_id: Id.make("b17"),
    q_display: {j|Cháu có sử dụng kem đánh răng để chải răng không?|j},
    q_content: [|
      A_Predefined((1, {j|Có|j})),
      A_Predefined((2, {j|Không|j})),
    |],
  }),
  Select_one({
    q_id: Id.make("b18"),
    q_display: {j|Cháu có dùng kem đánh răng có Fluor không?|j},
    q_content: [|
      A_Predefined((1, {j|Có|j})),
      A_Predefined((2, {j|Không|j})),
      A_Predefined((9, {j|Không biết|j})),
    |],
  }),
  Group({
    q_id: Id.make("b19"),
    q_display: {j|Cháu có thường ăn hay uống những thức ăn sau đây, dù là ăn/ uống rất ít không? (đọc từng thứ)|j},
    q_content: {
      values: [|
        (6, {j|Vài lần/ngày|j}),
        (5, {j|Mỗi ngày|j}),
        (4, {j|Vài lần/tuần|j}),
        (3, {j|1 lần/tuần|j}),
        (2, {j|Vài lần/tháng|j}),
        (1, {j|Không bao giờ|j}),
      |],
      sub_questions: [|
        (Id.make_sub("b19", 1), {j|Trái cây tươi|j}),
        (
          Id.make_sub("b19", 2),
          {j|Bánh quy, bông lan, bánh kem, bánh ngọt|j},
        ),
        (
          Id.make_sub("b19", 3),
          {j|Nước chanh, nước ngọt có gas (Coca)|j},
        ),
        (Id.make_sub("b19", 4), {j|Mứt, mật ong|j}),
        (Id.make_sub("b19", 5), {j|kẹo cao su có đường|j}),
        (Id.make_sub("b19", 6), {j|Kẹo/mè xửng|j}),
        (Id.make_sub("b19", 7), {j|Sữa có đường|j}),
        (Id.make_sub("b19", 8), {j|Trà có đường|j}),
        (Id.make_sub("b19", 9), {j|Cà phê có đường|j}),
      |],
    },
  }),
|];
