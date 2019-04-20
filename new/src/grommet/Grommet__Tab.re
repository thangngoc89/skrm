module Tabs = {
  [@bs.module "grommet"] [@react.component]
  external make:
    (
      ~activeIndex: int=?,
      ~onActive: int => unit=?,
      ~className: string=?,
      ~justify: string=?,
      ~children: React.element
    ) =>
    React.element =
    "Tabs";
};

module Tab = {
  [@bs.module "grommet"] [@react.component]
  external make:
    (~title: string, ~className: string=?, ~children: React.element) =>
    React.element =
    "Tab";
};
