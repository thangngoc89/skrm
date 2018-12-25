open React;
open Grommet;
let component = ReasonReact.statelessComponent("Question_render");

let data = Question_data.data;
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

let make = (~handleChange, ~getData, _children) => {
  ...component,
  render: _self => {
    <Box>
      {data->Belt.Array.map(q =>
         switch (q) {
         | Select_one({q_id, q_display, q_content}) =>
           <Box direction=`row_responsive gap=`xsmall margin=`medium>
             {render_question_header(q_id, q_display)}
             <Box basis=`half gap=`small>
               {q_content
                ->Belt.Array.map(a =>
                    switch (a) {
                    | A_Predefined((value, label)) =>
                      let value = value->string_of_int;
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
                          handleChange(q_id, Types_questions.String(value));
                        }}
                        checked={
                                  let data = getData(q_id);
                                  switch (data) {
                                  | None => false
                                  | Some(data) =>
                                    switch (data) {
                                    | Types_questions.String(data) =>
                                      data == value
                                    | _ => false
                                    }
                                  };
                                }
                        value
                      />;
                    | _ => "Unhandled answer type"->str
                    }
                  )
                ->ReasonReact.array}
             </Box>
           </Box>
         | Select_many({q_id, q_display, q_content}) =>
           <Box direction=`row_responsive gap=`xsmall margin=`medium>
             {render_question_header(q_id, q_display)}
             <Box basis=`half gap=`small>
               {q_content
                ->Belt.Array.map(
                    fun
                    | A_Predefined((value, label)) =>
                      <CheckBox
                        key=label
                        label={
                          <Box
                            direction=`row
                            style={ReactDOMRe.Style.make(~flex="1", ())}>
                            label->str
                            dottedLine
                            <Text> {value->string_of_int->str} </Text>
                          </Box>
                        }
                        checked=true
                      />
                    | _ => "Unhandled answer type"->str,
                  )
                ->ReasonReact.array}
             </Box>
           </Box>
         /* TODO: Handle this case */
         | Group({q_id, q_display, q_content: _}) =>
           <Box direction=`column gap=`xsmall margin=`medium>
             /* TODO: Handle this case */
              {render_question_header(q_id, q_display)} </Box>
         }
       )}
    </Box>;
  },
};
