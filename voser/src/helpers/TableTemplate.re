/**
 * Table template parser
 * - This module is more or less inspired by
 *   CSS Grid template area syntax
 * - Differences
 *   - All rows must have equal columns
 *   - No cell spaning (both row and col)
 *   - Multiple cell type
 */

type table = {
  fields: array(cellField),
  template: string,
}
and cell =
  | CellText(string)
  | CellField(cellField)
  | CellEmpty({filled: bool})
and cellField = {
  name: string,
  fieldType: Survey.fieldType,
};

type row = array(cell);
type parsedTable = array(row);

module Parser = {
  let template = {|
   '16N'  '11N' '26N'
    16N    11N   26N
    36T    31N   46T
   '36T'  '31N' '46T'|};

  let cleanTpl = Js.String.trim;

  /** Split template to rows
   * - Remove empty rows
   */
  let splitTplToRows = tpl => {
    tpl
    ->Js.String2.splitByRe([%re "/\\n+/g"])
    ->Belt.Array.keepMap(
        fun
        | Some(row) => {
            let cleaned = row->Js.String2.trim;
            cleaned == "" ? None : Some(cleaned);
          }
        | None => None,
      );
  };
  let parse = (~template=template, ()) => {
    let rows = template->cleanTpl->splitTplToRows;
    ();
  };
};
