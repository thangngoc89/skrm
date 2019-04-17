[@react.component] [@bs.module "grommet"]
external make:
  (~level: int, ~size: string=?, ~children: React.element) => React.element =
  "Heading";

let make = make;
