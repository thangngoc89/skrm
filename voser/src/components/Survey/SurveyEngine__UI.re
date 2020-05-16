module Store = SurveyEngine__Store;

module WithStringValue =
  Store.Make({
    type value = string;
    let fromValue = SurveyEngine__Types.string;
  });

module WithStringArrayValue =
  Store.Make({
    type value = array(string);
    let fromValue = SurveyEngine__Types.stringArray;
  });

module UI = SurveyUI;
module Form = UI.Form;

module Textfield = {
  [@react.component]
  let make = (~name, ~label) => {
    let (value, onChange) = WithStringValue.useStoreValue(name);

    <UI.Textfield name label value setValue={value => onChange(value)} />;
  };
};

module SelectMultiple = {
  [@react.component]
  let make = (~name, ~label, ~choices) => {
    let (value, onChange) =
      WithStringArrayValue.useStoreValue(~initialValue=[||], name);

    <UI.SelectMultiple
      name
      label
      choices
      value
      setValue={value => onChange(value)}
    />;
  };
};
