let s: Js.t('a) = [%bs.raw {| require("./TextInput.module.css")|}];

let component = ReasonReact.statelessComponent("TextInput");

[@genType]
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
    (~type_=?, _children) => {
      ...component,
      render: _self => {
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
      },
    }
  );
