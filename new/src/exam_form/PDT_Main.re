type initialValue;

[@bs.module "./PhieuDieuTra_Main"]
external emptyInitialValues: unit => initialValue = "emptyInitialValues";
let emptyInitialValues = emptyInitialValues;

[@genType.import "./PhieuDieuTra_Main"] [@bs.module "./PDT_Main.gen"]
external make:
  (
    ~initialValue: initialValue,
    ~onSave: Js.Json.t => unit,
    ~onSaveDraft: Js.Json.t => unit,
    'a
  ) =>
  ReasonReact.component(
    ReasonReact.stateless,
    ReasonReact.noRetainedProps,
    ReasonReact.actionless,
  ) =
  "";

let make = make;
