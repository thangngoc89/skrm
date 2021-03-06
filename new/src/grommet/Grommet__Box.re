[@bs.config {jsx: 3}];

[@genType]
type direction = [
  | `row
  | `column
  | [@genType.as "row-responsive"] `row_responsive
];

[@genType]
type alignSelf = [
  | [@genType.as "start"] `as_start
  | [@genType.as "center"] `as_center
  | [@genType.as "end"] `as_end
  | [@genType.as "stretch"] `as_stretch
];

[@genType]
type basis = [
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
];

[@genType]
type elevation = [ | `none | `xsmall | `small | `medium | `large | `xlarge];
[@genType]
type gap = [ | `xsmall | `small | `medium | `large | `xlarge];

[@genType]
type margin = [ | `xsmall | `small | `medium | `large | `xlarge];

[@react.component] [@bs.module "grommet"]
external make:
  (
    ~a11yTitle: string=?,
    ~align: string=?,
    ~alignContent: string=?,
    ~alignSelf: alignSelf=?,
    ~animation: string=?,
    ~background: string=?,
    ~basis: basis=?,
    ~border: string=?,
    ~border__custom: Js.t('a)=?,
    ~direction: string=?,
    ~elevation: string=?,
    ~fill: bool=?,
    ~flex: bool=?,
    ~gap: gap=?,
    ~gridArea: string=?,
    ~height: string=?,
    ~justify: string=?,
    ~margin: margin=?,
    ~overflow: string=?,
    ~pad: string=?,
    ~responsive: bool=?,
    ~round: string=?,
    ~width: string=?,
    ~wrap: bool=?,
    ~style: ReactDOMRe.Style.t=?,
    ~children: React.element,
    ~as_: string=?,
  ) =>
  React.element =
  "Box";

let make = make;
