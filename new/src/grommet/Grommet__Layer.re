type cb = ReactEvent.Mouse.t => unit;
[@react.component] [@bs.module "grommet"]
external make:
  (
    ~position: string=?,
    ~modal: bool=?,
    ~onClickOutside: cb=?,
    ~onEsc: cb=?,
    ~margin: string=?,
    ~full: bool=?,
    ~full__custom: string=?,
    ~children: React.element=?
  ) =>
  React.element =
  "Layer";
