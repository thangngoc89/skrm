type state = {db: option(Idb.Db.t)};

type action =
  | SetDb(Idb.Db.t);

let component = ReasonReact.reducerComponent("WithDatabase");

let make = (~name, ~version=1, ~upgradeDb, children) => {
  ...component,
  initialState: () => {db: None},
  reducer: (action, _state) => {
    switch (action) {
    | SetDb(db) => ReasonReact.Update({db: Some(db)})
    };
  },
  didMount: ({send}) => {
    Js.Promise.(
      Idb.Db.openDb(name, version, upgradeDb)
      |> then_(db => send(SetDb(db)) |> resolve)
      |> catch(err => Js.log(err) |> resolve)
    )
    |> ignore;
  },
  render: ({state}) => {
    switch (state.db) {
    | None => ReasonReact.null
    | Some(db) => children(db)
    };
  },
};
