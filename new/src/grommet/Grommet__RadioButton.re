[@genType.import "./GRadioButton"] [@bs.module "./Grommet__RadioButton.gen"]
external make:
  (
    ~checked: bool=?,
    ~disabled: bool=?,
    ~id: string=?,
    ~label: ReasonReact.reactElement=?,
    ~name: string=?,
    ~value: string,
    ~onChange: ReactEvent.Form.t => unit=?,
    'a
  ) =>
  ReasonReact.component(
    ReasonReact.stateless,
    ReasonReact.noRetainedProps,
    ReasonReact.actionless,
  ) =
  "";

let make = make;
