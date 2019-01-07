let component = ReasonReact.statelessComponent("RRApp");

[@genType]
let make = _children => {
  ...component,
  render: _self => {
    <FormField htmlFor="foo" label="Label" help="Help" error="Error">
      <TextInput value="foo" onChange={_ => ()} />
    </FormField>;
  },
};
