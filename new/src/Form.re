module Box = Grommet__Box;
let component = ReasonReact.statelessComponent("Form");

let schema = Types.phieu_dieu_tra;

let make = _children => {
  ...component,
  render: _self => {
    <Box pad="medium">
      {schema
       ->(Belt.List.map(section => <Form_section section />))
       ->Belt.List.toArray
       ->ReasonReact.array}
    </Box>;
  },
};
