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

function getData(prim) {
  return DataJs(prim);
}

function make(fileName) {
  var rawData = DataJs(fileName);
  var keys = Object.keys(Caml_array.caml_array_get(rawData, 0));
  var findMatchingPair = function (k) {
    var commonPart = k.slice(1);
    return Caml_option.undefined_to_opt(keys.find((function (v) {
                      if (v.slice(1) === commonPart) {
                        return v !== k;
                      } else {
                        return false;
                      }
                    })));
  };
  var cmp = Caml_obj.caml_compare;
  var Cmp = Belt_Id.MakeComparable(/* module */[/* cmp */cmp]);
  var incrValue = function (map, $staropt$star, key) {
    var v = $staropt$star !== undefined ? $staropt$star : 1;
    return Belt_Map.update(map, key, (function (param) {
                  if (param !== undefined) {
                    return param + v | 0;
                  } else {
                    return v;
                  }
                }));
  };
  var crossTabs = function (eKey) {
    var vKey = findMatchingPair(eKey);
    if (vKey !== undefined) {
      var vKey$1 = vKey;
      var emptyMap = Belt_Map.make(Cmp);
      return Belt_Array.reduce(rawData, emptyMap, (function (map, row) {
                    var match = Js_dict.get(row, eKey);
                    var match$1 = Js_dict.get(row, vKey$1);
                    if (match !== undefined && match$1 !== undefined) {
                      return incrValue(map, undefined, /* tuple */[
                                  match,
                                  match$1
                                ]);
                    } else {
                      return Pervasives.failwith("No eValue/vValue");
                    }
                  }));
    } else {
      return Pervasives.failwith("no matching key");
    }
  };
  return (function (list) {
      console.log(Belt_Map.toArray(Belt_Array.reduce(Belt_Array.map(list, crossTabs), Belt_Map.make(Cmp), (function (masterMap, currentMap) {
                      return Belt_Map.reduce(currentMap, masterMap, (function (masterMap, key, value) {
                                    return incrValue(masterMap, value, key);
                                  }));
                    }))));
      return /* () */0;
    });
}

exports.getData = getData;
exports.make = make;
/* ./data.js Not a pure module */
