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

  <Form>
    <h1> {s("Form components showcases")} </h1>
    <h2> {s("Text Field")} </h2>
    <Textfield name="text" label="Normal" hint="A very helpful message" />
    <Textfield
      name="text"
      label="Has error"
      hint="A very helpful message"
      error="Oops!"
    />
    <h2> {s("Range Slider")} </h2>
    <RangeSlider
      min="0"
      max="100"
      step=10.
      name="range_slider"
      defaultValue="20"
      label="Range Slider"
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
      setValue={newValue => {setOneValue(_ => newValue)}}
      choices
      label="Choose a number"
      name="select_one"
    />
    <h2> {s("Dropdown")} </h2>
    <Dropdown
      value=oneValue
      setValue={newValue => {setOneValue(_ => newValue)}}
      choices
      label="Choose a number"
      name="dropdown"
    />
  </Form>;
};

[@gentype]
let default = make;
