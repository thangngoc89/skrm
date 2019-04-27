[@genType.import "grommet"] [@genType.as "FormField"] [@react.component]
external make:
  (
    ~error: string=?,
    ~help: React.element=?,
    ~htmlFor: string=?,
    ~label: React.element=?,
    ~children: React.element
  ) =>
  React.element =
  "";

let make = make;
