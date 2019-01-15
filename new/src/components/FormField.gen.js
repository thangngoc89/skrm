/* Untyped file generated by genType. */

import * as Curry from 'bs-platform/lib/es6/curry.js';

import * as FormFieldBS from './FormField.bs';

import * as ReasonReact from 'reason-react/src/ReasonReact.js';

export const FormField = ReasonReact.wrapReasonForJs(
  FormFieldBS.component,
  (function _(jsProps) {
     return Curry._6(FormFieldBS.make, jsProps.error, jsProps.help, jsProps.label, jsProps.htmlFor, jsProps.className, jsProps.children);
  }));

export default FormField;