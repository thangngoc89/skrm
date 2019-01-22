let component = ReasonReact.statelessComponent(__MODULE__);

[@genType]
let make = (~label, ~value, _children) => {
  ...component,
  render: _self => {
    <Box
      direction=`row
      alignContent=`end_
      justifyContent=`start
      className="w-full">
      label
      <span
        className="flex-1 border-b border-dotted border-dark-3 mx-2 mb-1"
      />
      value
    </Box>;
  },
};
