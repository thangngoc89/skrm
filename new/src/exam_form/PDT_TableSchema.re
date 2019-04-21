open PDT_Types.Table;

module YupSchema: {let make: table => Yup.schema;} = {
  let getAllDataCell: table => array((cellLabel, array(string))) =
    table => {
      let reduceRow = row => {
        row->Belt.List.reduce([||], acc =>
          fun
          | Data(cellLabel, options) =>
            Belt.Array.concat([|(cellLabel, options)|], acc)
          | _ => acc
        );
      };
      table->Belt.List.reduce([||], (acc, row) =>
        Belt.Array.concat(reduceRow(row), acc)
      );
    };

  let make = table => {
    let allDataCell = table->getAllDataCell;
    let buildObj = Js.Dict.empty();
    open Yup;

    allDataCell->Belt.Array.forEach(((key, options)) =>
      buildObj->Js.Dict.set(key, string()->oneOf(options)->required)
    );

    dict(buildObj)->required;
  };
};

module TinhTrangNhuCau = {
  let optionsTinhTrang = [|
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
  |];

  let optionsNhuCau = [|"0", "1", "2", "3", "4", "5", "6", "F", "P"|];

  let makeLabel = (~heading, ~left) => {
    {j|$(heading)_$(left)|j};
  };
  let generatePrimaryToothName =
    fun
    | "15" => Some("55")
    | "14" => Some("54")
    | "13" => Some("53")
    | "12" => Some("52")
    | "11" => Some("51")
    | "25" => Some("65")
    | "24" => Some("64")
    | "23" => Some("63")
    | "22" => Some("62")
    | "21" => Some("61")
    | "35" => Some("75")
    | "34" => Some("74")
    | "33" => Some("73")
    | "32" => Some("72")
    | "31" => Some("71")
    | "45" => Some("85")
    | "44" => Some("84")
    | "43" => Some("83")
    | "42" => Some("82")
    | "41" => Some("81")
    | _ => None;
  let teethWithDisabledSurfaces = [|
    "13",
    "12",
    "11",
    "23",
    "22",
    "21",
    "33",
    "32",
    "31",
    "43",
    "42",
    "41",
  |];

  let disabledSurface = "Nhai";
  let isDisabledTooth = tooth =>
    teethWithDisabledSurfaces->Js.Array.indexOf(tooth, _) !== (-1);

  let make = (~teeth, ~surfaces as heading, ~reverse=false, ()) => {
    let tableHeading =
      Belt.List.concatMany([|
        [Empty],
        heading->Belt.List.map(h => Static(h)),
        [Empty],
      |]);
    let rows =
      teeth
      ->Belt.List.reduce(
          [],
          (acc, currentTooth) => {
            let main = [Static(currentTooth)];
            let sub =
              switch (generatePrimaryToothName(currentTooth)) {
              | None => Empty
              | Some(tooth) => Static(tooth)
              };
            let data =
              heading->Belt.List.map(surface => {
                let label = makeLabel(~heading=surface, ~left=currentTooth);
                switch (surface, isDisabledTooth(currentTooth)) {
                | ("Nhai", true) => Disabled
                | _ =>
                  Data(
                    label,
                    surface == "NC" ? optionsNhuCau : optionsTinhTrang,
                  )
                };
              });
            let toConcat =
              !reverse ? [|main, data, [sub]|] : [|[sub], data, main|];
            let newRow = Belt.List.concatMany(toConcat);
            [newRow, ...acc];
          },
        )
      ->Belt.List.reverse;
    [tableHeading, ...rows];
  };
};

module Tinh_trang_ham_tren = {
  let surfaces = ["NC", "TT", "Nhai", "N", "T", "G", "X"];
  let teeth = [
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

  [@genType]
  let table = TinhTrangNhuCau.make(~teeth, ~surfaces, ());
  [@genType]
  let schema = YupSchema.make(table);
};

module Tinh_trang_ham_tren_maugiao = {
  let surfaces = ["NC", "TT", "Nhai", "N", "T", "G", "X"];
  let teeth = [
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
  ];

  [@genType]
  let table = TinhTrangNhuCau.make(~teeth, ~surfaces, ());
  [@genType]
  let schema = YupSchema.make(table);
};

module Tinh_trang_ham_duoi = {
  let surfaces = ["X", "G", "T", "N", "Nhai", "TT", "NC"];
  let teeth = [
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

  [@genType]
  let table = TinhTrangNhuCau.make(~teeth, ~surfaces, ~reverse=true, ());
  [@genType]
  let schema = YupSchema.make(table);
};
module Tinh_trang_ham_duoi_maugiao = {
  let surfaces = ["X", "G", "T", "N", "Nhai", "TT", "NC"];
  let teeth = [
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
  ];

  [@genType]
  let table = TinhTrangNhuCau.make(~teeth, ~surfaces, ~reverse=true, ());
  [@genType]
  let schema = YupSchema.make(table);
};

module OHIS = {
  let options = [|"0", "1", "2", "3", "X"|];
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
  [@genType]
  let schema = YupSchema.make(table);
};

module OHIS_Maugiao = {
  let options = [|"0", "1", "2", "3", "X"|];
  [@genType]
  let table = [
    [Static("55N"), Static("51N"), Static("65N")],
    [
      Data("ohis1", options),
      Data("ohis2", options),
      Data("ohis3", options),
    ],
    [
      Data("ohis6", options),
      Data("ohis5", options),
      Data("ohis4", options),
    ],
    [Static("85(T)"), Static("71N"), Static("75(T)")],
  ];
  [@genType]
  let schema = YupSchema.make(table);
};

module MocChenChuc = {
  let options = [|"0", "1"|];
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
  [@genType]
  let schema = YupSchema.make(table);
};

module MIH = {
  let options = [|"0", "1", "2", "3", "4", "5"|];
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
  [@genType]
  let schema = YupSchema.make(table);
};

module CPI = {
  let options = [|"0", "1", "9", "X"|];
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
  [@genType]
  let schema = YupSchema.make(table);
};
