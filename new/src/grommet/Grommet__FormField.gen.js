/* Untyped file generated by genType. */

import GFormField from "./GFormField";

import * as React from "react";

import * as ReasonReact from "reason-react/src/ReasonReact.js";

// Export 'make' early to allow circular import from the '.bs.js' file.
export const make = function _(error, help, htmlFor, label, children) {
  return ReasonReact.wrapJsForReason(
    GFormField,
    {
      error: error,
      help: help,
      htmlFor: htmlFor,
      label: label,
      
    },
    children
  );
};
