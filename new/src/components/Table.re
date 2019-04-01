type tableLayout = [ | `fixed | `auto];

let component = ReasonReact.statelessComponent("Table");

let make = (~className=?, ~layout: tableLayout=`auto, ~id=?, children) => {
  ...component,
  render: _self => {
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
      ...children
    </table>;
  },
};

module Head = {
  let component = ReasonReact.statelessComponent("Table_Head");

  let make = (~className=?, children) => {
    ...component,
    render: _self => {
      <thead ?className> ...children </thead>;
    },
  };

  module Row = {
    let component = ReasonReact.statelessComponent("Table_Head_Row");

    let make = (~className=?, children) => {
      ...component,
      render: _self => {
        <tr className={Cn.make(["h-12 border-b-2", Cn.unpack(className)])}>
          ...children
        </tr>;
      },
    };
  };
  module Col = {
    let component = ReasonReact.statelessComponent("Table_Head_Col");

    let make = children => {
      ...component,
      render: _self => {
        <th scope="col" className="font-bold text-center"> ...children </th>;
      },
    };
  };
};

module Body = {
  let component = ReasonReact.statelessComponent("Table_Body");

  let make = (~className=?, children) => {
    ...component,
    render: _self => {
      <thead ?className> ...children </thead>;
    },
  };

  module Row = {
    let component = ReasonReact.statelessComponent("Table_Body_Row");

    let make = children => {
      ...component,
      render: _self => {
        <tr className="h-10 border-b border-light-6 hover:bg-light-1">
          ...children
        </tr>;
      },
    };
  };

  module Col = {
    let component = ReasonReact.statelessComponent("Table_Body_Col");

    let make = (~className=?, children) => {
      ...component,
      render: _self => {
        <td scope="row" ?className> ...children </td>;
      },
    };
  };
};
