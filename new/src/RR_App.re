let component = ReasonReact.statelessComponent("RR_app");

let make = _children => {
  ...component,
  render: _self => {
    <Form />;
  },
};

[@bs.deriving abstract]
type jsProps = {children: array(ReasonReact.reactElement)};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(jsProps->childrenGet)
  );
