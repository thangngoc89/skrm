[@genType.import "./GMarkdown"] [@bs.module "./Grommet__Markdown.gen"]
external make:
  'a =>
  ReasonReact.component(
    ReasonReact.stateless,
    ReasonReact.noRetainedProps,
    ReasonReact.actionless,
  ) =
  "";

let make = make;
