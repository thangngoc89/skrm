type metadata = {
  name: string,
  label: string,
  required: option(bool),
  relavent: option(string),
};

type dateTime = {format: option(string)};

type pair = {
  value: string,
  label: string,
};

type select = {params: array(pair)};

type selectMatrix = {
  params: array(pair),
  subQuestion: array(pair),
};

type fieldType =
  | Text
  | Note
  | Integer
  | SelectOne(select)
  | SelectOneMatrix(selectMatrix)
  | SelectMultiple(select)
  | SelectMultipleMatrix(selectMatrix)
  | Date(dateTime)
  | Time(dateTime)
  | DateTime(dateTime)
  | Group(group)
and group = {params: array(field)}
and field = (metadata, fieldType);

type t = {
  title: string,
  fields: array(field),
};
