open Grommet;
open React;

let dottedLine =
  <div
    style={ReactDOMRe.Style.make(
      ~flex="1",
      ~borderBottom="1px dotted #000",
      ~margin="0 4px 6px 4px",
      (),
    )}
  />;

let render_id = q_id =>
  q_id->Types_questions.Id.to_string->Js.String.toLocaleUpperCase ++ ".";

let render_question_header = (q_id, q_display) => {
  <Box basis=`half>
    <span>
      <Text color="brand" weight=`bold> {render_id(q_id)->str} </Text>
      <Markdown> q_display->str </Markdown>
    </span>
  </Box>;
};

module Select_one = {
  type state = option(string);
  type action =
    | Update(state);
  let component = ReasonReact.reducerComponent("Render_select_one");

  let make =
      (
        ~renderInformation: Question_data.select_one,
        ~data,
        ~handleChange,
        _children,
      ) => {
    ...component,
    initialState: () => data,
    willUpdate: ({oldSelf, newSelf}) =>
      if (oldSelf.state != data) {
        newSelf.send(Update(data));
      },
    shouldUpdate: ({oldSelf, newSelf: _}) => oldSelf.state != data,
    reducer: (action, _state) => {
      switch (action) {
      | Update(state) => ReasonReact.Update(state)
      };
    },
    render: _self => {
      <Box direction=`row_responsive gap=`xsmall margin=`medium>
        {render_question_header(
           renderInformation.id,
           renderInformation.question,
         )}
        <Box basis=`half gap=`small>
          {renderInformation.content
           ->Belt.Array.map(((value, label)) =>
               <RadioButton
                 key=label
                 label={
                   <Box
                     direction=`row
                     style={ReactDOMRe.Style.make(~flex="1", ())}>
                     label->str
                     dottedLine
                     <Text> value->str </Text>
                   </Box>
                 }
                 onChange={event => {
                   let value = event->ReactEvent.Form.target##value;
                   handleChange(Some(value));
                 }}
                 checked={
                   switch (data) {
                   | None => false
                   | Some(d) => d == value
                   }
                 }
                 name=label
                 value
               />
             )
           ->ReasonReact.array}
        </Box>
      </Box>;
    },
  };
};

module SS = Belt.Set.Int;

module Select_many_or_custom = {
  let component = ReasonReact.statelessComponent("Render_select_many_or_custom");

  let make =
      (
        ~renderInformation: Question_data.select_many_or_custom,
        ~data,
        ~add,
        ~remove,
        _children,
      ) => {
    ...component,
    render: _self => {
      <Box direction=`row_responsive gap=`xsmall margin=`medium>
        {render_question_header(
           renderInformation.id,
           renderInformation.question,
         )}
        <Box basis=`half gap=`small>
          {renderInformation.content
           ->Belt.Array.map(((currentValue, label)) =>
               <CheckBox
                 key=label
                 label={
                   <Box
                     direction=`row
                     style={ReactDOMRe.Style.make(~flex="1", ())}>
                     label->str
                     dottedLine
                     <Text> currentValue->str </Text>
                   </Box>
                 }
                 onChange={event => {
                   let value = event->ReactEvent.Form.target##checked;

                   value ?
                     add(Question_data.Predefined(currentValue)) :
                     remove(Question_data.Predefined(currentValue));
                 }}
                 checked={
                   switch (data) {
                   | None => false
                   | Some(data) =>
                     data->Belt.Array.some(
                       (
                         storedValue: Question_data.select_many_or_custom_container,
                       ) =>
                       switch (storedValue) {
                       | Predefined(storedValue)
                           when currentValue == storedValue =>
                         true
                       | _ => false
                       }
                     )
                   }
                 }
               />
             )
           ->ReasonReact.array}
        </Box>
      </Box>;
    },
  };
};
