open Utils.RR;
open SurveyEngine__UI;

let choices = [|
  {Survey.value: "0", label: "0 - Zero"},
  {value: "1", label: "1 - One"},
|];

let simpleSchema: array(Survey.field) = [|
  (
    {
      name: "note",
      label: "You should answer all questions truthfully",
      required: None,
      relavent: None,
    },
    Note,
  ),
  (
    {name: "text", label: "Text field", required: Some(true), relavent: None},
    Text,
  ),
  (
    {
      name: "select_one",
      label: "Select one please",
      required: None,
      relavent: None,
    },
    SelectOne({params: choices}),
  ),
  (
    {
      name: "select_multiple",
      label: "Select many please",
      required: None,
      relavent: None,
    },
    SelectMultiple({params: choices}),
  ),
  (
    {
      name: "group_1",
      label: "This is a group",
      required: None,
      relavent: None,
    },
    Group({
      params: [|
        (
          {
            name: "select_inside_group",
            label: "Select inside a group",
            required: None,
            relavent: None,
          },
          SelectOne({params: choices}),
        ),
      |],
    }),
  ),
|];

module RenderFields = {
  let rec renderFieldType = (store, {Survey.name, label, required, relavent}) =>
    fun
    | Survey.Text => {
        <Textfield name label ?required store />;
      }
    | SelectOne({params}) =>
      <SelectOne name label choices=params ?required store />
    | SelectMultiple({params}) =>
      <SelectMultiple name label choices=params ?required store />
    | Note => {
        <p className="survey-field__note"> {s(label)} </p>;
      }
    | Group({params: fields}) =>
      React.createElement(
        group,
        groupProps(~name, ~label, ~fields, ~store, ()),
      )
    | _ => <p> {s("Unhandled input type")} </p>
  [@react.component]
  and make = (~fields: array(Survey.field), ~store) => {
    fields
    ->Belt.Array.map(((metadata, fieldType)) => {
        <div key={metadata.name} className="survey-field">
          {renderFieldType(store, metadata, fieldType)}
        </div>
      })
    ->React.array;
  }
  [@react.component]
  and group = (~name as _, ~label, ~fields, ~store) => {
    <div className="survey-field__group">
      <h2> {s(label)} </h2>
      {React.createElement(make, makeProps(~fields, ~store, ()))}
    </div>;
  };
};

[@react.component]
let make = () => {
  let store = Store.Form.useForm();

  <Form>
    <h1> {s("Form title long long long")} </h1>
    <RenderFields fields=simpleSchema store />
  </Form>;
};
