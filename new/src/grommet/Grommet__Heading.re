[@genType.import "./GHeading"] [@bs.module "./Grommet__Heading.gen"]
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
    ~size: string=?,
    ~textAlign: string=?,
    ~level: int=?,
    'a
  ) =>
  ReasonReact.component(
    ReasonReact.stateless,
    ReasonReact.noRetainedProps,
    ReasonReact.actionless,
  ) =
  "";

let make = make;
