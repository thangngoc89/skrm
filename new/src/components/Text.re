[@react.component] [@bs.module "grommet"]
external make:
  (
    ~size: string=?,
    ~align: string=?,
    ~color: string=?,
    ~margin: string=?,
    ~margin__custom: Js.t('margin)=?,
    ~className: string=?,
    ~weight: string=?,
    ~weight__number: int=?,
    ~children: React.element
  ) =>
  React.element =
  "Text";

let make = make;
