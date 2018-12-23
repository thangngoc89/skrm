module FormField = Grommet__FormField;
module Box = Grommet__Box;
module TextInput = Grommet__TextInput;
module RadioButton = Grommet__RadioButton;
module Heading = Grommet__Heading;
module Text = Grommet__Text;

open React;
let component = ReasonReact.statelessComponent("Form_section");

let make = (~section: Types.items_section('a), _children) => {
  ...component,
  render: _self => {
    <section>
      <Heading level=2> section.title->str </Heading>
      {section.items
       ->Belt.List.map(item => {
           let id = item.id->Types.text_of_id;
           switch (item.typ) {
           | `date =>
             <FormField label={item.label->str} htmlFor=id>
               <TextInput typ="date" name=id id />
             </FormField>

           | `string =>
             <FormField label={item.label->str} htmlFor=id>
               <TextInput
                 placeholder={
                   {j|Nhập |j} ++ item.label->Js.String.toLocaleLowerCase
                 }
                 id
                 name=id
               />
             </FormField>
           | `number =>
             <FormField label={item.label->str} htmlFor=id>
               <TextInput
                 placeholder={
                   {j|Nhập |j} ++ item.label->Js.String.toLocaleLowerCase
                 }
                 id
                 name=id
                 typ="number"
               />
             </FormField>
           | `select_one(choices) =>
             switch (choices) {
             | [] => ReasonReact.null
             | _ =>
               <Box pad="small" gap="xsmall" responsive=true>
                 <Text weight={`number(900)} as_="label">
                   item.label->str
                 </Text>
                 <Box pad="none" gap="medium" direction="row-responsive">
                   {choices
                    ->Belt.List.map(value =>
                        <RadioButton key=value label={value->str} value />
                      )
                    ->reactList}
                 </Box>
               </Box>
             }

           | `tinh_trang_nhu_cau => "tinh trang nhu cau"->str
           };
         })
       ->reactList}
    </section>;
  },
};
