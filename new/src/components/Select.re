let s: Js.t('a) = [%raw {|require("./Select.module.css")|}];

open React;
type pair = {
  value: string,
  label: string,
};

let listToPair = options => options->Belt.List.map(o => {label: o, value: o});

let component = ReasonReact.statelessComponent("Select");

let make = (~options: list(pair), ~name, ~value, ~onChange, _children) => {
  ...component,
  render: _self => {
    <div className=s##container>
      <select
        name
        className=s##select
        onChange={event => event->ReactEvent.Form.target##value->onChange}>
        <option> "--"->str </option>
        {options
         ->Belt.List.mapWithIndex((index, {value: optionValue, label}) =>
             <option
               key=optionValue
               value=optionValue
               checked={value == optionValue}>
               label->str
             </option>
           )
         ->reactList}
      </select>
    </div>;
  },
};
