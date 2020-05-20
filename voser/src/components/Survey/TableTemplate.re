/**
 * Table template parser
 * - This module is more or less inspired by
 *   CSS Grid template area syntax
 * - Differences
 *   - All rows must have equal columns
 *   - No cell spaning (both row and col)
 *   - Multiple cell type
 * - Rules:
 *   - String: inside double quotes or single quote
 *   - Variables: [a..Z0..9]
 *   - CellWhite: .
 *   - CellBlack: #
 *   - AT LEAST ONE whitespace between each columns
 * - Examples:
 *    '16N'  '11N' '26N'
 *     16N     .    26N
 *     36T     #   46T
 *    '36T'  '31N' '46T'
 */
// type table = {
//   fields: array(cellField),
//   template: string,
// }
// and cell =
//   | CellString(string)
//   | CellVariable(string)
//   | CellEmpty(bool)
// and cellField = {
//   name: string,
//   fieldType: Survey.fieldType,
// };
// module Parser = {
//   type cell =
//     | CellString(string)
//     | CellVariable(string)
//     | CellWhite
//     | CellBlack;
//   let clean = Js.String.trim;
//   /** Split template to rows
//    * - Remove empty rows
//    */
//   let splitTplToRows = tpl => {
//     tpl
//     ->Js.String2.splitByRe([%re "/\\n+/g"])
//     ->Belt.Array.keepMap(
//         fun
//         | Some(row) => {
//             let cleaned = clean(row);
//             cleaned == "" ? None : Some(cleaned);
//           }
//         | None => None,
//       );
//   };
//   let whitespace = [%re "/\s+/g"];
//   type token =
//     | SingleQuote
//     | DoubleQuote
//     | Char(string)
//     | Whitespace;
//   type parseTag =
//     | NoContext
//     | EmptyCell
//     | Variable
//     | StringSingle
//     | StringDouble;
//   type parseContext = {
//     mutable tag: parseTag,
//     mutable collector: list(string),
//     mutable result: list(cell),
//   };
//   exception InvalidVariable(string);
//   let parseRow = rowString => {
//     let arr = rowString->Js.String2.split("");
//     let tokens =
//       arr
//       ->Belt.Array.reduce([], (acc, char) => {
//           switch (char) {
//           | "'" => [SingleQuote, ...acc]
//           | "\"" => [DoubleQuote, ...acc]
//           | " " => [Whitespace, ...acc]
//           | string => [Char(string), ...acc]
//           }
//         })
//       ->Belt.List.reverse;
//     let parse = tokens => {
//       let context = {tag: NoContext, collector: [], result: []};
//       let collectorAdd = c => {
//         context.collector = [c, ...context.collector];
//       };
//       let collectorGetThenClean = () => {
//         let string =
//           context.collector->Belt.List.reverse |> String.concat("");
//         context.collector = [];
//         string;
//       };
//       let rec parse' = tokens => {
//         switch (tokens) {
//         | [] =>
//           // This handle when variable at the end of line
//           switch (context.tag) {
//           | Variable =>
//             context.result = [
//               CellVariable(collectorGetThenClean()),
//               ...context.result,
//             ]
//           | _ => ()
//           };
//           context.result->Belt.List.reverse;
//         | [current, ...tokens] =>
//           switch (context.tag, current) {
//           | (NoContext, SingleQuote) => context.tag = StringSingle
//           | (NoContext, DoubleQuote) => context.tag = StringDouble
//           | (NoContext, Whitespace) => ()
//           | (NoContext, Char(".")) =>
//             context.tag = EmptyCell;
//             context.result = [CellWhite, ...context.result];
//           | (NoContext, Char("#")) =>
//             context.tag = EmptyCell;
//             context.result = [CellBlack, ...context.result];
//           | (NoContext, Char(c)) =>
//             context.tag = Variable;
//             collectorAdd(c);
//           | (Variable, SingleQuote)
//           | (Variable, DoubleQuote) =>
//             raise(InvalidVariable("Variable name can't contains quotes"))
//           | (Variable, Whitespace) =>
//             context.tag = NoContext;
//             context.result = [
//               CellVariable(collectorGetThenClean()),
//               ...context.result,
//             ];
//           | (Variable, Char(c)) => collectorAdd(c)
//           | (StringSingle, Char(c))
//           | (StringDouble, Char(c)) => collectorAdd(c)
//           | (StringSingle, DoubleQuote) => collectorAdd("\"")
//           | (StringDouble, SingleQuote) => collectorAdd("'")
//           | (StringSingle, Whitespace)
//           | (StringDouble, Whitespace) => collectorAdd(" ")
//           | (StringSingle, SingleQuote)
//           | (StringDouble, DoubleQuote) =>
//             context.tag = NoContext;
//             context.result = [
//               CellString(collectorGetThenClean()),
//               ...context.result,
//             ];
//           // Dot and sharp should stand alone
//           // Right after Dot or Sharp should be a whitespace
//           | (EmptyCell, Whitespace) => context.tag = NoContext
//           | (EmptyCell, _) =>
//             raise(InvalidVariable("Variable name can't start with . or #"))
//           };
//           parse'(tokens);
//         };
//       };
//       parse'(tokens);
//     };
//     parse(tokens)->Belt.List.toArray;
//   };
//   let parse = template => {
//     let rows = template->clean->splitTplToRows;
//     rows->Belt.Array.map(parseRow);
//   };
// };
module Parser = {
  type tokenTag =
    | Dot
    | Sharp
    | Variable
    | String
    | Eol
    | Whitespace;
  type token = {
    start: int,
    stop: int,
    tag: tokenTag,
    value: string,
  };

