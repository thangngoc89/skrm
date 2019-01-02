let component = ReasonReact.statelessComponent("RRApp");

[@genType]
let make = _children => {
  ...component,
  render: _self => {
    <Exam_TableRender table=Exam_TableSchema.Tinh_trang_ham_tren.table />;
  },
};
