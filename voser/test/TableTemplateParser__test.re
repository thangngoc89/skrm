open TestFramework;

let parser = TableTemplate.Parser.parse;

describe("TableTemplate > Parser", ({test}) => {
  test("simple template", ({expect}) => {
    let template = {|
      '16N'  '11N' '26N'
       16N    11N   26N
       36T    31N   46T
      '36T'  '31N' '46T'|};
    let parsed = parser(template);

    expect.int(parsed->Belt.Array.length).toBe(4);

    expect.value(parsed).toMatchSnapshot();
    expect.value(parsed).toEqual([|
      [|
        TableTemplate.CellString("16N"),
        TableTemplate.CellString("11N"),
        TableTemplate.CellString("26N"),
      |],
      [|
        TableTemplate.CellVariable("16N"),
        TableTemplate.CellVariable("11N"),
        TableTemplate.CellVariable("26N"),
      |],
      [|
        TableTemplate.CellVariable("36T"),
        TableTemplate.CellVariable("31N"),
        TableTemplate.CellVariable("46T"),
      |],
      [|
        TableTemplate.CellString("36T"),
        TableTemplate.CellString("31N"),
        TableTemplate.CellString("46T"),
      |],
    |]);
  })
});
