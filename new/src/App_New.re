let s: Js.t('a) = [%raw {|require("./App_New.module.css")|}];
open React;

module Pill = {
  type status = [ | `success | `warning | `active | `error | `inactive];

  let statusToColor =
    fun
    | `success => "status-ok"
    | `warning => "status-warning"
    | `active => "brand"
    | `error => "status-error"
    | `inactive => "dark-4";
  let component = ReasonReact.statelessComponent("Pill");

  let make = (~label, ~status=`inactive, ~onClick, _children) => {
    ...component,
    render: _self => {
      let color = statusToColor(status);
      let textColor = "text-" ++ color;
      let bgColor = "bg-" ++ color;
      <button
        className={Cn.make(["flex flex-col mr-2 lg:mr-4 text-xs", textColor])}
        onClick>
        <div className="mb-1"> label->str </div>
        <div className={Cn.make(["w-full h-1 rounded", bgColor])} />
      </button>;
    },
  };
};

type tabName =
  | PhieuDieuTra
  | BangCauHoi
  | ChildOIDP;

type tabData =
  | NotSaved
  | Draft(Js.Json.t)
  | Saved(Js.Json.t);

type tab = {
  label: string,
  name: tabName,
  data: tabData,
};
type state = {
  activeTab: tabName,
  tabs: list(tab),
};

type action =
  | ChangeTab(tabName)
  | OnSave(tabName, Js.Json.t)
  | OnSaveDraft(tabName, Js.Json.t);

let id = "random_id_generator";

let component = ReasonReact.reducerComponent("App_New");

let make = (~db, _children) => {
  ...component,
  initialState: () => {
    activeTab: PhieuDieuTra,
    tabs: [
      {name: PhieuDieuTra, label: {j|Phiếu điều tra|j}, data: NotSaved},
      {name: BangCauHoi, label: {j|Bảng câu hỏi|j}, data: NotSaved},
      {name: ChildOIDP, label: {j|Child-OIDP|j}, data: NotSaved},
    ],
  },
  reducer: (action, state) => {
    switch (action) {
    | ChangeTab(activeTab) => ReasonReact.Update({...state, activeTab})
    | OnSave(tabName, data) =>
      let tx = db->Idb.Transaction.make(Config.appName, `readwrite);
      tx->Idb.Transaction.objectStore("record")->Idb.ObjStore.put(id, data);

      ReasonReact.Update({
        ...state,
        tabs:
          state.tabs
          ->Belt.List.map(tab =>
              tab.name == tabName ? {...tab, data: Saved(data)} : tab
            ),
      });
    | OnSaveDraft(tabName, data) =>
      let tx = db->Idb.Transaction.make(Config.appName, `readwrite);
      tx->Idb.Transaction.objectStore("record")->Idb.ObjStore.put(id, data);

      ReasonReact.Update({
        ...state,
        tabs:
          state.tabs
          ->Belt.List.map(tab =>
              tab.name == tabName ? {...tab, data: Draft(data)} : tab
            ),
      });
    };
  },
  render: ({state, send}) => {
    Js.log(db);
    <div className="mb-12">
      {let onSave = data => send(OnSave(state.activeTab, data))
       let onSaveDraft = data => send(OnSaveDraft(state.activeTab, data))
       switch (state.activeTab) {
       | PhieuDieuTra =>
         <PDT_Main
           initialValue={PDT_Main.emptyInitialValues()}
           onSave
           onSaveDraft
         />
       | BangCauHoi => <Q_Main onSave onSaveDraft />
       | ChildOIDP => "Unhandled"->str
       }}
      <footer
        className={Cn.make([
          s##footer,
          "flex items-center justify-between bg-light-1 px-3 py-2 border-t border-dark-4",
        ])}>
        <nav className="flex">
          {state.tabs
           ->Belt.List.map(tab =>
               <Pill
                 key={tab.label}
                 onClick={_ => send(ChangeTab(tab.name))}
                 status={
                          if (state.activeTab == tab.name) {
                            `active;
                          } else {
                            switch (tab.data) {
                            | NotSaved => `inactive
                            | Draft(_) => `warning
                            | Saved(_) => `success
                            };
                          }
                        }
                 label={tab.label}
               />
             )
           ->reactList}
        </nav>
        <main id="footerAction" />
      </footer>
    </div>;
  },
};
