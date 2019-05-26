[@bs.module] external getData: string => array(Js.Dict.t(int)) = "./data.js";

let make = fileName => {
  let rawData = getData(fileName);
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
          | (Some(eValue), Some(vValue)) =>
            map->incrValue((eValue, vValue))
          | _ => failwith("No eValue/vValue")
          }
        );
      map;
    };
  };

  let sumCrossTabs = list =>
    list
    ->Belt.Array.map(crossTabs)
    ->Belt.Array.reduce(
        Belt.Map.make(~id=(module Cmp)), (masterMap, currentMap) =>
        currentMap->Belt.Map.reduce(masterMap, (masterMap, key, value) =>
          masterMap->incrValue(~v=value, key)
        )
      )
    ->Belt.Map.toArray
    ->Js.log;
  sumCrossTabs;
};
