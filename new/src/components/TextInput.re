[@bs.config {jsx: 3}];
let s: Js.t('a) = [%bs.raw {| require("./TextInput.module.css")|}];

[@react.component]
let make =
    (
      ~value,
      ~onChange,
      ~onFocus=?,
      ~onBlur=?,
      ~placeholder=?,
      ~name=?,
      ~id=?,
      ~className=?,
    ) =>
  [@genType.as "type"]
  (
    (~type_=?) => {
      <input
        value
        onChange
        ?onFocus
        ?onBlur
        ?placeholder
        ?name
        ?id
        ?type_
        className={Cn.make([s##input, Cn.unpack(className)])}
      />;
    }
  );
