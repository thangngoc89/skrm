[@genType.import "grommet"]
[@genType.as "CheckBox"]
[@bs.module "./Grommet__CheckBox.gen"]
external make:
  (
    ~checked: bool,
    ~disabled: bool=?,
    ~id: string=?,
    ~indeterminate: bool=?,
    ~label: ReasonReact.reactElement=?,
    ~name: string=?,
    ~onChange: ReactEvent.Form.t => unit=?,
    ~reverse: bool=?,
    ~toggle: bool=?,
    'a
  ) =>
  ReasonReact.component(
    ReasonReact.stateless,
    ReasonReact.noRetainedProps,
    ReasonReact.actionless,
  ) =
  "";

let make = make;
