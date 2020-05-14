module Store = SurveyEngine__Store;

module WithStringValue =
  Store.Make({
    type value = string;
  });

module WithStringArrayValue =
  Store.Make({
    type value = array(string);
  });

module B = SurveyBlocks;

module Form = B.Form;

module Textfield = {
  [@react.component]
  let make = (~name, ~label) => {
    let (value, onChange) = WithStringValue.useStoreValue(name);

    <B.Textfield
      name
      label
      value
      setValue={value => onChange(SurveyEngine__Types.string(value))}
    />;
  };
};

module SelectMultiple = {
  [@react.component]
  let make = (~name, ~label, ~choices) => {
    let (value, onChange) =
      WithStringArrayValue.useStoreValue(
        ~initialValue=SurveyEngine__Types.stringArray([||]),
        name,
      );

    <B.SelectMultiple
      name
      label
      choices
      value
      setValue={value => onChange(SurveyEngine__Types.stringArray(value))}
    />;
  };
};
