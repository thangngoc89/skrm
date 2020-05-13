[@react.component]
let make = (~error=?, ~children) => {
  <div
    className={Cn.make([
      "usa-form-group",
      Cn.ifSome("usa-form-group--error", error),
    ])}>
    children
  </div>;
};
