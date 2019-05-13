[@bs.config {jsx: 3}];
open ReactHelpers;
open PDT_Types.Table;

let emptyDict: Js.Dict.t(string) = Js.Dict.empty();
let hasOwnProperty: (Js.Dict.t('a), Js.Dict.key) => bool = [%raw
  {|
  function(dict, key) {
    return dict.hasOwnProperty(key)
  }
|}
];

module Row = {
  [@react.component]
  let make = (~reverse, ~children) => {
    <div
      className={Cn.make([
        "flex w-full",
        reverse ? "flex-row-reverse" : "flex-row ",
      ])}>
      children
    </div>;
  };
};

module Col = {
  [@react.component]
  let make = (~className, ~children=React.null) => {
    <div
      className={Cn.make([
        "flex-1 flex items-center justify-center",
        className,
      ])}
      style={ReactDOMRe.Style.make(~minHeight="2.5rem", ())}>
      children
    </div>;
  };
};

[@genType]
[@react.component]
let make =
    (
      ~table: table,
      ~value as tableValue=emptyDict,
      ~error=emptyDict,
      ~onCellChange: (. string, string) => unit,
      ~onCellBlur=?,
      ~id=?,
    ) => {
  <div className="border-2 text-dark-1 w-full" ?id>
    {table
     ->Belt.List.mapWithIndex((rowIndex, rowData) => {
         let (row, reverse) =
           switch (rowData) {
           | Row(row) => (row, false)
           | RowReverse(row) => (row->Belt.List.reverse, true)
           };
         <Row reverse key={rowIndex->string_of_int}>
           {row
            ->Belt.List.mapWithIndex((colIndex, row) => {
                let key = colIndex->string_of_int;
                switch (row) {
                | Disabled => <Col key className="bg-dark-1 border" />
                | Empty => <Col key className="border border-dark-1" />
                | Static(label) =>
                  <Col
                    key className="text-center font-bold border border-dark-1">
                    label->str
                  </Col>
                | Data(label, options) =>
                  let currentValue =
                    tableValue
                    ->Js.Dict.get(label)
                    ->Belt.Option.getWithDefault("");
                  let hasError = error->hasOwnProperty(label);

                  <Col
                    key className="text-center border border-dark-1 p-0 m-0">
                    <Select
                      hasError
                      block=true
                      options={options->Select.listToPair}
                      className="text-center"
                      name=label
                      value=currentValue
                      onChange={value => onCellChange(. label, value)}
                      onBlur=?onCellBlur
                    />
                  </Col>;
                };
              })
            ->reactList}
         </Row>;
       })
     ->reactList}
  </div>;
};
