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

let write__1 = (
  Atdgen_codec_runtime.Encode.option_as_constr (
    Atdgen_codec_runtime.Encode.bool
  )
)
let read__1 = (
  Atdgen_codec_runtime.Decode.option_as_constr (
    Atdgen_codec_runtime.Decode.bool
  )
)
let write__2 = (
  Atdgen_codec_runtime.Encode.option_as_constr (
    Atdgen_codec_runtime.Encode.string
  )
)
let read__2 = (
  Atdgen_codec_runtime.Decode.option_as_constr (
    Atdgen_codec_runtime.Decode.string
  )
)
let write_date = (
  Atdgen_codec_runtime.Encode.make (fun (t : date) ->
    (
    Atdgen_codec_runtime.Encode.obj
      [
          Atdgen_codec_runtime.Encode.field
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"id"
          t.id
        ;
          Atdgen_codec_runtime.Encode.field
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"label"
          t.label
        ;
          Atdgen_codec_runtime.Encode.field_o
            (
            Atdgen_codec_runtime.Encode.bool
            )
          ~name:"required"
          t.required
        ;
          Atdgen_codec_runtime.Encode.field_o
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"relavent"
          t.relavent
      ]
    )
  )
)
let read_date = (
  Atdgen_codec_runtime.Decode.make (fun json ->
    (
      ({
          id =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.field "id"
            ) json;
          label =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.field "label"
            ) json;
          required =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.bool
              |> Atdgen_codec_runtime.Decode.fieldOptional "required"
            ) json;
          relavent =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.fieldOptional "relavent"
            ) json;
      } : date)
    )
  )
)
let write_dateTime = (
  Atdgen_codec_runtime.Encode.make (fun (t : dateTime) ->
    (
    Atdgen_codec_runtime.Encode.obj
      [
          Atdgen_codec_runtime.Encode.field
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"id"
          t.id
        ;
          Atdgen_codec_runtime.Encode.field
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"label"
          t.label
        ;
          Atdgen_codec_runtime.Encode.field_o
            (
            Atdgen_codec_runtime.Encode.bool
            )
          ~name:"required"
          t.required
        ;
          Atdgen_codec_runtime.Encode.field_o
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"relavent"
          t.relavent
      ]
    )
  )
)
let read_dateTime = (
  Atdgen_codec_runtime.Decode.make (fun json ->
    (
      ({
          id =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.field "id"
            ) json;
          label =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.field "label"
            ) json;
          required =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.bool
              |> Atdgen_codec_runtime.Decode.fieldOptional "required"
            ) json;
          relavent =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.fieldOptional "relavent"
            ) json;
      } : dateTime)
    )
  )
)
let write_integer = (
  Atdgen_codec_runtime.Encode.make (fun (t : integer) ->
    (
    Atdgen_codec_runtime.Encode.obj
      [
          Atdgen_codec_runtime.Encode.field
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"id"
          t.id
        ;
          Atdgen_codec_runtime.Encode.field
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"label"
          t.label
        ;
          Atdgen_codec_runtime.Encode.field_o
            (
            Atdgen_codec_runtime.Encode.bool
            )
          ~name:"required"
          t.required
        ;
          Atdgen_codec_runtime.Encode.field_o
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"relavent"
          t.relavent
      ]
    )
  )
)
let read_integer = (
  Atdgen_codec_runtime.Decode.make (fun json ->
    (
      ({
          id =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.field "id"
            ) json;
          label =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.field "label"
            ) json;
          required =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.bool
              |> Atdgen_codec_runtime.Decode.fieldOptional "required"
            ) json;
          relavent =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.fieldOptional "relavent"
            ) json;
      } : integer)
    )
  )
)
let write_note = (
  Atdgen_codec_runtime.Encode.make (fun (t : note) ->
    (
    Atdgen_codec_runtime.Encode.obj
      [
          Atdgen_codec_runtime.Encode.field
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"id"
          t.id
        ;
          Atdgen_codec_runtime.Encode.field
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"label"
          t.label
        ;
          Atdgen_codec_runtime.Encode.field_o
            (
            Atdgen_codec_runtime.Encode.bool
            )
          ~name:"required"
          t.required
        ;
          Atdgen_codec_runtime.Encode.field_o
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"relavent"
          t.relavent
      ]
    )
  )
)
let read_note = (
  Atdgen_codec_runtime.Decode.make (fun json ->
    (
      ({
          id =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.field "id"
            ) json;
          label =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.field "label"
            ) json;
          required =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.bool
              |> Atdgen_codec_runtime.Decode.fieldOptional "required"
            ) json;
          relavent =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.fieldOptional "relavent"
            ) json;
      } : note)
    )
  )
)
let write_pair = (
  Atdgen_codec_runtime.Encode.make (fun (t : pair) ->
    (
    Atdgen_codec_runtime.Encode.obj
      [
          Atdgen_codec_runtime.Encode.field
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"value"
          t.value
        ;
          Atdgen_codec_runtime.Encode.field
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"label"
          t.label
      ]
    )
  )
)
let read_pair = (
  Atdgen_codec_runtime.Decode.make (fun json ->
    (
      ({
          value =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.field "value"
            ) json;
          label =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.field "label"
            ) json;
      } : pair)
    )
  )
)
let write__3 = (
  Atdgen_codec_runtime.Encode.list (
    write_pair
  )
)
let read__3 = (
  Atdgen_codec_runtime.Decode.list (
    read_pair
  )
)
let write_select = (
  Atdgen_codec_runtime.Encode.make (fun (t : select) ->
    (
    Atdgen_codec_runtime.Encode.obj
      [
          Atdgen_codec_runtime.Encode.field
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"id"
          t.id
        ;
          Atdgen_codec_runtime.Encode.field
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"label"
          t.label
        ;
          Atdgen_codec_runtime.Encode.field_o
            (
            Atdgen_codec_runtime.Encode.bool
            )
          ~name:"required"
          t.required
        ;
          Atdgen_codec_runtime.Encode.field_o
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"relavent"
          t.relavent
        ;
          Atdgen_codec_runtime.Encode.field
            (
            write__3
            )
          ~name:"params"
          t.params
      ]
    )
  )
)
let read_select = (
  Atdgen_codec_runtime.Decode.make (fun json ->
    (
      ({
          id =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.field "id"
            ) json;
          label =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.field "label"
            ) json;
          required =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.bool
              |> Atdgen_codec_runtime.Decode.fieldOptional "required"
            ) json;
          relavent =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.fieldOptional "relavent"
            ) json;
          params =
            Atdgen_codec_runtime.Decode.decode
            (
              read__3
              |> Atdgen_codec_runtime.Decode.field "params"
            ) json;
      } : select)
    )
  )
)
let write_selectMatrix = (
  Atdgen_codec_runtime.Encode.make (fun (t : selectMatrix) ->
    (
    Atdgen_codec_runtime.Encode.obj
      [
          Atdgen_codec_runtime.Encode.field
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"id"
          t.id
        ;
          Atdgen_codec_runtime.Encode.field
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"label"
          t.label
        ;
          Atdgen_codec_runtime.Encode.field_o
            (
            Atdgen_codec_runtime.Encode.bool
            )
          ~name:"required"
          t.required
        ;
          Atdgen_codec_runtime.Encode.field_o
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"relavent"
          t.relavent
        ;
          Atdgen_codec_runtime.Encode.field
            (
            write__3
            )
          ~name:"params"
          t.params
        ;
          Atdgen_codec_runtime.Encode.field
            (
            write__3
            )
          ~name:"subQuestion"
          t.subQuestion
      ]
    )
  )
)
let read_selectMatrix = (
  Atdgen_codec_runtime.Decode.make (fun json ->
    (
      ({
          id =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.field "id"
            ) json;
          label =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.field "label"
            ) json;
          required =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.bool
              |> Atdgen_codec_runtime.Decode.fieldOptional "required"
            ) json;
          relavent =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.fieldOptional "relavent"
            ) json;
          params =
            Atdgen_codec_runtime.Decode.decode
            (
              read__3
              |> Atdgen_codec_runtime.Decode.field "params"
            ) json;
          subQuestion =
            Atdgen_codec_runtime.Decode.decode
            (
              read__3
              |> Atdgen_codec_runtime.Decode.field "subQuestion"
            ) json;
      } : selectMatrix)
    )
  )
)
let write_text = (
  Atdgen_codec_runtime.Encode.make (fun (t : text) ->
    (
    Atdgen_codec_runtime.Encode.obj
      [
          Atdgen_codec_runtime.Encode.field
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"id"
          t.id
        ;
          Atdgen_codec_runtime.Encode.field
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"label"
          t.label
        ;
          Atdgen_codec_runtime.Encode.field_o
            (
            Atdgen_codec_runtime.Encode.bool
            )
          ~name:"required"
          t.required
        ;
          Atdgen_codec_runtime.Encode.field_o
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"relavent"
          t.relavent
      ]
    )
  )
)
let read_text = (
  Atdgen_codec_runtime.Decode.make (fun json ->
    (
      ({
          id =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.field "id"
            ) json;
          label =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.field "label"
            ) json;
          required =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.bool
              |> Atdgen_codec_runtime.Decode.fieldOptional "required"
            ) json;
          relavent =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.fieldOptional "relavent"
            ) json;
      } : text)
    )
  )
)
let write_time = (
  Atdgen_codec_runtime.Encode.make (fun (t : time) ->
    (
    Atdgen_codec_runtime.Encode.obj
      [
          Atdgen_codec_runtime.Encode.field
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"id"
          t.id
        ;
          Atdgen_codec_runtime.Encode.field
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"label"
          t.label
        ;
          Atdgen_codec_runtime.Encode.field_o
            (
            Atdgen_codec_runtime.Encode.bool
            )
          ~name:"required"
          t.required
        ;
          Atdgen_codec_runtime.Encode.field_o
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"relavent"
          t.relavent
      ]
    )
  )
)
let read_time = (
  Atdgen_codec_runtime.Decode.make (fun json ->
    (
      ({
          id =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.field "id"
            ) json;
          label =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.field "label"
            ) json;
          required =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.bool
              |> Atdgen_codec_runtime.Decode.fieldOptional "required"
            ) json;
          relavent =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.fieldOptional "relavent"
            ) json;
      } : time)
    )
  )
)
let rec write__4 js = (
  Atdgen_codec_runtime.Encode.list (
    write_field
  )
) js
and write_field js = (
  Atdgen_codec_runtime.Encode.make (fun (x : field) -> match x with
    | Text x ->
    Atdgen_codec_runtime.Encode.constr1 "Text" (
      write_text
    ) x
    | Note x ->
    Atdgen_codec_runtime.Encode.constr1 "Note" (
      write_note
    ) x
    | Integer x ->
    Atdgen_codec_runtime.Encode.constr1 "Integer" (
      write_integer
    ) x
    | SelectOne x ->
    Atdgen_codec_runtime.Encode.constr1 "SelectOne" (
      write_select
    ) x
    | SelectOneMatrix x ->
    Atdgen_codec_runtime.Encode.constr1 "SelectOneMatrix" (
      write_selectMatrix
    ) x
    | SelectMultiple x ->
    Atdgen_codec_runtime.Encode.constr1 "SelectMultiple" (
      write_select
    ) x
    | SelectMultipleMatrix x ->
    Atdgen_codec_runtime.Encode.constr1 "SelectMultipleMatrix" (
      write_selectMatrix
    ) x
    | Date x ->
    Atdgen_codec_runtime.Encode.constr1 "Date" (
      write_date
    ) x
    | Time x ->
    Atdgen_codec_runtime.Encode.constr1 "Time" (
      write_time
    ) x
    | DateTime x ->
    Atdgen_codec_runtime.Encode.constr1 "DateTime" (
      write_dateTime
    ) x
    | Group x ->
    Atdgen_codec_runtime.Encode.constr1 "Group" (
      write_group
    ) x
  )
) js
and write_group js = (
  Atdgen_codec_runtime.Encode.make (fun (t : group) ->
    (
    Atdgen_codec_runtime.Encode.obj
      [
          Atdgen_codec_runtime.Encode.field
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"id"
          t.id
        ;
          Atdgen_codec_runtime.Encode.field
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"label"
          t.label
        ;
          Atdgen_codec_runtime.Encode.field_o
            (
            Atdgen_codec_runtime.Encode.bool
            )
          ~name:"required"
          t.required
        ;
          Atdgen_codec_runtime.Encode.field_o
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"relavent"
          t.relavent
        ;
          Atdgen_codec_runtime.Encode.field
            (
            write__4
            )
          ~name:"params"
          t.params
      ]
    )
  )
) js
let rec read__4 js = (
  Atdgen_codec_runtime.Decode.list (
    read_field
  )
) js
and read_field js = (
  Atdgen_codec_runtime.Decode.enum
  [
      (
      "Text"
      ,
        `Decode (
        read_text
        |> Atdgen_codec_runtime.Decode.map (fun x -> ((Text x) : field))
        )
      )
    ;
      (
      "Note"
      ,
        `Decode (
        read_note
        |> Atdgen_codec_runtime.Decode.map (fun x -> ((Note x) : field))
        )
      )
    ;
      (
      "Integer"
      ,
        `Decode (
        read_integer
        |> Atdgen_codec_runtime.Decode.map (fun x -> ((Integer x) : field))
        )
      )
    ;
      (
      "SelectOne"
      ,
        `Decode (
        read_select
        |> Atdgen_codec_runtime.Decode.map (fun x -> ((SelectOne x) : field))
        )
      )
    ;
      (
      "SelectOneMatrix"
      ,
        `Decode (
        read_selectMatrix
        |> Atdgen_codec_runtime.Decode.map (fun x -> ((SelectOneMatrix x) : field))
        )
      )
    ;
      (
      "SelectMultiple"
      ,
        `Decode (
        read_select
        |> Atdgen_codec_runtime.Decode.map (fun x -> ((SelectMultiple x) : field))
        )
      )
    ;
      (
      "SelectMultipleMatrix"
      ,
        `Decode (
        read_selectMatrix
        |> Atdgen_codec_runtime.Decode.map (fun x -> ((SelectMultipleMatrix x) : field))
        )
      )
    ;
      (
      "Date"
      ,
        `Decode (
        read_date
        |> Atdgen_codec_runtime.Decode.map (fun x -> ((Date x) : field))
        )
      )
    ;
      (
      "Time"
      ,
        `Decode (
        read_time
        |> Atdgen_codec_runtime.Decode.map (fun x -> ((Time x) : field))
        )
      )
    ;
      (
      "DateTime"
      ,
        `Decode (
        read_dateTime
        |> Atdgen_codec_runtime.Decode.map (fun x -> ((DateTime x) : field))
        )
      )
    ;
      (
      "Group"
      ,
        `Decode (
        read_group
        |> Atdgen_codec_runtime.Decode.map (fun x -> ((Group x) : field))
        )
      )
  ]
) js
and read_group js = (
  Atdgen_codec_runtime.Decode.make (fun json ->
    (
      ({
          id =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.field "id"
            ) json;
          label =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.field "label"
            ) json;
          required =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.bool
              |> Atdgen_codec_runtime.Decode.fieldOptional "required"
            ) json;
          relavent =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.fieldOptional "relavent"
            ) json;
          params =
            Atdgen_codec_runtime.Decode.decode
            (
              read__4
              |> Atdgen_codec_runtime.Decode.field "params"
            ) json;
      } : group)
    )
  )
) js
let write_metadata = (
  Atdgen_codec_runtime.Encode.make (fun (t : metadata) ->
    (
    Atdgen_codec_runtime.Encode.obj
      [
          Atdgen_codec_runtime.Encode.field
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"id"
          t.id
        ;
          Atdgen_codec_runtime.Encode.field
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"label"
          t.label
        ;
          Atdgen_codec_runtime.Encode.field_o
            (
            Atdgen_codec_runtime.Encode.bool
            )
          ~name:"required"
          t.required
        ;
          Atdgen_codec_runtime.Encode.field_o
            (
            Atdgen_codec_runtime.Encode.string
            )
          ~name:"relavent"
          t.relavent
      ]
    )
  )
)
let read_metadata = (
  Atdgen_codec_runtime.Decode.make (fun json ->
    (
      ({
          id =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.field "id"
            ) json;
          label =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.field "label"
            ) json;
          required =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.bool
              |> Atdgen_codec_runtime.Decode.fieldOptional "required"
            ) json;
          relavent =
            Atdgen_codec_runtime.Decode.decode
            (
              Atdgen_codec_runtime.Decode.string
              |> Atdgen_codec_runtime.Decode.fieldOptional "relavent"
            ) json;
      } : metadata)
    )
  )
)
