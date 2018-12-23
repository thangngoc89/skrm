[@genType.import "./GText"] [@bs.module "./Grommet__Text.gen"]
external make:
  (
    ~a11yTitle: string=?,
    ~alignSelf: [
                  | [@gentype.as "start"] `align_start
                  | [@gentype.as "center"] `align_center
                  | [@gentype.as "end"] `align_end
                  | [@gentype.as "stretch"] `align_stretch
                ]
                  =?,
    ~color: string=?,
    ~gridArea: string=?,
    ~margin: string=?,
    ~size: string=?,
    ~textAlign: [
                  | [@genType.as "start"] `ta_start
                  | [@genType.as "center"] `ta_center
                  | [@genType.as "end"] `ta_end
                ]
                  =?,
    ~truncate: bool=?,
    ~weight: [ | `normal | `bold | `number(int)],
    ~level: int=?
  ) =>
  [@genType.as "as"] (
    (~as_: string=?, 'a) =>
    ReasonReact.component(
      ReasonReact.stateless,
      ReasonReact.noRetainedProps,
      ReasonReact.actionless,
    )
  ) =
  "";

let make = make;
