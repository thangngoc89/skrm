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
      ~basis: [
                | `xxsmall
                | `xsmall
                | `small
                | `medium
                | `large
                | `xlarge
                | `full
                | [@genType.as "1/2"] `half
                | [@genType.as "1/3"] `oneThird
                | [@genType.as "2/3"] `twoThird
                | [@genType.as "1/4"] `oneForth
                | [@genType.as "2/4"] `twoForth
                | [@genType.as "3/4"] `threeForth
                | `auto
              ]
                =?,
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
