// Generated by BUCKLESCRIPT VERSION 5.0.4, PLEASE EDIT WITH CARE
'use strict';

var Belt_Id = require("bs-platform/lib/js/belt_Id.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Belt_Map = require("bs-platform/lib/js/belt_Map.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var DataJs = require("./data.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

var rawData = DataJs;

var length = rawData.length;

var keys = Object.keys(Caml_array.caml_array_get(rawData, 0));

function findMatchingPair(k) {
  var commonPart = k.slice(1);
  return Caml_option.undefined_to_opt(keys.find((function (v) {
                    if (v.slice(1) === commonPart) {
                      return v !== k;
                    } else {
                      return false;
                    }
                  })));
}

var cmp = Caml_obj.caml_compare;

var Cmp = Belt_Id.MakeComparable(/* module */[/* cmp */cmp]);

function incrValue(map, first, second) {
  return Belt_Map.update(map, /* tuple */[
              first,
              second
            ], (function (param) {
                if (param !== undefined) {
                  return param + 1 | 0;
                } else {
                  return 1;
                }
              }));
}

function crossTabs(eKey) {
  var vKey = findMatchingPair(eKey);
  if (vKey !== undefined) {
    var vKey$1 = vKey;
    var emptyMap = Belt_Map.make(Cmp);
    return Belt_Array.reduce(rawData, emptyMap, (function (map, row) {
                  var match = Js_dict.get(row, eKey);
                  var match$1 = Js_dict.get(row, vKey$1);
                  if (match !== undefined && match$1 !== undefined) {
                    return incrValue(map, match, match$1);
                  } else {
                    return Pervasives.failwith("No eValue/vValue");
                  }
                }));
  } else {
    return Pervasives.failwith("no matching key");
  }
}

var list_crossTabsR = Belt_Array.map(/* array */[
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
      "81"
    ], (function (r) {
        return "ER" + r;
      }));

var result_crossTabsR = Belt_Array.forEach(Belt_Array.map(list_crossTabsR, crossTabs), (function (map) {
        console.log(Belt_Map.toArray(map));
        return /* () */0;
      }));

exports.rawData = rawData;
exports.length = length;
exports.keys = keys;
exports.findMatchingPair = findMatchingPair;
exports.Cmp = Cmp;
exports.incrValue = incrValue;
exports.crossTabs = crossTabs;
exports.list_crossTabsR = list_crossTabsR;
exports.result_crossTabsR = result_crossTabsR;
/* rawData Not a pure module */
