[@bs.config {jsx: 3}];

[@genType]
[@react.component]
let make = (~label, ~value): React.element => {
  <Box
    direction=`row alignContent=`end_ justifyContent=`start className="w-full">
    label
    <span className="flex-1 border-b border-dotted border-dark-3 mx-2 mb-1" />
    value
  </Box>;
};
