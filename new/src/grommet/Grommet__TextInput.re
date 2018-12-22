[@genType.import "./GTextInput"] [@bs.module "./Grommet__TextInput.gen"]
external make:
  (~name: string=?, ~id: string=?, ~value: string=?, ~placeholder: string=?) =>
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
