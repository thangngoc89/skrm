Js.log("=====================");
Js.log("Mau giao");
Js.log("=====================");

let reportMaugiao = Analyze.make("./spss-mau-giao.xlsx");

let list_crossTabsR =
  [|
    "55",
    "54",
    "53",
    "52",
    "51",
    "65",
    "64",
    "63",
    "62",
    "61",
    "75",
    "74",
    "73",
    "72",
    "71",
    "85",
    "84",
    "83",
    "82",
    "81",
  |]
  ->Belt.Array.map(r => "ER" ++ r);

Js.log("Theo tung rang");
reportMaugiao(list_crossTabsR);

let list_crossTabsMR =
  [|
    "55Ng", "55T", "55G", "55X", "55Nhai", 
    "54Ng", "54T", "54G", "54X", "54Nhai",
    "53Ng", "53T", "53G", "53X",
    "52Ng", "52T", "52G", "52X",
    "51Ng", "51T", "51G", "51X",
    "65Ng", "65T", "65G", "65X", "65Nhai", 
    "64Ng", "64T", "64G", "64X", "64Nhai",
    "63Ng", "63T", "63G", "63X",
    "62Ng", "62T", "62G", "62X",
    "61Ng", "61T", "61G", "61X",
    "75Ng", "75T", "75G", "75X", "75Nhai", 
    "74Ng", "74T", "74G", "74X", "74Nhai",
    "73Ng", "73T", "73G", "73X",
    "72Ng", "72T", "72G", "72X",
    "71Ng", "71T", "71G", "71X",
    "85Ng", "85T", "85G", "85X", "85Nhai", 
    "84Ng", "84T", "84G", "84X", "84Nhai",
    "83Ng", "83T", "83G", "83X",
    "82Ng", "82T", "82G", "82X",
    "81Ng", "81T", "81G", "81X",
  |]
  ->Belt.Array.map(r => "ER" ++ r);

Js.log("Theo mat rang");
reportMaugiao(list_crossTabsMR);

Js.log("=====================");
Js.log("THCS");
Js.log("=====================");

let reportMaugiao = Analyze.make("/media/Data/sync/drive/research/du lieu/spss-thcs.xlsx");

let list_crossTabsR =
  [|
    "17",
    "16",
    "15",
    "14",
    "13",
    "12",
    "11",
    "27",
    "26",
    "25",
    "24",
    "23",
    "22",
    "21",
    "37",
    "36",
    "35",
    "34",
    "33",
    "32",
    "31",
    "47",
    "46",
    "45",
    "44",
    "43",
    "42",
    "41",
  |]
  ->Belt.Array.map(r => "ER" ++ r);

Js.log("Theo tung rang");
reportMaugiao(list_crossTabsR);

let list_crossTabsMR =
  [|
    "17Ng", "17T", "17G", "17X", "17Nhai", 
    "16Ng", "16T", "16G", "16X", "16Nhai", 
    "15Ng", "15T", "15G", "15X", "15Nhai", 
    "14Ng", "14T", "14G", "14X", "14Nhai", 
    "13Ng", "13T", "13G", "13X",
    "12Ng", "12T", "12G", "12X",
    "11Ng", "11T", "11G", "11X",
    "27Ng", "27T", "27G", "27X", "27Nhai", 
    "26Ng", "26T", "26G", "26X", "26Nhai", 
    "25Ng", "25T", "25G", "25X", "25Nhai", 
    "24Ng", "24T", "24G", "24X", "24Nhai", 
    "23Ng", "23T", "23G", "23X",
    "22Ng", "22T", "22G", "22X",
    "21Ng", "21T", "21G", "21X",
    "37Ng", "37T", "37G", "37X", "37Nhai", 
    "36Ng", "36T", "36G", "36X", "36Nhai", 
    "35Ng", "35T", "35G", "35X", "35Nhai", 
    "34Ng", "34T", "34G", "34X", "34Nhai", 
    "33Ng", "33T", "33G", "33X",
    "32Ng", "32T", "32G", "32X",
    "31Ng", "31T", "31G", "31X",
    "47Ng", "47T", "47G", "47X", "47Nhai", 
    "46Ng", "46T", "46G", "46X", "46Nhai", 
    "45Ng", "45T", "45G", "45X", "45Nhai", 
    "44Ng", "44T", "44G", "44X", "44Nhai", 
    "43Ng", "43T", "43G", "43X",
    "42Ng", "42T", "42G", "42X",
    "41Ng", "41T", "41G", "41X",
  |]
  ->Belt.Array.map(r => "ER" ++ r);

Js.log("Theo mat rang");
reportMaugiao(list_crossTabsMR);
