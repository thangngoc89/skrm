module Db = {
  type t;
  [@bs.module "idb"]
  external openDb: (string, int) => Js.Promise.t(t) = "openDb";
  [@bs.module "idb"]
  external deleteDb: string => Js.Promise.t(unit) = "deleteDb";
};

module ObjStore = {
  type t;
  [@bs.send] external put: (t, string, 'a) => unit = "put";
};

module Transaction = {
  type t;
  [@bs.deriving jsConverter]
  type transaction = [ | `readwrite | `readwriteflush | `complete];

  [@bs.send] external make: (Db.t, string, string) => t = "transaction";

  let make = (db, objStoreName, transTyp) =>
    make(db, objStoreName, transTyp->transactionToJs);

  [@bs.send] external objectStore: (t, string) => ObjStore.t = "objectStore";
  [@bs.send] external complete: t => Js.Promise.t(unit) = "complete";
};
