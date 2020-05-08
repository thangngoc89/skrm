import * as React from "react";
import * as jexl from "jexl";

interface RelaventProps {
  param: string;
  context: any;
  children: any
}

const Relavent = ({ param, context, children }: RelaventProps) => {
  const compiled = React.useMemo(
    () => jexl.compile(param),
    [param]
  );
  if (compiled.evalSync(context ) ) {
    return children
  } 
  return null
};

export default Relavent;
