// Get initial values from the schema

module JsAny = {
  type t;
  external toJsUnsafe: 'a => t = "%identity";

  let unwrapValue =
    fun
    | `String(s) => toJsUnsafe(s)
    | `Bool(b) => toJsUnsafe(b)
    | `Float(f) => toJsUnsafe(f)
    | `Int(i) => toJsUnsafe(i)
    | `Date(d) => toJsUnsafe(d)
    | `Callback(c) => toJsUnsafe(c)
    | `Element(e) => toJsUnsafe(e)
    | `ObjectArray(oa) => toJsUnsafe(oa)
    | `StringArray(sa) => toJsUnsafe(sa)
    | `IntArray(ia) => toJsUnsafe(ia)
    | `FloatArray(fa) => toJsUnsafe(fa)
    | `ObjectGeneric(og) => toJsUnsafe(og)
    | `Array(ag) => toJsUnsafe(ag)
    | `Any(an) => toJsUnsafe(an)
    | `Object(ob) => toJsUnsafe(ob)
    | `Enum(_) => assert(false)
    | `EnumArray(_) => assert(false);
};

open Survey;

let fields = [|
  Text({
    id: "text",
    label: "This is a text field",
    required: None,
    relavent: None,
  }),
  SelectOne({
    id: "select_one",
    label: "Select one",
    required: None,
    relavent: None,
    params: [|{value: "0", label: "No"}, {value: "1", label: "yes"}|],
  }),
|];


// let rec getInitialValues: array(Survey.field) => Js.Dict.t(JsAny.t) =
//   fields => {
//     fields->Belt.Array.keepMap(
//       fun
//       | Text({id}) => Some((id, `String("")))
//       | Note({id}) => None
//       | Integer({id}) => Some((id, `Int(0))
//       | SelectOne({id}) => Some((id, `String("")))
//       | SelectOneMatrix({id}) => Some(`StringArray([||]))
//       | SelectMultiple({id}) => Some(`StringArray([||]))
//       | SelectMultipleMatrix({id}) => Some(`StringArray([||]))
//       | Date(date) => Some(`String(""))
//       | Time(time) => Some(`String(""))
//       | DateTime(dateTime) => Some(`String(""))
//       | Group(group) => Some(`Object(getInitialValues(group.params))),
//     )
//     ->Belt.Array.map(JsAny.unwrapValue);
//   };
