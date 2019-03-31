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
      ~onBlur=?,
      ~block=false,
      ~className=?,
      ~hasError=false,
      _children,
    ) => {
  ...component,
  render: _self => {
    <div
      className={Cn.make([
        s##container,
        Cn.ifTrue(s##selectBlockError, hasError),
      ])}>
      <select
        name
        className={Cn.make([
          s##select,
          Cn.unpack(className),
          Cn.ifTrue(s##selectBlock, block),
        ])}
        onChange={event => event->ReactEvent.Form.target##value->onChange}
        ?onBlur
        value>
        <option> "--"->str </option>
        {options
         ->Belt.Array.map(({value: optionValue, label}) =>
             <option key=optionValue value=optionValue> label->str </option>
           )
         ->ReasonReact.array}
      </select>
    </div>;
  },
};
