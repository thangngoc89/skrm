[@genType]
type alignSelf = [
  | [@genType.as "start"] `as_start
  | [@genType.as "center"] `as_center
  | [@genType.as "end"] `as_end
  | [@genType.as "stretch"] `as_stretch
];

[@genType]
type margin = [ | `xsmall | `small | `medium | `large | `xlarge];

[@genType]
type typ = [ | `button | `reset | `submit];

[@genType.import "./GButton"] [@bs.module "./Grommet__Button.gen"]
external make:
  (
    ~a11yTitle: string=?,
    ~active: bool=?,
    ~alignSelf: alignSelf=?,
    ~color: string=?,
    ~disabled: bool=?,
    ~fill: bool=?,
    ~focusIndicator: bool=?,
    ~gridArea: string=?,
    ~hoverIndicator: bool=?,
    ~href: string=?,
    ~label: string=?,
    ~margin: margin=?,
    ~onClick: unit => unit=?,
    ~plain: bool=?,
    ~primary: bool=?,
    ~reverse: bool=?
  ) =>
  [@gentype.as "type"] (
    (~typ: typ=?) =>
    [@gentype.as "Icon"] (
      (~icon: ReasonReact.reactClass=?) =>
      [@gentype.as "as"] (
        (~as_: string=?, 'a) =>
        ReasonReact.component(
          ReasonReact.stateless,
          ReasonReact.noRetainedProps,
          ReasonReact.actionless,
        )
      )
    )
  ) =
  "";

let make = make;
