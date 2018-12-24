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
let renderQuestionHeader = (q_id, q_display) => {
  <Box basis=`half>
    <span>
      <strong>
        {(
           q_id->Types_questions.Id.to_string->Js.String.toLocaleUpperCase
           ++ "."
         )
         ->str}
      </strong>
      <Markdown> q_display->str </Markdown>
    </span>
  </Box>;
};
let make = _children => {
  ...component,
  render: _self => {
    <Box>
      {data->Belt.Array.map(q =>
         switch (q) {
         | Select_one({q_id, q_display, q_content}) =>
           <Box direction=`row_responsive gap=`xsmall margin=`medium>
             {renderQuestionHeader(q_id, q_display)}
             <Box basis=`half gap=`small>
               {q_content
                ->Belt.Array.map(
                    fun
                    | A_Predefined((value, label)) =>
                      <RadioButton
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
                        value
                      />
                    | _ => "Unhandled answer type"->str,
                  )
                ->ReasonReact.array}
             </Box>
           </Box>
         | Select_many({q_id, q_display, q_content}) =>
           <Box direction=`row_responsive gap=`xsmall margin=`medium>
             {renderQuestionHeader(q_id, q_display)}
           </Box>
         /* TODO: Handle this case */
         | Group({q_id, q_display, q_content}) =>
           <Box direction=`column gap=`xsmall margin=`medium>
             /* TODO: Handle this case */
              {renderQuestionHeader(q_id, q_display)} </Box>
         }
       )}
    </Box>;
  },
};
