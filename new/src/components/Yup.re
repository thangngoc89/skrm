type schema;

// [@bs.module] external yup: yup = "yup";

[@bs.module "yup"] external object_: Js.t('a) => schema = "object";
[@bs.module "yup"] external dict: Js.Dict.t(schema) => schema = "object";
[@bs.module "yup"] external string: unit => schema = "string";

[@bs.send] external oneOf: (schema, array(string)) => schema = "oneOf";
[@bs.send] external required: schema => schema = "required";
[@bs.send] external label: (schema, string) => schema = "label";
