open Utils.RR;

type inputStatus = 
  | Normal
  | Error
  | Success;

[@react.component]
let make = (~name, ~label, ~value=?, ~onChange=?, ~hint=?) => {
  <div className="usa-form-group">
    <label className="usa-label" htmlFor=name> {s(label)} </label>
    <input className="usa-input" id=name name type_="text" />
  </div>;
};
