let component = ReasonReact.statelessComponent(__MODULE__);

let make = _children => {
  ...component,
  render: _self => {
    let%Epitath db = children =>
      <WithDatabase
        name=Config.appName
        version=Config.appDbVer
        upgradeDb={upgradeDb => {
          Js.log(upgradeDb->Idb.UpgradeDb.oldVersionGet);
          switch (upgradeDb->Idb.UpgradeDb.oldVersionGet) {
          | 0 =>
            let createObjectStore =
              upgradeDb->Idb.UpgradeDb.createObjectStoreGet;
            createObjectStore("record")->ignore;
          | _ => ()
          };
        }}>
        ...children
      </WithDatabase>;
    <App_New db />;
  },
};
