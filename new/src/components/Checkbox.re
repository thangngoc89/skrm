let s: Js.t('a) = [%raw {|require("./Checkbox.module.css")|}];

let component = ReasonReact.statelessComponent("Checkbox");

[@genType]
let make = (~label, ~name, ~value, ~onChange, _children) => {
  ...component,
  render: _self => {
    <label className=s##container>
      label
      <input type_="checkbox" name value onChange />
      <span className={s##checkmark} />
    </label>;
  },
};
