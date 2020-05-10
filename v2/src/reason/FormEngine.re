module S = Survey_bs;

open Survey_t;

let fields = [
  Text({
    id: "name",
    label: "What's your name",
    required: None,
    relavent: None,
  }),
  SelectOne({
    id: "yes_no_question",
    label: "Yes or no?",
    required: None,
    relavent: None,
    params: [{value: "0", label: "No"}, {value: "1", label: "yes"}],
  }),
];

let survey = {title: "Test survey", fields};

open Helpers;
open MaterialUi;
module Field = FormField;
[@react.component]
let make = () => {
  let survey = survey;
  let {title, fields} = survey;

  <VBox
    p__obj={"xs": 4}
    m__obj={"sm": 2, "md": 6}
    border="10px solid"
    borderColor="grey.300"
    borderRadius="4px">
    <Typography variant=`H3 component={`String("h1")}>
      {s(title)}
    </Typography>
    {fields
     ->Belt.List.map(field => {
         switch (field) {
         | Text({id, label, required, relavent}) =>
           <Field.Text
             key=id
             name=id
             label={s(label)}
             ?required
             fullWidth=true
           />
         | SelectOne(field) =>
           <Field.SelectOne key={field.id} field handleChange={_ => ()} />
         | _ => <div> {s("Unhandled")} </div>
         }
       })
     ->Belt.List.toArray
     ->React.array}
  </VBox>;
};
