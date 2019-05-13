[@react.component]
[@genType.import "./AutosuggestTextInput.js"]
[@genType.as "default"]
external make:
  (
    ~name: string=?,
    ~value: string=?,
    ~onChange: ReactEvent.Form.t => unit=?,
    ~onBlur: ReactEvent.Focus.t => unit=?,
    ~id: string=?,
    ~_type: string=?
  ) =>
  React.element =
  "";

let make = make;
