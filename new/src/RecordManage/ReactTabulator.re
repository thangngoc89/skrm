open ReactHelpers;

import("react-tabulator/lib/styles.css");
import("react-tabulator/lib/css/tabulator.min.css");

type formatter;
type column;
[@bs.obj]
external makeColumn:
  (
    ~title: string=?,
    ~field: string=?,
    ~align: string=?,
    ~width: int=?,
    ~headerVertical: bool=?,
    ~headerFilter: string=?,
    ~headerSort: bool=?,
    ~resizable: bool=?,
    ~minWidth: int=?,
    ~responsive: int=?,
    ~formatter: string=?,
    ~formatter__custom: formatter=?,
    unit
  ) =>
  column =
  "";

[@bs.module "react-tabulator"] [@react.component]
external make:
  (
    ~options: Js.t({..}),
    ~data: array('data),
    ~columns: array(column),
    ~layout: string=?
  ) =>
  React.element =
  "ReactTabulator";

let make = make;

type cell = {. "_cell": {. "value": string}};

[@bs.module "./reactFormatter.js"]
external reactFormatter: (cell => React.element) => formatter =
  "reactFormatter";

let reactFormatter = reactFormatter;
