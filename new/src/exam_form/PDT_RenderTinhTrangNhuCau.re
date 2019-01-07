module HamTren = {
  let component =
    ReasonReact.statelessComponent(
      "PhieuDieuTra_RenderTinhTrangNhuCau_HamTren",
    );

  [@genType]
  let make = (~value, ~onChange, _children) => {
    ...component,
    render: _self => {
      <PDT_TableRender
        table=PDT_TableSchema.Tinh_trang_ham_tren.table
        tableValue=value
        handleCellChange=onChange
      />;
    },
  };
};

module HamDuoi = {
  let component =
    ReasonReact.statelessComponent(
      "PhieuDieuTra_RenderTinhTrangNhuCau_HamDuoi",
    );

  [@genType]
  let make = (~value, ~onChange, _children) => {
    ...component,
    render: _self => {
      <PDT_TableRender
        table=PDT_TableSchema.Tinh_trang_ham_duoi.table
        tableValue=value
        handleCellChange=onChange
      />;
    },
  };
};
