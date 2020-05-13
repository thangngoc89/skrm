open Utils.RR;
open SurveyBlocks;

[@gentype]
[@react.component]
let make = () => {
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
  </form>;
};

[@gentype]
let default = make;
