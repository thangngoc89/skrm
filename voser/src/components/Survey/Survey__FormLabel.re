open Utils.RR;

[@react.component]
let make = (~error, ~label, ~required, ~name) => {
  <label
    className={Cn.make(["usa-label", Cn.ifSome("usa-label--error", error)])}
    htmlFor=name>
    {s(label)}
    {switch (required) {
     | Some(false) => <span className="usa-hint"> {s("(optional)")} </span>
     | Some(true)
     | None => React.null
     }}
  </label>;
};
