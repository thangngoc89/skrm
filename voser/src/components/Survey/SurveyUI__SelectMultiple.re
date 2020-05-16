open Utils.RR;

let%private toggleCheckbox = (~choiceValue, ~value) => {
  let idx = Js.Array.indexOf(choiceValue, value);

  if (idx == (-1)) {
    Js.Array.concat(value, [|choiceValue|]);
  } else {
    Js.Array.concat(
      Js.Array.slice(~start=0, ~end_=idx, value),
      Js.Array.sliceFrom(idx + 1, value),
    );
  };
};

[@react.component]
let make =
    (
      ~value: array(string),
      ~setValue,
      ~choices: array(Survey.pair),
      ~name,
      ~label,
    ) => {
  <fieldset className="usa-fieldset">
    <legend className="usa-label"> {s(label)} </legend>
    <div className="usa-checkbox">
      {choices
       ->Js.Array2.map(({Survey.value: choiceValue, label: choiceLabel}) => {
           <React.Fragment key=choiceValue>
             <input
               className="usa-checkbox__input"
               id={j|$(name)__$(choiceValue)|j}
               type_="checkbox"
               name
               value=choiceValue
               onChange={_ => {
                 setValue(toggleCheckbox(~choiceValue, ~value))
               }}
               checked={Utils.Arr.has(~needle=choiceValue, ~haystack=value)}
             />
             <label
               className="usa-checkbox__label"
               htmlFor={j|$(name)__$(choiceValue)|j}>
               {s(choiceLabel)}
             </label>
           </React.Fragment>
         })
       ->React.array}
    </div>
  </fieldset>;
};
