let component = ReasonReact.statelessComponent(__MODULE__);

let make = _children => {
  ...component,
  render: _self => {
    let%Epitath db = children =>
      <WithDatabase name=Config.appName version=Config.appDbVer>
        ...children
      </WithDatabase>;
    <App_New db />;
  },
};
