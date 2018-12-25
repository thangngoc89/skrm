type value(_) =
  | String(string): value(string)
  | Int(int): value(int)
  | Float(float): value(float);
type question(_) =
  | Q1: question(string)
  | Q2: question(int);

type question_answer =
  | Question_answer(question('a), value('a)): question_answer;

let a = [Question_answer(Q1, String("foo")), Question_answer(Q2, Int(1))];

let b = Question_answer(Q1, String("foo"));
/* module M =
  Map.Make({
    type t = question('a);
    let compare = Pervasives.compare;
  });

let mm = M.empty;
let mm = mm |> M.add(Q1, Question_answer(Q1, "foo"));
let mm = mm |> M.add(Q2, Question_answer(Q2, "foo"));

Js.log(mm); */
