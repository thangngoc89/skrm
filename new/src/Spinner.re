open ReactHelpers;
let s: Js.t('a) = [%raw {|require("./Spinner.module.css")|}];

[@react.component]
let make = () => {
  <div
    className={
      s##loader;
    }> "Loading..."->str </div>;
};

let default = make;
