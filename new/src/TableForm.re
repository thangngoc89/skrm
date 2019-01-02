type options = list(string);
type cell =
  | Static(string)
  | Data(string, options)
  | Disabled;

/* type dataCell = (string, options);
type row = list(cell); */
