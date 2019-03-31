open React;
open PDT_Types.Table;

let component = ReasonReact.statelessComponent(__MODULE__);

let make =
    (
      ~table,
      ~tableValue,
      ~handleCellChange: (. string, string) => unit,
      _children,
    ) => {
  ...component,
  render: _self => {
    switch (table) {
    | Belt.Result.Error(_) =>
      <span className="text-status-danger">
        "Error while generating table schema"->str
      </span>
    | Belt.Result.Ok(table) =>
      let {heading, rows} = table;

      <Table className="border-2 text-dark-1" layout=`fixed>
        <Table.Head>
          Table.Head.(
            <Row>
              {heading
               ->Belt.List.mapWithIndex((colIndex, row) => {
                   let key = colIndex->string_of_int;
                   switch (row) {
                   | Disabled => <Col key />
                   | Empty => <Col key />
                   | Static(label) => <Col key> label->str </Col>
                   | Data(label, _) => <Col key> label->str </Col>
                   };
                 })
               ->reactList}
            </Row>
          )
        </Table.Head>
        <Table.Body>
          Table.Body.(
            rows
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
                         <Col key className="text-center border p-0 m-0">
                           <Select
                             block=true
                             options={options->Select.listToPair}
                             className="text-centerI"
                             name=label
                             value=currentValue
                             onChange={value =>
                               handleCellChange(. label, value)
                             }
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
  },
};
