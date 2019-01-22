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

let component = ReasonReact.statelessComponent("Box");

let alignToString =
  fun
  | `start => "start"
  | `end_ => "end"
  | `center => "center"
  | `between => "between"
  | `around => "around";

[@genType]
let make =
    (
      ~direction: direction=`column,
      ~alignContent: option(align)=?,
      ~justifyContent: option(align)=?,
      ~alignItems: option(align)=?,
      ~className=?,
      children,
    ) => {
  ...component,
  render: _self => {
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
    <div className> ...children </div>;
  },
};
