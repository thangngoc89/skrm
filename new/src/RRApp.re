open React;
type state = {route: Router.t};
type action =
  | ChangeRoute(Router.t);

let component = ReasonReact.reducerComponent("RRApp");

[@genType]
let make = _children => {
  ...component,
  initialState: () => {
    route: ReasonReact.Router.dangerouslyGetInitialUrl()->Router.urlToRoute,
  },
  didMount: ({send, onUnmount}) => {
    let watcherID =
      ReasonReact.Router.watchUrl(url =>
        Router.urlToRoute(url)->ChangeRoute->send
      );
    onUnmount(() => ReasonReact.Router.unwatchUrl(watcherID));
  },
  reducer: (action, _state) =>
    switch (action) {
    | ChangeRoute(route) => ReasonReact.Update({route: route})
    },
  render: ({state}) => {
    <App_Layout>
      {switch (state.route) {
       | Home => "Homepage"->str
       | Input => "Input"->str
       | New => <App_New_WithDatabase />
       | NotFound => "NotFound"->str
       }}
    </App_Layout>;
  },
};
