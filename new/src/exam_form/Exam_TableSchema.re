type options = list(string);
type cellLabel = string;

type cell =
  | Static(string)
  | Data(cellLabel, options)
  | Empty
  | Disabled;

type row = list(cell);

type table = {
  heading: row,
  rows: list(row),
};

let optionsTinhTrang = [
  "0",
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

let optionsNhuCau = ["0", "1", "2", "3", "4", "5", "6", "F", "P"];

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
      colsMain
      ->Belt.List.reduceWithIndex(
          [],
          (acc, currentLeft, index) => {
            let main = [Static(currentLeft)];
            let sub = [
              colsSub
              ->Belt.List.get(index)
              ->Belt.Option.getWithDefault(Empty),
            ];
            let data =
              heading->Belt.List.map(h => {
                let label = makeLabel(~heading=h, ~left=currentLeft);
                switch (Belt.List.getBy(disabledList, l => l == label)) {
                | None =>
                  Data(label, h == "NC" ? optionsNhuCau : optionsTinhTrang)
                | Some(_) => Disabled
                };
              });
            let toConcat =
              !reverse ? [|main, data, sub|] : [|sub, data, main|];
            let newRow = Belt.List.concatMany(toConcat);
            [newRow, ...acc];
          },
        )
      ->Belt.List.reverse;
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

module Tinh_trang_ham_duoi: TableRender = {
  let heading = ["X", "G", "T", "N", "Nhai", "TT", "NC"];

  let colsMain = [
    "37",
    "36",
    "35",
    "34",
    "33",
    "32",
    "31",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
  ];

  let colsSub = [
    Empty,
    Empty,
    Static("75"),
    Static("74"),
    Static("73"),
    Static("72"),
    Static("71"),
    Static("81"),
    Static("82"),
    Static("83"),
    Static("84"),
    Static("85"),
    Empty,
    Empty,
  ];

  let disabledList = [
    makeLabel(~heading="Nhai", ~left="33"),
    makeLabel(~heading="Nhai", ~left="32"),
    makeLabel(~heading="Nhai", ~left="31"),
    makeLabel(~heading="Nhai", ~left="41"),
    makeLabel(~heading="Nhai", ~left="42"),
    makeLabel(~heading="Nhai", ~left="43"),
  ];

  let table =
    makeTable(
      ~colsMain,
      ~colsSub,
      ~heading,
      ~reverse=true,
      ~disabledList,
      (),
    );
};
