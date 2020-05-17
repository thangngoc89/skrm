open Utils.RR;

[@react.component]
let make =
    (
      ~value: string,
      ~setValue: string => unit,
      ~choices: array(Survey.pair),
      ~name: string,
      ~label: string,
      ~required=?,
    ) => {
  <fieldset className="usa-fieldset">
    <legend className="usa-label usa-label__selectOne"> {s(label)} </legend>
    {choices
     ->Js.Array2.map(({Survey.value: choiceValue, label: choiceLabel}) => {
         <div className="usa-radio" key=choiceValue>
           <input
             className="usa-radio__input"
             id={j|$(name)__$(choiceValue)|j}
             type_="radio"
             name
             value=choiceValue
             onChange={_ => {setValue(choiceValue)}}
             checked={value == choiceValue}
             ?required
           />
           <label
             className="usa-radio__label"
             htmlFor={j|$(name)__$(choiceValue)|j}>
             {s(choiceLabel)}
           </label>
         </div>
       })
     ->React.array}
  </fieldset>;
};
