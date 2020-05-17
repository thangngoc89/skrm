/** This module contains SurveyUI hooked into store */
module UseFieldString =
  Store.Form.MakeUseField({
    type value = string;
    let fromValue = SurveyEngine__Types.string;
  });

module UseFieldStringArray =
  Store.Form.MakeUseField({
    type value = array(string);
    let fromValue = SurveyEngine__Types.stringArray;
  });

module UI = SurveyUI;
module Form = UI.Form;

module Textfield = {
  [@react.component]
  let make = (~name, ~label, ~required=?, ~store) => {
    let (value, setValue) = UseFieldString.useField(~key=name, store);
    let value = value->Belt.Option.getWithDefault("");

    <UI.Textfield name label ?required value setValue={value => setValue(value)} />;
  };
};

module SelectMultiple = {
  [@react.component]
  let make = (~name, ~label, ~choices, ~required=?, ~store) => {
    let (value, setValue) = UseFieldStringArray.useField(~key=name, store);
    let value = value->Belt.Option.getWithDefault([||]);

    <UI.SelectMultiple
      name
      label
      choices
      value
      setValue={value => setValue(value)}
    />;
  };
};

module SelectOne = {
  [@react.component]
  let make = (~name, ~label, ~choices, ~required=?, ~store) => {
    let (value, setValue) = UseFieldString.useField(~key=name, store);
    let value = value->Belt.Option.getWithDefault("");

    <UI.SelectOne
      name
      label
      choices
      ?required
      value
      setValue={value => setValue(value)}
    />;
  };
};

module Dropdown = {
  [@react.component]
  let make = (~name, ~label, ~choices, ~store) => {
    let (value, setValue) = UseFieldString.useField(~key=name, store);
    let value = value->Belt.Option.getWithDefault("");

    <UI.Dropdown
      name
      label
      choices
      value
      setValue={value => setValue(value)}
    />;
  };
};

module RangeSlider = {
  [@react.component]
  let make = (~name, ~label, ~min, ~max, ~step, ~store) => {
    let (value, setValue) = UseFieldString.useField(~key=name, store);
    let value = value->Belt.Option.getWithDefault("");

    <UI.RangeSlider
      name
      label
      min
      max
      step
      value
      setValue={value => setValue(value)}
    />;
  };
};
