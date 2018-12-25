let component = ReasonReact.statelessComponent("RR_app");

[@genType]
let make = _children => {
  ...component,
  render: _self => {
    <Question_handler />;
  },
};
