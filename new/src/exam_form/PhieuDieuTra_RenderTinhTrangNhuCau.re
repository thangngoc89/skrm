let component =
  ReasonReact.statelessComponent("PhieuDieuTra_RenderTinhTrangNhuCau");

[@genType]
let make = (~value, ~onChange, _children) => {
  ...component,
  render: _self => {
    <Exam_TableRender
      table=Exam_TableSchema.Tinh_trang_ham_tren.table
      tableValue=value
      handleCellChange=onChange
    />;
  },
};
