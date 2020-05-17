let string = React.string("hey");

[@react.component]
let rec make = (~foo) => {
  <div>
    string
    {React.createElement(other, otherProps(~bar="hi", ()))}
  </div>;
}
[@react.component]
and other = (~bar) => {
  <div> string </div>;
};
