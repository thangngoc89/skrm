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
      _children,
    ) => {
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
      className={Cn.make(["input", Cn.unpack(className)])}
    />;
  },
};
