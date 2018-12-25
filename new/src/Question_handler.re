open Types_questions;

module Select_one = Question_fragment_render.Select_one;
module Select_many_or_custom = Question_fragment_render.Select_many_or_custom;

type magicDataValue;

type state = {data: Js.Dict.t(magicDataValue)};

type manyAction =
  | Add
  | Remove;

type action =
  | Handle_select_one(Id.t, option(string))
  | Handle_select_many_or_custom(
      Id.t,
      manyAction,
      Question_data.select_many_or_custom_container,
    );

let component = ReasonReact.reducerComponent("Question_handler");

let make = _children => {
  ...component,
  initialState: () => {data: Js.Dict.empty()},
  reducer: (action, state) =>
    switch (action) {
    | Handle_select_one(id, value) =>
      Obj.magic(state.data)->Js.Dict.set(id->Id.to_string, value);
      ReasonReact.Update({data: state.data});
    | Handle_select_many_or_custom(id, typ, value) =>
      let currentArray =
        Obj.magic(state.data)
        ->Js.Dict.get(id->Id.to_string)
        ->Belt.Option.getWithDefault([||]);
      let newArray =
        switch (typ) {
        | Add => Belt.Array.concat(currentArray, [|value|])

        | Remove => currentArray->Belt.Array.keep(a => a != value)
        };
      Obj.magic(state.data)->Js.Dict.set(id->Id.to_string, newArray);
      ReasonReact.Update({data: state.data});
    },

  render: ({state, send}) => {
    Js.log(state.data);
    <>
      {Question_data.data
       ->Belt.Array.map(
           fun
           | Select_one(q) =>
             <Select_one
               renderInformation=q
               data={
                      let data = state.data->Js.Dict.get(q.id->Id.to_string);
                      switch (data) {
                      | None => None
                      | Some(data) => Some(Obj.magic(data))
                      };
                    }
               handleChange={value => send(Handle_select_one(q.id, value))}
             />
           | Select_many_or_custom(q) =>
             <Select_many_or_custom
               renderInformation=q
               data={state.data->Js.Dict.get(q.id->Id.to_string)->Obj.magic}
               add={value =>
                 send(Handle_select_many_or_custom(q.id, Add, value))
               }
               remove={value =>
                 send(Handle_select_many_or_custom(q.id, Remove, value))
               }
             />,
         )
       ->ReasonReact.array}
    </>;
  },
};
