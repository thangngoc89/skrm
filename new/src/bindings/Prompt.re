[@bs.val] external make: string => Js.Nullable.t(string) = "prompt";
[@bs.val]
external makeWithDefaultMessage: (string, string) => Js.Nullable.t(string) =
  "prompt";

let processResult = res => {
  switch (res->Js.Nullable.toOption) {
  | Some("") => None
  | None => None
  | Some(msg) => Some(msg)
  };
};

let make = q => make(q)->processResult;
let makeWithDefaultMessage = (q, d) =>
  makeWithDefaultMessage(q, d)->processResult;
