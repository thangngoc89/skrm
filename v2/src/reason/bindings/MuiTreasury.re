module Styles = {
  type styleHook = unit => string;

  module TextField = {
    module Bordered = {
      type hooks;
      [@bs.module "@mui-treasury/styles/textField/bordered"]
      external borderedTextFieldStylesHook: hooks =
        "borderedTextFieldStylesHook";
      
      let%pri borderedTextFieldStylesHook = borderedTextFieldStylesHook;
      [@bs.get] external useInputBase: hooks => styleHook = "useInputBase";
      let useInputBase = useInputBase(borderedTextFieldStylesHook);
      [@bs.get] external useInputLabel: hooks => styleHook = "useInputLabel";
      let useInputLabel = useInputLabel(borderedTextFieldStylesHook);
    };
  };
};
