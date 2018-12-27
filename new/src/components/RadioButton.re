let s: Js.t('a) = [%raw {|require("./RadioButton.module.css")|}];

let component = ReasonReact.statelessComponent("RadioButton");

[@genType]
let make = (~label, ~name, ~value, ~checked, ~onChange, _children) => {
  ...component,
  render: _self => {
    <label className=s##container>
      label
      <input type_="radio" name value checked onChange />
      <span className={s##checkmark}>
        <svg
          viewBox="0 0 24 24"
          preserveAspectRatio="xMidYMid meet"
          className="fill-current text-brand">
          <circle cx="12" cy="12" r="6" />
        </svg>
      </span>
    </label>;
  },
};
