[@bs.config {jsx: 3}];

[@genType]
type direction = [
  | `row
  | `column
  | [@genType.as "row-responsive"] `row_responsive
];

[@genType]
type align = [
  | `start
  | [@genType.as "end"] `end_
  | `center
  | `between
  | `around
];

let alignToString =
  fun
  | `start => "start"
  | `end_ => "end"
  | `center => "center"
  | `between => "between"
  | `around => "around";

[@genType]
[@react.component]
let make =
    (
      ~direction: direction=`column,
      ~alignContent: option(align)=?,
      ~justifyContent: option(align)=?,
      ~alignItems: option(align)=?,
      ~className=?,
      ~id=?,
      ~children,
    )
    : React.element => {
  let className =
    Cn.make([
      "flex",
      switch (direction) {
      | `row => "flex-row"
      | `column => "flex-col"
      | `row_responsive => "flex-col lg:flex-row"
      },
      alignContent
      ->Belt.Option.map(align => "content-" ++ alignToString(align))
      ->Cn.unpack,
      justifyContent
      ->Belt.Option.map(align => "justify-" ++ alignToString(align))
      ->Cn.unpack,
      alignItems
      ->Belt.Option.map(align => "items-" ++ alignToString(align))
      ->Cn.unpack,
      Cn.unpack(className),
    ]);
  <div className ?id> children </div>;
};
