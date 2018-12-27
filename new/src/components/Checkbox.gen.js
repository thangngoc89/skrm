/* Untyped file generated by genType. */

import * as CheckboxBS from './Checkbox.bs';

import * as Curry from 'bs-platform/lib/es6/curry.js';

import * as ReasonReact from 'reason-react/src/ReasonReact.js';

export const Checkbox = ReasonReact.wrapReasonForJs(
  CheckboxBS.component,
  (function _(jsProps) {
     return Curry._5(CheckboxBS.make, jsProps.label, jsProps.name, jsProps.value, jsProps.onChange, jsProps.children);
  }));

export default Checkbox;
