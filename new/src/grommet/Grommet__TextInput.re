[@genType.import "grommet"] [@genType.as "TextInput"] [@react.component]
external make:
  (
    ~dropAlign: Js.t('a)=?,
    ~dropHeight: string=?,
    ~dropTarget: ReasonReact.reactRef=?,
    ~focusIndicator: bool=?,
    ~id: string=?,
    ~messages: Js.t('messages)=?,
    ~name: string=?,
    ~onChange: ReactEvent.Form.t => unit=?,
    ~onBlur: ReactEvent.Focus.t => unit =?,
    ~onSelect: ReactEvent.Form.t => unit=?,
    ~onSuggestionsClose: ReactEvent.Form.t => unit=?,
    ~onSuggestionsOpen: ReactEvent.Form.t => unit=?,
    ~placeholder: string=?,
    ~plain: bool=?,
    ~size: string=?,
    ~suggestions: string=?,
    ~value: string=?
  ) =>
  [@genType.as "type"] ((~type_: string=?, 'a) => React.element) =
  "";

let make = make;
