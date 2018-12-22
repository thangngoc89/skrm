[@genType.import "./GBox"] [@bs.module "./Grommet__Box.gen"]
external make:
  (~pad: string=?, 'a) =>
  ReasonReact.component(
    ReasonReact.stateless,
    ReasonReact.noRetainedProps,
    ReasonReact.actionless,
  ) =
  "";

let make = make;
