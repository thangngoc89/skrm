type initialValue;

[@genType.import "./Render_question_form"] [@bs.module "./Q_Main.gen"]
external make:
  'a =>
  ReasonReact.component(
    ReasonReact.stateless,
    ReasonReact.noRetainedProps,
    ReasonReact.actionless,
  ) =
  "";

let make = make;
