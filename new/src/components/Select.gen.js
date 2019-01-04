/* Untyped file generated by genType. */

import * as Curry from 'bs-platform/lib/es6/curry.js';

import * as ReasonReact from 'reason-react/src/ReasonReact.js';

import * as SelectBS from './Select.bs';

export const Select = ReasonReact.wrapReasonForJs(
  SelectBS.component,
  (function _(jsProps) {
     return Curry._6(SelectBS.make, jsProps.options.map(function _element(ArrayItem) { return [ArrayItem.value, ArrayItem.label]}), jsProps.name, jsProps.value, jsProps.onChange, jsProps.className, jsProps.children);
  }));

export default Select;
