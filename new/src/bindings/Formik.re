module FastField = {
  type field('value) = {
    .
    "name": string,
    "value": 'value,
    "onChange": ReactEvent.Form.t => unit,
    "onBlur": ReactEvent.Focus.t => unit,
  };
  type form = {
    .
    "errors": Js.Dict.t(Js.Json.t),
    "touched": Js.Dict.t(Js.Json.t),
  };
  type renderProps('value) = {
    .
    "field": field('value),
    "form": form,
  };
  [@bs.module "formik"] [@react.component]
  external make:
    (~name: string, ~render: renderProps('value) => React.element) =>
    React.element =
    "FastField";
};

module Form = {
  [@bs.module "formik"] [@react.component]
  external make: (~children: array(React.element)) => React.element = "Form";
};
