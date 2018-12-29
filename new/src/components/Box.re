[@genType]
type direction = [
  | `row
  | `column
  | [@genType.as "row-responsive"] `row_responsive
];

[@genType]
type alignContent = [
  | `start
  | [@genType.as "end"] `end_
  | `center
  | `between
  | `around
];

let component = ReasonReact.statelessComponent("Box");

[@genType]
let make =
    (
      ~direction: direction=`column,
      ~alignContent: alignContent=`start,
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
        switch (alignContent) {
        | `start => "content-start"
        | `end_ => "content-end"
        | `center => "content-center"
        | `between => "content-between"
        | `around => "content-around"
        },
        Cn.unpack(className),
      ]);
    <div className> children </div>;
  },
};
