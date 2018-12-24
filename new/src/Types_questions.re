module Id: {
  type t = pri string;
  let make: string => t;
  let make_sub: (string, int) => t;
  let to_string: t => string;
} = {
  type t = string;
  let make = t => t;
  let make_sub = (string, sub) => string ++ "-" ++ sub->string_of_int;
  let to_string = t => t;
};

type value_pair = (int, string);
type answer =
  | A_Predefined(value_pair)
  | A_Custom(value_pair);

type question_content('a) = {
  q_id: Id.t,
  q_display: string,
  q_content: 'a,
};

type question_single = question_content(array(answer));

type question_many_data = {
  values: array(value_pair),
  sub_questions: array((Id.t, string)),
};

type question_many = question_content(question_many_data);
type question =
  | Select_one(question_single)
  | Select_many(question_single)
  | Group(question_many);
