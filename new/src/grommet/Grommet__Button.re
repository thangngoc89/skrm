[@react.component] [@bs.module "grommet"]
external make:
  (
    ~margin: string=?,
    ~active: bool=?,
    ~color: string=?,
    ~disabled: bool=?,
    ~fill: bool=?,
    ~focusIndicator: bool=?,
    ~hoverIndicator: bool=?,
    ~href: string=?,
    ~icon: React.element=?,
    ~label: React.element=?,
    ~onClick: ReactEvent.Mouse.t => unit=?,
    ~plain: bool=?,
    ~primary: bool=?,
    ~reverse: bool=?,
    ~type_: string=?
  ) =>
  React.element =
  "Button";
