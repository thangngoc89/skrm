let s: Js.t('a) = [%raw {|require("./App_New.module.css")|}];
open React;

module Pill = {
  type status =
    | Success
    | Active
    | Inactive
    | Error;

  let statusToColor =
    fun
    | Success => "status-ok"
    | Active => "brand"
    | Inactive => "dark-4"
    | Error => "status-error";
  let component = ReasonReact.statelessComponent("Pill");

  let make = (~label, ~status=Inactive, ~onClick, _children) => {
    ...component,
    render: _self => {
      let color = statusToColor(status);
      let textColor = "text-" ++ color;
      let bgColor = "bg-" ++ color;
      <button
        className={Cn.make(["flex flex-col mr-2 lg:mr-4 text-xs", textColor])}
        onClick>
        <div className="mb-1"> label->str </div>
        <div className={Cn.make(["h-1 rounded", bgColor])} />
      </button>;
    },
  };
};

type tab =
  | PhieuDieuTra
  | BangCauHoi
  | ChildOIDP;

type tabStatus = {
  pdt: Pill.status,
  bch: Pill.status,
  oidp: Pill.status,
};

type state = {
  tab,
  tabStatus,
};

type action =
  | ChangeTab(tab);

let component = ReasonReact.reducerComponent("App_New");

let make = _children => {
  ...component,
  initialState: () => {
    tab: PhieuDieuTra,
    tabStatus: {
      pdt: Active,
      bch: Inactive,
      oidp: Inactive,
    },
  },
  reducer: (action, state) => {
    switch (action) {
    | ChangeTab(tab) => ReasonReact.Update({...state, tab})
    };
  },
  render: ({state, send}) => {
    <div>
      {switch (state.tab) {
       | PhieuDieuTra =>
         <PDT_Main initialValue={PDT_Main.emptyInitialValues()} />
       | BangCauHoi
       | ChildOIDP => "Unhandled"->str
       }}
      <footer
        className={Cn.make([
          s##footer,
          "flex align-center bg-light-1 p-3 border-t border-dark-4",
        ])}>
        <Pill
          onClick={_ => send(ChangeTab(PhieuDieuTra))}
          status={state.tabStatus.pdt}
          label={j|Phiếu điều tra|j}
        />
        <Pill
          onClick={_ => send(ChangeTab(BangCauHoi))}
          status={state.tabStatus.bch}
          label={j|Bảng câu hỏi|j}
        />
        <Pill
          onClick={_ => send(ChangeTab(ChildOIDP))}
          status={state.tabStatus.oidp}
          label={j|Child-OIDP|j}
        />
      </footer>
    </div>;
  },
};
