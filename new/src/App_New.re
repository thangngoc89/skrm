let s: Js.t('a) = [%raw {|require("./App_New.module.css")|}];
open React;

type tab =
  | PhieuDieuTra
  | BangCauHoi
  | ChildOIDP;

type state = {tab};
type action =
  | ChangeTab(tab);

let component = ReasonReact.reducerComponent("App_New");

let make = _children => {
  ...component,
  initialState: () => {tab: PhieuDieuTra},
  reducer: (action, state) => {
    switch (action) {
    | ChangeTab(tab) => ReasonReact.Update({...state, tab})
    };
  },
  render: ({state}) => {
    <div>
      {switch (state.tab) {
       | PhieuDieuTra =>
         <PDT_Main initialValue={PDT_Main.emptyInitialValues()} />
       | BangCauHoi
       | ChildOIDP => "Unhandled"->str
       }}
      <footer className=s##footer> "Footer bar"->str </footer>
    </div>;
  },
};