  type cell =
    | CellString(string)
    | CellVariable(string)
    | CellWhite
    | CellBlack;

  type row = array(cell);
  type table = array(row);

  module TemplateLexer: {let lexer: string => array(token);} = {
    type rawToken = {
      [@bs.as "begin"]
      begin_: int,
      [@bs.as "end"]
      end_: int,
      [@bs.as "type"]
      type_: string,
      value: string,
    };
    
    [@bs.module "./TableTemplateLexer.js"]
    external lexer: string => array(rawToken) = "default";
    let makeToken = (rawToken, tag) => {
      {
        tag,
        start: rawToken.begin_,
        stop: rawToken.end_,
        value: rawToken.value,
      };
    };

    let lexer = template => {
      template
      ->lexer
      ->Belt.Array.reduce(
          [||],
          (acc, rawToken) => {
            let add = tokenTag => {
              acc->Js.Array2.push(makeToken(rawToken, tokenTag))->ignore;
            };

            switch (rawToken.type_) {
            | "dot" => add(Dot)
            | "sharp" => add(Sharp)
            | "variable" => add(Variable)
            | "eol" => add(Eol)
            | "whitespace" => add(Whitespace)
            | "string" => add(String)
            | _ => ()
            };
            acc;
          },
        );
    };
  };

  let lastRow = table => {
    let length = table->Js.Array2.length;
    if (length == 0) {
      failwith("This should never happens (table contains no rows)");
    } else {
      table[length - 1];
    };
  };

  let addCell: (table, cell) => unit =
    (table, cell) => {
      table->lastRow->Js.Array2.push(cell)->ignore;
    };
  let addRow: table => unit = table => table->Js.Array2.push([||])->ignore;

  let parse = template => {
    let tokens = template->TemplateLexer.lexer;
    let length = Js.Array2.length(tokens);

    let table: table = [|[||]|];

    let addCell = addCell(table);
    let addRow = () => addRow(table);

    let addCellSafe = (i, cell) => {
      let isNextTokenWhiteSpace =
        if (i + 1 < length) {
          let nextToken = tokens[i + 1];
          nextToken.tag == Whitespace || nextToken.tag == Eol;
        } else {
          true;
        };
      isNextTokenWhiteSpace ? addCell(cell) : ();
    };

    let rec loop = i =>
      if (i < length) {
        let token = tokens[i];
        // let prevToken = i == 0 ? None: Some(tokens[i-1]);

        let _ =
          switch (token.tag) {
          | Dot => addCellSafe(i, CellWhite)
          | Sharp => addCellSafe(i, CellBlack)
          | Variable => addCellSafe(i, CellVariable(token.value))
          | String => addCellSafe(i, CellString(token.value))
          | Eol => addRow()
          | Whitespace => ()
          };
        loop(i + 1);
      } else {
        table;
      };
    loop(0);
  };

  /* Clean up result, add errors */
  let parse = template => {
    template->parse->Belt.Array.keep(row => Js.Array2.length(row) != 0);
  };
};
