[@genType]
type alignSelf = [
  | [@genType.as "start"] `as_start
  | [@genType.as "center"] `as_center
  | [@genType.as "end"] `as_end
  | [@genType.as "stretch"] `as_stretch
];

[@genType.import "grommet"]
[@genType.as "Heading"]
[@bs.module "./Grommet__Heading.gen"]
external make:
  (
    ~a11yTitle: string=?,
    ~alignSelf: alignSelf=?,
    ~color: string=?,
    ~gridArea: string=?,
    ~size: string=?,
    ~textAlign: string=?,
    ~level: int=?,
    ~className: string=?,
    'a
  ) =>
  ReasonReact.component(
    ReasonReact.stateless,
    ReasonReact.noRetainedProps,
    ReasonReact.actionless,
  ) =
  "";

let make = make;
