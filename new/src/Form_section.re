module FormField = Grommet__FormField;
module TextInput = Grommet__TextInput;
open React;
let component = ReasonReact.statelessComponent("Form_section");

let make = (~section: Types.items_section('a), _children) => {
  ...component,
  render: _self => {
    <section>
      <h2> section.title->str </h2>
      {section.items
       ->Belt.List.map(item =>
           switch (item.typ) {
           | `date =>
             <FormField
               label={item.label->str} htmlFor={item.id->Types.text_of_id}>
               <TextInput placeholder={item.label} typ="date" />
             </FormField>

           | `string =>
             <FormField label={item.label->str}>
               <TextInput placeholder={item.label} />
             </FormField>
           | `number =>
             <FormField label={item.label->str}>
               <TextInput placeholder={item.label} typ="number" />
             </FormField>
           | `select_one(choices) =>
             switch (choices->Belt.List.head) {
             | None => ReasonReact.null
             | Some(default) => <FormField label={item.label->str} />
             }

           | `tinh_trang_nhu_cau => "tinh trang nhu cau"->str
           }
         )
       ->reactList}
    </section>;
  },
};
