open React;

let component = ReasonReact.statelessComponent("Form");

let schema = Types.phieu_dieu_tra;

let make = _children => {
  ...component,
  render: _self => {
    <div className="App">
      {schema
       ->(Belt.List.map(section => <Form_section section />))
       ->Belt.List.toArray
       ->ReasonReact.array}
    </div>;
  },
};
