module Id = Types_questions.Id;
module IdCmp = Types_questions.IdCmp;

type state = {
  data: Belt.Map.t(Id.t, Types_questions.dataTyp, IdCmp.identity),
};

type action =
  | HandleDataChange(Id.t, Types_questions.dataTyp);

let component = ReasonReact.reducerComponent("Question_handler");

let make: 'a => ReasonReact.component(state, 'b, action) =
  _children => {
    ...component,
    initialState: () => {data: Belt.Map.make(~id=(module IdCmp))},
    reducer: (action, state) => {
      switch (action) {
      | HandleDataChange(id, data) =>
        ReasonReact.Update({
          ...state,
          data: state.data->Belt.Map.set(id, data),
        })
      };
    },
    render: ({state, send}) => {
      <Question_render
        handleChange={(id, data) => send(HandleDataChange(id, data))}
        getData={id => state.data->Belt.Map.get(id)}
      />;
    },
  };
