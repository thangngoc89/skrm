let s: Js.t('a) = [%raw {|require("./App_New.module.css")|}];
open React;

module Pill = {
  type status = [ | `success | `active | `inactive | `error];

  let statusToColor =
    fun
    | `success => "brand"
    | `active => "brand"
    | `inactive => "dark-4"
    | `error => "status-error";
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
        <div className={Cn.make(["h-1 rounded", bgColor])} />
      </button>;
    },
  };
};

type tab =
  | PhieuDieuTra
  | BangCauHoi
  | ChildOIDP;

type validationState = [ | `success | `inactive | `error];

type tabValidationState = {
  pdt: validationState,
  bch: validationState,
  oidp: validationState,
};

type state = {
  tab,
  tabValidationState,
};

type action =
  | ChangeTab(tab);

let component = ReasonReact.reducerComponent("App_New");

let make = _children => {
  ...component,
  initialState: () => {
    tab: PhieuDieuTra,
    tabValidationState: {
      pdt: `inactive,
      bch: `inactive,
      oidp: `inactive,
    },
  },
  reducer: (action, state) => {
    switch (action) {
    | ChangeTab(tab) => ReasonReact.Update({...state, tab})
    };
  },
  render: ({state, send}) => {
    <div className="mb-12">
      {switch (state.tab) {
       | PhieuDieuTra =>
         <PDT_Main initialValue={PDT_Main.emptyInitialValues()} />
       | BangCauHoi => <Q_Main />
       | ChildOIDP => "Unhandled"->str
       }}
      <footer
        className={Cn.make([
          s##footer,
          "flex align-center bg-light-1 p-3 border-t border-dark-4",
        ])}>
        <Pill
          onClick={_ => send(ChangeTab(PhieuDieuTra))}
          status={
            switch (state.tab) {
            | PhieuDieuTra => `active
            | _ =>
              switch (state.tabValidationState.pdt) {
              | `inactive => `inactive
              | `success => `success
              | `error => `error
              }
            }
          }
          label={j|Phiếu điều tra|j}
        />
        <Pill
          onClick={_ => send(ChangeTab(BangCauHoi))}
          status={
            switch (state.tab) {
            | BangCauHoi => `active
            | _ =>
              switch (state.tabValidationState.pdt) {
              | `inactive => `inactive
              | `success => `success
              | `error => `error
              }
            }
          }
          label={j|Bảng câu hỏi|j}
        />
        <Pill
          onClick={_ => send(ChangeTab(ChildOIDP))}
          status={
            switch (state.tab) {
            | ChildOIDP => `active
            | _ =>
              switch (state.tabValidationState.pdt) {
              | `inactive => `inactive
              | `success => `success
              | `error => `error
              }
            }
          }
          label={j|Child-OIDP|j}
        />
      </footer>
    </div>;
  },
};
