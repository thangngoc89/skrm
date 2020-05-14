open Utils.RR;
open Survey__Internal;

[@react.component]
let make =
    (
      ~value: option(string)=?,
      ~setValue: option(string => unit)=?,
      ~choices: array(Survey.pair),
      ~name: string,
      ~label: string,
      ~error=?,
      ~required=?,
    ) => {
  let onChange =
    setValue->Belt.Option.map((setValue, e) => {
      let value = e->Utils.RR.valueFromEvent;
      setValue(value);
    });
  <FormGroup>
    <FormLabel name error label required />
    <select className="usa-select" name id="options" ?value ?onChange>
      <option value=""> {s("--")} </option>
      {choices
       ->Js.Array2.map(({Survey.value: choiceValue, label: choiceLabel}) => {
           <option value=choiceValue key=choiceValue>
             {s(choiceLabel)}
           </option>
         })
       ->React.array}
    </select>
  </FormGroup>;
};
