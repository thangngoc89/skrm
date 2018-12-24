module Box = Grommet__Box;
module Heading = Grommet__Heading;
let component = ReasonReact.statelessComponent("Form");

open React;
let schema = Types.phieu_dieu_tra_layout;

let make = _children => {
  ...component,
  render: _self => {
    <Box pad="small">
      {schema
       ->(
           Belt.List.map(group =>
             <>
               <Heading level=3> group.title->str </Heading>
               {group.items
                ->Belt.List.map(row =>
                    <Box direction=`row_responsive gap=`medium>
                      {row
                       ->Belt.List.map(((size, itemId)) =>
                           <Box basis=size> <Form_render_field itemId /> </Box>
                         )
                       ->reactList}
                    </Box>
                  )
                ->reactList}
             </>
           )
         )
       ->reactList}
    </Box>;
  },
};
