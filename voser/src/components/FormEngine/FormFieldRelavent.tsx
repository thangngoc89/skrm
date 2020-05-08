import * as React from "react";
import * as jexl from "jexl";

interface RelaventProps {
  param: string;
  context: any;
  children: any;
}

interface ConditionalRelaventProps {
  param?: string;
  context: any;
  children: any;
}

// const cacheCompiledStatement: {} as any = {};
// const cacheGet = (statement: string) => {
//   if (!cacheCompiledStatement[statement]) {
//     let compiled = jexl.compile(statement);

//     cacheCompiledStatement[statement] = compiled;

//     return compiled;
//   }
//   return false;
// };

const Relavent = ({ param, context, children }: RelaventProps) => {
  const compiled = React.useMemo(() => jexl.compile(param), [param]);
  if (compiled.evalSync(context)) {
    return children;
  }
  return null;
};

const ConditionalRelaventProps = ({
  param,
  ...props
}: ConditionalRelaventProps) => {
  if (!param) {
    return props.children;
  }
  return <Relavent param={param} {...props} />;
};

export default ConditionalRelaventProps;
