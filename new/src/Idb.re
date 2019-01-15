module ObjStore = {
  type t;
  [@bs.send] external put: (t, 'a, string) => unit = "put";
};

module UpgradeDb = {
  [@bs.deriving abstract]
  type t = {
    oldVersion: int,
    createObjectStore: string => ObjStore.t,
  };
};

module Db = {
  type t;
  type cb = UpgradeDb.t => unit;

  [@bs.module "idb"]
  external openDb: (string, int, cb) => Js.Promise.t(t) = "openDb";
  [@bs.module "idb"]
  external deleteDb: string => Js.Promise.t(unit) = "deleteDb";
};

module Transaction = {
  [@bs.deriving abstract]
  type t = {complete: Js.Promise.t(unit)};

  [@bs.deriving jsConverter]
  type transaction = [ | `readwrite | `readwriteflush | `complete];

  [@bs.send] external make: (Db.t, string, string) => t = "transaction";

  let make = (db, objStoreName, transTyp) =>
    make(db, objStoreName, transTyp->transactionToJs);

  [@bs.send] external objectStore: (t, string) => ObjStore.t = "objectStore";
};
