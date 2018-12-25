open Types_questions;

module Select_one = Question_fragment_render.Select_one;

type magicDataValue;

type state = {data: Js.Dict.t(magicDataValue)};

type action =
  | Handle_select_one(Id.t, option(string));

let component = ReasonReact.reducerComponent("Question_handler");

let make = _children => {
  ...component,
  initialState: () => {data: Js.Dict.empty()},
  reducer: (action, state) =>
    switch (action) {
    | Handle_select_one(id, value) =>
      Obj.magic(state.data)->Js.Dict.set(id->Id.to_string, value);
      ReasonReact.Update({data: state.data});
    },

  render: ({state, send}) => {
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
             />,
         )
       ->ReasonReact.array}
    </>;
  },
};
