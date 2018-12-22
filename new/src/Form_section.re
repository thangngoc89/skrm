module FormItem = Antd.Form.Item;
module Input = Antd.Input;
module Radio = Antd.Radio;
open React;
let component = ReasonReact.statelessComponent("Form_section");

let make = (~section: Types.items_section('a), _children) => {
  ...component,
  render: _self => {
    <section>
      <h2> section.title->str </h2>
      <Antd.Form layout="vertical">
        {section.items
         ->Belt.List.map(item =>
             switch (item.typ) {
             | `date =>
               <FormItem label={item.label}>
                 <Input htmlType="date" />
               </FormItem>
             | `string => <FormItem label={item.label}> <Input /> </FormItem>
             | `number =>
               <FormItem label={item.label}>
                 <Input htmlType="number" />
               </FormItem>
             | `select_one(choices) =>
               switch (choices->Belt.List.head) {
               | None => ReasonReact.null
               | Some(default) =>
                 <FormItem label={item.label}>
                   <Radio.Group
                     defaultValue=default value=default onChange={_ => ()}>
                     {choices->Belt.List.map(choice =>
                        <Radio key=choice value=choice> choice->str </Radio>
                      )}
                   </Radio.Group>
                 </FormItem>
               }

             | `tinh_trang_nhu_cau => "tinh trang nhu cau"->str
             }
           )
         ->reactList}
      </Antd.Form>
    </section>;
  },
};
