open ReactHelpers;

[@genType]
[@react.component]
let make =
    (
      ~error: option(string)=?,
      ~help: option(string)=?,
      ~label: string,
      ~htmlFor: string,
      ~className: option(string)=?,
      ~children,
    ) => {
  <div className={Cn.make(["mb-2 lg:mb-3", Cn.unpack(className)])}>
    <section className="mx-2 lg:mx-3 my-1 flex flex-col">
      <label htmlFor> label->str </label>
      {switch (help) {
       | None => React.null
       | Some(help) => <span className="text-dark-3"> help->str </span>
       }}
    </section>
    <section
      className={Cn.make(["formfield", Cn.ifSome("formfieldError", error)])}>
      children
    </section>
    {switch (error) {
     | None => React.null
     | Some(error) =>
       <section className="mx-2 lg:mx-3 my-1 lg:my-2">
         <span className="text-status-error"> error->str </span>
       </section>
     }}
  </div>;
};
