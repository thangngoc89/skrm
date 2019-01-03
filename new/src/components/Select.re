let s: Js.t('a) = [%raw {|require("./Select.module.css")|}];

open React;
type pair = {
  value: string,
  label: string,
};

let component = ReasonReact.statelessComponent("Select");

let make = (~options: list(pair), ~name, _children) => {
  ...component,
  render: _self => {
    <div className=s##select>
      <select name>
        <option> "--"->str </option>
        {options
         ->Belt.List.mapWithIndex((index, {value, label}) =>
             <option key=value value> label->str </option>
           )
         ->reactList}
      </select>
    </div>;
  },
};
