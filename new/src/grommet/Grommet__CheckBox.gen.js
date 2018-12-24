/* Untyped file generated by genType. */

import { CheckBox } from "grommet";

import * as React from "react";

import * as ReasonReact from "reason-react/src/ReasonReact.js";

// Export 'make' early to allow circular import from the '.bs.js' file.
export const make = function _(
  checked,
  disabled,
  id,
  indeterminate,
  label,
  name,
  onChange,
  reverse,
  toggle,
  children
) {
  return ReasonReact.wrapJsForReason(
    CheckBox,
    {
      checked: checked,
      disabled: disabled,
      id: id,
      indeterminate: indeterminate,
      label: label,
      name: name,
      onChange: onChange,
      reverse: reverse,
      toggle: toggle,
    },
    children
  );
};
