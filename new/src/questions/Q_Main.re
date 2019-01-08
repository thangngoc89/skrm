type initialValue;

[@genType.import "./Render_question_form"] [@bs.module "./Q_Main.gen"]
external make:
  (~onSave: Js.Json.t => unit, ~onSaveDraft: Js.Json.t => unit, 'a) =>
  ReasonReact.component(
    ReasonReact.stateless,
    ReasonReact.noRetainedProps,
    ReasonReact.actionless,
  ) =
  "";

let make = make;
