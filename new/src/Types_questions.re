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

type question_content = {
  q_id: Id.t,
  q_display: string,
  q_answer: array(answer),
};

type question =
  | Select_one(question_content)
  | Select_many(question_content);
