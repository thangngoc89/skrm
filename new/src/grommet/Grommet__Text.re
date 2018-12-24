[@genType]
type alignSelf = [
  | [@genType.as "start"] `as_start
  | [@genType.as "center"] `as_center
  | [@genType.as "end"] `as_end
  | [@genType.as "stretch"] `as_stretch
];

[@genType]
type textAlign = [
  | [@genType.as "start"] `ta_start
  | [@genType.as "center"] `ta_center
  | [@genType.as "end"] `ta_end
];

[@genType]
type weight = [ | `normal | `bold];
[@genType.import "./GText"] [@bs.module "./Grommet__Text.gen"]
external make:
  (
    ~a11yTitle: string=?,
    ~alignSelf: alignSelf=?,
    ~color: string=?,
    ~gridArea: string=?,
    ~margin: string=?,
    ~size: string=?,
    ~textAlign: textAlign=?,
    ~truncate: bool=?,
    ~weight: weight=?,
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
