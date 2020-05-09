(* Auto-generated from "FormField.atd" *)
              [@@@ocaml.warning "-27-32-35-39"]

type date = FormField_t.date = {
  id: string;
  label: string;
  required: bool option;
  relavent: string option
}

type dateTime = FormField_t.dateTime = {
  id: string;
  label: string;
  required: bool option;
  relavent: string option
}

type integer = FormField_t.integer = {
  id: string;
  label: string;
  required: bool option;
  relavent: string option
}

type note = FormField_t.note = {
  id: string;
  label: string;
  required: bool option;
  relavent: string option
}

type pair = FormField_t.pair = { value: string; label: string }

type select = FormField_t.select = {
  id: string;
  label: string;
  required: bool option;
  relavent: string option;
  params: pair list
}

type selectMatrix = FormField_t.selectMatrix = {
  id: string;
  label: string;
  required: bool option;
  relavent: string option;
  params: pair list;
  subQuestion: pair list
}

type text = FormField_t.text = {
  id: string;
  label: string;
  required: bool option;
  relavent: string option
}

type time = FormField_t.time = {
  id: string;
  label: string;
  required: bool option;
  relavent: string option
}

type field = FormField_t.field = 
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


and group = FormField_t.group = {
  id: string;
  label: string;
  required: bool option;
  relavent: string option;
  params: field list
}

type metadata = FormField_t.metadata = {
  id: string;
  label: string;
  required: bool option;
  relavent: string option
}

val read_date :  date Atdgen_codec_runtime.Decode.t

val write_date :  date Atdgen_codec_runtime.Encode.t

val read_dateTime :  dateTime Atdgen_codec_runtime.Decode.t

val write_dateTime :  dateTime Atdgen_codec_runtime.Encode.t

val read_integer :  integer Atdgen_codec_runtime.Decode.t

val write_integer :  integer Atdgen_codec_runtime.Encode.t

val read_note :  note Atdgen_codec_runtime.Decode.t

val write_note :  note Atdgen_codec_runtime.Encode.t

val read_pair :  pair Atdgen_codec_runtime.Decode.t

val write_pair :  pair Atdgen_codec_runtime.Encode.t

val read_select :  select Atdgen_codec_runtime.Decode.t

val write_select :  select Atdgen_codec_runtime.Encode.t

val read_selectMatrix :  selectMatrix Atdgen_codec_runtime.Decode.t

val write_selectMatrix :  selectMatrix Atdgen_codec_runtime.Encode.t

val read_text :  text Atdgen_codec_runtime.Decode.t

val write_text :  text Atdgen_codec_runtime.Encode.t

val read_time :  time Atdgen_codec_runtime.Decode.t

val write_time :  time Atdgen_codec_runtime.Encode.t

val read_field :  field Atdgen_codec_runtime.Decode.t

val write_field :  field Atdgen_codec_runtime.Encode.t

val read_group :  group Atdgen_codec_runtime.Decode.t

val write_group :  group Atdgen_codec_runtime.Encode.t

val read_metadata :  metadata Atdgen_codec_runtime.Decode.t

val write_metadata :  metadata Atdgen_codec_runtime.Encode.t

