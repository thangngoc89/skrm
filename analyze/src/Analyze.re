open Types;
[@bs.module] external rawData: array(Js.Dict.t(int)) = "./data.js";

let length = rawData->Belt.Array.length;
let keys = rawData[0]->Js.Dict.keys;

let findMatchingPair = k => {
  let commonPart = k |> Js.String.sliceToEnd(~from=1);
  let found =
    keys
    |> Js.Array.find(v =>
         Js.String.sliceToEnd(~from=1, v) == commonPart && v != k
       );
  found;
};

module Cmp =
  Belt.Id.MakeComparable({
    type t = (int, int);
    let cmp = Pervasives.compare;
  });

let incrValue = (map, ~v=1, key) => {
  map->Belt.Map.update(
    key,
    fun
    | None => Some(v)
    | Some(a) => Some(a + v),
  );
};

let crossTabs = eKey => {
  let vKey = findMatchingPair(eKey);
  switch (vKey) {
  | None => failwith("no matching key")
  | Some(vKey) =>
    let emptyMap = Belt.Map.make(~id=(module Cmp));
    let map =
      rawData->Belt.Array.reduce(emptyMap, (map, row) =>
        switch (row->Js.Dict.get(eKey), row->Js.Dict.get(vKey)) {
        | (Some(eValue), Some(vValue)) => map->incrValue((eValue, vValue))
        | _ => failwith("No eValue/vValue")
        }
      );
    map;
  };
};

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

let sumCrossTabs = a =>
  a
  ->Belt.Array.map(crossTabs)
  ->Belt.Array.reduce(
      Belt.Map.make(~id=(module Cmp)), (masterMap, currentMap) =>
      currentMap->Belt.Map.reduce(masterMap, (masterMap, key, value) =>
        masterMap->incrValue(~v=value, key)
      )
    )
  ->Belt.Map.toArray
  ->Js.log;

Js.log("Rang");
sumCrossTabs(list_crossTabsR);


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

Js.log("mat rang");
sumCrossTabs(list_crossTabsMR);
