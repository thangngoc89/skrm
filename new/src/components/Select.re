open React;
type pair = {
  value: string,
  label: string,
};

let component = ReasonReact.statelessComponent("Select");

let make = (~options: list(pair), ~name, _children) => {
  ...component,
  render: _self => {
    <select name className="w-full h-10 text-center appearance-none">
      <option> "--"->str </option>
      {options
       ->Belt.List.mapWithIndex((index, {value, label}) =>
           <option value> label->str </option>
         )
       ->reactList}
    </select>;
  },
};
