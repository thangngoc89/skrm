open Utils.RR;
open SurveyUI__Internal;

[@react.component]
let make =
    (~name, ~label, ~required=?, ~value=?, ~setValue=?, ~hint=?, ~error=?) => {
  let onChange =
    setValue->Belt.Option.map((setValue, e) => {
      let value = e->Utils.RR.valueFromEvent;
      setValue(value);
    });
  <FormGroup ?error>
    <FormLabel name error label required />
    {switch (error) {
     | Some(error) =>
       <span className="usa-error-message" role="alert"> {s(error)} </span>
     | None => React.null
     }}
    <input
      className={Cn.make([
        "usa-input",
        Cn.ifSome("usa-input--error", error),
      ])}
      id=name
      name
      type_="text"
      ?required
      ?value
      ?onChange
    />
    {switch (hint) {
     | Some(hint) => <span className="usa-hint"> {s(hint)} </span>
     | None => React.null
     }}
  </FormGroup>;
};
