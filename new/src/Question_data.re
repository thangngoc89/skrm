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
      A_Predefined((1, {j|Rất thường xuyền|j})),
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
    q_display: {j|Trong năm vừa qua cháu có khi nào phải nghỉ học vì thường xuyên hay vài ngày vì bị đau răng không?|j},
    q_content: [|
      A_Predefined((1, {j|Có|j})),
      A_Predefined((2, {j|Không|j})),
    |],
  }),
  Group({
    q_id: Id.make("b10"),
    q_display: {j|Nếu bây giờ cháu phải đến khám ở một phòng nha, thì cháu nghĩ nha sĩ sẽ nói với cháu điều gì? Nha sĩ sẽ nói với cháy rằng (đọc từng câu một):|j},
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
|];
