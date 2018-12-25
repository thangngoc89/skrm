open Types_questions;

module Select_one = Question_fragment_render.Select_one;

type data = {
  b2: option(string),
  b4: option(string),
  b5: option(string),
};

type state = {data};

type action =
  | UpdateB2(option(string))
  | UpdateB4(option(string))
  | UpdateB5(option(string));

let component = ReasonReact.reducerComponent("Question_handler");

let make = _children => {
  ...component,
  initialState: () => {
    data: {
      b2: None,
      b4: None,
      b5: None,
    },
  },
  reducer: (action, state) => {
    switch (action) {
    | UpdateB2(b2) =>
      ReasonReact.Update({
        ...state,
        data: {
          ...state.data,
          b2,
        },
      })
    | UpdateB4(b4) =>
      ReasonReact.Update({
        ...state,
        data: {
          ...state.data,
          b4,
        },
      })
    | UpdateB5(b5) =>
      ReasonReact.Update({
        ...state,
        data: {
          ...state.data,
          b5,
        },
      })
    };
  },
  render: ({state, send}) => {
    <>
      <Select_one
        renderInformation=Question_data.b2
        data={state.data.b2}
        handleChange={value => send(UpdateB2(value))}
      />
      <Select_one
        renderInformation=Question_data.b4
        data={state.data.b4}
        handleChange={value => send(UpdateB4(value))}
      />
      <Select_one
        renderInformation=Question_data.b5
        data={state.data.b5}
        handleChange={value => send(UpdateB5(value))}
      />
    </>;
  },
};
