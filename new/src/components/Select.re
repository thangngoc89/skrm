let s: Js.t('a) = [%raw {|require("./Select.module.css")|}];

open React;

[@genType]
type pair = {
  value: string,
  label: string,
};

let listToPair = options =>
  options->Belt.List.map(o => {label: o, value: o})->Belt.List.toArray;

let component = ReasonReact.statelessComponent("Select");

[@genType]
let make =
    (
      ~options: array(pair),
      ~name,
      ~value,
      ~onChange,
      ~className=?,
      _children,
    ) => {
  ...component,
  render: _self => {
    <div className=s##container>
      <select
        name
        className={Cn.make([s##select, Cn.unpack(className)])}
        onChange={event => event->ReactEvent.Form.target##value->onChange}>
        <option> "--"->str </option>
        {options
         ->Belt.Array.map(({value: optionValue, label}) =>
             <option
               key=optionValue
               value=optionValue
               selected={value == optionValue}>
               label->str
             </option>
           )
         ->ReasonReact.array}
      </select>
    </div>;
  },
};
