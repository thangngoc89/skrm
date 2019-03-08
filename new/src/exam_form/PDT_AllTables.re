module OHIS = {
  let component = ReasonReact.statelessComponent("PhieuDieuTra_OHIS_Table");

  [@genType]
  let make = (~value, ~onChange, _children) => {
    ...component,
    render: _self => {
      <PDT_TableSimpleRender
        table=PDT_TableSchema.OHIS.table
        tableValue=value
        handleCellChange=onChange
      />;
    },
  };
};

module CPI = {
  let component = ReasonReact.statelessComponent("PhieuDieuTra_CPI_Table");

  [@genType]
  let make = (~value, ~onChange, _children) => {
    ...component,
    render: _self => {
      <PDT_TableSimpleRender
        table=PDT_TableSchema.CPI.table
        tableValue=value
        handleCellChange=onChange
      />;
    },
  };
};
module MIH = {
  let component = ReasonReact.statelessComponent("PhieuDieuTra_MIH_Table");

  [@genType]
  let make = (~value, ~onChange, _children) => {
    ...component,
    render: _self => {
      <PDT_TableSimpleRender
        table=PDT_TableSchema.MIH.table
        tableValue=value
        handleCellChange=onChange
      />;
    },
  };
};

module MocChenChuc = {
  let component =
    ReasonReact.statelessComponent("PhieuDieuTra_MocChenChuc_Table");

  [@genType]
  let make = (~value, ~onChange, _children) => {
    ...component,
    render: _self => {
      <PDT_TableSimpleRender
        table=PDT_TableSchema.MocChenChuc.table
        tableValue=value
        handleCellChange=onChange
      />;
    },
  };
};
