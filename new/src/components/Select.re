[@bs.config {jsx: 3}];
let s: Js.t('a) = [%raw {|require("./Select.module.css")|}];

open ReactHelpers;

[@genType]
type pair = {
  value: string,
  label: string,
};

let listToPair = options =>
  options->Belt.Array.map(o => {label: o, value: o});

[@genType]
[@react.component]
let make =
    (
      ~options: array(pair),
      ~id=?,
      ~name,
      ~value,
      ~onChange,
      ~onBlur=?,
      ~block=false,
      ~className=?,
      ~hasError=false,
    ) => {
  <div
    className={Cn.make([
      s##container,
      Cn.ifTrue(s##selectBlockError, hasError),
    ])}>
    <select
      ?id
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
       ->React.array}
    </select>
  </div>;
};
