module Id: {
  type t = pri string;
  let make: string => t;
  let to_string: t => string;
} = {
  type t = string;
  let make = t => t;
  let to_string = t => t;
};

type answer_content = {
  a_value: int,
  a_display: string,
};
type answer =
  | Predefined(answer_content)
  | Custom(answer_content, option(string));

type question_content('a) = {
  q_id: Id.t,
  q_display: string,
  q_content: 'a,
};

type question_single = question_content(array(answer));

type question_many_data = {
  values: array((int, string)),
  sub_questions: array((Id.t, string)),
};

type question_many = question_content(question_many_data);
type question =
  | Select_one(question_single)
  | Select_many(question_single)
  | Group(question_many);
