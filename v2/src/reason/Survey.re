[@genType]
type metadata = {
  id: string,
  label: string,
  required: option(bool),
  relavent: option(string),
};

type dateTime = {
  id: string,
  label: string,
  required: option(bool),
  relavent: option(string),
  format: option(string)
};

type integer = {
  id: string,
  label: string,
  required: option(bool),
  relavent: option(string),
};

type note = {
  id: string,
  label: string,
  required: option(bool),
  relavent: option(string),
};

type pair = {
  value: string,
  label: string,
};

type select = {
  id: string,
  label: string,
  required: option(bool),
  relavent: option(string),
  params: array(pair),
};

type selectMatrix = {
  id: string,
  label: string,
  required: option(bool),
  relavent: option(string),
  params: array(pair),
  subQuestion: array(pair),
};

type text = {
  id: string,
  label: string,
  required: option(bool),
  relavent: option(string),
};



[@genType]
type field =
  | Text(text)
  | Note(note)
  | Integer(integer)
  | SelectOne(select)
  | SelectOneMatrix(selectMatrix)
  | SelectMultiple(select)
  | SelectMultipleMatrix(selectMatrix)
  | Date(dateTime)
  | Time(dateTime)
  | DateTime(dateTime)
  | Group(group)
and group = {
  id: string,
  label: string,
  required: option(bool),
  relavent: option(string),
  params: array(field),
};

[@genType]
type t = {
  title: string,
  fields: array(field),
};
