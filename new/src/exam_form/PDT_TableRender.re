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
  <Table className="border-2 text-dark-1" layout=`fixed ?id>
    <Table.Body>
      Table.Body.(
        table
        ->Belt.List.mapWithIndex((rowIndex, row) =>
            <Row key={rowIndex->string_of_int}>
              {row
               ->Belt.List.mapWithIndex((colIndex, row) => {
                   let key = colIndex->string_of_int;
                   switch (row) {
                   | Disabled => <Col key className="bg-dark-1 border" />
                   | Empty => <Col key className="border" />
                   | Static(label) =>
                     <Col
                       key
                       className="text-center font-bold border border-dark-1">
                       label->str
                     </Col>
                   | Data(label, options) =>
                     let currentValue =
                       tableValue
                       ->Js.Dict.get(label)
                       ->Belt.Option.getWithDefault("");
                     let hasError = error->hasOwnProperty(label);

                     <Col key className="text-center border p-0 m-0">
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
            </Row>
          )
        ->reactList
      )
    </Table.Body>
  </Table>;
};
