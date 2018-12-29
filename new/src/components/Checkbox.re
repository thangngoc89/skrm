let s: Js.t('a) = [%raw {|require("./RadioButton_CheckBox.module.css")|}];

let component = ReasonReact.statelessComponent("Checkbox");

[@genType]
let make = (~label, ~name, ~value, ~onChange, ~className=?, _children) => {
  ...component,
  render: _self => {
    <label className={Cn.make([s##container, Cn.unpack(className)])}>
      label
      <input type_="checkbox" name value onChange />
      <span className={Cn.make([s##checkmark, s##checkbox])}>
        <svg
          viewBox="0 0 24 24"
          preserveAspectRatio="xMidYMid meet"
          strokeWidth="4px">
          <path fill="none" d="M6,11.3 L10.3,16 L18,6.2" />
        </svg>
      </span>
    </label>;
  },
};
