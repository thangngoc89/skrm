open React;
open Exam_TableSchema;

let component = ReasonReact.statelessComponent("Exam_TableRender");

let make = (~table, _children) => {
  ...component,
  render: _self => {
    switch (table) {
    | Belt.Result.Error(_) => "Error while generating table schema"->str
    | Belt.Result.Ok(table) =>
      let {heading, rows} = table;

      <Table className="border-2" layout=`fixed>
        <Table.Head>
          {Table.Head.(
             <Row>
               {heading
                ->Belt.List.mapWithIndex((colIndex, row) => {
                    let key = colIndex->string_of_int;
                    switch (row) {
                    | Disabled => <Col key />
                    | Empty => <Col />
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
                   {let colClassName = "text-center"
                    row
                    ->Belt.List.mapWithIndex((colIndex, row) => {
                        let key = colIndex->string_of_int;
                        switch (row) {
                        | Disabled => <Col key className="bg-light-6" />
                        | Empty => <Col />
                        | Static(label) =>
                          <Col key className="text-center font-bold">
                            label->str
                          </Col>
                        | Data(label) =>
                          <Col key className=colClassName> label->str </Col>
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
