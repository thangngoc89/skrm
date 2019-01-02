type options = list(string);
type cellLabel = string;

type cell =
  | Static(string)
  | Data(cellLabel)
  | Empty
  | Disabled;

type row = list(cell);
type table = {
  heading: row,
  rows: list(row),
};

let makeLabel = (~heading, ~left) => {
  {j|$(heading)_$(left)|j};
};

let makeTable =
    (~colsMain, ~colsSub, ~reverse=false, ~disabledList=[], ~heading, ()) =>
  if (Belt.List.length(colsMain) != Belt.List.length(colsSub)) {
    Belt.Result.Error(`UnequalLeftAndRightColumns);
  } else {
    let tableHeading =
      Belt.List.concatMany([|
        [Empty],
        heading->Belt.List.map(h => Static(h)),
        [Empty],
      |]);

    let rows =
      colsMain->Belt.List.reduceWithIndex(
        [],
        (acc, currentLeft, index) => {
          let newRow =
            Belt.List.concatMany([|
              [Static(currentLeft)],
              heading->Belt.List.map(h => {
                let label = makeLabel(~heading=h, ~left=currentLeft);
                switch (Belt.List.getBy(disabledList, l => l == label)) {
                | None => Data(label)
                | Some(_) => Disabled
                };
              }),
              [
                colsSub
                ->Belt.List.get(index)
                ->Belt.Option.getWithDefault(Empty),
              ],
            |]);
          [newRow, ...acc];
        },
      );
    let table = {heading: tableHeading, rows};
    Belt.Result.Ok(table);
  };

module type TableRender = {
  let table: Belt.Result.t(table, [> | `UnequalLeftAndRightColumns]);
};

module Tinh_trang_ham_tren: TableRender = {
  let heading = ["NC", "TT", "Nhai", "N", "T", "G", "X"];

  let colsMain = [
    "17",
    "16",
    "15",
    "14",
    "13",
    "12",
    "11",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
  ];

  let colsSub = [
    Empty,
    Empty,
    Static("55"),
    Static("54"),
    Static("53"),
    Static("52"),
    Static("51"),
    Static("61"),
    Static("62"),
    Static("63"),
    Static("64"),
    Static("65"),
    Empty,
    Empty,
  ];

  let disabledList = [
    makeLabel(~heading="Nhai", ~left="13"),
    makeLabel(~heading="Nhai", ~left="12"),
    makeLabel(~heading="Nhai", ~left="11"),
    makeLabel(~heading="Nhai", ~left="21"),
    makeLabel(~heading="Nhai", ~left="22"),
    makeLabel(~heading="Nhai", ~left="23"),
  ];
  let table = makeTable(~colsMain, ~colsSub, ~heading, ~disabledList, ());
};
