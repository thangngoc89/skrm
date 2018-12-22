[@genType.import "./GButton"]
[@bs.module "./Grommet__Button.gen"]
external make:
  (
    ~a11yTitle: string=?,
    ~active: bool=?,
    ~alignSelf: [
                  | [@gentype.as "start"] `align_start
                  | [@gentype.as "center"] `align_center
                  | [@gentype.as "end"] `align_end
                  | [@gentype.as "stretch"] `align_stretch
                ]
                  =?,
    ~color: string=?,
    ~disabled: bool=?,
    ~fill: bool=?,
    ~focusIndicator: bool=?,
    ~gridArea: string=?,
    ~hoverIndicator: bool=?,
    ~href: string=?,
    ~label: string=?,
    ~margin: [ | `xsmall | `small | `medium | `large | `xlarge]=?,
    ~onClick: unit => unit=?,
    ~plain: bool=?,
    ~primary: bool=?,
    ~reverse: bool=?
  ) =>
  [@gentype.as "type"] (
    (~typ: [ | `button | `reset | `submit]=?) =>
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
