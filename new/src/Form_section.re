module FormItem = Antd.Form.Item;
module Input = Antd.Input;
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
             <FormItem label={item.label}>
               <Input placeholder="input placeholder" />
             </FormItem>
           | `string => "string"->str
           | `number => "number"->str
           | `select_one(_choices) => "select_one"->str
           | `tinh_trang_nhu_cau => "tinh trang nhu cau"->str
           }
         )
       ->reactList}
    </section>;
  },
};
