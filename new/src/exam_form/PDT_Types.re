module Table = {
  type options = array(string);
  type cellLabel = string;

  type cell =
    | Static(string)
    | Data(cellLabel, options)
    | Empty
    | Disabled;

  type row =
    | Row(list(cell))
    | RowReverse(list(cell));

  type table = list(row);
};
