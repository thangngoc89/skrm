module Table = {
  type options = list(string);
  type cellLabel = string;

  type cell =
    | Static(string)
    | Data(cellLabel, options)
    | Empty
    | Disabled;

  type row = list(cell);

  type table = {
    heading: row,
    rows: list(row),
  };

  type tableSimple = list(row);
};