open PDT_Types.Table;
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
    (~colsMain, ~colsSub, ~reverse=false, ~disabledList=[], ~heading, ()) => {
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
            colsSub->Belt.List.get(index)->Belt.Option.getWithDefault(Empty),
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
  [tableHeading, ...rows];
};

module Tinh_trang_ham_tren = {
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

  [@genType]
  let table = makeTable(~colsMain, ~colsSub, ~heading, ~disabledList, ());
};

module Tinh_trang_ham_duoi = {
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

  [@genType]
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

module OHIS = {
  let options = ["0", "1", "2", "3", "X"];
  [@genType]
  let table = [
    [Static("16N"), Static("11N"), Static("26N")],
    [
      Data("ohis16N", options),
      Data("ohis11N", options),
      Data("ohis26N", options),
    ],
    [
      Data("ohis46T", options),
      Data("ohis31N", options),
      Data("ohis36N", options),
    ],
    [Static("46(T)"), Static("31N"), Static("36(T)")],
  ];
};

module MocChenChuc = {
  let options = ["0", "1"];
  [@genType]
  let table = [
    [
      Data("mcc16", options),
      Data("mcc11", options),
      Data("mcc26", options),
    ],
    [
      Data("mcc46", options),
      Data("mcc31", options),
      Data("mcc36", options),
    ],
  ];
};

module MIH = {
  let options = ["0", "1", "2", "3", "4", "5"];
  [@genType]
  let table = [
    [
      Static("16"),
      Static("12"),
      Static("11"),
      Static("21"),
      Static("22"),
      Static("26"),
    ],
    [
      Data("mih16", options),
      Data("mih12", options),
      Data("mih11", options),
      Data("mih21", options),
      Data("mih22", options),
      Data("mih26", options),
    ],
    [
      Data("mih46", options),
      Data("mih42", options),
      Data("mih41", options),
      Data("mih31", options),
      Data("mih32", options),
      Data("mih36", options),
    ],
    [
      Static("46"),
      Static("42"),
      Static("41"),
      Static("31"),
      Static("32"),
      Static("36"),
    ],
  ];
};

module CPI = {
  let options = ["0", "1", "9", "X"];
  [@genType]
  let table = [
    [
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
    ],
    [
      Static("17"),
      Static("16"),
      Static("15"),
      Static("14"),
      Static("13"),
      Static("12"),
      Static("11"),
      Static("21"),
      Static("22"),
      Static("23"),
      Static("24"),
      Static("25"),
      Static("26"),
      Static("27"),
    ],
    [
      Data("cpi17", options),
      Data("cpi16", options),
      Data("cpi15", options),
      Data("cpi14", options),
      Data("cpi13", options),
      Data("cpi12", options),
      Data("cpi11", options),
      Data("cpi21", options),
      Data("cpi22", options),
      Data("cpi23", options),
      Data("cpi24", options),
      Data("cpi25", options),
      Data("cpi26", options),
      Data("cpi27", options),
    ],
    [
      Data("cpi47", options),
      Data("cpi46", options),
      Data("cpi45", options),
      Data("cpi44", options),
      Data("cpi43", options),
      Data("cpi42", options),
      Data("cpi41", options),
      Data("cpi31", options),
      Data("cpi32", options),
      Data("cpi33", options),
      Data("cpi34", options),
      Data("cpi35", options),
      Data("cpi36", options),
      Data("cpi37", options),
    ],
    [
      Static("47"),
      Static("46"),
      Static("45"),
      Static("44"),
      Static("43"),
      Static("42"),
      Static("41"),
      Static("31"),
      Static("32"),
      Static("33"),
      Static("34"),
      Static("35"),
      Static("36"),
      Static("37"),
    ],
    [
      Empty,
      Empty,
      Static("85"),
      Static("84"),
      Static("83"),
      Static("82"),
      Static("81"),
      Static("71"),
      Static("72"),
      Static("73"),
      Static("74"),
      Static("75"),
      Empty,
      Empty,
    ],
  ];
};
