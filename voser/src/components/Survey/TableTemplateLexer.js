import gelex from "gelex";

const def = gelex.definition();
def.define("dot", ".");
def.define("sharp", "#");
def.define("variable", "[a-zA-Z0-9][a-zA-Z0-9_]*");
def.define("eol", "[\n]");
def.define("whitespace", "[ ]*", function (value) {
  return " ";
});
def.defineText("string", `"`, `"`);
def.defineText("string", `'`, `'`);

const lexing = (template) => {
  const lexer = def.lexer(template);
  let token;
  while ((token = lexer.next())) {}
  return token;
};

export default lexing;
