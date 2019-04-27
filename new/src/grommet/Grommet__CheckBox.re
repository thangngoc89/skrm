[@genType.import "grommet"] [@genType.as "CheckBox"] [@react.component]
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
    ~children: React.element
  ) =>
  React.element =
  "";

let make = make;
