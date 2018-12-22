[@genType.import "./GFormField"] [@bs.module "./Grommet__FormField.gen"]
external make:
  (
    ~error: ReasonReact.reactElement=?,
    ~help: ReasonReact.reactElement=?,
    ~htmlFor: string=?,
    ~label: ReasonReact.reactElement=?,
    'a
  ) =>
  ReasonReact.component(
    ReasonReact.stateless,
    ReasonReact.noRetainedProps,
    ReasonReact.actionless,
  ) =
  "";

let make = make;
