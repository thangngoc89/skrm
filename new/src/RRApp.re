let component = ReasonReact.statelessComponent("RRApp");

[@genType]
let make = _children => {
  ...component,
  render: _self => {
    ReasonReact.null;
  },
};
