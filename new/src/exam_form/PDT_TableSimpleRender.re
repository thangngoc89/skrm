open React;
open PDT_Types.Table;

let component = ReasonReact.statelessComponent(__MODULE__);

let make =
    (
      ~table: tableSimple,
      ~tableValue,
      ~handleCellChange: (. string, string) => unit,
      _children,
    ) => {
  ...component,
  render: _self => {
    <Table className="border-2 text-dark-1" layout=`fixed>
      <Table.Body>
        {Table.Body.(
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
                        <Col key className="text-center border p-0 m-0">
                          <Select
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
         )}
      </Table.Body>
    </Table>;
  },
};
