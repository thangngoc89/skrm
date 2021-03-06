module RR = {
  let s = React.string;
  let valueFromEvent = e => e->ReactEvent.Form.target##value;

  module IfSome = {
    [@react.component]
    let make = (~value, ~render) => {
      switch (value) {
        | Some(value) => render(value)
        | None => React.null
      }
    };
  }
};

module Arr = {
  let has = (~needle, ~haystack) => {
    Js.Array.indexOf(needle, haystack) != -1
  }
}
