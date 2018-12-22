[@bs.module "antd/es/form"] external form: ReasonReact.reactClass = "default";

[%bs.raw {|require("antd/es/form/style")|}];

[@bs.obj]
external makeProps:
  (
    ~layout: string=?,
    ~onSubmit: ReactEvent.Form.t => unit=?,
    ~hideRequiredMark: bool=?,
    ~id: string=?,
    ~className: string=?,
    ~style: ReactDOMRe.Style.t=?,
    ~colon: bool=?,
    ~validateStatus: string=?,
    ~extra: string=?,
    ~required: bool=?,
    ~label: string=?,
    ~help: string=?,
    ~hasFeedback: bool=?,
    unit
  ) =>
  _ =
  "";

let make =
    (
      ~layout=?,
      ~onSubmit=?,
      ~hideRequiredMark=?,
      ~id=?,
      ~className=?,
      ~style=?,
      children,
    ) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=form,
    ~props=
      makeProps(
        ~layout?,
        ~onSubmit?,
        ~hideRequiredMark?,
        ~id?,
        ~className?,
        ~style?,
        (),
      ),
    children,
  );

module Item = {
  [@bs.module "antd/es/form/FormItem"]
  external item: ReasonReact.reactClass = "default";
  let make =
      (
        ~colon=?,
        ~validateStatus=?,
        ~extra=?,
        ~className=?,
        ~required=?,
        ~style=?,
        ~label=?,
        ~id=?,
        ~help=?,
        ~hasFeedback=?,
        children,
      ) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=item,
      ~props=
        makeProps(
          ~colon?,
          ~validateStatus?,
          ~extra?,
          ~className?,
          ~required?,
          ~style?,
          ~label?,
          ~id?,
          ~help?,
          ~hasFeedback?,
          (),
        ),
      children,
    );
};
