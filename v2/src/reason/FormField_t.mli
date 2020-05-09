(* Auto-generated from "FormField.atd" *)
              [@@@ocaml.warning "-27-32-35-39"]

type date = {
  id: string;
  label: string;
  required: bool option;
  relavent: string option
}

type dateTime = {
  id: string;
  label: string;
  required: bool option;
  relavent: string option
}

type integer = {
  id: string;
  label: string;
  required: bool option;
  relavent: string option
}

type note = {
  id: string;
  label: string;
  required: bool option;
  relavent: string option
}

type pair = { value: string; label: string }

type select = {
  id: string;
  label: string;
  required: bool option;
  relavent: string option;
  params: pair list
}

type selectMatrix = {
  id: string;
  label: string;
  required: bool option;
  relavent: string option;
  params: pair list;
  subQuestion: pair list
}

type text = {
  id: string;
  label: string;
  required: bool option;
  relavent: string option
}

type time = {
  id: string;
  label: string;
  required: bool option;
  relavent: string option
}

type field = 
    Text of text
  | Note of note
  | Integer of integer
  | SelectOne of select
  | SelectOneMatrix of selectMatrix
  | SelectMultiple of select
  | SelectMultipleMatrix of selectMatrix
  | Date of date
  | Time of time
  | DateTime of dateTime
  | Group of group


and group = {
  id: string;
  label: string;
  required: bool option;
  relavent: string option;
  params: field list
}

type metadata = {
  id: string;
  label: string;
  required: bool option;
  relavent: string option
}
