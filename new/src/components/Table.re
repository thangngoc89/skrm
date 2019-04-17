[@bs.config {jsx: 3}];

type tableLayout = [ | `fixed | `auto];

[@react.component]
let make = (~className=?, ~layout: tableLayout=`auto, ~id=?, ~children) => {
  <table
    ?id
    className={Cn.make([
      "w-full",
      switch (layout) {
      | `auto => "table-auto"
      | `fixed => "table-fixed"
      },
      Cn.unpack(className),
    ])}>
    children
  </table>;
};

module Head = {
  [@react.component]
  let make = (~className=?, ~children) => {
    <thead ?className> children </thead>;
  };

  module Row = {
    [@react.component]
    let make = (~className=?, ~children) => {
      <tr className={Cn.make(["h-12 border-b-2", Cn.unpack(className)])}>
        children
      </tr>;
    };
  };
  module Col = {
    [@react.component]
    let make = (~children) => {
      <th scope="col" className="font-bold text-center"> children </th>;
    };
  };
};

module Body = {
  [@react.component]
  let make = (~className=?, ~children) => {
    <thead ?className> children </thead>;
  };

  module Row = {
    [@react.component]
    let make = (~children) => {
      <tr className="h-10 border-b border-light-6 hover:bg-light-1">
        children
      </tr>;
    };
  };

  module Col = {
    [@react.component]
    let make = (~className=?, ~children=?) => {
      <td scope="row" ?className>
        {children->Belt.Option.getWithDefault(React.null)}
      </td>;
    };
  };
};
