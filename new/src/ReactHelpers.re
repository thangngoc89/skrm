let str = React.string;
let reactList = l => l->Belt.List.toArray->ReasonReact.array;

[@bs.val] external import: string => unit = "import";

module G = Grommet;
