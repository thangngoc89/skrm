open Utils.RR;
open SurveyEngine__Blocks;

let choices = [|
  {Survey.value: "1", Survey.label: "One"},
  {Survey.value: "2", Survey.label: "Two"},
  {Survey.value: "3", Survey.label: "Three"},
|];

[@react.component]
let make = () => {
  <Form>
    <h1> {s("Try to render a schema here")} </h1>
    <Textfield name="text_field" label="This is a very nice text field" />
    <Textfield name="text_field_2" label="This is a very nice text field hehe" />
    <SelectMultiple
      name="select_multiple"
      label="Select multiple is nice as well?"
      choices
    />
  </Form>;
};
