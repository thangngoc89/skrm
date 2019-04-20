// [@genType]
// type direction = [
//   | `row
//   | `column
//   | [@genType.as "row-responsive"] `row_responsive
// ];

// [@genType]
// type alignSelf = [
//   | [@genType.as "start"] `as_start
//   | [@genType.as "center"] `as_center
//   | [@genType.as "end"] `as_end
//   | [@genType.as "stretch"] `as_stretch
// ];

// [@genType]
// type basis = [
//   | `xxsmall
//   | `xsmall
//   | `small
//   | `medium
//   | `large
//   | `xlarge
//   | `full
//   | [@genType.as "1/2"] `half
//   | [@genType.as "1/3"] `oneThird
//   | [@genType.as "2/3"] `twoThird
//   | [@genType.as "1/4"] `oneForth
//   | [@genType.as "2/4"] `twoForth
//   | [@genType.as "3/4"] `threeForth
//   | `auto
// ];

// [@genType]
// type elevation = [ | `none | `xsmall | `small | `medium | `large | `xlarge];
// [@genType]
// type gap = [ | `xsmall | `small | `medium | `large | `xlarge];

// [@genType]
// type margin = [ | `xsmall | `small | `medium | `large | `xlarge];

[@react.component] [@genType.import "grommet"] [@genType.as "Box"]
external make:
  (
    ~a11yTitle: string=?,
    ~align: string=?,
    ~alignContent: string=?,
    ~alignSelf: string=?,
    ~animation: string=?,
    ~background: string=?,
    ~basis: string=?,
    ~border: string=?,
    ~border__custom: Js.t('border)=?,
    ~direction: string=?,
    ~elevation: string=?,
    ~fill: bool=?,
    ~flex: bool=?,
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
    ~style: ReactDOMRe.Style.t=?,
    ~children: React.element
  ) =>
  [@genType.as "as"] ((~as_: string=?) => React.element) =
  "";

let make = make;
