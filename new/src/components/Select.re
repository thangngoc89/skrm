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

type keyValue = {
  kv_key: string,
  kv_value: string,
};

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
  let computed =
    React.useMemo1(
      () =>
        options
        |> Js.Array.reduce(
             (acc, {value}) => {
               Js.Array.push({kv_value: value, kv_key: value}, acc) |> ignore;
               Js.Array.push(
                 {kv_value: value, kv_key: value |> Js.String.toLowerCase},
                 acc,
               )
               |> ignore;
               acc;
             },
             [||],
           ),
      [|options|],
    );
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
      onKeyUp={event => {
        let key = event |> ReactEvent.Keyboard.key;
        let altKey = event |> ReactEvent.Keyboard.altKey;
        if (!altKey || key == "Space") {
          event |> ReactEvent.Keyboard.preventDefault;
          let optKey =
            computed |> Js.Array.find(({kv_key}) => key == kv_key);
          switch (optKey) {
          | None => ()
          | Some({kv_value}) => onChange(Obj.magic(kv_value))
          };
        };
      }}
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
