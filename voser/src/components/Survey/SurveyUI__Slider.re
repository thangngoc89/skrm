open Utils.RR;

[@react.component]
let make =
    (~value=?, ~setValue=?, ~defaultValue=?, ~name, ~label, ~min, ~max, ~step) => {
  let onChange =
    setValue->Belt.Option.map((setValue, e) => {
      let value = e->Utils.RR.valueFromEvent;
      setValue(value);
    });
  <div>
    <label className="usa-label" htmlFor=name> {s(label)} </label>
    <input
      id=name
      name
      className="usa-range"
      type_="range"
      min
      max
      step
      ?value
      ?onChange
      ?defaultValue
    />
  </div>;
};
