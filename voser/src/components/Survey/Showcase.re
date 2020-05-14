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
  let (multiValue, setMultiValue) = React.useState(() => [|"1"|]);
  let (oneValue, setOneValue) = React.useState(() => "1");
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
      value=multiValue
      setValue={newValue => setMultiValue(_ => newValue)}
      choices
      label="Choose several numbers"
      name="select_multiple"
    />
    <h2> {s("Select One")} </h2>
    <SelectOne
      value=oneValue
      setValue={newValue => {
        setOneValue(_ => newValue)}
        }
      choices
      label="Choose a number"
      name="select_one"
    />
  </form>;
};

[@gentype]
let default = make;
