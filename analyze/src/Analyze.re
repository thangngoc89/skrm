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

let incrValue = (map, first, second) => {
  map->Belt.Map.update(
    (first, second),
    fun
    | None => Some(1)
    | Some(a) => Some(a + 1),
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
        | (Some(eValue), Some(vValue)) => map->incrValue(eValue, vValue)
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

let result_crossTabsR =
  list_crossTabsR
  ->Belt.Array.map(crossTabs)
  ->Belt.Array.forEach(map => Js.log(map->Belt.Map.toArray));
