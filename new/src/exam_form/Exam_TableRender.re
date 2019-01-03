open React;
open Exam_TableSchema;

let options = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

let options = options->Belt.List.map(o => {Select.label: o, value: o});

let component = ReasonReact.statelessComponent("Exam_TableRender");

let make = (~table, _children) => {
  ...component,
  render: _self => {
    switch (table) {
    | Belt.Result.Error(_) => "Error while generating table schema"->str
    | Belt.Result.Ok(table) =>
      let {heading, rows} = table;

      <Table className="border-2 text-dark-1" layout=`fixed>
        <Table.Head>
          {Table.Head.(
             <Row>
               {heading
                ->Belt.List.mapWithIndex((colIndex, row) => {
                    let key = colIndex->string_of_int;
                    switch (row) {
                    | Disabled => <Col key />
                    | Empty => <Col key />
                    | Static(label) => <Col key> label->str </Col>
                    | Data(label) => <Col key> label->str </Col>
                    };
                  })
                ->reactList}
             </Row>
           )}
        </Table.Head>
        <Table.Body>
          {Table.Body.(
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
                        | Data(label) =>
                          <Col key className="text-center border p-0 m-0">
                            <Select options name=label />
                          </Col>
                        };
                      })
                    ->reactList}
                 </Row>
               )
             ->reactList
           )}
        </Table.Body>
      </Table>;
    };
  },
};
