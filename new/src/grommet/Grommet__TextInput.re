[@genType.import "./GTextInput"] [@bs.module "./Grommet__TextInput.gen"]
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
    ~onSelect: ReactEvent.Form.t => unit=?,
    ~onSuggestionsClose: ReactEvent.Form.t => unit=?,
    ~onSuggestionsOpen: ReactEvent.Form.t => unit=?,
    ~placeholder: string=?,
    ~plain: bool=?,
    ~size: string=?,
    ~suggestions: string=?,
    ~value: string=?
  ) =>
  [@genType.as "type"] (
    (~typ: string=?, 'a) =>
    ReasonReact.component(
      ReasonReact.stateless,
      ReasonReact.noRetainedProps,
      ReasonReact.actionless,
    )
  ) =
  "";

let make = make;
