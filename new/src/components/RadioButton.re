let s: Js.t('a) = [%raw {|require("./RadioButton_CheckBox.module.css")|}];

let component = ReasonReact.statelessComponent("RadioButton");

[@genType]
let make =
    (~label, ~name, ~value, ~checked, ~onChange, ~className=?, _children) => {
  ...component,
  render: _self => {
    <label className={Cn.make([s##container, Cn.unpack(className)])}>
      label
      <input type_="radio" name value checked onChange />
      <span className={Cn.make([s##checkmark, s##radio])}>
        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
          <circle cx="12" cy="12" r="6" />
        </svg>
      </span>
    </label>;
  },
};
