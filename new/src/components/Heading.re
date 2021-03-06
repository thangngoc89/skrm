[@react.component] [@bs.module "grommet"]
external make:
  (
    ~level: int,
    ~size: string=?,
    ~align: string=?,
    ~color: string=?,
    ~margin: string=?,
    ~margin__custom: Js.t('margin)=?,
    ~children: React.element
  ) =>
  React.element =
  "Heading";

let make = make;
