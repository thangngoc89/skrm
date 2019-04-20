[@react.component]
let make =
    (
      ~position=?,
      ~modal=?,
      ~onClose,
      ~margin=?,
      ~full=?,
      ~full__custom=?,
      ~children,
    ) => {
  <Grommet__Layer
    ?position
    ?modal
    onClickOutside=onClose
    onEsc=onClose
    ?margin
    ?full
    ?full__custom>
    {children(onClose)}
  </Grommet__Layer>;
};
