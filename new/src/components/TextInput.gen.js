/* Untyped file generated by genType. */

import * as Curry from 'bs-platform/lib/es6/curry.js';

import * as ReasonReact from 'reason-react/src/ReasonReact.js';

import * as TextInputBS from './TextInput.bs';

export const TextInput = ReasonReact.wrapReasonForJs(
  TextInputBS.component,
  (function _(jsProps) {
     return Curry.app(TextInputBS.make, [jsProps.value, jsProps.onChange, jsProps.onFocus, jsProps.onBlur, jsProps.placeholder, jsProps.name, jsProps.id, jsProps.className, jsProps.type, jsProps.children]);
  }));

export default TextInput;
