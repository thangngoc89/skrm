open Utils.RR;
open SurveyBlocks;

let choices = [|
  {Survey.value: "1", Survey.label: "One"},
  {Survey.value: "2", Survey.label: "Two"},
  {Survey.value: "3", Survey.label: "Three"},
|];

[@gentype]
[@react.component]
let make = () => {
  let (value, setValue) = React.useState(() => [|"1"|]);
  <form className="usa-form">
    <h1> {s("Form components showcases")} </h1>
    <h2> {s("TextField")} </h2>
    <TextField name="text" label="Normal" hint="A very helpful message" />
    <TextField
      name="text"
      label="Has error"
      hint="A very helpful message"
      error="Oops!"
    />
    <h2> {s("Select Multiple")} </h2>
    <SelectMultiple
      value
      setValue={newValue => setValue((_) => newValue)}
      choices
      label="Choose a number"
      name="select_multiple"
    />
  </form>;
};

[@gentype]
let default = make;
