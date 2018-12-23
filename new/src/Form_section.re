module FormField = Grommet__FormField;
module Box = Grommet__Box;
module TextInput = Grommet__TextInput;
module RadioButton = Grommet__RadioButton;
module Heading = Grommet__Heading;

open React;
let component = ReasonReact.statelessComponent("Form_section");

let make = (~section: Types.items_section('a), _children) => {
  ...component,
  render: _self => {
    <section>
      <Heading level=2> section.title->str </Heading>
      {section.items
       ->Belt.List.map(item =>
           switch (item.typ) {
           | `date =>
             <FormField
               label={item.label->str} htmlFor={item.id->Types.text_of_id}>
               <TextInput typ="date" />
             </FormField>

           | `string =>
             <FormField label={item.label->str}>
               <TextInput
                 placeholder={
                   {j|Nhập |j} ++ item.label->Js.String.toLocaleLowerCase
                 }
               />
             </FormField>
           | `number =>
             <FormField label={item.label->str}>
               <TextInput
                 placeholder={
                   {j|Nhập |j} ++ item.label->Js.String.toLocaleLowerCase
                 }
                 typ="number"
               />
             </FormField>
           | `select_one(choices) =>
             switch (choices->Belt.List.head) {
             | None => ReasonReact.null
             | Some(_default) =>
               <FormField label={item.label->str}>
                 <Box align="start" pad="small" gap="small" direction="row">
                   {choices
                    ->Belt.List.map(value =>
                        <RadioButton key=value label={value->str} value />
                      )
                    ->reactList}
                 </Box>
               </FormField>
             }

           | `tinh_trang_nhu_cau => "tinh trang nhu cau"->str
           }
         )
       ->reactList}
    </section>;
  },
};
