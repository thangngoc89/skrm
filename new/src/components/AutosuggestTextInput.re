[@react.component]
[@genType.import "./AutosuggestTextInput.js"]
[@genType.as "default"]
external make:
  (
    ~name: string=?,
    ~value: string=?,
    ~onChange: ReactEvent.Form.t => unit=?,
    ~onBlur: ReactEvent.Focus.t => unit=?,
    ~id: string=?
  ) =>
  [@genType.as "type"] ((~type_: string=?, 'a) => React.element) =
  "";

let make = make;
