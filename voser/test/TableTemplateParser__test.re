open TestFramework;

module P = TableTemplate.Parser;
let parse = P.parse;

describe("TableTemplate > Parser", ({test}) => {
  test("simple template", ({expect}) => {
    let template = {|
      '16N'  '11N' '26N'
       16N    11N   26N
       36T    31N   46T
      '36T'  '31N' '46T'|};
    let parsed = parse(template);

    expect.int(parsed->Belt.Array.length).toBe(4);
    
    expect.value(parsed).toEqual([|
      [|
        P.CellString("16N"),
        P.CellString("11N"),
        P.CellString("26N"),
      |],
      [|
        P.CellVariable("16N"),
        P.CellVariable("11N"),
        P.CellVariable("26N"),
      |],
      [|
        P.CellVariable("36T"),
        P.CellVariable("31N"),
        P.CellVariable("46T"),
      |],
      [|
        P.CellString("36T"),
        P.CellString("31N"),
        P.CellString("46T"),
      |],
    |]);
  });

  test("single row template", ({expect}) => {
    let template = {|'16N'  '11N' '26N'|};
    let parsed = parse(template);

    expect.int(parsed->Belt.Array.length).toBe(1);
    
    expect.value(parsed).toEqual([|
      [|
        P.CellString("16N"),
        P.CellString("11N"),
        P.CellString("26N"),
      |],
    |]);
  })
  test("handle mixing quotes", ({expect}) => {
    let template = {|"a"  'b' "c'" 'd"'|};
    let parsed = parse(template);

    expect.int(parsed->Belt.Array.length).toBe(1);
    
    expect.value(parsed).toEqual([|
      [|
        P.CellString("a"),
        P.CellString("b"),
        P.CellString("c'"),
        P.CellString("d\"")
      |],
    |]);
  })

  test("handle empty, with and without fill", ({expect}) => {
    let template = {|"a"  . # d|};
    let parsed = parse(template);

    expect.int(parsed->Belt.Array.length).toBe(1);
    
    expect.value(parsed).toEqual([|
      [|
        P.CellString("a"),
        P.CellWhite,
        P.CellBlack,
        P.CellVariable("d")
      |],
    |]);
  })

  test("handle any amounts of spaces between each column", ({expect}) => {
    let template = {|"a"     .   #              d |};
    let parsed = parse(template);

    expect.int(parsed->Belt.Array.length).toBe(1);
    
    expect.value(parsed).toEqual([|
      [|
        P.CellString("a"),
        P.CellWhite,
        P.CellBlack,
        P.CellVariable("d")
      |],
    |]);
  })
});
