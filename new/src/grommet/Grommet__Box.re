[@genType.import "./GBox"] [@bs.module "./Grommet__Box.gen"]
external make:
  (
    ~a11yTitle: string=?,
    ~align: string=?,
    ~alignContent: string=?,
    ~alignSelf: string=?,
    ~animation: string=?
  ) =>
  [@genType.as "as"] (
    (
      ~as_: string=?,
      ~background: string=?,
      ~basis: string=?,
      ~border: string=?,
      ~direction: string=?,
      ~elevation: string=?,
      ~fill: string=?,
      ~flex: string=?,
      ~gap: string=?,
      ~gridArea: string=?,
      ~height: string=?,
      ~justify: string=?,
      ~margin: string=?,
      ~overflow: string=?,
      ~pad: string=?,
      ~responsive: bool=?,
      ~round: string=?,
      ~width: string=?,
      ~wrap: bool=?,
      'a
    ) =>
    ReasonReact.component(
      ReasonReact.stateless,
      ReasonReact.noRetainedProps,
      ReasonReact.actionless,
    )
  ) =
  "";

let make = make;
