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
  let component = ReasonReact.statelessComponent("Render_select_one");

  let make =
      (
        ~renderInformation: Question_data.select_one,
        ~data,
        ~handleChange,
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
                 value
               />
             )
           ->ReasonReact.array}
        </Box>
      </Box>;
    },
  };
};
